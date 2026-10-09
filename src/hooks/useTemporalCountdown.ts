import { useCallback, useEffect, useRef } from 'react';
import { Temporal } from '../temporal';
import { useLatest } from '../internal/useLatest';
import { useTemporalTicker } from '../internal/useTemporalTicker';
import type { TemporalInstant, UseTemporalCountdownOptions } from '../types';

/**
 * Returns the remaining seconds until a target Temporal.Instant.
 */
export function useTemporalCountdown(
    target: TemporalInstant,
    options?: UseTemporalCountdownOptions,
): number {
    const { intervalMs = 1000, onComplete } = options ?? {};
    const completedRef = useRef(false);
    const onCompleteRef = useLatest(onComplete ?? (() => {}));

    const getRemaining = useCallback(
        () =>
            Math.max(
                0,
                Math.floor(Temporal.Now.instant().until(target).total('seconds')),
            ),
        [target],
    );

    const remaining = useTemporalTicker({
        intervalMs,
        getSnapshot: getRemaining,
    });

    useEffect(() => {
        completedRef.current = false;
    }, [target]);

    useEffect(() => {
        if (remaining === 0 && !completedRef.current) {
            completedRef.current = true;
            onCompleteRef.current();
        }
    }, [remaining, onCompleteRef]);

    return remaining;
}
