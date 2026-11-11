import { test } from 'node:test';
import assert from 'node:assert/strict';
import { redact, looksLikeSafety } from './redact';
test('redacts email, phone and ID number', () => {
  assert.equal(redact('mail me at thabo@uni.ac.za or 082 123 4567, ID 9001015800087'), 'mail me at [email] or [phone], ID [id-number]');
  assert.equal(redact('+27 82 123 4567'), '[phone]');
});
test('flags safety messages', () => { assert.ok(looksLikeSafety('My landlord threatened me')); assert.ok(!looksLikeSafety('cheap room near UJ')); });
