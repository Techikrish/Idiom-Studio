import fs from 'node:fs';
import path from 'node:path';

export const VERSION = '0.1.0';

export const TIER_ORDER = { floor: 0, reflex: 1, finish: 2 };

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.hg',
  '.svn',
  'build',
  'Build',
  'dist',
  'out',
  'Pods',
  'DerivedData',
  '.build',
  '.gradle',
  '.idea',
  '.vscode',
  'coverage',
]);

export function lineStartsOf(source) {
  const starts = [0];
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] === '\n') starts.push(i + 1);
  }
  return starts;
}

export function lineIndexAt(starts, index) {
  let low = 0;
  let high = starts.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (starts[mid] <= index) low = mid + 1;
    else high = mid - 1;
  }
  return Math.max(0, high);
}

export function lineColAt(starts, index) {
  const lineIndex = lineIndexAt(starts, index);
  return {
    line: lineIndex + 1,
    column: index - starts[lineIndex] + 1,
  };
}

export function walkFiles(root) {
  const found = [];

  function walk(directory) {
    let entries;
    try {
      entries = fs.readdirSync(directory, { withFileTypes: true });
    } catch {
      return;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.')) continue;
        if (SKIP_DIRS.has(entry.name)) continue;
        walk(absolute);
      } else if (entry.isFile()) {
        found.push(absolute);
      }
    }
  }

  walk(root);
  return found;
}

export function toPosix(value) {
  return value.split(path.sep).join('/');
}

export function relativePosix(root, absolute) {
  return toPosix(path.relative(root, absolute));
}

export function parseHex(value) {
  if (!value) return null;
  let hex = String(value).trim().replace(/^0x/i, '').replace(/^#/, '');
  if (hex.length === 8) {
    // Android writes 0xAARRGGBB; CSS writes #RRGGBBAA.
    if (/^ff/i.test(hex)) hex = hex.slice(2);
    else hex = hex.slice(0, 6);
  }
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((character) => character + character)
      .join('');
  }
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function channelLuminance(channel) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(rgb) {
  return (
    0.2126 * channelLuminance(rgb.r) +
    0.7152 * channelLuminance(rgb.g) +
    0.0722 * channelLuminance(rgb.b)
  );
}

export function contrastRatio(foreground, background) {
  const a = parseHex(foreground);
  const b = parseHex(background);
  if (!a || !b) return null;
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function colorDistance(a, b) {
  const left = parseHex(a);
  const right = parseHex(b);
  if (!left || !right) return Number.POSITIVE_INFINITY;
  return Math.sqrt(
    (left.r - right.r) ** 2 + (left.g - right.g) ** 2 + (left.b - right.b) ** 2,
  );
}

export function hashString(value) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function mulberry32(seed) {
  let state = seed >>> 0;
  return function random() {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function formatRatio(value) {
  return `${value.toFixed(1)}:1`;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function uniqueBy(items, key) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const id = key(item);
    if (seen.has(id)) continue;
    seen.add(id);
    result.push(item);
  }
  return result;
}

export function makeColor() {
  const enabled = process.stdout.isTTY && !process.env.NO_COLOR;
  const wrap = (code) => (text) => (enabled ? `\u001b[${code}m${text}\u001b[0m` : String(text));
  return {
    bold: wrap('1'),
    dim: wrap('2'),
    red: wrap('31'),
    green: wrap('32'),
    yellow: wrap('33'),
    blue: wrap('34'),
    magenta: wrap('35'),
    cyan: wrap('36'),
    gray: wrap('90'),
  };
}
