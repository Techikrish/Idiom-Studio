import { lineColAt, lineIndexAt } from '../util.mjs';

export function findAll(source, pattern) {
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;
  const expression = new RegExp(pattern.source, flags);
  return [...source.matchAll(expression)].map((match) => ({
    index: match.index,
    match,
  }));
}

export function braceEnd(source, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    else if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) return i + 1;
    }
  }
  return source.length;
}

export function blockAt(source, openIndex) {
  if (openIndex < 0) return null;
  const end = braceEnd(source, openIndex);
  return { start: openIndex, end, text: source.slice(openIndex + 1, end - 1) };
}

/**
 * Returns the body block of a call:
 *   Button("Save") { ... }        -> trailing lambda
 *   Button { ... } label: { ... } -> leading closure
 *   IconButton(onClick = {}) { }  -> trailing lambda, not the onClick lambda
 */
export function callBody(source, callIndex) {
  let index = callIndex;
  while (index < source.length && /[A-Za-z0-9_.]/.test(source[index])) index += 1;
  while (index < source.length && /\s/.test(source[index])) index += 1;

  if (source[index] === '{') return blockAt(source, index);

  if (source[index] !== '(') return null;

  let depth = 0;
  let cursor = index;
  for (; cursor < source.length; cursor += 1) {
    if (source[cursor] === '(') depth += 1;
    else if (source[cursor] === ')') {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) return null;

  cursor += 1;
  while (cursor < source.length && /\s/.test(source[cursor])) cursor += 1;
  if (source[cursor] === '{') return blockAt(source, cursor);

  // Swift's `Button { } label: { }` shape.
  const brace = source.indexOf('{', index);
  if (brace !== -1 && brace < cursor) return blockAt(source, brace);
  return null;
}

export function callArguments(source, callIndex) {
  let index = callIndex;
  while (index < source.length && /[A-Za-z0-9_.]/.test(source[index])) index += 1;
  while (index < source.length && /\s/.test(source[index])) index += 1;
  if (source[index] !== '(') return null;
  let depth = 0;
  for (let cursor = index; cursor < source.length; cursor += 1) {
    if (source[cursor] === '(') depth += 1;
    else if (source[cursor] === ')') {
      depth -= 1;
      if (depth === 0) {
        return {
          start: index,
          end: cursor + 1,
          text: source.slice(index + 1, cursor),
        };
      }
    }
  }
  return null;
}

export function finding(file, index, extras = {}) {
  const { line, column } = lineColAt(file.lineStarts, index);
  const rawLine = file.lines[line - 1] ?? '';
  const snippet = rawLine.replace(/\s+/g, ' ').trim().slice(0, 160);
  return {
    file,
    index,
    line,
    column,
    snippet,
    message: extras.message ?? '',
    confidence: extras.confidence,
    fix: extras.fix,
  };
}

export function nearby(source, index, radius = 240) {
  return source.slice(Math.max(0, index - radius), Math.min(source.length, index + radius));
}

export function countMatches(source, pattern) {
  return findAll(source, pattern).length;
}

export function hasIdentifier(source, identifier) {
  return new RegExp(`\\b${identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(source);
}

export function lineIndex(file, index) {
  return lineIndexAt(file.lineStarts, index);
}

export function containsEmoji(value) {
  return /\p{Extended_Pictographic}/u.test(value);
}

export function emojiOnly(value) {
  const stripped = value.replace(/[\s\u200d\ufe0f]/g, '');
  if (!stripped || stripped.length > 8) return false;
  return /^[\p{Extended_Pictographic}\p{Emoji_Modifier}\p{Emoji_Component}\p{Regional_Indicator}]+$/u.test(
    stripped,
  );
}

export function screenLabel(file) {
  return file.rel;
}

export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
