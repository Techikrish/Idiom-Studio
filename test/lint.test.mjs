import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanProject } from '../src/scan.mjs';
import { runLint } from '../src/lint.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const fixture = (name) => path.join(root, 'evals', 'fixtures', name);

function lintFixture(name, options = {}) {
  const mode = options.mode ?? 'release';
  const project = scanProject(fixture(name), { mode });
  return runLint(project, { mode, strict: true, ...options });
}

function idsIn(result) {
  return new Set(result.findings.map((finding) => finding.id));
}

test('iOS slop fixture triggers the expected floor rules', () => {
  const result = lintFixture('slop-ios');
  const ids = idsIn(result);

  for (const id of [
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
  ]) {
    assert.ok(ids.has(id), `expected ${id} in iOS slop fixture`);
  }

  assert.equal(result.gate, 'fail');
  assert.ok(result.summary.blocking > 0);
});

test('Android slop fixture triggers the expected floor rules', () => {
  const result = lintFixture('slop-android');
  const ids = idsIn(result);

  for (const id of [
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
  ]) {
    assert.ok(ids.has(id), `expected ${id} in Android slop fixture`);
  }

  assert.equal(result.gate, 'fail');
  assert.ok(result.summary.blocking > 0);
});

test('clean fixtures pass every rule in strict mode', () => {
  for (const name of ['clean-ios', 'clean-android']) {
    const result = lintFixture(name);
    assert.equal(
      result.findings.length,
      0,
      `${name} should be clean, got: ${result.findings.map((finding) => finding.id).join(', ')}`,
    );
    assert.equal(result.gate, 'pass');
  }
});

test('prototype mode downgrades honesty rules but keeps platform floors', () => {
  const result = lintFixture('slop-ios', { mode: 'prototype' });
  const fake = result.findings.find((finding) => finding.id === 'fake-data');
  const dead = result.findings.find((finding) => finding.id === 'dead-control');
  const contrast = result.findings.find((finding) => finding.id === 'a11y-contrast');

  assert.equal(fake.tier, 'reflex');
  assert.equal(fake.originalTier, 'floor');
  assert.equal(dead.tier, 'reflex');
  assert.equal(contrast.tier, 'floor');
});

test('safe-area rule allows a background to ignore the safe area', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'idiom-safe-area-'));
  const file = path.join(directory, 'App', 'FeedView.swift');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    `import SwiftUI

struct FeedView: View {
    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            List {
                Text("Item")
            }
        }
    }
}
`,
  );
  try {
    const project = scanProject(directory, { mode: 'release' });
    const result = runLint(project, { mode: 'release', strict: true });
    assert.ok(
      !result.findings.some((finding) => finding.id === 'ios-safe-area-ignore'),
      'background-only ignoresSafeArea should not be flagged',
    );
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('findings point at usage, not imports', () => {
  const result = lintFixture('slop-android');
  const state = result.findings.find(
    (finding) => finding.id === 'state-missing' && finding.file.endsWith('HomeScreen.kt'),
  );
  const edge = result.findings.find((finding) => finding.id === 'android-edge-to-edge');

  assert.ok(state);
  assert.ok(!state.snippet.startsWith('import '));
  assert.ok(edge);
  assert.ok(!edge.snippet.startsWith('import '));
  assert.match(edge.snippet, /^setContent/);
});
