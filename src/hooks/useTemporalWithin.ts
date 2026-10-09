import { useMemo } from 'react';
import { Temporal } from '../temporal';
import type { TemporalInstant, TemporalPlainDate } from '../types';

function isInstant(value: TemporalInstant | TemporalPlainDate): value is TemporalInstant {
    return typeof value === 'object' && value !== null && 'epochMilliseconds' in value && !('year' in value);
}

function isPlainDate(value: TemporalInstant | TemporalPlainDate): value is TemporalPlainDate {
    return (
        typeof value === 'object' &&
        value !== null &&
        'year' in value &&
        'month' in value &&
        'day' in value &&
        !('epochMilliseconds' in value)
    );
}

/**
 * True when `value` is inclusively between `start` and `end`.
 */
export function useTemporalWithin(
    value: TemporalInstant | TemporalPlainDate,
    start: TemporalInstant | TemporalPlainDate,
    end: TemporalInstant | TemporalPlainDate,
): boolean {
    return useMemo(() => {
        if (isInstant(value) && isInstant(start) && isInstant(end)) {
            return (
                Temporal.Instant.compare(value, start) >= 0 &&
                Temporal.Instant.compare(value, end) <= 0
            );
        }
        if (isPlainDate(value) && isPlainDate(start) && isPlainDate(end)) {
            return (
                Temporal.PlainDate.compare(value, start) >= 0 &&
                Temporal.PlainDate.compare(value, end) <= 0
            );
        }
        throw new TypeError('useTemporalWithin requires matching Instant or PlainDate operands');
    }, [value, start, end]);
}
