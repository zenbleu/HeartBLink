import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Heart, 
  UserPlus, 
  HelpCircle, 
  Dice5, 
  Layers, 
  MessageSquare,
  Flame,
  Check
} from 'lucide-react';
import { ARCHETYPES, RELATIONSHIP_DYNAMICS } from '../data/initialCharacters';

const SCENARIO_PRESETS = [
  'Waking up together with handcuffs on after a chaotic bachelor party.',
  'Stuck inside the office elevator late after midnight blackout.',
  'Sharing the only single bed in a snowed-in mountain cabin.',
  'Hired as a contract fake boyfriend for a high-society family wedding.',
  'Caught together under a tiny umbrella in a sudden downpour.',
  'Rival team captain cornering you in the locker room after the championship match.'
];

const AVATAR_COLOR_PRESETS = [
  { id: 'c1', label: 'Midnight Indigo', gradient: 'from-slate-800 to-indigo-950', text: 'MI' },
  { id: 'c2', label: 'Emerald Forest', gradient: 'from-emerald-950 to-slate-900', text: 'EF' },
  { id: 'c3', label: 'Crimson Rose', gradient: 'from-rose-950 to-neutral-900', text: 'CR' },
  { id: 'c4', label: 'Royal Violet', gradient: 'from-purple-950 to-slate-900', text: 'RV' },
  { id: 'c5', label: 'Amber Sunset', gradient: 'from-amber-950 to-stone-900', text: 'AS' },
  { id: 'c6', label: 'Obsidian Black', gradient: 'from-neutral-900 to-black', text: 'OB' }
];

