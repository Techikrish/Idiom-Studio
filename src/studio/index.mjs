import fs from 'node:fs';
import path from 'node:path';
import { loadFamilies } from './families.mjs';
import { selectDirection } from './select.mjs';
import { buildTokens, emitKotlin, emitSwift } from './tokens.mjs';
import { buildDesign, emitMarkdown } from './spec.mjs';
import { renderPreview } from './preview.mjs';

export const STUDIO_VERSION = '0.2.0';

export function createDesign(brief, options = {}) {
  const families = options.families ?? loadFamilies();
  const selection = selectDirection(brief, families, options);
  if (options.variantId) {
    const variant = selection.family.variants.find((entry) => entry.id === options.variantId);
    if (!variant) {
      throw new Error(
        `Unknown variant "${options.variantId}" for ${selection.family.name}. Available: ${selection.family.variants.map((entry) => entry.id).join(', ')}`,
      );
    }
    selection.variant = variant;
  }
  if (options.accentId) {
    const accent = selection.family.palette.accents.find((entry) => entry.id === options.accentId);
    if (!accent) {
      throw new Error(
        `Unknown accent "${options.accentId}" for ${selection.family.name}. Available: ${selection.family.palette.accents.map((entry) => entry.id).join(', ')}`,
      );
    }
    selection.accent = accent;
  }
  if (options.mode === 'light' || options.mode === 'dark') selection.mode = options.mode;
  const tokens = buildTokens(selection, options);
  const files = {
    'Design spec': 'DESIGN.md',
    'Machine-readable design': 'design.json',
    'Design tokens': 'tokens.json',
    'Visual preview': 'preview.html',
    'SwiftUI theme': 'ios/Theme.swift',
    'Compose theme': 'android/Theme.kt',
  };
  const design = buildDesign(selection, tokens, { files });
  return { selection, tokens, design, families };
}

export function writeDesign(brief, options = {}) {
  const result = createDesign(brief, options);
  const { tokens, design } = result;
  const outDir = path.resolve(options.outDir ?? path.join(process.cwd(), 'studio-out', tokens.slug));
  fs.mkdirSync(path.join(outDir, 'ios'), { recursive: true });
  fs.mkdirSync(path.join(outDir, 'android'), { recursive: true });

  const files = [
    ['DESIGN.md', emitMarkdown(design, tokens)],
    ['design.json', `${JSON.stringify({ studio: STUDIO_VERSION, ...design }, null, 2)}\n`],
    ['tokens.json', `${JSON.stringify(tokens, null, 2)}\n`],
    ['preview.html', renderPreview(result.selection, tokens, design)],
    ['ios/Theme.swift', emitSwift(tokens)],
    ['android/Theme.kt', emitKotlin(tokens)],
  ];
  for (const [name, content] of files) {
    fs.writeFileSync(path.join(outDir, name), content);
  }
  return { ...result, outDir, written: files.map(([name]) => name) };
}

export function validateFamilies(families = loadFamilies()) {
  return families.map((family) => {
    const tokens = buildTokens({
      family,
      variant: family.variants[0],
      accent: family.palette.accents[0],
      mode: 'light',
      seed: family.id,
    });
    return {
      id: family.id,
      name: family.name,
      variants: family.variants.length,
      accents: family.palette.accents.length,
      contrast: tokens.contrast,
    };
  });
}
