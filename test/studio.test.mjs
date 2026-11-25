import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { loadFamilies } from '../src/studio/families.mjs';
import { createDesign, writeDesign, validateFamilies } from '../src/studio/index.mjs';
import { renderPreview } from '../src/studio/preview.mjs';

const CLI = path.resolve('bin/studio.mjs');

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'idiom-studio-test-'));
}

const BRIEFS = [
  ['A dense portfolio app for tracking investments, budgets, and market positions. Dark, technical, fast.', 'Ledger', 'instrument'],
  ['A local guide for hiking trails, maps, and nearby places. Warm, outdoors, calm.', 'North', 'spatial'],
  ['A calm app for sleep, meditation, and a bedtime ritual. Soft, gentle, breathing.', 'Dusk', 'ritual'],
  ['A city services app for permits, notices, benefits, and public transit. Plain language, accessible.', 'Civic', 'civic'],
  ['A seasonal garden and recipe app for growing vegetables and cooking what you harvest. Warm, handmade.', 'Plot', 'organic'],
  ['A playful app for weekend plans with friends, stickers, and group ideas.', 'Crew', 'playground'],
  ['A boutique hotel and fashion booking app. Luxury, quiet, refined, serif.', 'Maison', 'luxe'],
  ['A simple everyday toolkit with a level, measure, timer, notes, and offline tools.', 'Bench', 'utility'],
  ['A quiet reading app for essays, books, and long-form journalism. Paper, serif, calm.', 'Folio', 'editorial'],
  ['A film festival app with screenings, tickets, and a lineup. Dark, cinematic, atmospheric.', 'Frame', 'cinematic'],
];

test('ten families, three variants each, unique ids', () => {
  const families = loadFamilies();
  assert.equal(families.length, 10);
  const ids = new Set();
  for (const family of families) {
    assert.equal(family.variants.length, 3, `${family.id} variants`);
    assert.ok(!ids.has(family.id), `duplicate family ${family.id}`);
    ids.add(family.id);
    for (const variant of family.variants) {
      assert.ok(variant.id, `${family.id} variant id`);
      assert.ok(variant.previewClass, `${family.id}/${variant.id} previewClass`);
    }
  }
});

test('every family passes contrast in both modes', () => {
  const results = validateFamilies();
  assert.equal(results.length, 10);
  for (const result of results) {
    for (const mode of ['light', 'dark']) {
      for (const [key, check] of Object.entries(result.contrast[mode])) {
        assert.equal(check.pass, true, `${result.id} ${mode} ${key} ${check.ratio}`);
      }
    }
  }
});

test('selection is deterministic for the same brief and name', () => {
  const brief = 'A calm app for sleep, meditation, and a bedtime ritual. Soft, gentle, breathing.';
  const a = createDesign(brief, { name: 'Dusk' });
  const b = createDesign(brief, { name: 'Dusk' });
  assert.equal(a.selection.family.id, b.selection.family.id);
  assert.equal(a.selection.variant.id, b.selection.variant.id);
  assert.equal(a.selection.accent.id, b.selection.accent.id);
  assert.equal(a.selection.mode, b.selection.mode);
  assert.deepEqual(a.tokens.color, b.tokens.color);
  assert.deepEqual(a.tokens.contrast, b.tokens.contrast);
});

test('different briefs produce different families', () => {
  const chosen = BRIEFS.map(([brief, name]) => createDesign(brief, { name }).selection.family.id);
  assert.deepEqual(chosen, BRIEFS.map(([, , expected]) => expected));
  assert.equal(new Set(chosen).size, 10);
});

test('a gentle children\'s story brief avoids the newspaper variant', () => {
  const design = createDesign(
    'A bedtime story app for children. Warm, playful, read-aloud, large art, gentle bedtime mode.',
    { name: 'Hush' },
  );
  assert.equal(design.selection.family.id, 'editorial');
  assert.equal(design.selection.variant.id, 'literary-journal');
});

test('"light and dark" requires both modes without forcing dark', () => {
  const result = createDesign('A local coffee guide for walking, with hours and a map. Mode: light and dark.', {
    name: 'Corner',
    familyId: 'spatial',
    variantId: 'trail-map',
  });
  assert.equal(result.selection.mode, 'light');
  const forced = createDesign('A local coffee guide. Mode: light and dark.', { name: 'Corner', mode: 'dark' });
  assert.equal(forced.selection.mode, 'dark');
});

test('family, variant, accent, and mode overrides are respected', () => {
  const families = loadFamilies();
  const editorial = families.find((family) => family.id === 'editorial');
  const variant = editorial.variants[1];
  const accent = editorial.palette.accents[1];
  const result = createDesign('a reading app for essays', {
    name: 'Folio',
    familyId: 'editorial',
    variantId: variant.id,
    accentId: accent.id,
    mode: 'dark',
  });
  assert.equal(result.selection.family.id, 'editorial');
  assert.equal(result.selection.variant.id, variant.id);
  assert.equal(result.selection.accent.id, accent.id);
  assert.equal(result.selection.mode, 'dark');
});

