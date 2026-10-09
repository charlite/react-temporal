const RELATIVE_UNITS: Array<{ unit: Intl.RelativeTimeFormatUnit; seconds: number }> = [
    { unit: 'year', seconds: 31_536_000 },
    { unit: 'month', seconds: 2_592_000 },
    { unit: 'week', seconds: 604_800 },
    { unit: 'day', seconds: 86_400 },
    { unit: 'hour', seconds: 3_600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
];

/**
 * Formats the span from `from` to `to` with Intl.RelativeTimeFormat.
 * Chooses the coarsest unit that still represents the span without awkward rounding
 * (e.g. 90 minutes instead of 2 hours).
 */
export function formatRelativeTime(
    totalSeconds: number,
    locales?: string | string[],
    options?: Intl.RelativeTimeFormatOptions,
): string {
    const rtf = new Intl.RelativeTimeFormat(locales, { numeric: 'auto', ...options });
    const abs = Math.abs(totalSeconds);

    for (const entry of RELATIVE_UNITS) {
        if (abs < entry.seconds) {
            continue;
        }

        const value = totalSeconds / entry.seconds;
        const rounded = Math.round(value);

        if (
            entry.unit === 'hour' &&
            Math.abs(rounded) >= 1 &&
            Math.abs(value - rounded) > 0.01 &&
            abs >= 60
        ) {
            return rtf.format(Math.round(totalSeconds / 60), 'minute');
        }

        return rtf.format(rounded, entry.unit);
    }

    return rtf.format(0, 'second');
}
