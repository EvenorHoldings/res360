import { test } from 'node:test';
import assert from 'node:assert/strict';
import { institutionsFor,matchingInstitutions,PROVINCES } from './institution-catalog';
test('all nine provinces remain available',()=>assert.equal(PROVINCES.length,9));
test('Cape Town institutions include UCT and College of Cape Town',()=>{const names=institutionsFor('Western Cape','Cape Town').map(i=>i.name);assert.ok(names.includes('University of Cape Town'));assert.ok(names.includes('College of Cape Town for TVET'));assert.ok(!names.includes('University of Johannesburg'));});
test('UNISA remains available across provinces and cities',()=>assert.ok(institutionsFor('Western Cape','Cape Town').some(i=>i.national&&i.name.includes('Unisa'))));
test('nicknames resolve to the supplied institution',()=>{assert.ok(matchingInstitutions('near Wits').some(i=>i.name==='University of the Witwatersrand'));assert.ok(matchingInstitutions('near UCT').some(i=>i.name==='University of Cape Town'));assert.ok(matchingInstitutions('Maties').some(i=>i.name==='Stellenbosch University'));});
test('TVET filter excludes public universities',()=>assert.ok(institutionsFor('Gauteng','','TVET College').every(i=>i.type==='TVET College')));

import { canonicalCity, citiesFor as cf, institutionsFor as inf } from './institution-catalog';
describe('canonical cities', () => {
  it('resolves aliases', () => {
    expect(canonicalCity('Port Elizabeth')).toBe('Gqeberha');
    expect(canonicalCity('Nelspruit')).toBe('Mbombela');
    expect(canonicalCity('Grahamstown')).toBe('Makhanda');
    expect(canonicalCity('Turfloop')).toBe('Mankweng');
    expect(canonicalCity('Germiston')).toBe('Ekurhuleni');
  });
  it('lists no duplicates and one Other town per province', () => {
    const ec = cf('Eastern Cape');
    expect(ec).toContain('Gqeberha');
    expect(ec).not.toContain('Gqeberha (Port Elizabeth)');
    expect(ec.filter(c => c.startsWith('Other')).length).toBe(1);
    expect(ec.at(-1)).toBe('Other town in Eastern Cape');
  });
  it('alias city finds institutions', () => {
    expect(inf('Eastern Cape', 'Port Elizabeth').some(i => i.name === 'Nelson Mandela University')).toBe(true);
  });
});
