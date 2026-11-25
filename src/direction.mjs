import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  colorDistance,
  contrastRatio,
  formatRatio,
  hashString,
  mulberry32,
} from './util.mjs';

const MATERIALS_DIR = fileURLToPath(new URL('../materials/', import.meta.url));

export function loadMaterials() {
  const materials = fs
    .readdirSync(MATERIALS_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort()
    .map((name) => {
      const material = JSON.parse(fs.readFileSync(path.join(MATERIALS_DIR, name), 'utf8'));
      const issues = validateMaterial(material);
      if (issues.length > 0) {
        throw new Error(`material ${material.id} is invalid: ${issues.join('; ')}`);
      }
      return material;
    });
  if (materials.length === 0) throw new Error('no materials found');
  return materials;
}

export function materialContrast(material) {
  const result = {};
  for (const theme of ['light', 'dark']) {
    const colors = material.colors[theme];
    result[theme] = {
      onSurface: contrastRatio(colors.onSurface, colors.surface),
      muted: contrastRatio(colors.muted, colors.surface),
      onAccent: contrastRatio(colors.onAccent, colors.accent),
      accent: contrastRatio(colors.accent, colors.surface),
    };
  }
  return result;
}

export function validateMaterial(material) {
  const issues = [];
  for (const theme of ['light', 'dark']) {
    const colors = material.colors?.[theme];
    if (!colors) {
      issues.push(`missing ${theme} colors`);
      continue;
    }
    for (const key of ['surface', 'onSurface', 'muted', 'accent', 'onAccent']) {
      if (!colors[key]) issues.push(`missing ${theme}.${key}`);
    }
    if (issues.length > 0) continue;
    const checks = [
      ['onSurface', 'surface', 4.5],
      ['muted', 'surface', 4.5],
      ['onAccent', 'accent', 4.5],
      ['accent', 'surface', 3],
    ];
    for (const [foreground, background, minimum] of checks) {
      const ratio = contrastRatio(colors[foreground], colors[background]);
      if (ratio === null || ratio < minimum) {
        issues.push(
          `${theme} ${foreground}/${background} is ${ratio === null ? 'invalid' : formatRatio(ratio)}, needs ${minimum}:1`,
        );
      }
    }
  }
  return issues;
}

function scoreMaterial(material, text, seed) {
  const random = mulberry32(hashString(`${seed}:${material.id}`))();
  let score = random * 1.25;
  for (const keyword of material.keywords) {
    if (text.includes(keyword)) score += 4;
  }
  return score;
}

function collidesWith(entry, material) {
  if (entry.material === material.id) return true;
  if (entry.accent && colorDistance(entry.accent, material.colors.light.accent) < 24) {
    return entry.shape === material.shape.family;
  }
  return false;
}

export function resolveDirection({
  materials,
  name = 'Untitled',
  category = '',
  adjectives = '',
  seed = 'default',
  platform = 'both',
  ledger = [],
}) {
  const text = `${name} ${category} ${Array.isArray(adjectives) ? adjectives.join(' ') : adjectives}`.toLowerCase();
  const ranked = materials
    .map((material) => ({
      material,
      score: scoreMaterial(material, text, seed),
    }))
    .sort((a, b) => b.score - a.score || a.material.id.localeCompare(b.material.id));

  const recent = ledger.slice(-3);
  let chosen = ranked.find(({ material }) => !recent.some((entry) => collidesWith(entry, material)));
  let reason = 'best keyword fit';

  if (!chosen) {
    const lastSeen = new Map();
    recent.forEach((entry, index) => lastSeen.set(entry.material, index));
    const fallback = [...materials].sort((a, b) => {
      const aSeen = lastSeen.has(a.id) ? lastSeen.get(a.id) : -1;
      const bSeen = lastSeen.has(b.id) ? lastSeen.get(b.id) : -1;
      return aSeen - bSeen;
    })[0];
    chosen = { material: fallback, score: 0 };
    reason = 'all candidates are recent; rotating the least recently used';
  } else if (chosen !== ranked[0]) {
    reason = 'avoids a direction used in the last three runs';
  }

  const material = chosen.material;
  return {
    material,
    score: Number(chosen.score.toFixed(3)),
    reason,
    seed,
    platform,
    contrast: materialContrast(material),
  };
}

export function directionCard(direction) {
  const { material, contrast } = direction;
  const lines = [];
  lines.push(`Direction: ${material.name}`);
  lines.push(`Material: ${material.name} — ${material.character}`);
  lines.push(`Seed: ${direction.seed} · ${direction.reason}`);
  lines.push('');
  for (const theme of ['light', 'dark']) {
    const colors = material.colors[theme];
    const ratios = contrast[theme];
    lines.push(theme.toUpperCase());
    lines.push(`  surface    ${colors.surface}`);
    lines.push(`  text       ${colors.onSurface.padEnd(9)} ${formatRatio(ratios.onSurface)}`);
    lines.push(`  muted      ${colors.muted.padEnd(9)} ${formatRatio(ratios.muted)}`);
    lines.push(
      `  accent     ${colors.accent.padEnd(9)} ${formatRatio(ratios.accent)} on surface · ${formatRatio(
        ratios.onAccent,
      )} on accent`,
    );
    lines.push('');
  }
  lines.push(`Type       ${material.type.display} display / ${material.type.body} body / ${material.type.numeric} numerals`);
  lines.push(
    `Shape      ${material.shape.family} · ${material.shape.small} / ${material.shape.medium} / ${material.shape.large}`,
  );
  lines.push(`Surface    ${material.surface}`);
  lines.push(
    `Motion     ${material.motion.curve} · ${material.motion.fast} / ${material.motion.base} / ${material.motion.slow} ms`,
  );
  lines.push(`Density    ${material.density}`);
  lines.push(`Signature  ${material.signature}`);
  return lines.join('\n');
}

export function formatMaterialList(materials) {
  return materials
    .map(
      (material) =>
        `${material.id.padEnd(12)} ${material.name.padEnd(11)} ${material.character}`,
    )
    .join('\n');
}

export function readLedger(root) {
  const ledgerPath = path.join(root, '.idiom', 'ledger.json');
  if (!fs.existsSync(ledgerPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
    return Array.isArray(data.entries) ? data.entries : [];
  } catch {
    return [];
  }
}

export function appendLedger(root, direction) {
  const directory = path.join(root, '.idiom');
  fs.mkdirSync(directory, { recursive: true });
  const entries = readLedger(root);
  entries.push({
    at: new Date().toISOString(),
    material: direction.material.id,
    accent: direction.material.colors.light.accent,
    shape: direction.material.shape.family,
    seed: direction.seed,
  });
  const ledgerPath = path.join(directory, 'ledger.json');
  fs.writeFileSync(
    ledgerPath,
    `${JSON.stringify({ version: 1, entries: entries.slice(-50) }, null, 2)}\n`,
  );
  return ledgerPath;
}
