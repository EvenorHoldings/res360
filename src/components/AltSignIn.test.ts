import { describe, it, expect } from 'vitest';
import { friendlyOAuthError } from './AltSignIn';
describe('Microsoft admin approval message', () => {
  it('falls back to student verification', () => {
    expect(friendlyOAuthError('AADSTS65001: admin consent required')).toMatch(/verify your student status/);
  });
  it('keeps other errors', () => { expect(friendlyOAuthError('Network down')).toBe('Network down'); });
});
