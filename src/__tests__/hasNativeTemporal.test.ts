import { describe, expect, it } from 'vitest';
import { getTemporal, hasNativeTemporal } from '../temporal';

describe('hasNativeTemporal', () => {
  it('returns a Temporal namespace from getTemporal', () => {
    expect(hasNativeTemporal()).toBe(false);
    expect(getTemporal().Instant).toBeDefined();
  });
});
