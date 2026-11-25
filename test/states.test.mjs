import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanProject } from '../src/scan.mjs';
import { runLint } from '../src/lint.mjs';
import { auditStates, formatStates } from '../src/states.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const fixture = (name) => path.join(root, 'evals', 'fixtures', name);

function audit(name) {
  const project = scanProject(fixture(name), { mode: 'release' });
  const lint = runLint(project, { mode: 'release' });
  return auditStates(project, { lint });
}

test('slop Android reports a partial data screen and dead controls', () => {
  const result = audit('slop-android');
  const home = result.rows.find((row) => row.screen === 'HomeScreen');

  assert.ok(home);
  assert.equal(home.content, true);
  assert.equal(home.loading, false);
  assert.equal(home.empty, false);
  assert.equal(home.error, false);
  assert.ok(home.dead >= 4);
  assert.ok(result.summary.partial >= 1);
  assert.ok(result.summary.incomplete >= 1);
});

test('clean fixtures have complete state coverage', () => {
  for (const name of ['clean-ios', 'clean-android']) {
    const result = audit(name);
    assert.equal(result.summary.incomplete, 0, `${name} should have no incomplete data screens`);
    const dataScreens = result.rows.filter((row) => row.content);
    assert.ok(dataScreens.length > 0);
    for (const row of dataScreens) {
      assert.equal(row.loading, true, `${name}/${row.screen} loading`);
      assert.equal(row.empty, true, `${name}/${row.screen} empty`);
      assert.equal(row.error, true, `${name}/${row.screen} error`);
    }
  }
});

test('formatted state table is aligned', () => {
  const text = formatStates(audit('slop-android'));
  assert.ok(text.includes('SCREEN'));
  assert.ok(!text.includes('static-'));
  assert.ok(text.includes('data screen'));
});

test('static screens are not counted as incomplete', () => {
  const result = audit('clean-android');
  const settings = result.rows.find((row) => row.screen === 'ComposeScreen');
  assert.ok(settings);
  assert.equal(settings.content, false);
  assert.equal(settings.status, 'static');
});

test('SCREAMING_SNAKE enum states are detected', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'idiom-states-'));
  const source = path.join(dir, 'HomeScreen.kt');
  fs.writeFileSync(
    source,
    `package com.example.states

import androidx.compose.foundation.lazy.LazyColumn

enum class HomeState { LOADING, READY, EMPTY, ERROR, OFFLINE }

fun HomeScreen(state: HomeState) {
    LazyColumn {
        when (state) {
            HomeState.LOADING -> item { }
            HomeState.EMPTY -> item { }
            HomeState.ERROR -> item { }
            HomeState.OFFLINE -> item { }
            else -> item { }
        }
    }
}
`,
  );

  const project = scanProject(dir, { mode: 'release' });
  const lint = runLint(project, { mode: 'release' });
  const result = auditStates(project, { lint });
  const home = result.rows.find((row) => row.screen === 'HomeScreen');

  assert.ok(home);
  assert.equal(home.loading, true);
  assert.equal(home.empty, true);
  assert.equal(home.error, true);
  assert.equal(home.offline, true);
  assert.equal(home.status, 'complete');

  fs.rmSync(dir, { recursive: true, force: true });
});
