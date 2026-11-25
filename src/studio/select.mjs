import { hashString } from '../util.mjs';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'app', 'application', 'as', 'at', 'be', 'build', 'by', 'for',
  'from', 'in', 'into', 'is', 'it', 'mobile', 'my', 'of', 'on', 'or', 'our', 'that',
  'the', 'their', 'this', 'to', 'with', 'without', 'want', 'wants', 'using', 'use',
  'need', 'needs', 'people', 'users', 'user', 'make', 'makes', 'new', 'native',
]);

const DARK_VARIANTS = new Set([
  'flight-deck',
  'nightclub',
  'meditation-timer',
  'arcade',
  'concierge',
  'film-festival',
]);

// Gentle, child-facing briefs should not land on a news front page, a neon
// arcade, or a trading desk just because the seed hash broke a tie.
const GENTLE_WORDS = ['gentle', 'soft', 'bedtime', 'calm', 'quiet', 'child', 'storybook'];
const GENTLE_VARIANTS = new Set([
  'literary-journal',
  'morning-pages',
  'meditation-timer',
  'sticker-album',
  'toy-box',
  'field-notes',
]);
const LOUD_VARIANTS = new Set(['broadsheet', 'arcade', 'nightclub', 'flight-deck', 'trading-desk']);

const DARK_WORDS = new Set(['dark', 'night', 'midnight', 'evening', 'nocturnal', 'after-dark']);
const LIGHT_WORDS = new Set(['light', 'daylight', 'daytime', 'sunny', 'paper', 'white']);

const TONES = [
  {
    id: 'warm',
    words: ['warm', 'cozy', 'cosy', 'earthy', 'rustic', 'autumn', 'food', 'kitchen', 'market', 'craft', 'handmade', 'hearth', 'home', 'cooking', 'recipe'],
  },
  {
    id: 'cool',
    words: ['cool', 'blue', 'ocean', 'lake', 'tech', 'technical', 'precise', 'clinical', 'night', 'sky', 'water', 'transit', 'instrument'],
  },
  {
    id: 'natural',
    words: ['natural', 'nature', 'organic', 'garden', 'plant', 'farm', 'sustainable', 'green', 'wellness', 'seasonal', 'soil', 'outdoors'],
  },
  {
    id: 'bold',
    words: ['bold', 'loud', 'vibrant', 'electric', 'energetic', 'playful', 'fun', 'sport', 'arcade', 'neon', 'expressive', 'memorable'],
  },
  {
    id: 'quiet',
    words: ['quiet', 'premium', 'luxury', 'refined', 'minimal', 'calm', 'editorial', 'considered', 'calm', 'serene', 'spacious'],
  },
];

const CONTENT_CUES = [
  { families: ['instrument', 'utility'], words: ['dashboard', 'analytics', 'metrics', 'numbers', 'data', 'budget', 'expense', 'finance', 'money', 'invoice', 'accounting', 'spreadsheet', 'report', 'calculator', 'measure'], weight: 2 },
  { families: ['cinematic', 'spatial', 'luxe'], words: ['photo', 'photos', 'image', 'images', 'video', 'visual', 'gallery', 'poster', 'camera', 'photography'], weight: 1.5 },
  { families: ['ritual', 'organic', 'editorial'], words: ['calm', 'quiet', 'slow', 'gentle', 'reflective', 'mindful', 'wellness'], weight: 1.5 },
  { families: ['playground'], words: ['playful', 'fun', 'friends', 'social', 'community', 'crew', 'stickers', 'games', 'game', 'kids', 'child', 'toddler'], weight: 2 },
  { families: ['luxe'], words: ['premium', 'luxury', 'exclusive', 'boutique', 'hotel', 'resort', 'fashion', 'beauty', 'jewelry', 'dining'], weight: 2 },
  { families: ['civic'], words: ['public', 'government', 'city', 'civic', 'service', 'services', 'permit', 'benefits', 'voting', 'school', 'library', 'clinic', 'transit'], weight: 2 },
  { families: ['utility'], words: ['everyday', 'simple', 'quick', 'tool', 'tools', 'offline', 'weather', 'files', 'notes', 'scanner', 'settings', 'reminder'], weight: 2 },
  { families: ['organic'], words: ['food', 'recipe', 'cooking', 'garden', 'plant', 'farm', 'market', 'seasonal', 'harvest', 'sustainable'], weight: 2.5 },
  { families: ['spatial'], words: ['map', 'maps', 'travel', 'trip', 'route', 'trail', 'nearby', 'local', 'location', 'outdoors', 'hiking', 'neighborhood'], weight: 2.5 },
  { families: ['editorial'], words: ['read', 'reading', 'write', 'writing', 'book', 'books', 'news', 'article', 'articles', 'journal', 'magazine', 'story', 'stories'], weight: 2 },
  { families: ['cinematic'], words: ['film', 'movie', 'music', 'concert', 'show', 'event', 'events', 'theater', 'theatre', 'festival', 'streaming'], weight: 2 },
  { families: ['instrument'], words: ['trading', 'portfolio', 'investment', 'stock', 'crypto', 'operations', 'monitoring', 'engineering', 'logistics'], weight: 2.5 },
];

