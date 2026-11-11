import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterHelp } from './help-search';
const a = (id: string, audience: string, question: string) => ({ id, audience, question, answer_md: '', category_id: null, sort: 0 });
const list = [a('1', 'student', 'Rent calculator'), a('2', 'landlord', 'List a room'), a('3', 'all', 'Sign up')];
test('landlord tab shows landlord and everyone articles only', () => assert.deepEqual(filterHelp(list, 'landlord', '').map(x => x.id), ['2', '3']));
test('search matches all words', () => assert.deepEqual(filterHelp(list, 'all', 'rent calc').map(x => x.id), ['1']));
