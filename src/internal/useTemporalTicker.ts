import { useEffect, useState } from 'react';
import { useLatest } from './useLatest';

export interface UseTemporalTickerOptions<T> {
    intervalMs: number;
    getSnapshot: () => T;
    /** When true, pauses updates while `document.hidden` (browser only). */
    pauseWhenHidden?: boolean;
    enabled?: boolean;
}

/**
 * Shared interval driver for live clock hooks.
 */
export function useTemporalTicker<T>({
    intervalMs,
    getSnapshot,
    pauseWhenHidden = false,
    enabled = true,
}: UseTemporalTickerOptions<T>): T {
    const getSnapshotRef = useLatest(getSnapshot);
    const [value, setValue] = useState(() => getSnapshotRef.current());

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const tick = () => setValue(getSnapshotRef.current());

        if (pauseWhenHidden && typeof document !== 'undefined') {
            const onVisibility = () => {
                if (!document.hidden) {
                    tick();
                }
            };
            document.addEventListener('visibilitychange', onVisibility);
            const id = setInterval(() => {
                if (!document.hidden) {
                    tick();
                }
            }, intervalMs);

            return () => {
                clearInterval(id);
                document.removeEventListener('visibilitychange', onVisibility);
            };
        }

        const id = setInterval(tick, intervalMs);
        return () => clearInterval(id);
    }, [enabled, intervalMs, pauseWhenHidden, getSnapshotRef]);

    return value;
}