export function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function briefTokens(value) {
  return normalizeText(value)
    .split(' ')
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function stem(word) {
  if (word.length <= 3) return word;
  if (word.endsWith('ies') && word.length > 5) return `${word.slice(0, -3)}y`;
  if (word.endsWith('ing') && word.length > 5) return word.slice(0, -3);
  if (word.endsWith('ed') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

function termSet(value) {
  return new Set(briefTokens(value).map(stem));
}

function matchesTerm(normalized, term) {
  const phrase = normalizeText(term);
  if (!phrase) return false;
  if (phrase.includes(' ')) return ` ${normalized} `.includes(` ${phrase} `);
  const wanted = stem(phrase);
  for (const word of normalized.split(' ')) {
    if (word === phrase) return true;
    const got = stem(word);
    if (got === wanted) return true;
    if (wanted.length >= 5 && got.startsWith(wanted)) return true;
    if (got.length >= 5 && wanted.startsWith(got)) return true;
  }
  return false;
}

function scoreFamily(family, normalized) {
  const matched = [];
  let score = 0;
  for (const keyword of family.keywords) {
    if (matchesTerm(normalized, keyword)) {
      score += keyword.includes(' ') ? 3 : 2.25;
      matched.push(keyword);
    }
  }
  for (const feeling of family.feelings) {
    if (matchesTerm(normalized, feeling)) score += 0.5;
  }
  for (const avoided of family.avoidFor) {
    if (matchesTerm(normalized, avoided)) score -= 4;
  }
  // Cue lists include inflections (read/reading, story/stories). Score each
  // stem once so a single brief word cannot count two or three times.
  const seenCues = new Set();
  for (const cue of CONTENT_CUES) {
    if (!cue.families.includes(family.id)) continue;
    for (const word of cue.words) {
      const key = stem(normalizeText(word));
      if (seenCues.has(key)) continue;
      if (matchesTerm(normalized, word)) {
        seenCues.add(key);
        score += cue.weight;
        matched.push(word);
      }
    }
  }
  return { score, matched: [...new Set(matched)] };
}

function pickBySeed(items, seed, key) {
  return items
    .map((item) => ({ item, rank: hashString(`${seed}:${key}:${item.id}`) }))
    .sort((a, b) => a.rank - b.rank)[0].item;
}

function scoreVariant(variant, brief, normalized) {
  const words = termSet(brief);
  const variantWords = termSet(
    `${variant.name} ${variant.summary} ${variant.treatment} ${variant.signature} ${variant.id}`,
  );
  let score = 0;
  for (const word of words) {
    if (variantWords.has(word)) score += 1;
  }
  if (['dense', 'compact', 'fast', 'data', 'numbers', 'information'].some((word) => matchesTerm(normalized, word))) {
    if (variant.density === 'compact') score += 1.75;
  }
  if (['calm', 'slow', 'quiet', 'spacious', 'breathing'].some((word) => matchesTerm(normalized, word))) {
    if (variant.density === 'spacious') score += 1.75;
  }
  if (['dark', 'night', 'midnight', 'after dark', 'evening'].some((word) => matchesTerm(normalized, word))) {
    if (DARK_VARIANTS.has(variant.id)) score += 2;
  }
  if (['light', 'paper', 'white', 'daylight'].some((word) => matchesTerm(normalized, word))) {
    if (['gallery', 'laboratory', 'atelier', 'field-notes'].includes(variant.id)) score += 1.5;
  }
  if (['bold', 'loud', 'big'].some((word) => matchesTerm(normalized, word))) {
    score += Math.max(0, (variant.displaySize - 34) / 10);
  }
  if (['compact', 'dense'].some((word) => matchesTerm(normalized, word))) {
    score += Math.max(0, (40 - variant.displaySize) / 12);
  }
  if (GENTLE_WORDS.some((word) => matchesTerm(normalized, word))) {
    if (GENTLE_VARIANTS.has(variant.id)) score += 1.25;
    if (LOUD_VARIANTS.has(variant.id)) score -= 1.25;
  }
  return score;
}

function rgbFromHex(value) {
  const hex = String(value).replace('#', '');
  return {
    r: Number.parseInt(hex.slice(0, 2), 16) / 255,
    g: Number.parseInt(hex.slice(2, 4), 16) / 255,
    b: Number.parseInt(hex.slice(4, 6), 16) / 255,
  };
}

function hueSaturationLightness(hex) {
  const { r, g, b } = rgbFromHex(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;
  if (delta !== 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  const lightness = (max + min) / 2;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
  return { hue, saturation, lightness };
}

function preferredTones(brief) {
  const words = termSet(brief);
  const tones = [];
  for (const tone of TONES) {
    let score = 0;
    for (const word of tone.words) {
      if (words.has(stem(word))) score += 1;
    }
    if (score > 0) tones.push({ id: tone.id, score });
  }
  return tones.sort((a, b) => b.score - a.score);
}

function scoreAccent(accent, tones) {
  const { hue, saturation, lightness } = hueSaturationLightness(accent.light);
  let score = 0;
  for (const tone of tones) {
    const weight = tone.score;
    if (tone.id === 'warm' && (hue <= 55 || hue >= 330)) score += 2.4 * weight;
    if (tone.id === 'cool' && hue >= 175 && hue <= 285) score += 2.4 * weight;
    if (tone.id === 'natural' && hue >= 65 && hue <= 175) score += 2.4 * weight;
    if (tone.id === 'bold' && saturation >= 0.55) score += 2.1 * weight;
    if (tone.id === 'quiet' && saturation <= 0.5) score += 2.4 * weight;
    if (tone.id === 'quiet' && lightness <= 0.45) score += 0.8 * weight;
  }
  return score;
}

function chooseAccent(family, brief, seed) {
  const tones = preferredTones(brief);
  const ranked = family.palette.accents
    .map((accent) => {
      let score = scoreAccent(accent, tones);
      for (const word of briefTokens(brief)) {
        if (normalizeText(accent.name).includes(word) || normalizeText(accent.id).includes(word)) {
          score += 5;
        }
      }
      return { accent, score, rank: hashString(`${seed}:${family.id}:${accent.id}`) };
    })
    .sort((a, b) => b.score - a.score || a.rank - b.rank);
  return ranked[0].accent;
}

function chooseVariant(family, brief, seed, normalized) {
  const ranked = family.variants
    .map((variant) => ({
      variant,
      score: scoreVariant(variant, brief, normalized),
      rank: hashString(`${seed}:${family.id}:${variant.id}`),
    }))
    .sort((a, b) => b.score - a.score || a.rank - b.rank);
  return { variant: ranked[0].variant, ranked: ranked.map((entry) => ({ id: entry.variant.id, score: Number(entry.score.toFixed(2)) })) };
}

function chooseMode(brief, variant, option) {
  if (option === 'light' || option === 'dark') return option;
  const words = new Set(briefTokens(brief));
  const wantsDark = [...DARK_WORDS].some((word) => words.has(word));
  const wantsLight = [...LIGHT_WORDS].some((word) => words.has(word));
  // "light and dark" means both modes are required, not that dark is the default.
  if (wantsDark && !wantsLight) return 'dark';
  if (wantsLight && !wantsDark) return 'light';
  return DARK_VARIANTS.has(variant.id) ? 'dark' : 'light';
}

/**
 * Select a direction from a brief.
 * Deterministic: the same brief + options always produces the same direction.
 */
export function selectDirection(brief, families, options = {}) {
  if (!brief || !String(brief).trim()) {
    throw new Error('A brief is required. Example: studio design "a calm app for tracking sleep"');
  }
  const normalized = normalizeText(brief);
  const seed = normalizeText(`${brief}|${options.name ?? ''}`);
  const rankedFamilies = families
    .map((family) => {
      const { score, matched } = scoreFamily(family, normalized);
      return {
        family,
        score,
        matched,
        rank: hashString(`${seed}:${family.id}`),
      };
    })
    .sort((a, b) => b.score - a.score || a.rank - b.rank);

  const top = rankedFamilies[0];
  let family = top.family;
  if (top.score <= 0) {
    // No content signal: use the name/brief hash to pick rather than always the same family.
    family = pickBySeed(families, seed, 'fallback');
  }
  if (options.familyId) {
    const chosen = families.find((entry) => entry.id === options.familyId);
    if (!chosen) {
      throw new Error(`Unknown family "${options.familyId}". Available: ${families.map((entry) => entry.id).join(', ')}`);
    }
    family = chosen;
  }
  const { variant, ranked: variants } = chooseVariant(family, brief, seed, normalized);
  const accent = chooseAccent(family, brief, seed);
  const mode = chooseMode(brief, variant, options.mode);
  const alternativeIds = rankedFamilies
    .filter((entry) => entry.family.id !== family.id)
    .slice(0, 2)
    .map((entry) => ({
      id: entry.family.id,
      name: entry.family.name,
      score: Number(entry.score.toFixed(2)),
      matched: entry.matched.slice(0, 4),
    }));

  const signals = rankedFamilies.find((entry) => entry.family.id === family.id)?.matched ?? [];
  return {
    brief: String(brief).trim(),
    normalized,
    seed,
    family,
    variant,
    accent,
    mode,
    signals,
    confidence: signals.length >= 3 ? 'high' : signals.length >= 1 ? 'medium' : 'low',
    scores: rankedFamilies.map((entry) => ({
      id: entry.family.id,
      name: entry.family.name,
      score: Number(entry.score.toFixed(2)),
      matched: entry.matched.slice(0, 5),
    })),
    alternatives: alternativeIds,
    variantScores: variants,
    tones: preferredTones(brief).map((tone) => tone.id),
  };
}