test('unknown family and variant fail with a useful message', () => {
  assert.throws(() => createDesign('a reading app', { familyId: 'nope' }), /Unknown family "nope"/);
  assert.throws(
    () => createDesign('a reading app', { familyId: 'editorial', variantId: 'nope' }),
    /Unknown variant "nope" for Editorial/,
  );
});

test('ambiguous briefs still produce a valid low-confidence direction', () => {
  const result = createDesign('qzxv wplk', { name: 'Mystery' });
  assert.ok(result.selection.family.id);
  assert.ok(result.selection.variant.id);
  assert.equal(result.selection.confidence, 'low');
});

test('writeDesign writes the complete bundle', () => {
  const dir = tempDir();
  const result = writeDesign(
    'A precise, dense portfolio app for tracking investments and market positions. Dark, technical.',
    { name: 'Ledger', outDir: dir },
  );
  const expected = ['DESIGN.md', 'design.json', 'tokens.json', 'preview.html', 'ios/Theme.swift', 'android/Theme.kt'];
  for (const file of expected) {
    assert.ok(fs.existsSync(path.join(dir, file)), `missing ${file}`);
  }

  const markdown = fs.readFileSync(path.join(dir, 'DESIGN.md'), 'utf8');
  assert.match(markdown, /## Agent brief/);
  assert.match(markdown, /Instrument/);
  assert.match(markdown, /Flight Deck|Trading Desk|Laboratory/);

  const design = JSON.parse(fs.readFileSync(path.join(dir, 'design.json'), 'utf8'));
  assert.equal(design.direction.family, 'instrument');
  assert.equal(design.studio, '0.2.0');

  const tokens = JSON.parse(fs.readFileSync(path.join(dir, 'tokens.json'), 'utf8'));
  assert.equal(tokens.contrast.light.text.pass, true);
  assert.equal(tokens.contrast.dark.text.pass, true);
  assert.equal(tokens.appName, 'Ledger');

  const swift = fs.readFileSync(path.join(dir, 'ios/Theme.swift'), 'utf8');
  assert.match(swift, /enum StudioTheme/);
  assert.match(swift, /static let accent/);

  const kotlin = fs.readFileSync(path.join(dir, 'android/Theme.kt'), 'utf8');
  assert.match(kotlin, /fun StudioTheme/);
  assert.match(kotlin, /lightColorScheme/);

  const html = fs.readFileSync(path.join(dir, 'preview.html'), 'utf8');
  assert.equal((html.match(/class="phone-screen"/g) ?? []).length, 2);
  assert.match(html, /data-mode="(light|dark)"/);
  assert.match(html, /class="mode-switch"/);
  assert.equal(result.written.length, 6);
});

test('every family renders a complete preview', () => {
  for (const family of loadFamilies()) {
    const result = createDesign('a native mobile app', {
      name: `Test ${family.name}`,
      familyId: family.id,
      variantId: family.variants[0].id,
      accentId: family.palette.accents[0].id,
    });
    const html = renderPreview(result.selection, result.tokens, result.design);
    assert.ok(html.length > 12000, `${family.id} preview too small`);
    assert.ok(html.includes(`variant-${family.variants[0].id}`), `${family.id} variant class`);
    assert.equal((html.match(/class="phone-screen"/g) ?? []).length, 2, `${family.id} screens`);
    assert.ok(!html.includes('__BG_LIGHT__'), `${family.id} has unfilled tokens`);
  }
});

test('CLI design emits machine-readable JSON and writes files', () => {
  const dir = tempDir();
  const result = spawnSync(
    process.execPath,
    [CLI, 'design', BRIEFS[1][0], '--name', 'North', '--out', dir, '--json'],
    { encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.direction.family, 'spatial');
  assert.equal(payload.direction.mode, 'light');
  assert.ok(fs.existsSync(payload.tokens));
  assert.ok(fs.existsSync(payload.ios));
  assert.ok(fs.existsSync(payload.android));
});

test('CLI families lists all ten families', () => {
  const result = spawnSync(process.execPath, [CLI, 'families'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const familyLines = result.stdout.split('\n').filter((line) => /^[a-z]/.test(line));
  assert.equal(familyLines.length, 10);
  assert.match(result.stdout, /instrument/);
  assert.match(result.stdout, /organic/);
});

test('CLI validate reports ten passing families', () => {
  const result = spawnSync(process.execPath, [CLI, 'validate'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /10 families validated/);
});
