import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_CHARACTERS } from './data/initialCharacters';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import CharacterWizard from './components/CharacterWizard';
import UserProfile from './components/UserProfile';
import { sendChatMessage, API_KEY_STORAGE_KEY } from './services/gemini';
import { playHeartGainSound, playMessageReceivedSound } from './utils/soundEffects';
import { Character, Message, PlayerProfile } from './types';

export default function App() {
  // Persistent game state using custom useLocalStorage hook
  const [characters, setCharacters] = useLocalStorage('heartblink_characters', INITIAL_CHARACTERS);
  const [selectedCharacterId, setSelectedCharacterId] = useLocalStorage(
    'heartblink_selected_id',
    INITIAL_CHARACTERS[0]?.id || null
  );
  const [apiKey, setApiKey] = useLocalStorage(API_KEY_STORAGE_KEY, '');
  const [playerProfile, setPlayerProfile] = useLocalStorage('heartblink_player_profile', {
    name: 'Haru',
    pronouns: 'He/Him',
    details: 'Quick-witted assistant who works overtime, secretly easily flustered by sincere compliments.',
    avatar: 'av-1'
  });
  const [soundEnabled, setSoundEnabled] = useLocalStorage('heartblink_sound_enabled', true);

  // UI state
  const [currentView, setCurrentView] = useState<'chats' | 'profile'>('chats');
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [isWaitingForAi, setIsWaitingForAi] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected character object
  const selectedCharacter: Character | null =
    (characters as Character[]).find((c: Character) => c.id === selectedCharacterId) ||
    (characters as Character[])[0] ||
    null;

  // Handle creating a new custom BL character
  const handleCreateCharacter = (newChar: Character) => {
    setCharacters((prev: Character[]) => [newChar, ...prev]);
    setSelectedCharacterId(newChar.id);
    setCurrentView('chats');
  };

  // Handle sending a chat message to the character via Gemini
  const handleSendMessage = async (userText: string, storyBeatPrompt: string | null = null) => {
    if (!selectedCharacter || isWaitingForAi) return;

    setErrorMessage(null);

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: timeString,
      storyBeat: storyBeatPrompt ? true : false
    };

    // Optimistically update character messages with user's new message
    const updatedMessages = [...(selectedCharacter.messages || []), userMessage];

    setCharacters((prev: Character[]) =>
      prev.map((c: Character) =>
        c.id === selectedCharacter.id
          ? { ...c, messages: updatedMessages, status: 'online' }
          : c
      )
    );

    setIsWaitingForAi(true);

    try {
      const response = await sendChatMessage({
        character: selectedCharacter,
        playerProfile,
        messageHistory: updatedMessages,
        newUserMessage: userText,
        storyBeatPrompt
      });

      const { cleanMessage, pointsDelta, reaction, reason } = response;

      const aiMessage: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: 'char',
        text: cleanMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pointsAwarded: pointsDelta,
        reaction,
        reason
      };

      // Calculate new clamped points (0 to 100)
      const currentPts = selectedCharacter.points || 0;
      const newPoints = Math.max(0, Math.min(100, currentPts + pointsDelta));

      setCharacters((prev: Character[]) =>
        prev.map((c: Character) =>
          c.id === selectedCharacter.id
            ? {
                ...c,
                points: newPoints,
                messages: [...(c.messages || []), aiMessage],
                status: 'online',
                lastSeen: 'Active now'
              }
            : c
        )
      );

      // Play audio cues
      playMessageReceivedSound(soundEnabled);
      if (pointsDelta > 0) {
        setTimeout(() => {
          playHeartGainSound(soundEnabled);
        }, 150);
      }
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const message = err instanceof Error ? err.message : 'Failed to receive a response from character.';
      setErrorMessage(message);
    } finally {
      setIsWaitingForAi(false);
    }
  };

  // Reset chat history for a specific character
  const handleResetChatHistory = (characterId: string) => {
    const defaultTemplate = (INITIAL_CHARACTERS as unknown as Character[]).find((c) => c.id === characterId);
    setCharacters((prev: Character[]) =>
      prev.map((c: Character) => {
        if (c.id === characterId) {
          return {
            ...c,
            points: defaultTemplate ? defaultTemplate.points : 20,
            messages: defaultTemplate
              ? defaultTemplate.messages
              : [
                  {
                    id: `msg-reset-${Date.now()}`,
                    sender: 'char' as const,
                    text: 'Hey... where were we again?',
                    timestamp: 'Just now',
                    pointsAwarded: 0
                  }
                ]
          };
        }
        return c;
      })
    );
  };

  // Reset entire game state to default starter characters
  const handleResetAllData = () => {
    setCharacters(INITIAL_CHARACTERS as unknown as Character[]);
    setSelectedCharacterId(INITIAL_CHARACTERS[0].id);
    setErrorMessage(null);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden select-none">
      {/* View Switcher: Settings / User Profile Modal View */}
      {currentView === 'profile' ? (
        <UserProfile
          profile={playerProfile}
          onSaveProfile={(updated: PlayerProfile) => setPlayerProfile(updated)}
          onClose={() => setCurrentView('chats')}
          apiKey={apiKey}
          onSaveApiKey={(key: string) => setApiKey(key)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onResetAllData={handleResetAllData}
        />
      ) : (
        /* Messenger Layout: Desktop Split Screen / Mobile View Switcher */
        <div className="flex w-full h-full">
          {/* Left Sidebar: Character List (hidden on mobile if a character is selected) */}
          <div
            className={`w-full md:w-96 lg:w-[410px] shrink-0 h-full border-r border-slate-850 flex flex-col ${
              selectedCharacterId ? 'hidden md:flex' : 'flex'
            }`}
          >
            <ChatList
              characters={characters}
              selectedCharacterId={selectedCharacterId}
              onSelectCharacter={(id: string) => setSelectedCharacterId(id)}
              onOpenWizard={() => setIsWizardOpen(true)}
              onOpenProfile={() => setCurrentView('profile')}
              hasApiKey={Boolean(apiKey && apiKey.trim().length > 0)}
              playerProfile={playerProfile}
            />
          </div>

          {/* Right Main Pane: Active Chat Window */}
          <div
            className={`flex-1 h-full flex flex-col ${
              !selectedCharacterId ? 'hidden md:flex' : 'flex'
            }`}
          >
            <ChatWindow
              character={selectedCharacter}
              playerProfile={playerProfile}
              onSendMessage={handleSendMessage}
              isWaitingForAi={isWaitingForAi}
              errorMessage={errorMessage}
              onClearError={() => setErrorMessage(null)}
              onBack={() => setSelectedCharacterId(null)}
              hasApiKey={Boolean(apiKey && apiKey.trim().length > 0)}
              onOpenProfile={() => setCurrentView('profile')}
              soundEnabled={soundEnabled}
              onResetChatHistory={handleResetChatHistory}
            />
          </div>
        </div>
      )}

      {/* Character Wizard Modal */}
      <CharacterWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreateCharacter={handleCreateCharacter}
      />
    </div>
  );
}
