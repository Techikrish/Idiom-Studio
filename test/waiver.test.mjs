import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { scanProject } from '../src/scan.mjs';
import { runLint } from '../src/lint.mjs';

function tempProject(source) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'idiom-waiver-'));
  const file = path.join(directory, 'App', 'BrandView.swift');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, source);
  return directory;
}

function lint(directory) {
  const project = scanProject(directory, { mode: 'release' });
  return runLint(project, { mode: 'release', strict: true });
}

test('an inline waiver with a reason suppresses a finding', () => {
  const directory = tempProject(`import SwiftUI

struct BrandView: View {
    var body: some View {
        Text("Brand")
            .font(.system(size: 17)) // idiom-ignore ios-fixed-type: brand display size
    }
}
`);
  try {
    const result = lint(directory);
    assert.equal(result.findings.length, 1);
    assert.equal(result.findings[0].waived, true);
    assert.equal(result.findings[0].waiverReason, 'brand display size');
    assert.equal(result.gate, 'pass');
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('a waiver without a reason does not suppress anything', () => {
  const directory = tempProject(`import SwiftUI

struct BrandView: View {
    var body: some View {
        Text("Brand")
            .font(.system(size: 17)) // idiom-ignore ios-fixed-type
    }
}
`);
  try {
    const result = lint(directory);
    assert.equal(result.findings.length, 1);
    assert.equal(result.findings[0].waived, false);
    assert.equal(result.gate, 'fail');
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('a file-level waiver suppresses every matching finding', () => {
  const directory = tempProject(`import SwiftUI
// idiom-ignore-file ios-fixed-type: brand type is part of the identity

struct BrandView: View {
    var body: some View {
        VStack {
            Text("Brand").font(.system(size: 17))
            Text("Tagline").font(.system(size: 13))
        }
    }
}
`);
  try {
    const result = lint(directory);
    const fixed = result.findings.filter((finding) => finding.id === 'ios-fixed-type');
    assert.equal(fixed.length, 2);
    assert.ok(fixed.every((finding) => finding.waived));
    assert.equal(result.gate, 'pass');
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
