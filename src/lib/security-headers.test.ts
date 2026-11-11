import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applySecurityHeaders } from './security-headers';

test('responses prevent MIME sniffing', () => {
  assert.equal(applySecurityHeaders(new Response()).headers.get('X-Content-Type-Options'), 'nosniff');
});
test('responses restrict browser camera, microphone and geolocation', () => {
  assert.equal(applySecurityHeaders(new Response()).headers.get('Permissions-Policy'), 'camera=(), microphone=(), geolocation=()');
});
test('security headers preserve response status and content', async () => {
  const response = applySecurityHeaders(new Response('denied', { status: 403 }));
  assert.equal(response.status, 403);
  assert.equal(await response.text(), 'denied');
});