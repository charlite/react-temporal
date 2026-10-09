import { describe, expect, it } from 'vitest';
import { formatRelativeTime } from '../utils/formatRelative';

describe('formatRelativeTime', () => {
  it('uses minutes for 90-minute spans', () => {
    const label = formatRelativeTime(90 * 60, 'en');
    expect(label).toMatch(/90/);
    expect(label).toMatch(/minute/i);
  });
});
