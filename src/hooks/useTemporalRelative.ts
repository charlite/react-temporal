import { useMemo } from 'react';
import { formatRelativeTime } from '../utils/formatRelative';
import type { TemporalInstant } from '../types';

/**
 * Returns a locale-aware relative time string between two instants
 * (e.g. "in 3 hours", "2 days ago") using Intl.RelativeTimeFormat.
 */
export function useTemporalRelative(
    from: TemporalInstant,
    to: TemporalInstant,
    locales?: string | string[],
    options?: Intl.RelativeTimeFormatOptions,
) {
    return useMemo(() => {
        const totalSeconds = from.until(to).total('seconds');
        return formatRelativeTime(totalSeconds, locales, options);
    }, [from, to, locales, options]);
}
