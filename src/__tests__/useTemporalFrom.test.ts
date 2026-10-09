import { renderHook } from '@testing-library/react';
import { useTemporalFrom, useTemporalSafeParse } from '../index';
import { Temporal } from '../temporal';

describe('useTemporalFrom', () => {
  it('parses plain dates', () => {
    const { result } = renderHook(() => useTemporalFrom('plainDate', '2026-07-05'));
    expect(result.current).toEqual(Temporal.PlainDate.from('2026-07-05'));
  });
});

describe('useTemporalSafeParse', () => {
  it('returns error for invalid input', () => {
    const { result } = renderHook(() => useTemporalSafeParse('instant', 'not-a-date'));
    expect(result.current.value).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
