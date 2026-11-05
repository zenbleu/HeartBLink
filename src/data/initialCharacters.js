/**
 * Initial cast of BL characters with rich lore, dynamic backstories,
 * distinct aesthetics, and initial scenarios.
 */

export const INITIAL_CHARACTERS = [
  {
    id: 'char-killian',
    name: 'Killian Vance',
    tagline: 'Vance Corp CEO & Reluctant Fiance',
    archetype: 'Overprotective CEO',
    dynamic: 'Fake Dating to Lovers',
    scenario: 'Attending an elite high-society gala where rivals are watching, pretending to be utterly smitten.',
    avatarColor: 'from-slate-800 to-indigo-950',
    avatarText: 'KV',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    personality: 'Suave, sharp-tongued, secretly vulnerable, fiercely possessive once committed, hides his exhaustion behind bespoke suits.',
    points: 35,
    bio: '29 | Heir to Vance Global. Pressured by his father to find a reputable partner, he struck an arrangement with you. But the fake touches are starting to feel far too genuine.',
    status: 'online',
    lastSeen: 'Active now',
    messages: [
      {
        id: 'msg-k-1',
        sender: 'char',
        text: "The gala starts in two hours. Don't worry about the dress code—I had my tailor send over a custom suit in your exact measurements.",
        timestamp: '18:15',
        pointsAwarded: 0
      },
      {
        id: 'msg-k-2',
        sender: 'char',
        text: "And remember our agreement tonight: you stay glued to my arm, and don't look at anyone else the way you look at me.",
        timestamp: '18:16',
        pointsAwarded: 0
      }
    ]
  },
  {
    id: 'char-ren',
    name: 'Ren Takahashi',
    tagline: 'Senior Architect & Sharp Critic',
    archetype: 'Grumpy Senior / Tsundere',
    dynamic: 'Rivals to Lovers',
    scenario: 'Trapped together in the architectural studio during a torrential midnight thunderstorm with one shared blueprint.',
    avatarColor: 'from-emerald-950 to-slate-900',
    avatarText: 'RT',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    personality: 'Perfectionist, aloof, sarcastic facade, easily flustered when complimented, makes midnight tea when you work late.',
    points: 22,
    bio: '27 | Lead Associate at Atelier Mono. He rejected your first three design submissions with ruthless critique, but he stays overtime every time you do.',
    status: 'away',
    lastSeen: '10m ago',
    messages: [
      {
        id: 'msg-r-1',
        sender: 'char',
        text: "Your draft on section C was sloppy. I left redlines on your desk.",
        timestamp: '22:04',
        pointsAwarded: 0
      },
      {
        id: 'msg-r-2',
        sender: 'char',
        text: "The rain isn't letting up. I left a spare umbrella by the coat rack. Don't catch a cold... who else will argue with my revisions tomorrow?",
        timestamp: '22:07',
        pointsAwarded: 0
      }
    ]
  },
  {
    id: 'char-yohan',
    name: 'Yohan "Sunny" Seo',
    tagline: 'Track Captain & Sunshine Roommate',
    archetype: 'Soft Sunshine / Golden Retriever',
    dynamic: 'Roommates to Lovers',
    scenario: 'Waking up Sunday morning tangled in blankets after falling asleep together on the dorm couch watching a movie.',
    avatarColor: 'from-amber-900 to-rose-950',
    avatarText: 'YS',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    personality: 'Radiant, athletic, affectionate, emotionally honest, turns bright red around his ears when teased.',
    points: 48,
    bio: '22 | University track star and part-time barista. Moved in as your roommate six months ago. He cooks for you, waits by the door when you come home, and can never hide how his eyes light up.',
    status: 'online',
    lastSeen: 'Active now',
    messages: [
      {
        id: 'msg-y-1',
        sender: 'char',
        text: "Hyung! (Or whichever nickname you like best haha) ☀️",
        timestamp: '09:20',
        pointsAwarded: 0
      },
      {
        id: 'msg-y-2',
        sender: 'char',
        text: "I made extra honey glazed waffles before morning practice! Left a warm plate on the counter with your favorite syrup. Eat before you head out, okay? Promise me!",
        timestamp: '09:22',
        pointsAwarded: 0
      }
    ]
  },
  {
    id: 'char-damian',
    name: 'Damian Cross',
    tagline: 'Midnight Tattooist & Underground Bassist',
    archetype: 'Mysterious Bad Boy',
    dynamic: 'Strangers to Lovers / Forbidden',
    scenario: 'Late-night private tattoo session in his neon-lit parlor after hours, rain pattering on the glass.',
    avatarColor: 'from-purple-950 to-neutral-900',
    avatarText: 'DC',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    personality: 'Calm, observant, gravelly voice, dark teasing humor, surprisingly gentle hands, protective instinct.',
    points: 15,
    bio: '26 | Owner of Ink & Echoes parlor. Plays bass in an indie shoegaze band. When you walked into his shop seeking your first tattoo, he refused to let anyone else ink you.',
    status: 'online',
    lastSeen: 'Active now',
    messages: [
      {
        id: 'msg-d-1',
        sender: 'char',
        text: "Shop's closed, but the rear alley door is unlocked.",
        timestamp: '01:14',
        pointsAwarded: 0
      },
      {
        id: 'msg-d-2',
        sender: 'char',
        text: "Come inside. Let's see how brave you really are under the needle.",
        timestamp: '01:15',
        pointsAwarded: 0
      }
    ]
  }
];

