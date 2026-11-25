import { lineColAt, lineStartsOf } from './util.mjs';

/**
 * Produces a same-length mask of source code where comments and string
 * contents are replaced with spaces. Newlines and quote delimiters survive,
 * so line numbers, brace matching, and call shapes stay accurate.
 *
 * Raw string values are collected separately for rules that need content
 * (fake data, labels, consent copy).
 */
export function parseSource(raw, language = 'swift') {
  const lineStarts = lineStartsOf(raw);
  if (language === 'xml') {
    const { masked, comments } = maskXml(raw);
    return { masked, strings: [], comments, lineStarts };
  }

  const chars = raw.split('');
  const strings = [];
  const comments = [];
  let index = 0;
  let state = 'code';
  let contentStart = 0;
  let openStart = 0;
  let quoteLength = 1;

  const blank = (from, to) => {
    for (let i = from; i < to && i < chars.length; i += 1) {
      if (chars[i] !== '\n') chars[i] = ' ';
    }
  };

  while (index < raw.length) {
    const character = raw[index];
    const next = raw[index + 1];

    if (state === 'code') {
      if (character === '/' && next === '/') {
        const start = index;
        while (index < raw.length && raw[index] !== '\n') index += 1;
        blank(start, index);
        comments.push({
          kind: 'line',
          start,
          end: index,
          text: raw.slice(start, index),
          ...lineColAt(lineStarts, start),
        });
        continue;
      }
      if (character === '/' && next === '*') {
        const start = index;
        index += 2;
        while (index < raw.length && !(raw[index] === '*' && raw[index + 1] === '/')) {
          index += 1;
        }
        index = Math.min(raw.length, index + 2);
        blank(start, index);
        comments.push({
          kind: 'block',
          start,
          end: index,
          text: raw.slice(start, index),
          ...lineColAt(lineStarts, start),
        });
        continue;
      }
      if (character === '"') {
        openStart = index;
        if (raw.startsWith('"""', index)) {
          state = 'triple';
          quoteLength = 3;
          contentStart = index + 3;
          index += 3;
        } else {
          state = 'string';
          quoteLength = 1;
          contentStart = index + 1;
          index += 1;
        }
        continue;
      }
      if (character === "'" && language === 'kotlin') {
        openStart = index;
        state = 'char';
        quoteLength = 1;
        contentStart = index + 1;
        index += 1;
        continue;
      }
      index += 1;
      continue;
    }

    if (state === 'string') {
      if (character === '\\') {
        blank(index, index + 2);
        index += 2;
        continue;
      }
      if (character === '"') {
        strings.push({
          value: raw.slice(contentStart, index),
          start: openStart,
          end: index + 1,
          ...lineColAt(lineStarts, openStart),
        });
        state = 'code';
        index += 1;
        continue;
      }
      if (character !== '\n') chars[index] = ' ';
      index += 1;
      continue;
    }

    if (state === 'triple') {
      if (raw.startsWith('"""', index)) {
        strings.push({
          value: raw.slice(contentStart, index),
          start: openStart,
          end: index + 3,
          ...lineColAt(lineStarts, openStart),
        });
        state = 'code';
        index += 3;
        continue;
      }
      if (character !== '\n') chars[index] = ' ';
      index += 1;
      continue;
    }

    if (state === 'char') {
      if (character === '\\') {
        blank(index, index + 2);
        index += 2;
        continue;
      }
      if (character === "'") {
        state = 'code';
        index += 1;
        continue;
      }
      chars[index] = ' ';
      index += 1;
    }
  }

  return {
    masked: chars.join(''),
    strings,
    comments,
    lineStarts,
  };
}

function maskXml(raw) {
  const chars = raw.split('');
  const comments = [];
  const lineStarts = lineStartsOf(raw);
  let index = 0;
  while (index < raw.length) {
    if (raw.startsWith('<!--', index)) {
      const start = index;
      index += 4;
      while (index < raw.length && !raw.startsWith('-->', index)) index += 1;
      index = Math.min(raw.length, index + 3);
      for (let i = start; i < index; i += 1) {
        if (chars[i] !== '\n') chars[i] = ' ';
      }
      comments.push({
        kind: 'xml',
        start,
        end: index,
        text: raw.slice(start, index),
        ...lineColAt(lineStarts, start),
      });
      continue;
    }
    index += 1;
  }
  return { masked: chars.join(''), comments };
}
