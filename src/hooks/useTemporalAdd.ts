import { useMemo } from 'react';
import { durationKey } from '../internal/durationKey';
import type { TemporalDurationLike, TemporalInstant, TemporalPlainDate } from '../types';

type Addable = TemporalInstant | TemporalPlainDate;

/**
 * Memoized `temporal.add(duration)` for PlainDate or Instant values.
 */
export function useTemporalAdd<T extends Addable>(value: T, duration: TemporalDurationLike): T {
    const key = durationKey(duration);
    return useMemo(() => value.add(duration) as T, [value, key]);
}
