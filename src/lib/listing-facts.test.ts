import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nsfasLabel } from './listing-facts';
const base = { nsfas_accredited: false, nsfas_verified: false } as never as Parameters<typeof nsfasLabel>[0];
test('host-declared NSFAS is never called accredited', () => assert.equal(nsfasLabel({ ...base, nsfas_accredited: true }), 'NSFAS: host-declared'));
test('verified NSFAS shows accredited', () => assert.equal(nsfasLabel({ ...base, nsfas_verified: true }), 'NSFAS-accredited'));
test('no claim shows nothing', () => assert.equal(nsfasLabel(base), null));
