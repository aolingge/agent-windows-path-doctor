import test from 'node:test';
import assert from 'node:assert/strict';
import { checkFile, formatAnnotations, formatMarkdown, formatSarif } from '../src/check.js';

test('good fixture scores higher than weak fixture', () => {
  const good = checkFile('fixtures/good.txt');
  const weak = checkFile('fixtures/weak.txt');
  assert.equal(good.score, 100);
  assert.ok(weak.score < good.score);
});

test('realistic fixture is usable for CI threshold', () => {
  const report = checkFile('fixtures/realistic.txt');
  assert.ok(report.score >= 75);
});

test('report formats are generated', () => {
  const report = checkFile('fixtures/weak.txt');
  assert.match(formatMarkdown(report), /Score:/);
  assert.match(formatAnnotations(report), /warning|^$/);
  assert.equal(formatSarif(report).version, '2.1.0');
});
