export interface Message {
  id: string;
  sender: 'user' | 'char';
  text: string;
  timestamp: string;
  pointsAwarded?: number;
  reaction?: string;
  reason?: string;
  storyBeat?: boolean;
}

export interface Character {
  id: string;
  name: string;
  tagline?: string;
  archetype: string;
  dynamic: string;
  scenario: string;
  personality?: string;
  bio?: string;
  points: number;
  avatarColor?: string;
  avatarText?: string;
  avatarUrl?: string | null;
  status?: string;
  lastSeen?: string;
  messages: Message[];
}

export interface PlayerProfile {
  name: string;
  pronouns: string;
  details: string;
  avatar: string;
}
