import { describe, expect, it } from 'vitest';
import { getTemporal, hasNativeTemporal } from '../temporal';

describe('hasNativeTemporal', () => {
  it('reflects globalThis.Temporal and getTemporal() always resolves', () => {
    expect(hasNativeTemporal()).toBe(typeof globalThis.Temporal !== 'undefined');
    expect(getTemporal().Instant).toBeDefined();
    if (hasNativeTemporal()) {
      expect(getTemporal()).toBe(globalThis.Temporal);
    }
  });
});
