import { useMemo } from 'react';
import { useTemporalCountdown } from './useTemporalCountdown';
import type { TemporalInstant, UseTemporalCountdownOptions } from '../types';

export interface TemporalCountdownStatus {
    /** Whole seconds remaining (0 when complete). */
    seconds: number;
    /** True when the target instant has been reached or passed. */
    isComplete: boolean;
}

/**
 * Countdown with structured status (seconds + completion flag).
 */
export function useTemporalCountdownStatus(
    target: TemporalInstant,
    options?: UseTemporalCountdownOptions,
): TemporalCountdownStatus {
    const seconds = useTemporalCountdown(target, options);
    return useMemo(
        () => ({
            seconds,
            isComplete: seconds === 0,
        }),
        [seconds],
    );
}