export default function CharacterWizard({ isOpen, onClose, onCreateCharacter }) {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [archetype, setArchetype] = useState(ARCHETYPES[0].label);
  const [customArchetype, setCustomArchetype] = useState('');
  const [dynamic, setDynamic] = useState(RELATIONSHIP_DYNAMICS[0].label);
  const [customDynamic, setCustomDynamic] = useState('');
  const [scenario, setScenario] = useState(SCENARIO_PRESETS[0]);
  const [firstMessage, setFirstMessage] = useState('');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [personality, setPersonality] = useState('');
  const [startingPoints, setStartingPoints] = useState(25);

  if (!isOpen) return null;

  const handleRandomizeScenario = () => {
    const random = SCENARIO_PRESETS[Math.floor(Math.random() * SCENARIO_PRESETS.length)];
    setScenario(random);
  };

  const handleQuickPresetFill = (type) => {
    if (type === 'ceo') {
      setName('Julian Sterling');
      setTagline('Sterling Industries Managing Partner');
      setArchetype('Overprotective CEO');
      setDynamic('Fake Dating to Real Love');
      setScenario('Attending a high-stakes charity banquet where board members are evaluating his personal stability.');
      setPersonality('Commands respect with cold precision, but loses his composure whenever you smile at anyone else.');
      setFirstMessage("My chauffeur is waiting downstairs. Don't forget: as far as this room is concerned tonight, you are completely mine.");
      setAvatarIndex(0);
    } else if (type === 'senior') {
      setName('Min-woo Kang');
      setTagline('Senior Surgeon & Chief Resident');
      setArchetype('Grumpy Senior / Tsundere');
      setDynamic('Rivals to Lovers');
      setScenario('On 24-hour hospital night shift duty together in the quiet resident call room.');
      setPersonality('Exhausted, sharply observant, masks his deep protective affection behind sarcastic comments and warm canned coffee.');
      setFirstMessage("I told you to go sleep an hour ago. Do I need to physically drag you to the breakroom bunk myself?");
      setAvatarIndex(1);
    } else if (type === 'sunshine') {
      setName('Riku Asano');
      setTagline('Junior Graphic Designer & Puppy-dog Colleague');
      setArchetype('Soft Sunshine / Golden Retriever');
      setDynamic('Forced Proximity / Roommates');
      setScenario('Tangled up together folding laundry on the apartment living room floor.');
      setPersonality('Beaming smile, easily flustered, wears his feelings openly on his sleeve, always leaves sweet sticky notes on your monitor.');
      setFirstMessage("Look what I found in the grocery bag! Your favorite matcha pudding! You had such a long day, you deserve a treat~ ✨");
      setAvatarIndex(4);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalArchetype = archetype === 'Other' && customArchetype.trim() ? customArchetype.trim() : archetype;
    const finalDynamic = dynamic === 'Other' && customDynamic.trim() ? customDynamic.trim() : dynamic;
    const finalFirstMsg = firstMessage.trim() || `Hey... are you free to talk right now?`;

    const initials = name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'BL';

    const selectedColor = AVATAR_COLOR_PRESETS[avatarIndex];

    const newChar = {
      id: `char-custom-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || finalArchetype,
      archetype: finalArchetype,
      dynamic: finalDynamic,
      scenario: scenario.trim(),
      personality: personality.trim() || `Complex and captivating ${finalArchetype}`,
      bio: `${finalArchetype} • ${finalDynamic}`,
      points: startingPoints,
      avatarColor: selectedColor.gradient,
      avatarText: initials,
      avatarUrl: avatarUrl.trim() || null,
      status: 'online',
      lastSeen: 'Active now',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'char',
          text: finalFirstMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          pointsAwarded: 0
        }
      ]
    };

    onCreateCharacter(newChar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Create Custom BL Character
                <Sparkles className="w-4 h-4 text-rose-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Design a custom love interest with personalized tropes, dynamic, and scenario.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Inspiration Presets */}
        <div className="px-6 pt-4 pb-1 bg-slate-950/40 border-b border-slate-800/60 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-400" /> Quick Templates:
          </span>
          <button
            type="button"
            onClick={() => handleQuickPresetFill('ceo')}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            👔 Cold CEO
          </button>
          <button
            type="button"
            onClick={() => handleQuickPresetFill('senior')}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            🩺 Grumpy Senior
          </button>
          <button
            type="button"
            onClick={() => handleQuickPresetFill('sunshine')}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            ☀️ Sunshine Roommate
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Name & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                Character Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Killian, Ren, Asher..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                Title / Occupation Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g., Vance Corp CEO, Sharp Architect..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
            </div>
          </div>

          {/* Archetype / Trope */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
              Archetype & Tropes
            </label>
            <select
              value={archetype}
              onChange={(e) => setArchetype(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            >
              {ARCHETYPES.map((a) => (
                <option key={a.id} value={a.label}>
                  {a.label} — {a.desc}
                </option>
              ))}
              <option value="Other">Custom Archetype...</option>
            </select>
            {archetype === 'Other' && (
              <input
                type="text"
                value={customArchetype}
                onChange={(e) => setCustomArchetype(e.target.value)}
                placeholder="Describe your custom trope (e.g., Possessive Knight, Seductive Hacker)..."
                className="w-full mt-2 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100"
              />
            )}
          </div>

          {/* Relationship Dynamic */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
              Relationship Dynamic
            </label>
            <select
              value={dynamic}
              onChange={(e) => setDynamic(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            >
              {RELATIONSHIP_DYNAMICS.map((d) => (
                <option key={d.id} value={d.label}>
                  {d.label} — {d.desc}
                </option>
              ))}
              <option value="Other">Custom Dynamic...</option>
            </select>
            {dynamic === 'Other' && (
              <input
                type="text"
                value={customDynamic}
                onChange={(e) => setCustomDynamic(e.target.value)}
                placeholder="Describe custom dynamic (e.g., Bodyguard & Prince, Mafia Rival)..."
                className="w-full mt-2 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100"
              />
            )}
          </div>

          {/* Initial Scenario */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                Initial Scenario / Setup
              </label>
              <button
                type="button"
                onClick={handleRandomizeScenario}
                className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <Dice5 className="w-3.5 h-3.5" /> Randomize
              </button>
            </div>
            <textarea
              rows={2}
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="e.g., Waking up together with handcuffs on after a wild night..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
            />
          </div>

          {/* Opening Message */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
              Character's First In-Game Message
            </label>
            <input
              type="text"
              value={firstMessage}
              onChange={(e) => setFirstMessage(e.target.value)}
              placeholder="e.g., Did you really think you could avoid me after what happened yesterday?"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>

          {/* Personality / Demeanor */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
              Personality & Behavior Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="e.g. Sarcastic, hides jealousy poorly, protective of physical space, raspy low voice..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
            />
          </div>

          {/* Avatar Color Palette Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
              Avatar Aura & Palette
            </label>
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              {AVATAR_COLOR_PRESETS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setAvatarIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                    avatarIndex === idx
                      ? 'bg-rose-950/40 border-rose-500 text-white ring-1 ring-rose-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${p.gradient}`} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Starting Relationship Points */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium uppercase tracking-wider">Starting Relationship Points:</span>
              <span className="font-bold text-rose-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> {startingPoints}/100
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={startingPoints}
              onChange={(e) => setStartingPoints(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0 (Cold / Strangers)</span>
              <span>25 (Curious)</span>
              <span>60 (Pre-established Crush)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-medium rounded-xl text-sm shadow-lg shadow-rose-950/50 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Create & Start Chatting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
