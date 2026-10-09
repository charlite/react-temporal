import type { Temporal } from 'temporal-polyfill';

/** Temporal namespace types (for annotations). Value access via `import { Temporal } from 'react-temporal'`. */
export type TemporalTypes = typeof Temporal;

export type TemporalInstant = Temporal.Instant;
export type TemporalPlainDate = Temporal.PlainDate;
export type TemporalPlainTime = Temporal.PlainTime;
export type TemporalPlainDateTime = Temporal.PlainDateTime;
export type TemporalZonedDateTime = Temporal.ZonedDateTime;
export type TemporalDuration = Temporal.Duration;
export type TemporalDurationLike = Temporal.DurationLike;

export interface UseTemporalNowOptions {
    /** Tick interval in milliseconds. Defaults to 1000. */
    intervalMs?: number;
    /** IANA time zone for zoned output. When set, returns ZonedDateTime instead of Instant. */
    timeZone?: string;
    /** Pause ticking while the document is hidden (browser). */
    pauseWhenHidden?: boolean;
}

export interface UseTemporalClockOptions {
    /** Tick interval in milliseconds. Defaults to 1000. */
    intervalMs?: number;
    pauseWhenHidden?: boolean;
}

export interface UseTemporalCountdownOptions {
    /** Update interval in milliseconds. Defaults to 1000. */
    intervalMs?: number;
    /** Called once when the target instant is reached or passed. */
    onComplete?: () => void;
}

export type TemporalParseKind =
    | 'instant'
    | 'plainDate'
    | 'plainTime'
    | 'plainDateTime'
    | 'zonedDateTime';

export type TemporalParsedValue<K extends TemporalParseKind> = K extends 'instant'
    ? TemporalInstant
    : K extends 'plainDate'
      ? TemporalPlainDate
      : K extends 'plainTime'
        ? TemporalPlainTime
        : K extends 'plainDateTime'
          ? TemporalPlainDateTime
          : TemporalZonedDateTime;

export interface TemporalSafeParseResult<T> {
    value: T | null;
    error: Error | null;
}
