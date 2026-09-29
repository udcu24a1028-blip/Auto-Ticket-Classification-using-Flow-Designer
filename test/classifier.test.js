const test = require('node:test');
const assert = require('node:assert');
const { classifyIncident } = require('../src/classifier');
const config = require('../config/categories.json');
const samples = require('../data/sample_incidents.json');

for (const s of samples) {
  test(`classifies "${s.short_description}" as ${s.expected}`, () => {
    const r = classifyIncident(s.short_description, s.description, config);
    assert.strictEqual(r.rule, s.expected);
  });
}

test('unmatched tickets are flagged for manual review', () => {
  const r = classifyIncident('Library card', 'need one', config);
  assert.strictEqual(r.needs_review, true);
  assert.strictEqual(r.assignment_group, 'Service Desk');
});

test('handles empty input without throwing', () => {
  const r = classifyIncident(undefined, null, config);
  assert.strictEqual(r.matched, false);
});
