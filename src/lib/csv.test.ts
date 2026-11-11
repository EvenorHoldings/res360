import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv } from './csv';
test('parses quoted commas and blank price', () => {
  const r = parseCsv('name,address,price_from_zar\r\n"Res, One","1 Main St",\n');
  assert.deepEqual(r, [{ name: 'Res, One', address: '1 Main St', price_from_zar: '' }]);
});
