/**
 * Gemini AI Service for HeartBLink: BL Dating Simulation Game
 * Dynamically queries Google Gemini using the player's saved API key.
 * Formats character instructions, parses hidden affection scores, and manages chat context.
 */

// Key used in localStorage for the user-configured API key
export const API_KEY_STORAGE_KEY = 'heartblink_gemini_api_key';

/**
 * Retrieve the active Gemini API key from localStorage or env fallback.
 */
export function getStoredApiKey() {
  if (typeof window === 'undefined') return '';
  try {
    const raw = window.localStorage.getItem(API_KEY_STORAGE_KEY);
    if (raw) {
      // If saved via JSON.stringify or raw text
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'string' && parsed.trim().length > 0) {
          return parsed.trim();
        }
      } catch {
        if (raw.trim().length > 0) return raw.trim();
      }
    }

    // Alternative common key fallback
    const alt = window.localStorage.getItem('gemini_api_key');
    if (alt && alt.trim().length > 0) {
      try {
        const parsedAlt = JSON.parse(alt);
        if (typeof parsedAlt === 'string' && parsedAlt.trim().length > 0) return parsedAlt.trim();
      } catch {
        return alt.trim();
      }
    }

    // Fallback to Vite environment variable if configured during build/dev
    const envKey = import.meta.env?.VITE_GEMINI_API_KEY;
    if (typeof envKey === 'string' && envKey.trim().length > 0) {
      return envKey.trim();
    }
  } catch (err) {
    console.error('Failed reading API key from localStorage:', err);
  }
  return '';
}

/**
 * Regex parser to extract the hidden JSON payload block at the end of the reply
 * e.g., "I was waiting for your text all day. |||{"points": 5, "reaction": "flustered", "reason": "loved your sweet reply"}|||"
 */
export function parseResponseWithScore(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return {
      cleanMessage: "...",
      pointsDelta: 1,
      reaction: 'neutral',
      reason: 'Standard response'
    };
  }

  let cleanMessage = rawText;
  let pointsDelta = 2; // Default slight positive progression
  let reaction = 'engaged';
  let reason = 'Appreciated the conversation';

  // Match |||{...}||| pattern first
  const pipeRegex = /\|{3}\s*(\{[\s\S]*?\})\s*\|{3}/;
  const matchPipe = rawText.match(pipeRegex);

  if (matchPipe) {
    try {
      const parsed = JSON.parse(matchPipe[1]);
      if (typeof parsed.points === 'number' && !isNaN(parsed.points)) {
        pointsDelta = Math.max(-10, Math.min(15, Math.round(parsed.points)));
      }
      if (parsed.reaction) reaction = String(parsed.reaction);
      if (parsed.reason) reason = String(parsed.reason);
    } catch (e) {
      console.warn('Failed parsing JSON payload inside triple pipes:', e);
    }
    cleanMessage = rawText.replace(pipeRegex, '').trim();
  } else {
    // Fallback regex looking for standalone json block with "points"
    const fallbackRegex = /```(?:json)?\s*(\{[\s\S]*?"points"[\s\S]*?\})\s*```/i;
    const matchFallback = rawText.match(fallbackRegex);
    if (matchFallback) {
      try {
        const parsed = JSON.parse(matchFallback[1]);
        if (typeof parsed.points === 'number' && !isNaN(parsed.points)) {
          pointsDelta = Math.max(-10, Math.min(15, Math.round(parsed.points)));
        }
        if (parsed.reaction) reaction = String(parsed.reaction);
        if (parsed.reason) reason = String(parsed.reason);
      } catch (e) {
        console.warn('Failed parsing fallback JSON block:', e);
      }
      cleanMessage = rawText.replace(fallbackRegex, '').trim();
    } else {
      // Last-chance regex for trailing {"points": N}
      const inlineRegex = /\{"points"\s*:\s*(-?\d+)[^}]*\}/;
      const matchInline = rawText.match(inlineRegex);
      if (matchInline) {
        const num = parseInt(matchInline[1], 10);
        if (!isNaN(num)) pointsDelta = Math.max(-10, Math.min(15, num));
        cleanMessage = rawText.replace(inlineRegex, '').trim();
      }
    }
  }

  // Final cleanup of lingering delimiters
  cleanMessage = cleanMessage.replace(/\|{3}/g, '').trim();

  return {
    cleanMessage: cleanMessage || "...",
    pointsDelta,
    reaction,
    reason
  };
}

/**
 * Builds the strict System Instruction block tailoring the AI to roleplay as the BL character.
 */
