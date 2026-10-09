import { useCallback } from 'react';
import { Temporal } from '../temporal';
import { useTemporalTicker } from '../internal/useTemporalTicker';
import type { TemporalInstant, UseTemporalClockOptions } from '../types';

/**
 * Returns elapsed whole seconds since a past `Temporal.Instant` (0 if the instant is in the future).
 */
export function useTemporalElapsed(
    since: TemporalInstant,
    options?: UseTemporalClockOptions,
): number {
    const { intervalMs = 1000, pauseWhenHidden = false } = options ?? {};

    const getElapsed = useCallback(() => {
        const seconds = since.until(Temporal.Now.instant()).total('seconds');
        return Math.max(0, Math.floor(seconds));
    }, [since]);

    return useTemporalTicker({
        intervalMs,
        pauseWhenHidden,
        getSnapshot: getElapsed,
    });
}
