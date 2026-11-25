import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSource } from '../src/tokenize.mjs';

test('masks comments and string contents without changing line numbers', () => {
  const source = [
    'func f() { // comment',
    '  let a = "}"',
    '  let b = "x // y"',
    '  /* block',
    '     comment */',
    '}',
  ].join('\n');
  const parsed = parseSource(source, 'swift');

  assert.equal(parsed.masked.split('\n').length, source.split('\n').length);
  assert.equal((parsed.masked.match(/\{/g) ?? []).length, 1);
  assert.equal((parsed.masked.match(/\}/g) ?? []).length, 1);
  assert.equal(parsed.comments.length, 2);
  assert.deepEqual(
    parsed.strings.map((string) => string.value),
    ['}', 'x // y'],
  );
  assert.ok(!parsed.masked.includes('comment'));
  assert.ok(!parsed.masked.includes('x // y'));
});

test('handles Kotlin triple-quoted strings and char literals', () => {
  const source = [
    'val text = """',
    '  { not a brace }',
    '"""',
    "val quote = '}'",
    'val done = true',
  ].join('\n');
  const parsed = parseSource(source, 'kotlin');

  assert.equal((parsed.masked.match(/\{/g) ?? []).length, 0);
  assert.equal((parsed.masked.match(/\}/g) ?? []).length, 0);
  assert.equal(parsed.strings.length, 1);
  assert.ok(parsed.strings[0].value.includes('{ not a brace }'));
  assert.ok(!parsed.masked.includes('not a brace'));
});

test('masks XML comments but preserves attribute values', () => {
  const source = [
    '<manifest>',
    '  <!-- portrait -->',
    '  <activity android:screenOrientation="portrait" />',
    '</manifest>',
  ].join('\n');
  const parsed = parseSource(source, 'xml');

  assert.ok(!parsed.masked.includes('portrait -->'));
  assert.ok(parsed.masked.includes('android:screenOrientation="portrait"'));
  assert.equal(parsed.comments.length, 1);
});