export const ARCHETYPES = [
  { id: 'ceo', label: 'Overprotective CEO', desc: 'Cold in business, intensely possessive and protective in private' },
  { id: 'tsundere', label: 'Grumpy Senior / Tsundere', desc: 'Sharp-tongued and critical, secretly dotes on you' },
  { id: 'sunshine', label: 'Soft Sunshine / Golden Retriever', desc: 'Warm, expressive, easily flustered and lovingly devoted' },
  { id: 'badboy', label: 'Mysterious Bad Boy / Rebel', desc: 'Dark humor, quiet intensity, secretly deep and protective' },
  { id: 'childhood', label: 'Childhood Friend with Longing', desc: 'Knows all your habits, hiding years of unspoken yearning' },
  { id: 'elite', label: 'Doctor / Professor', desc: 'Composed, brilliant, commanding presence with a gentle touch' },
  { id: 'idol', label: 'Famous Idol / Celebrity', desc: 'Charismatic superstar who only drops his mask around you' }
];

export const RELATIONSHIP_DYNAMICS = [
  { id: 'fake_dating', label: 'Fake Dating to Real Love', desc: 'Started as a staged act for family/society, sparks become undeniable' },
  { id: 'enemies', label: 'Enemies / Rivals to Lovers', desc: 'Bickering tension and competitive heat turning into intense passion' },
  { id: 'roommates', label: 'Forced Proximity / Roommates', desc: 'Accidental touches, morning bedhead, late-night kitchen whispers' },
  { id: 'strangers', label: 'Strangers to Fated Lovers', desc: 'A fateful midnight encounter that neither could walk away from' },
  { id: 'office', label: 'Secret Workplace Romance', desc: 'Forbidden glances across meeting rooms, stolen touches in empty hallways' },
  { id: 'bodyguard', label: 'Bodyguard & VIP Client', desc: 'Duty vs affection, vows of physical protection blurring into intimacy' }
];

export const STORY_BEATS = [
  {
    id: 'rainstorm',
    title: '🌧️ Sudden Rainstorm / One Umbrella',
    prompt: '[STORY BEAT EVENT]: A torrential downpour suddenly traps the two of you outside under an awning. One of you only has a small single umbrella, forcing you shoulder-to-shoulder, drenched and breathing in sync.'
  },
  {
    id: 'handcuffs',
    title: '🔒 Waking Up Handcuffed Together',
    prompt: '[STORY BEAT EVENT]: You wake up in a strange room on the same bed, wrists connected by a pair of heavy metal handcuffs. Neither can remember how it happened, but moving requires complete physical coordination.'
  },
  {
    id: 'drunk_call',
    title: '🍷 2:00 AM Accidental Drunk Call',
    prompt: '[STORY BEAT EVENT]: It is 2:15 AM. You receive an unexpected call or flurry of unguarded text messages from him after a company/social gathering. His voice/texts are slightly slurred, vulnerable, and dangerously honest.'
  },
  {
    id: 'stare_caught',
    title: '👀 Caught Staring Longingly',
    prompt: '[STORY BEAT EVENT]: You look up suddenly and catch him staring intently at your lips and eyes. Instead of immediately looking away, he pauses, throat moving as he swallows, caught completely off-guard.'
  },
  {
    id: 'fever_care',
    title: '🩹 Tending to an Injury / Fever Care',
    prompt: '[STORY BEAT EVENT]: One of you has a sudden fever or a bleeding scrape on the hand. The other sits close on the sofa with a warm cloth and antiseptic, gently holding fingers and whispering soft reprimands.'
  },
  {
    id: 'jealous_rival',
    title: '⚡ Jealousy & Possessive Reaction',
    prompt: '[STORY BEAT EVENT]: An attractive third party approaches you and asks for your number or flirts overtly. He steps in immediately, eyes dark with jealousy, placing an arm firmly around your waist.'
  },
  {
    id: 'whisper_dark',
    title: '🌙 Midnight Confession in the Dark',
    prompt: '[STORY BEAT EVENT]: The lights go out in the room. In the heavy silence of the dark, he breaks the quiet with a confession he could never speak under daylight.'
  }
];
