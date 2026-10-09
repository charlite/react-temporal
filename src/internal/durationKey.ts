import { Temporal } from '../temporal';
import type { TemporalDurationLike } from '../types';

/** Stable string key for `Temporal.DurationLike` values in hook dependency arrays. */
export function durationKey(duration: TemporalDurationLike): string {
    return Temporal.Duration.from(duration).toString();
}

/** Milliseconds for a duration-like value (for timers). */
export function durationToMilliseconds(duration: TemporalDurationLike): number {
    return Temporal.Duration.from(duration).total({ unit: 'milliseconds' });
}