export function buildSystemInstruction(character, playerProfile) {
  const currentPoints = Math.max(0, Math.min(100, character.points || 0));
  
  let intimacyLevel = 'Guarded / Reserved';
  if (currentPoints > 80) {
    intimacyLevel = 'Deeply in Love / Highly Devoted / Passionate';
  } else if (currentPoints > 60) {
    intimacyLevel = 'Strong Mutual Attraction / Tender Jealousy / Yearning';
  } else if (currentPoints > 40) {
    intimacyLevel = 'Flustered / Developing Strong Feelings / Easily Teased';
  } else if (currentPoints > 20) {
    intimacyLevel = 'Curious / Playful / Softening Guard';
  }

  return `You are roleplaying in "HeartBLink", a high-end Boy Love (BL) dating simulation visual novel messenger.

CHARACTER YOU ARE ROLEPLAYING:
- Name: ${character.name}
- Archetype & Tropes: ${character.archetype}
- Relationship Dynamic: ${character.dynamic}
- Current Initial Scenario / Context: ${character.scenario}
- Personality & Demeanor: ${character.personality || character.tagline}
- Detailed Bio / Background: ${character.bio || ''}

PLAYER (YOUR LOVE INTEREST) PROFILE:
- Player Name: ${playerProfile?.name || 'MC'}
- Player Persona / Details: ${playerProfile?.details || 'A captivating, sincere person who caught your attention'}
- Player Pronouns / Preference: ${playerProfile?.pronouns || 'He/Him'}

CURRENT RELATIONSHIP STATUS:
- Intimacy Points: ${currentPoints}/100
- Affection Tier: ${intimacyLevel}

ROLEPLAYING & MESSAGING RULES:
1. Speak in the realistic format of mobile chat messaging (Line / WhatsApp / KakaoTalk).
2. Keep replies natural, immersive, and reactive—typically 1 to 3 short texting chunks or a concise paragraph. Never write a giant essay.
3. Stay strictly in character for your archetype (${character.archetype}).
   - If an Overprotective CEO: Compose your words with quiet authority, possessiveness, and sudden moments of genuine tenderness.
   - If Grumpy / Tsundere: Act sarcastic or exasperated, but betray your genuine worry and blush.
   - If Soft Sunshine: Use bright, caring words, affectionate exclamation points, worry about them eating/sleeping, get flustered easily.
   - If Bad Boy / Rebel: Tease with lazy confidence, husky undertones, and protective instincts.
4. React authentically to what the player texts. If they flirt well, let your character feel flustered or bold. If they are cold or teasing, push back or show longing.
5. You may use asterisks sparingly for texting actions/emotes if fitting (e.g., *sighs*, *reads message twice*, *typing fast*).

MANDATORY LOGIC FLAG (STRICT SCORING REQUIREMENT):
At the VERY END of every response, you MUST append a hidden JSON payload block enclosed in triple pipes:
|||{"points": X, "reaction": "one_word_emotion", "reason": "brief reason"}|||

Where:
- X is an integer between -5 and +10 reflecting how the player's text affected your affection points:
  * +5 to +10: Heart-melting, witty flirting, vulnerable confession, or deeply touching reply.
  * +2 to +4: Warm, friendly, supportive, or playful message.
  * 0 to +1: Neutral answer or small talk.
  * -1 to -5: Cold, dismissive, insulting, or deliberately hurtful message.
- "reaction": A descriptive emotional word (e.g., "blushing", "flustered", "smirking", "pouting", "intrigued", "protective", "heartstruck", "sulking").
- "reason": A 3-6 word explanation (e.g., "loved your boldness", "caught off guard by your compliment", "wants to hold you").

Example of your full response output:
Did you really think I wouldn't notice you skipping lunch again? Don't make me leave this executive meeting just to bring you soup. Stay put.
|||{"points": 6, "reaction": "protective", "reason": "worried but secretly affectionate"}|||

DO NOT forget the |||{"points": X, ...}||| block at the very end!`;
}

/**
 * Sends conversation history to Gemini API using standard fetch
 * dynamically pulling the user's API key from localStorage.
 * 
 * @param {Object} params
 * @param {any} params.character
 * @param {any} params.playerProfile
 * @param {any[]} params.messageHistory
 * @param {string} params.newUserMessage
 * @param {string | null} [params.storyBeatPrompt]
 */
export async function sendChatMessage({
  character,
  playerProfile,
  messageHistory,
  newUserMessage,
  storyBeatPrompt = null
}) {
  const apiKey = getStoredApiKey();

  if (!apiKey) {
    throw new Error('Please configure your Gemini API Key in Settings to chat.');
  }

  const systemInstruction = buildSystemInstruction(character, playerProfile);

  // Format message history for Gemini's contents structure
  const contents = [];

  // Add previous messages (up to last 12 to maintain rich context and stay responsive)
  const recentHistory = (messageHistory || []).slice(-12);
  for (const msg of recentHistory) {
    if (msg.sender === 'user') {
      contents.push({
        role: 'user',
        parts: [{ text: msg.text }]
      });
    } else if (msg.sender === 'char') {
      contents.push({
        role: 'model',
        parts: [{ text: msg.text }]
      });
    }
  }

  // Construct current turn
  let finalUserText = newUserMessage;
  if (storyBeatPrompt) {
    finalUserText = `${storyBeatPrompt}\n\n[Player Response]: ${newUserMessage}`;
  }

  contents.push({
    role: 'user',
    parts: [{ text: finalUserText }]
  });

  // Call the official Gemini REST endpoint (using valid gemini-2.5-flash or gemini-3.8-flash)
  const modelsToTry = ['gemini-2.5-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: contents,
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.85
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errMsg = errorData?.error?.message || `HTTP ${response.status} ${response.statusText}`;
        
        // If 404 on model name, try next model
        if (response.status === 404) {
          lastError = new Error(`Model ${modelName} not found: ${errMsg}`);
          continue;
        }

        // If 400 or 403 API key error
        if (response.status === 400 || response.status === 403) {
          if (errMsg.toLowerCase().includes('api_key') || errMsg.toLowerCase().includes('key not valid')) {
            throw new Error('Your Gemini API Key is invalid or expired. Please update it in Profile > API Settings.');
          }
        }

        throw new Error(errMsg);
      }

      const data = await response.json();
      const candidate = data?.candidates?.[0];
      const rawReply = candidate?.content?.parts?.[0]?.text;

      if (!rawReply) {
        throw new Error('No response was generated by the character. Please try sending your message again.');
      }

      // Parse the reply to separate clean text and relationship score
      const parsed = parseResponseWithScore(rawReply);
      return parsed;
    } catch (err) {
      lastError = err;
      if (err.message?.includes('API Key is invalid') || err.message?.includes('Please configure your Gemini API Key')) {
        throw err;
      }
    }
  }

  throw lastError || new Error('Failed to communicate with Gemini API. Please check your network and API Key.');
}
