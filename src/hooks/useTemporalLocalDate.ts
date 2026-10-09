import { useCallback } from 'react';
import { Temporal } from '../temporal';
import { useTemporalTicker } from '../internal/useTemporalTicker';
import type { TemporalPlainDate, UseTemporalClockOptions } from '../types';

/**
 * Returns today's calendar date in the given IANA time zone, updating across midnight.
 */
export function useTemporalLocalDate(
    timeZone: string,
    options?: UseTemporalClockOptions,
): TemporalPlainDate {
    const { intervalMs = 60_000, pauseWhenHidden = false } = options ?? {};

    const getDate = useCallback(
        () => Temporal.Now.zonedDateTimeISO(timeZone).toPlainDate(),
        [timeZone],
    );

    return useTemporalTicker({
        intervalMs,
        pauseWhenHidden,
        getSnapshot: getDate,
    });
}
