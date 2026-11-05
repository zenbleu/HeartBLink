import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Heart, 
  ArrowLeft, 
  CheckCheck, 
  RotateCcw, 
  Info, 
  X,
  Smile
} from 'lucide-react';
import { playMessageSentSound } from '../utils/soundEffects';

const QUICK_REPLIES = [
  "Are you blushing right now?",
  "You're working too hard. Let me take care of you.",
  "What if I told you I wasn't pretending?",
  "Come closer and say that again.",
  "I missed you today."
];

export default function ChatWindow({
  character,
  onSendMessage,
  isWaitingForAi,
  onBack,
  soundEnabled,
  onResetChatHistory
}) {
  const [inputText, setInputText] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom('smooth');
  }, [character?.messages, isWaitingForAi]);

  if (!character) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-8 text-center">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500">
          <Heart className="w-8 h-8 text-rose-500/50" />
        </div>
        <h3 className="text-lg font-bold text-slate-200">No Chat Selected</h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          Select a character from the left to view your conversation.
        </p>
      </div>
    );
  }

  const currentPoints = Math.max(0, Math.min(100, character.points || 0));

  const getTierLabel = (pts) => {
    if (pts >= 85) return 'Stage 5: Devoted Lovers';
    if (pts >= 65) return 'Stage 4: Deep Bond & Longing';
    if (pts >= 45) return 'Stage 3: Crushing & Smitten';
    if (pts >= 25) return 'Stage 2: Flustered & Intrigued';
    return 'Stage 1: Guarded Acquaintance';
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isWaitingForAi) return;

    const text = inputText.trim();
    setInputText('');
    playMessageSentSound(soundEnabled);

    onSendMessage(text);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 relative overflow-hidden">
      {/* TOP HEADER & RELATIONSHIP PROGRESS BAR */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-sm">
        {/* Main Header Info Row */}
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {onBack && (
              <button
                onClick={onBack}
                className="p-1.5 -ml-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 md:hidden"
                title="Back to chats"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            {/* Avatar */}
            <div className="relative shrink-0">
              {character.avatarUrl ? (
                <img
                  src={character.avatarUrl}
                  alt={character.name}
                  className="w-10 h-10 rounded-2xl object-cover border border-slate-700 shadow"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${
                    character.avatarColor || 'from-slate-800 to-indigo-950'
                  } flex items-center justify-center font-bold text-white text-xs border border-slate-700 shadow`}
                >
                  {character.avatarText || character.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                  character.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'
                }`}
              />
            </div>

            {/* Title & Demeanor */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white truncate">
                  {character.name}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 shrink-0">
                  {character.archetype}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {isWaitingForAi ? (
                  <span className="text-rose-400 font-medium animate-pulse">
                    typing a message...
                  </span>
                ) : (
                  <span>{character.dynamic} • {character.lastSeen || 'Online'}</span>
                )}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Character Lore Info Toggle */}
            <button
              type="button"
              onClick={() => setShowInfoModal(!showInfoModal)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Character details and scenario"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TOP PROGRESS BAR REFLECTING CURRENT RELATIONSHIP POINTS */}
        <div className="px-4 pb-2.5 pt-0.5 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="font-bold text-slate-200">
                Affection: {currentPoints}/100
              </span>
              <span className="text-slate-500 text-[10px]">•</span>
              <span className="text-[11px] font-semibold text-rose-400">
                {getTierLabel(currentPoints)}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {currentPoints}%
            </span>
          </div>

          {/* Glowing bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-rose-500 to-pink-500 transition-all duration-700 shadow-md shadow-rose-500/50"
              style={{ width: `${Math.max(4, currentPoints)}%` }}
            />
          </div>
        </div>
      </div>

      {/* CHARACTER LORE / SCENARIO DRAWER (MODAL) */}
      {showInfoModal && (
        <div className="absolute top-20 right-4 z-40 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 text-xs space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Character Dossier
            </h3>
            <button
              onClick={() => setShowInfoModal(false)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
              Current Scenario:
            </span>
            <p className="text-slate-200 mt-0.5 leading-relaxed bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              {character.scenario}
            </p>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
              Personality & Vibe:
            </span>
            <p className="text-slate-300 mt-0.5 leading-relaxed">
              {character.personality || character.tagline}
            </p>
          </div>
          {character.bio && (
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                Background:
              </span>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                {character.bio}
              </p>
            </div>
          )}
          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                if (confirm('Reset chat history with this character?')) {
                  onResetChatHistory(character.id);
                  setShowInfoModal(false);
                }
              }}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Chat History
            </button>
          </div>
        </div>
      )}

      {/* SCROLLABLE CHAT MESSAGES BODY */}
      <div 
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(30, 27, 75, 0.15), transparent 70%)'
        }}
      >
        {/* Scenario Intro Card at top of conversation */}
        <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-1 shadow-sm">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950/40 text-rose-300 border border-rose-800/40 text-[10px] font-semibold">
            <Sparkles className="w-3 h-3" /> Active Dating Scenario
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "{character.scenario}"
          </p>
        </div>

        {/* Message Bubbles */}
        {(character.messages || []).map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Character Avatar for left bubbles */}
              {!isUser && (
                <div className="shrink-0 mb-1">
                  {character.avatarUrl ? (
                    <img
                      src={character.avatarUrl}
                      alt={character.name}
                      className="w-8 h-8 rounded-xl object-cover border border-slate-700 shadow"
                    />
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-xl bg-gradient-to-br ${
                        character.avatarColor || 'from-slate-800 to-indigo-950'
                      } flex items-center justify-center font-bold text-white text-[11px] border border-slate-700 shadow`}
                    >
                      {character.avatarText || character.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              )}

              {/* Message Content Bubble */}
              <div className={`max-w-[85%] sm:max-w-md flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md whitespace-pre-wrap ${
                    isUser
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-br-xs'
                      : 'bg-slate-900 text-slate-100 border border-slate-800/90 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Subtitle / Timestamp / Points delta indicator */}
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[10px] text-slate-500">
                    {msg.timestamp || 'Now'}
                  </span>

                  {isUser && (
                    <CheckCheck className="w-3 h-3 text-rose-400" />
                  )}

                  {/* If this character response triggered points change */}
                  {!isUser && msg.pointsAwarded !== undefined && msg.pointsAwarded !== 0 && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${
                        msg.pointsAwarded > 0
                          ? 'bg-rose-950/60 text-rose-400 border-rose-800/60'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                      {msg.pointsAwarded > 0 ? `+${msg.pointsAwarded}` : msg.pointsAwarded} pts
                      {msg.reaction ? ` (${msg.reaction})` : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* ACTIVE TYPING ANIMATION (...) WHEN WAITING FOR RESPONSE */}
        {isWaitingForAi && (
          <div className="flex items-end gap-2.5 justify-start animate-fade-in">
            <div className="shrink-0 mb-1">
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${
                  character.avatarColor || 'from-slate-800 to-indigo-950'
                } flex items-center justify-center font-bold text-white text-[11px] border border-slate-700 shadow`}
              >
                {character.avatarText || character.name.slice(0, 2).toUpperCase()}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl rounded-bl-xs shadow-md flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK INSPIRATION REPLIES CHIPS */}
      <div className="px-4 py-1.5 bg-slate-950/80 border-t border-slate-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-slate-500 font-medium shrink-0 flex items-center gap-1">
          <Smile className="w-3 h-3 text-rose-400" /> Quick Replies:
        </span>
        {QUICK_REPLIES.map((reply, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInputText(reply)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs shrink-0 transition-colors cursor-pointer"
          >
            "{reply}"
          </button>
        ))}
      </div>

      {/* INPUT FORM */}
      <div className="p-3 sm:p-4 bg-slate-900/95 border-t border-slate-800">
        <form onSubmit={handleSend} className="flex items-end gap-2 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${character.name}... (Enter to send)`}
              className="w-full pl-4 pr-10 py-3 bg-slate-950 border border-slate-700/80 rounded-2xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none max-h-32 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isWaitingForAi}
            className={`p-3 rounded-2xl transition-all cursor-pointer shrink-0 shadow-lg ${
              inputText.trim() && !isWaitingForAi
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-950/60'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
