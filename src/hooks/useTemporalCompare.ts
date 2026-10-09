import { useMemo } from 'react';
import { Temporal } from '../temporal';
import type { TemporalInstant, TemporalPlainDate } from '../types';

type Comparable = TemporalInstant | TemporalPlainDate;

function isInstant(value: Comparable): value is TemporalInstant {
    return typeof value === 'object' && value !== null && 'epochMilliseconds' in value && !('year' in value);
}

function isPlainDate(value: Comparable): value is TemporalPlainDate {
    return (
        typeof value === 'object' &&
        value !== null &&
        'year' in value &&
        'month' in value &&
        'day' in value &&
        !('epochMilliseconds' in value)
    );
}

function compareValues(a: Comparable, b: Comparable): number {
    if (isInstant(a) && isInstant(b)) {
        return Temporal.Instant.compare(a, b);
    }
    if (isPlainDate(a) && isPlainDate(b)) {
        return Temporal.PlainDate.compare(a, b);
    }
    throw new TypeError('useTemporalCompare requires two Instants or two PlainDates');
}

/**
 * Memoized Temporal compare result: negative if `a` is before `b`, positive if after, 0 if equal.
 */
export function useTemporalCompare(a: Comparable, b: Comparable): number {
    return useMemo(() => compareValues(a, b), [a, b]);
}
