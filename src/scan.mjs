import fs from 'node:fs';
import path from 'node:path';
import { parseSource } from './tokenize.mjs';
import {
  lineStartsOf,
  parseHex,
  relativePosix,
  toPosix,
  walkFiles,
} from './util.mjs';

const EXTENSIONS = new Map([
  ['.swift', 'ios'],
  ['.kt', 'android'],
  ['.kts', 'android'],
  ['.java', 'android'],
  ['.xml', 'android'],
]);

const EXACT_TOKEN_BASES = new Set([
  'color',
  'colors',
  'colorscheme',
  'designsystem',
  'dimens',
  'palette',
  'shape',
  'shapes',
  'spacing',
  'theme',
  'themes',
  'token',
  'tokens',
  'type',
  'types',
  'typography',
]);

const MAX_FILE_BYTES = 1024 * 1024;

export function isTokenFile(rel) {
  const base = path.basename(rel).replace(/\.[^.]+$/, '').toLowerCase();
  const normalized = `/${toPosix(rel).toLowerCase()}/`;
  if (EXACT_TOKEN_BASES.has(base)) return true;
  if (/(theme|tokens?|typography|palette|colorscheme|designsystem)/.test(base)) return true;
  if (/\/(theme|themes|tokens?|designsystem|design-system|typography|palette)\//.test(normalized)) {
    return true;
  }
  if (/\/res\/values[^/]*\//.test(normalized) && /(colors|themes|dimens)\.xml$/.test(base)) {
    return true;
  }
  return false;
}

export function isTestFile(rel) {
  const normalized = toPosix(rel).toLowerCase();
  const parts = normalized.split('/');
  if (
    parts.includes('test') ||
    parts.includes('tests') ||
    parts.includes('androidtest') ||
    parts.includes('unittest')
  ) {
    return true;
  }
  const base = parts.at(-1) ?? '';
  return /(test|tests)\.(swift|kt|kts|java)$/.test(base);
}

export function classifyScreen(file) {
  const base = path.basename(file.rel).replace(/\.[^.]+$/, '').toLowerCase();
  if (file.platform === 'ios') {
    if (!/(view|screen|page|controller)$/.test(base)) return false;
    return !/(row|cell|card|item|button|field|header|footer|bar|sheet|dialog|component|preview|badge|chip|avatar|icon)$/.test(
      base,
    );
  }
  if (file.platform === 'android') {
    if (!/(screen|activity|fragment|page)$/.test(base)) return false;
    return !/(item|row|cell|card|component|dialog|sheet|preview)$/.test(base);
  }
  return false;
}

