import { useEffect } from 'react';
import { durationKey, durationToMilliseconds } from '../internal/durationKey';
import { useLatest } from '../internal/useLatest';
import type { TemporalDurationLike } from '../types';

/**
 * Runs a callback at a given Temporal.Duration interval.
 * Duration values are normalized for stable effect dependencies.
 */
export function useTemporalInterval(callback: () => void, duration: TemporalDurationLike) {
    const savedCallback = useLatest(callback);
    const key = durationKey(duration);

    useEffect(() => {
        const ms = durationToMilliseconds(duration);
        const id = setInterval(() => savedCallback.current(), ms);
        return () => clearInterval(id);
    }, [key, savedCallback]);
}
