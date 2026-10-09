import { useCallback } from 'react';
import { Temporal } from '../temporal';
import { useTemporalTicker } from '../internal/useTemporalTicker';
import type { UseTemporalNowOptions, TemporalInstant, TemporalZonedDateTime } from '../types';

/**
 * Returns the current time as a Temporal.Instant (or ZonedDateTime when timeZone is set),
 * updating at the configured interval.
 */
export function useTemporalNow(options?: UseTemporalNowOptions): TemporalInstant | TemporalZonedDateTime {
    const { intervalMs = 1000, timeZone, pauseWhenHidden = false } = options ?? {};

    const getNow = useCallback(
        () =>
            timeZone ? Temporal.Now.zonedDateTimeISO(timeZone) : Temporal.Now.instant(),
        [timeZone],
    );

    return useTemporalTicker({
        intervalMs,
        pauseWhenHidden,
        getSnapshot: getNow,
    });
}
