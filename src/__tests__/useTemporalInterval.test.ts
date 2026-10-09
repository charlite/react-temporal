import { renderHook } from '@testing-library/react';
import { useTemporalInterval } from '../hooks/useTemporalInterval';

describe('useTemporalInterval', () => {
  it('runs callback at interval', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    renderHook(() => useTemporalInterval(callback, { seconds: 1 }));
    vi.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
