import { useEffect } from 'react';
import { Temporal } from '../temporal';
import { useLatest } from '../internal/useLatest';
import type { TemporalInstant } from '../types';

export interface UseTemporalScheduleOptions {
    /** When true (default), run immediately if the instant is already in the past. */
    runIfPast?: boolean;
}

/**
 * Schedules a callback to run at a specific Temporal.Instant.
 */
export function useTemporalSchedule(
    callback: () => void,
    instant: TemporalInstant,
    options?: UseTemporalScheduleOptions,
) {
    const { runIfPast = true } = options ?? {};
    const savedCallback = useLatest(callback);

    useEffect(() => {
        const now = Temporal.Now.instant();
        const ms = instant.epochMilliseconds - now.epochMilliseconds;

        if (ms <= 0) {
            if (runIfPast) {
                savedCallback.current();
            }
            return;
        }

        const id = setTimeout(() => savedCallback.current(), ms);
        return () => clearTimeout(id);
    }, [instant, runIfPast, savedCallback]);
}
