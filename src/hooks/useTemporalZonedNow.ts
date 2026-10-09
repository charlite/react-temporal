import { useCallback } from 'react';
import { Temporal } from '../temporal';
import { useTemporalTicker } from '../internal/useTemporalTicker';
import type { UseTemporalClockOptions, TemporalZonedDateTime } from '../types';

/**
 * Returns the current Temporal.ZonedDateTime for the given IANA time zone,
 * updating at a configurable interval.
 */
export function useTemporalZonedNow(
    timeZone: string,
    options?: UseTemporalClockOptions,
): TemporalZonedDateTime {
    const { intervalMs = 1000, pauseWhenHidden = false } = options ?? {};

    const getNow = useCallback(() => Temporal.Now.zonedDateTimeISO(timeZone), [timeZone]);

    return useTemporalTicker({
        intervalMs,
        pauseWhenHidden,
        getSnapshot: getNow,
    });
}
