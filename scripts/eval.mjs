import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadMaterials, resolveDirection } from '../src/direction.mjs';
import { runLint } from '../src/lint.mjs';
import { scanProject } from '../src/scan.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const fixture = (name) => path.join(root, 'evals', 'fixtures', name);

const expected = {
  'slop-ios': [
    'ios-fixed-type',
    'ios-custom-back',
    'ios-safe-area-ignore',
    'ios-liquid-glass-content',
    'ios-emoji-content',
    'a11y-label',
    'a11y-touch-target',
    'a11y-contrast',
    'state-missing',
    'dead-control',
    'fake-data',
    'fake-success',
    'dark-pattern-consent',
    'raw-color',
    'pill-everything',
    'gradient-glass',
    'spacing-grid',
  ],
  'slop-android': [
    'android-orientation-lock',
    'android-tab-overflow',
    'android-no-adaptive',
    'android-ime-insets',
    'android-edge-to-edge',
    'android-predictive-back',
    'android-system-bar-color',
    'android-default-purple',
    'android-fab-stack',
    'android-custom-topbar',
    'android-fixed-sp',
    'state-missing',
    'dead-control',
    'fake-data',
    'dark-pattern-consent',
    'a11y-label',
    'a11y-touch-target',
    'a11y-contrast',
    'raw-color',
    'card-stack',
    'pill-everything',
    'emoji-icon',
    'spacing-grid',
  ],
};

function evaluate(name, expectedIds) {
  const project = scanProject(fixture(name), { mode: 'release' });
  const result = runLint(project, { mode: 'release', strict: true });
  const found = new Set(result.findings.map((finding) => finding.id));
  const hits = expectedIds.filter((id) => found.has(id));
  const recall = hits.length / expectedIds.length;
  return { name, expected: expectedIds.length, found: found.size, recall, gate: result.gate };
}

function control(name) {
  const project = scanProject(fixture(name), { mode: 'release' });
  const result = runLint(project, { mode: 'release', strict: true });
  return {
    name,
    findings: result.findings.length,
    gate: result.gate,
    ids: result.findings.map((finding) => finding.id),
  };
}

function directionCheck() {
  const materials = loadMaterials();
  const ledger = [];
  const chosen = [];
  for (let index = 0; index < 10; index += 1) {
    const direction = resolveDirection({
      materials,
      name: 'Ledger',
      category: 'finance analytics',
      adjectives: 'precise, dense, calm',
      seed: `eval-${index}`,
      ledger,
    });
    const recent = ledger.slice(-3).map((entry) => entry.material);
    if (recent.includes(direction.material.id)) return false;
    chosen.push(direction.material.id);
    ledger.push({
      material: direction.material.id,
      accent: direction.material.colors.light.accent,
      shape: direction.material.shape.family,
    });
  }
  return new Set(chosen).size > 1;
}

let failed = false;

console.log('Idiom eval\n');
console.log('SLOP FIXTURES');
console.log('name             expected  found  recall  gate');
for (const [name, ids] of Object.entries(expected)) {
  const result = evaluate(name, ids);
  console.log(
    `${result.name.padEnd(16)} ${String(result.expected).padEnd(9)} ${String(result.found).padEnd(
      6,
    )} ${`${Math.round(result.recall * 100)}%`.padEnd(7)} ${result.gate}`,
  );
  if (result.recall < 0.85 || result.gate !== 'fail') failed = true;
}

console.log('\nCONTROL FIXTURES');
console.log('name             findings  gate');
for (const name of ['clean-ios', 'clean-android']) {
  const result = control(name);
  console.log(`${result.name.padEnd(16)} ${String(result.findings).padEnd(9)} ${result.gate}`);
  if (result.findings !== 0 || result.gate !== 'pass') {
    failed = true;
    if (result.ids.length > 0) console.log(`  unexpected: ${result.ids.join(', ')}`);
  }
}

const directionOk = directionCheck();
console.log(`\nDirection rotation: ${directionOk ? 'pass' : 'fail'} (10 runs, no repeat within 3)`);
if (!directionOk) failed = true;

console.log('\nThresholds: recall >= 85%, zero findings on controls, every slop gate fails.');
if (failed) {
  console.log('EVAL FAILED');
  process.exitCode = 1;
} else {
  console.log('EVAL PASSED');
}
