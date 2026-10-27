import { test } from 'node:test';
import assert from 'node:assert/strict';
import { concernSchema, urgency, officialLabel } from './safety-rules';
import { encryptPrivate, decryptPrivate } from './encryption.server';
test('explicit consent is required',()=>assert.equal(concernSchema.safeParse({category:'other',description:'A residence concern',sharingScope:'safety_staff_only',consent:false}).success,false));
test('urgent danger receives critical priority',()=>assert.equal(urgency('urgent_danger'),'critical'));
test('expired official evidence is labelled expired',()=>assert.equal(officialLabel('accreditation','Named institution','expired'),'Expired confirmation · Named institution'));
test('private report round-trips only for its owner context',async()=>{const encrypted=await encryptPrivate('Private fictional report','test-only-secret','owner-a');assert.equal(encrypted.includes('Private fictional report'),false);assert.equal(await decryptPrivate(encrypted,'test-only-secret','owner-a'),'Private fictional report');await assert.rejects(()=>decryptPrivate(encrypted,'test-only-secret','owner-b'));});