function braceEnd(source, openIndex) {
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

function previewRanges(file) {
  const ranges = [];
  const source = file.masked;
  if (file.platform === 'ios') {
    for (const match of source.matchAll(/#Preview\b/g)) {
      const open = source.indexOf('{', match.index);
      if (open !== -1) ranges.push([match.index, braceEnd(source, open)]);
    }
    for (const match of source.matchAll(/struct\s+\w+\s*:\s*PreviewProvider/g)) {
      const open = source.indexOf('{', match.index);
      if (open !== -1) ranges.push([match.index, braceEnd(source, open)]);
    }
  } else if (file.platform === 'android') {
    for (const match of source.matchAll(/@Preview\b/g)) {
      const fun = source.indexOf('fun', match.index);
      const open = fun === -1 ? -1 : source.indexOf('{', fun);
      if (open !== -1) ranges.push([match.index, braceEnd(source, open)]);
    }
  }
  return ranges;
}

export function inRanges(index, ranges) {
  return ranges.some(([start, end]) => index >= start && index < end);
}

export function extractTokenColors(file) {
  const colors = new Map();
  for (const line of file.raw.split('\n')) {
    const declaration = line.match(
      /(?:let|var|val)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*[^=\n]*?(?:#|0x)([0-9A-Fa-f]{6,8})/,
    );
    if (declaration) {
      const rgb = parseHex(declaration[2]);
      if (rgb) {
        const hex = `#${[rgb.r, rgb.g, rgb.b]
          .map((value) => value.toString(16).padStart(2, '0'))
          .join('')}`;
        colors.set(declaration[1].toLowerCase(), hex);
      }
      continue;
    }
    const xml = line.match(
      /<color\s+name="([^"]+)"\s*>\s*(#[0-9A-Fa-f]{6,8})\s*<\/color>/,
    );
    if (xml) {
      const rgb = parseHex(xml[2]);
      if (rgb) {
        const hex = `#${[rgb.r, rgb.g, rgb.b]
          .map((value) => value.toString(16).padStart(2, '0'))
          .join('')}`;
        colors.set(xml[1].toLowerCase(), hex);
      }
    }
  }
  return colors;
}

function readConfig(root) {
  const configPath = path.join(root, '.idiom', 'config.json');
  if (!fs.existsSync(configPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    return {};
  }
}

export function scanProject(target, options = {}) {
  const absoluteTarget = path.resolve(target);
  let root;
  let paths;

  if (!fs.existsSync(absoluteTarget)) {
    throw new Error(`path not found: ${target}`);
  }

  const stat = fs.statSync(absoluteTarget);
  if (stat.isFile()) {
    root = path.dirname(absoluteTarget);
    paths = [absoluteTarget];
  } else {
    root = absoluteTarget;
    paths = walkFiles(absoluteTarget);
  }

  const config = { ...readConfig(root), ...options };
  const files = [];

  for (const absolute of paths) {
    const ext = path.extname(absolute).toLowerCase();
    const platform = EXTENSIONS.get(ext);
    if (!platform) continue;

    let fileStat;
    try {
      fileStat = fs.statSync(absolute);
    } catch {
      continue;
    }
    if (fileStat.size > MAX_FILE_BYTES) continue;

    const raw = fs.readFileSync(absolute, 'utf8');
    const rel = relativePosix(root, absolute);
    const language = platform === 'ios' ? 'swift' : ext === '.kt' || ext === '.kts' ? 'kotlin' : ext === '.java' ? 'java' : 'xml';
    const parsed = parseSource(raw, language);
    const file = {
      abs: absolute,
      rel,
      base: path.basename(absolute),
      ext,
      platform,
      language,
      raw,
      masked: parsed.masked,
      strings: parsed.strings,
      comments: parsed.comments,
      lineStarts: parsed.lineStarts,
      lines: raw.split('\n'),
      token: isTokenFile(rel),
      test: isTestFile(rel),
      screen: false,
      manifest: path.basename(absolute) === 'AndroidManifest.xml',
    };
    file.screen = classifyScreen(file);
    file.previews = previewRanges(file);
    file.tokenColors = file.token ? extractTokenColors(file) : new Map();
    files.push(file);
  }

  const android = files.filter((file) => file.platform === 'android');
  const ios = files.filter((file) => file.platform === 'ios');
  const screens = files.filter((file) => file.screen);
  const tokenFiles = files.filter((file) => file.token);
  const androidAll = android.map((file) => file.masked).join('\n');
  const androidRaw = android.map((file) => file.raw).join('\n');
  const allMasked = files.map((file) => file.masked).join('\n');

  const tokenColorNames = new Map();
  for (const file of tokenFiles) {
    for (const [name, hex] of file.tokenColors) {
      if (!tokenColorNames.has(name)) tokenColorNames.set(name, new Set());
      tokenColorNames.get(name).add(hex);
    }
  }

  const features = {
    edgeToEdge: /enableEdgeToEdge\s*\(/.test(androidAll),
    imeInsets: /imePadding\s*\(|WindowInsets\.ime|adjustResize/.test(`${androidAll}\n${androidRaw}`),
    adaptive:
      /WindowSizeClass|windowSizeClass|WindowWidthSizeClass|calculateWindowSizeClass|sw600dp/.test(
        `${androidAll}\n${androidRaw}\n${android.map((file) => file.rel).join('\n')}`,
      ),
    predictiveBack: /OnBackPressedCallback|enableOnBackInvokedCallback/.test(
      `${androidAll}\n${androidRaw}`,
    ),
    reduceMotion:
      /accessibilityReduceMotion|areAnimationsEnabled|LocalMotionDurationScale|MotionDurationScale/.test(
        allMasked,
      ),
    animation:
      /withAnimation|animate[A-Za-z]*AsState|\.animation\s*\(|animateContentSize|AnimatedVisibility|animate[A-Za-z]*\s*\(/.test(
        allMasked,
      ),
    liquidGlass:
      /\.glassEffect\s*\(|GlassEffectContainer/.test(allMasked),
    dynamicType:
      /\.font\s*\(\s*\.(?:largeTitle|title|title2|title3|headline|body|callout|subheadline|footnote|caption|caption2)\b/.test(
        ios.map((file) => file.masked).join('\n'),
      ),
  };

  const activities = android.filter(
    (file) => /ComponentActivity|AppCompatActivity|FragmentActivity|:\s*Activity|extends\s+Activity/.test(file.masked),
  );

  return {
    root,
    files,
    ios,
    android,
    screens,
    tokenFiles,
    activities,
    features,
    tokenColorNames,
    config,
    mode: options.mode ?? config.mode ?? 'release',
    platformCounts: { ios: ios.length, android: android.length },
  };
}
