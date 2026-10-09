import { renderHook } from '@testing-library/react';
import { useTemporalWithin } from '../hooks/useTemporalWithin';
import { Temporal } from '../temporal';

describe('useTemporalWithin', () => {
  it('returns true for instants inside the range', () => {
    const start = Temporal.Instant.from('2026-01-01T00:00:00Z');
    const end = Temporal.Instant.from('2026-12-31T23:59:59Z');
    const value = Temporal.Instant.from('2026-07-01T12:00:00Z');
    const { result } = renderHook(() => useTemporalWithin(value, start, end));
    expect(result.current).toBe(true);
  });
});
