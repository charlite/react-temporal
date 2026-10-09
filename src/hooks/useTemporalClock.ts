import { useCallback } from 'react';
import { Temporal } from '../temporal';
import { useTemporalTicker } from '../internal/useTemporalTicker';
import type { UseTemporalClockOptions, TemporalInstant } from '../types';

/**
 * Returns the current Temporal.Instant, updating at a configurable interval.
 */
export function useTemporalClock(options?: UseTemporalClockOptions): TemporalInstant {
    const { intervalMs = 1000, pauseWhenHidden = false } = options ?? {};

    const getNow = useCallback(() => Temporal.Now.instant(), []);

    return useTemporalTicker({
        intervalMs,
        pauseWhenHidden,
        getSnapshot: getNow,
    });
}
