import { useCallback, useMemo } from 'react';
import { Temporal } from '../temporal';
import { useTemporalTicker } from '../internal/useTemporalTicker';
import type { TemporalDuration, TemporalInstant, UseTemporalClockOptions } from '../types';

export interface UseTemporalStopwatchResult {
    /** Elapsed time from `start` until now. */
    elapsed: TemporalDuration;
    /** Whole seconds elapsed (floor). */
    seconds: number;
}

/**
 * Live stopwatch from a fixed start instant, updating on an interval.
 */
export function useTemporalStopwatch(
    start: TemporalInstant,
    options?: UseTemporalClockOptions,
): UseTemporalStopwatchResult {
    const { intervalMs = 100, pauseWhenHidden = false } = options ?? {};

    const getElapsed = useCallback(
        () => start.until(Temporal.Now.instant()),
        [start],
    );

    const elapsed = useTemporalTicker({
        intervalMs,
        pauseWhenHidden,
        getSnapshot: getElapsed,
    });

    const seconds = useMemo(() => Math.max(0, Math.floor(elapsed.total('seconds'))), [elapsed]);

    return { elapsed, seconds };
}
