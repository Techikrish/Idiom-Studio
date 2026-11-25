import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { contrastRatio } from '../util.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
export const FAMILIES_DIR = path.resolve(here, '../../studio/data/families');

const REQUIRED_STRINGS = [
  'id',
  'name',
  'thesis',
  'bestFor',
  'density',
  'surface',
];
const REQUIRED_ARRAYS = [
  'keywords',
  'feelings',
  'contentTypes',
  'avoidFor',
  'principles',
  'avoid',
  'signatureMoves',
];

export function listFamilyFiles(dir = FAMILIES_DIR) {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .sort()
    .map((name) => path.join(dir, name));
}

export function validateFamily(family, source = family?.id) {
  const errors = [];
  if (!family || typeof family !== 'object') {
    return [`${source}: not an object`];
  }
  for (const key of REQUIRED_STRINGS) {
    if (typeof family[key] !== 'string' || !family[key].trim()) {
      errors.push(`${source}: missing ${key}`);
    }
  }
  for (const key of REQUIRED_ARRAYS) {
    if (!Array.isArray(family[key]) || family[key].length === 0) {
      errors.push(`${source}: missing ${key}`);
    }
  }
  for (const mode of ['light', 'dark']) {
    const palette = family.palette?.[mode];
    if (!palette) {
      errors.push(`${source}: missing palette.${mode}`);
      continue;
    }
    for (const key of ['background', 'surface', 'elevated', 'text', 'muted', 'border']) {
      if (!palette[key]) errors.push(`${source}: missing palette.${mode}.${key}`);
    }
    if (palette.text && palette.background) {
      const ratio = contrastRatio(palette.text, palette.background);
      if (ratio !== null && ratio < 4.5) {
        errors.push(`${source}: ${mode} text/background contrast ${ratio.toFixed(2)} < 4.5`);
      }
    }
    if (palette.muted && palette.background) {
      const ratio = contrastRatio(palette.muted, palette.background);
      if (ratio !== null && ratio < 4.5) {
        errors.push(`${source}: ${mode} muted/background contrast ${ratio.toFixed(2)} < 4.5`);
      }
    }
  }
  if (!Array.isArray(family.variants) || family.variants.length < 3) {
    errors.push(`${source}: needs at least three variants`);
  } else {
    const seen = new Set();
    for (const variant of family.variants) {
      for (const key of ['id', 'name', 'summary', 'signature', 'treatment', 'previewClass']) {
        if (typeof variant[key] !== 'string' || !variant[key].trim()) {
          errors.push(`${source}: variant ${variant.id ?? '?'} missing ${key}`);
        }
      }
      if (seen.has(variant.id)) errors.push(`${source}: duplicate variant ${variant.id}`);
      seen.add(variant.id);
      if (!Number.isFinite(variant.displaySize) || !Number.isFinite(variant.bodySize)) {
        errors.push(`${source}: variant ${variant.id} needs displaySize and bodySize`);
      }
    }
  }
  const accents = family.palette?.accents;
  if (!Array.isArray(accents) || accents.length === 0) {
    errors.push(`${source}: needs palette.accents`);
  } else {
    for (const accent of accents) {
      for (const key of ['id', 'name', 'light', 'dark', 'onLight', 'onDark']) {
        if (!accent[key]) errors.push(`${source}: accent ${accent.id ?? '?'} missing ${key}`);
      }
      if (accent.light && accent.onLight) {
        const ratio = contrastRatio(accent.onLight, accent.light);
        if (ratio !== null && ratio < 4.5) {
          errors.push(`${source}: accent ${accent.id} onLight contrast ${ratio.toFixed(2)} < 4.5`);
        }
      }
      if (accent.dark && accent.onDark) {
        const ratio = contrastRatio(accent.onDark, accent.dark);
        if (ratio !== null && ratio < 4.5) {
          errors.push(`${source}: accent ${accent.id} onDark contrast ${ratio.toFixed(2)} < 4.5`);
        }
      }
    }
  }
  for (const key of ['ios', 'android']) {
    if (typeof family.platform?.[key] !== 'string' || !family.platform[key].trim()) {
      errors.push(`${source}: missing platform.${key}`);
    }
  }
  for (const key of ['home', 'detail', 'compose', 'profile']) {
    if (typeof family.screens?.[key] !== 'string' || !family.screens[key].trim()) {
      errors.push(`${source}: missing screens.${key}`);
    }
  }
  for (const key of ['button', 'list', 'input', 'navigation']) {
    if (typeof family.components?.[key] !== 'string' || !family.components[key].trim()) {
      errors.push(`${source}: missing components.${key}`);
    }
  }
  if (!family.content?.title || !Array.isArray(family.content?.items)) {
    errors.push(`${source}: missing content.title or content.items`);
  }
  return errors;
}

export function loadFamilyFile(file) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`${path.basename(file)}: invalid JSON (${error.message})`);
  }
  const errors = validateFamily(parsed, path.basename(file));
  if (errors.length) {
    throw new Error(errors.join('\n'));
  }
  return parsed;
}

export function loadFamilies(dir = FAMILIES_DIR) {
  return listFamilyFiles(dir).map(loadFamilyFile);
}

export function findFamily(families, id) {
  return families.find((family) => family.id === id) ?? null;
}
