/**
 * Initial cast of BL characters with rich lore, dynamic backstories,
 * distinct aesthetics, and initial scenarios for offline play.
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
