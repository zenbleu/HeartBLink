import React, { useState } from 'react';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle, 
  ExternalLink, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Trash2, 
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';
import { API_KEY_STORAGE_KEY } from '../services/gemini';

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
  apiKey,
  onSaveApiKey,
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

  // API Key state
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [keySavedStatus, setKeySavedStatus] = useState(false);
  const [profileSavedStatus, setProfileSavedStatus] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    onSaveApiKey(inputKey.trim());
    setKeySavedStatus(true);
    setTimeout(() => setKeySavedStatus(false), 2500);
  };

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
    }, 900);
  };

  const handleClearKey = () => {
    setInputKey('');
    onSaveApiKey('');
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
              Customize your persona and configure your Gemini API Key
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
        {/* CRITICAL ADDITION: SECURE API SETTINGS INPUT SECTION */}
        <section className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/70 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  Gemini API Key Settings
                  {apiKey ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                      <ShieldCheck className="w-3.5 h-3.5" /> Ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-950/80 text-rose-400 border border-rose-800/50">
                      <AlertCircle className="w-3.5 h-3.5" /> Key Required
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your personal key powers the BL characters' intelligent dialogue and affection scoring.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveApiKey} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                Google AI Studio API Key
              </label>
              <div className="relative flex items-center">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Paste your AI Studio API key here (AIzaSy...)"
                  className="w-full pl-4 pr-24 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-200 transition-colors"
                  title={showKey ? 'Mask API key' : 'Show API key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-rose-950/50 cursor-pointer"
                >
                  {keySavedStatus ? <Check className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                  {keySavedStatus ? 'Key Saved to Storage!' : 'Save Key'}
                </button>

                {inputKey && (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    className="px-3 py-2.5 text-slate-400 hover:text-rose-400 text-xs font-medium transition-colors"
                  >
                    Clear Key
                  </button>
                )}
              </div>

              {keySavedStatus && (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 animate-fade-in">
                  <Check className="w-4 h-4" /> Successfully saved to localStorage
                </span>
              )}
            </div>
          </form>

          {/* Guide to Get a Free Key */}
          <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between text-rose-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-400" />
                How to get your free Google AI Studio API Key:
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 underline underline-offset-2"
              >
                Open Google AI Studio <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 leading-relaxed">
              <li>Log in to <strong className="text-slate-200">Google AI Studio</strong> with any standard Google account.</li>
              <li>Click on the blue <strong className="text-slate-200">"Get API key"</strong> button.</li>
              <li>Click <strong className="text-slate-200">"Create API key"</strong> in a new or existing Cloud project.</li>
              <li>Copy the generated key, paste it into the field above, and click <strong className="text-rose-400">Save Key</strong>.</li>
            </ol>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
              * Your key is stored solely in your local browser's <code className="text-slate-400 font-mono">localStorage</code>. It is never logged or shared externally.
            </p>
          </div>
        </section>

        {/* PLAYER PROFILE FORM */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Player Identity & Persona</h2>
              <p className="text-xs text-slate-400">
                The characters will tailor their romance, banter, and reactions based on this information.
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
                Persona & Personality Quirks (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="e.g. Sarcastic college student who loves stray cats, hides a sweet heart behind eye rolls, never backs down from a dare..."
                maxLength={300}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
              />
              <p className="text-[11px] text-slate-500">
                Injected into the character prompts so they reference your personality traits during conversation.
              </p>
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
            All your chat messages, created custom characters, and relationship points are saved locally in your browser.
          </p>
          <div className="pt-2">
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-rose-400 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/50 rounded-xl transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset Game Data & Restore Default Characters
              </button>
            ) : (
              <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl space-y-2">
                <p className="text-xs text-rose-300 font-medium">
                  Are you sure? This will reset all character chats and relationship points to defaults. (Your API key is kept safe).
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetAllData();
                      setShowResetConfirm(false);
                    }}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg"
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg hover:bg-slate-700"
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
