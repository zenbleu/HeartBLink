import React, { useState } from 'react';
import { 
  Check, 
  User, 
  Sparkles, 
  Trash2, 
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';

const AVATAR_OPTIONS = [
  { id: 'av-1', label: 'Dark Wavy Hair', bg: 'from-violet-600 to-indigo-800', emoji: '🧑🏻‍💼' },
  { id: 'av-2', label: 'Caramel Hair', bg: 'from-amber-600 to-orange-800', emoji: '🧑🏼‍💻' },
  { id: 'av-3', label: 'Silver Mist', bg: 'from-slate-600 to-zinc-800', emoji: '🧑🏻‍🎨' },
  { id: 'av-4', label: 'Soft Brown Curls', bg: 'from-rose-600 to-pink-800', emoji: '🧑🏽‍🎓' },
  { id: 'av-5', label: 'Jet Black Undercut', bg: 'from-blue-700 to-cyan-900', emoji: '🧑🏻‍🎤' },
  { id: 'av-6', label: 'Blonde Highlights', bg: 'from-yellow-600 to-amber-800', emoji: '🧑🏼‍⚕️' }
];

export default function UserProfile({ 
  profile, 
  onSaveProfile, 
  onClose,
  soundEnabled,
  onToggleSound,
  onResetAllData
}) {
  const [name, setName] = useState(profile?.name || 'Haru');
  const [pronouns, setPronouns] = useState(profile?.pronouns || 'He/Him');
  const [details, setDetails] = useState(
    profile?.details || 'Quiet design assistant with a sharp wit, easily flustered when caught off guard.'
  );
  const [avatar, setAvatar] = useState(profile?.avatar || 'av-1');
  const [profileSavedStatus, setProfileSavedStatus] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim() || 'Player',
      pronouns,
      details: details.trim(),
      avatar
    });
    setProfileSavedStatus(true);
    setTimeout(() => {
      setProfileSavedStatus(false);
      if (onClose) onClose();
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Return to chats"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <User className="w-5 h-5 text-rose-400" />
              Player Profile & Settings
            </h1>
            <p className="text-xs text-slate-400">
              Customize your persona and game audio preferences
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              soundEnabled
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-300 hover:bg-rose-900/50'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle notification and heart sound effects"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            {soundEnabled ? 'SFX On' : 'Muted'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full p-6 space-y-8">
        {/* PLAYER PROFILE FORM */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Player Identity</h2>
              <p className="text-xs text-slate-400">
                Your character name and appearance in HeartBLink messenger.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Avatar Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                Choose Your Avatar Icon
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {AVATAR_OPTIONS.map((opt) => {
                  const isSelected = avatar === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAvatar(opt.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500 text-white ring-2 ring-rose-500/30'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${opt.bg} flex items-center justify-center text-2xl shadow-md`}>
                        {opt.emoji}
                      </div>
                      <span className="text-[11px] text-center font-medium leading-tight">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Player Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                  Player / Protagonist Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Haru, Min-jun, Noah..."
                  maxLength={30}
                  required
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                />
              </div>

              {/* Pronouns */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                  Preferred Pronouns / Reference
                </label>
                <select
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                >
                  <option value="He/Him">He / Him (Traditional BL)</option>
                  <option value="They/Them">They / Them</option>
                  <option value="She/Her">She / Her</option>
                  <option value="Any">Any / No Preference</option>
                </select>
              </div>
            </div>

            {/* Persona Details */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                Player Notes (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="e.g. Design student with a sharp wit, easily flustered when caught off guard..."
                maxLength={300}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-rose-950/50 cursor-pointer"
              >
                {profileSavedStatus ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                {profileSavedStatus ? 'Profile Saved!' : 'Save Profile Changes'}
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-400 hover:text-white text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* DATA MANAGEMENT / RESET */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-slate-400" />
            Game State & Storage Management
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All chat histories, character progress, and relationship scores are stored locally in your browser offline.
          </p>
          <div className="pt-2">
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-rose-400 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/50 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset Game Data & Restore Default Characters
              </button>
            ) : (
              <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl space-y-2">
                <p className="text-xs text-rose-300 font-medium">
                  Are you sure? This will reset all character chats and relationship points to their default state.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetAllData();
                      setShowResetConfirm(false);
                    }}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg hover:bg-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
