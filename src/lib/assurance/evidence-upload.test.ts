import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requireEvidenceUploads } from './evidence-upload';

test('document uploads are blocked while virus checking is not set up', () => {
  assert.throws(() => requireEvidenceUploads(), /uploads are blocked/);
});