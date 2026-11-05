import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_CHARACTERS } from './data/initialCharacters';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import UserProfile from './components/UserProfile';
import { playHeartGainSound, playMessageReceivedSound } from './utils/soundEffects';
import { Character, Message, PlayerProfile } from './types';

export default function App() {
  // Persistent game state using custom useLocalStorage hook
  const [characters, setCharacters] = useLocalStorage('heartblink_characters', INITIAL_CHARACTERS);
  const [selectedCharacterId, setSelectedCharacterId] = useLocalStorage(
    'heartblink_selected_id',
    INITIAL_CHARACTERS[0]?.id || null
  );
  const [playerProfile, setPlayerProfile] = useLocalStorage('heartblink_player_profile', {
    name: 'Haru',
    pronouns: 'He/Him',
    details: 'Quick-witted design student with a sharp eye, easily flustered by sincere compliments.',
    avatar: 'av-1'
  });
  const [soundEnabled, setSoundEnabled] = useLocalStorage('heartblink_sound_enabled', true);

  // UI view state
  const [currentView, setCurrentView] = useState<'chats' | 'profile'>('chats');
  const [isWaitingForAi, setIsWaitingForAi] = useState<boolean>(false);

  // Selected character object
  const selectedCharacter: Character | null =
    (characters as Character[]).find((c: Character) => c.id === selectedCharacterId) ||
    (characters as Character[])[0] ||
    null;

  // Handle player sending a message in offline mode
  const handleSendMessage = (userText: string) => {
    if (!selectedCharacter || isWaitingForAi) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: timeString
    };

    // Append user message immediately
    const updatedMessages = [...(selectedCharacter.messages || []), userMessage];

    setCharacters((prev: Character[]) =>
      prev.map((c: Character) =>
        c.id === selectedCharacter.id
          ? { ...c, messages: updatedMessages, status: 'online' }
          : c
      )
    );

    // Simulate character reading and responding locally
    setIsWaitingForAi(true);

    setTimeout(() => {
      // In-character offline response generator for current cast
      let replyText = "...I saw your message.";
      let pointsDelta = 2;
      let reaction = 'smiles';

      if (selectedCharacter.id === 'char-killian') {
        replyText = "Don't think I haven't noticed how frequently you text me. Make sure you're ready tonight.";
        pointsDelta = 3;
        reaction = 'smirking';
      } else if (selectedCharacter.id === 'char-ren') {
        replyText = "Still awake? Don't make excuses tomorrow if you're yawning during design review.";
        pointsDelta = 2;
        reaction = 'flustered';
      } else if (selectedCharacter.id === 'char-yohan') {
        replyText = "Hehe, I just finished practice and saw this! You always know how to make me smile! ✨";
        pointsDelta = 4;
        reaction = 'blushing';
      } else if (selectedCharacter.id === 'char-damian') {
        replyText = "You're getting bolder with your words. I don't hate it.";
        pointsDelta = 3;
        reaction = 'intrigued';
      }

      const aiMessage: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: 'char',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pointsAwarded: pointsDelta,
        reaction
      };

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

      setIsWaitingForAi(false);

      // Play local sound effects
      playMessageReceivedSound(soundEnabled);
      if (pointsDelta > 0) {
        setTimeout(() => {
          playHeartGainSound(soundEnabled);
        }, 120);
      }
    }, 900);
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
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden select-none">
      {/* View Switcher: User Profile Settings View */}
      {currentView === 'profile' ? (
        <UserProfile
          profile={playerProfile}
          onSaveProfile={(updated: PlayerProfile) => setPlayerProfile(updated)}
          onClose={() => setCurrentView('chats')}
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
              onOpenProfile={() => setCurrentView('profile')}
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
              onSendMessage={handleSendMessage}
              isWaitingForAi={isWaitingForAi}
              onBack={() => setSelectedCharacterId(null)}
              soundEnabled={soundEnabled}
              onResetChatHistory={handleResetChatHistory}
            />
          </div>
        </div>
      )}
    </div>
  );
}
