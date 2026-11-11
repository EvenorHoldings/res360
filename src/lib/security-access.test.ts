import { test } from 'node:test';
import assert from 'node:assert/strict';

const url = process.env['SUPABASE_URL'];
const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
if (!url || !key) throw new Error('Public database configuration is required for access regression tests.');
const headers = { apikey: key, 'Content-Type': 'application/json' };

test('signed-out visitors cannot read staff settings', async () => {
  const res = await fetch(`${url}/rest/v1/site_settings?select=staff_alert_email`, { headers });
  assert.equal(res.status, 401);
});

test('signed-out visitors cannot probe admin membership', async () => {
  const res = await fetch(`${url}/rest/v1/rpc/has_role`, {
    method: 'POST', headers,
    body: JSON.stringify({ _user_id: '00000000-0000-4000-8000-000000000001', _role: 'admin' }),
  });
  assert.equal(res.status, 200);
  assert.equal(await res.json(), false);
});

test('signed-out visitors cannot probe MFA staff membership', async () => {
  const res = await fetch(`${url}/rest/v1/rpc/is_assurance_staff`, {
    method: 'POST', headers,
    body: JSON.stringify({ _uid: '00000000-0000-4000-8000-000000000001' }),
  });
  assert.equal(res.status, 200);
  assert.equal(await res.json(), false);
});

test('signed-out visitors cannot reserve paid AI matching requests', async () => {
  const res = await fetch(`${url}/rest/v1/rpc/consume_ai_matching_request`, { method: 'POST', headers, body: '{}' });
  assert.equal(res.status, 401);
});

test('public demo visibility remains available without exposing settings', async () => {
  const res = await fetch(`${url}/rest/v1/rpc/show_demo_listings`, { method: 'POST', headers, body: '{}' });
  assert.equal(res.status, 200);
  assert.equal(typeof await res.json(), 'boolean');
});