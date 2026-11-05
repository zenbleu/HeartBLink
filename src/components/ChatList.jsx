import React, { useState } from 'react';
import { 
  Heart, 
  UserPlus, 
  AlertTriangle, 
  Key, 
  Settings, 
  Search, 
  Sparkles, 
  ChevronRight,
  Flame,
  MessageSquare
} from 'lucide-react';

export default function ChatList({
  characters,
  selectedCharacterId,
  onSelectCharacter,
  onOpenWizard,
  onOpenProfile,
  hasApiKey,
  playerProfile
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharacters = (characters || []).filter((char) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      char.name.toLowerCase().includes(q) ||
      (char.archetype && char.archetype.toLowerCase().includes(q)) ||
      (char.dynamic && char.dynamic.toLowerCase().includes(q))
    );
  });

  const getPointsBadgeClass = (pts) => {
    if (pts >= 80) {
      return 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-950/40';
    } else if (pts >= 50) {
      return 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/40';
    } else if (pts >= 25) {
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    }
    return 'bg-slate-800 text-slate-400 border-slate-700';
  };

  const getAffectionTitle = (pts) => {
    if (pts >= 85) return 'Lovers';
    if (pts >= 65) return 'Mutual Longing';
    if (pts >= 45) return 'Crushing';
    if (pts >= 25) return 'Flustered';
    return 'Acquaintance';
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-r border-slate-850 select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-850 bg-slate-900/90 backdrop-blur sticky top-0 z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-950/50">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                HeartBLink
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold tracking-normal">
                  BL SIM
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Romantic Messenger
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenWizard}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all cursor-pointer border border-slate-700/80 shadow-sm"
              title="Create new BL character"
            >
              <UserPlus className="w-4 h-4 text-rose-400" />
            </button>
            <button
              onClick={onOpenProfile}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all cursor-pointer border border-slate-700/80 relative"
              title="Profile & API Settings"
            >
              <Settings className="w-4 h-4" />
              {!hasApiKey && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>
          </div>
        </div>

        {/* PROMINENT RED WARNING BANNER IF API KEY IS MISSING */}
        {!hasApiKey && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/80 text-rose-100 flex items-start gap-2.5 shadow-lg shadow-rose-950/60 animate-fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-white tracking-wide">
                  Gemini API Key Required
                </p>
                <span className="text-[10px] font-bold text-rose-300 bg-rose-900/60 px-1.5 py-0.5 rounded border border-rose-700/50">
                  ACTION NEEDED
                </span>
              </div>
              <p className="text-[11px] text-rose-200/90 mt-0.5 leading-snug">
                Characters cannot generate intelligent responses until your free Google AI Studio key is configured.
              </p>
              <button
                type="button"
                onClick={onOpenProfile}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide transition-colors shadow cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" /> Configure Key Now
              </button>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search characters or tropes..."
            className="w-full pl-8 pr-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
          />
        </div>
      </div>

      {/* Characters List Scrollable Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-900/60 p-2 space-y-1">
        {filteredCharacters.length === 0 ? (
          <div className="p-8 text-center text-slate-500 space-y-3">
            <MessageSquare className="w-8 h-8 mx-auto text-slate-600 opacity-60" />
            <p className="text-xs">No characters found matching "{searchQuery}"</p>
            <button
              onClick={onOpenWizard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs hover:bg-rose-600/30 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" /> Create a Character
            </button>
          </div>
        ) : (
          filteredCharacters.map((char) => {
            const isSelected = char.id === selectedCharacterId;
            const lastMsg = char.messages && char.messages.length > 0 
              ? char.messages[char.messages.length - 1] 
              : null;
            const points = Math.max(0, Math.min(100, char.points || 0));

            return (
              <div
                key={char.id}
                onClick={() => onSelectCharacter(char.id)}
                className={`relative flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border border-rose-500/40 shadow-md shadow-rose-950/30 ring-1 ring-rose-500/20'
                    : 'bg-slate-950/40 hover:bg-slate-900/70 border border-transparent hover:border-slate-800'
                }`}
              >
                {/* Active Indicator Bar on left */}
                {isSelected && (
                  <div className="absolute left-1 top-3 bottom-3 w-1 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full" />
                )}

                {/* Avatar with Status Dot */}
                <div className="relative shrink-0 ml-1">
                  {char.avatarUrl ? (
                    <img
                      src={char.avatarUrl}
                      alt={char.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-700/80 shadow"
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                        char.avatarColor || 'from-slate-800 to-indigo-950'
                      } flex items-center justify-center font-bold text-white text-sm border border-slate-700/60 shadow`}
                    >
                      {char.avatarText || char.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                      char.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'
                    }`}
                    title={char.status === 'online' ? 'Online' : 'Away'}
                  />
                </div>

                {/* Info & Last Message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-sm text-slate-100 truncate">
                      {char.name}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0">
                      {lastMsg?.timestamp || 'Just now'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] font-medium text-rose-400/90 truncate">
                      {char.archetype}
                    </span>
                    <span className="text-slate-600 text-[10px]">•</span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {char.dynamic}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 truncate mt-1">
                    {lastMsg ? (
                      <>
                        <span className="text-slate-500 font-medium">
                          {lastMsg.sender === 'user' ? 'You: ' : ''}
                        </span>
                        {lastMsg.text}
                      </>
                    ) : (
                      <span className="italic text-slate-500">Tap to start chatting...</span>
                    )}
                  </p>
                </div>

                {/* Prominent Relationship Points Badge (0-100) */}
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${getPointsBadgeClass(
                      points
                    )}`}
                    title={`Affection: ${points}/100 (${getAffectionTitle(points)})`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        points > 40 ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                      }`}
                    />
                    <span>{points} pts</span>
                  </div>
                  <span className="text-[9px] font-medium text-slate-500 tracking-tight">
                    {getAffectionTitle(points)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom User Bar */}
      <div className="p-3 border-t border-slate-850 bg-slate-900/60 flex items-center justify-between">
        <div 
          onClick={onOpenProfile} 
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-xs text-white font-bold shadow">
            {playerProfile?.name?.slice(0, 1) || 'P'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {playerProfile?.name || 'Player'}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {playerProfile?.pronouns || 'He/Him'} • Persona Settings
            </p>
          </div>
        </div>

        <button
          onClick={onOpenWizard}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-medium transition-all shadow-md shadow-rose-950/40 cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>New Char</span>
        </button>
      </div>
    </div>
  );
}
