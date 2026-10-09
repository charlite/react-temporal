# API reference

All exports from `@charlite/react-temporal`.

## Utilities

### `Temporal`

Re-exported Temporal namespace (native or polyfill).

```ts
import { Temporal } from '@charlite/react-temporal';

const date = Temporal.PlainDate.from('2026-07-05');
const now = Temporal.Now.instant();
```

### `getTemporal()`

Returns the resolved Temporal namespace. Prefer using `Temporal` directly.

```ts
import { getTemporal } from '@charlite/react-temporal';

const T = getTemporal();
```

### `hasNativeTemporal()`

Returns `true` when `globalThis.Temporal` is defined.

---

## Parsing

### `useTemporalFrom(kind, input)`

Parses an ISO string into the requested Temporal type.

**Kinds:** `'instant' | 'plainDate' | 'plainTime' | 'plainDateTime' | 'zonedDateTime'`

### `useTemporalSafeParse(kind, input)`

Same as `useTemporalFrom`, but returns `{ value, error }` instead of throwing.

---

## Clock hooks

### `useTemporalNow(options?)`

Returns the current time, updating at a configurable interval.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `intervalMs` | `number` | `1000` | Tick interval in milliseconds |
| `timeZone` | `string` | — | IANA time zone; when set, returns `ZonedDateTime` |
| `pauseWhenHidden` | `boolean` | `false` | Skip ticks while the document is hidden |

**Returns:** `Temporal.Instant` or `Temporal.ZonedDateTime`

```tsx
const now = useTemporalNow();
const madrid = useTemporalNow({ timeZone: 'Europe/Madrid', intervalMs: 5000 });
```

---

### `useTemporalClock(options?)`

Live clock returning `Temporal.Instant`. Simpler alternative to `useTemporalNow` without time zone support.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `intervalMs` | `number` | `1000` | Tick interval in milliseconds |

**Returns:** `Temporal.Instant`

```tsx
const now = useTemporalClock({ intervalMs: 100 });
```

---

### `useTemporalZonedNow(timeZone, options?)`

Live clock for a specific IANA time zone.

| Parameter | Type | Description |
| --- | --- | --- |
| `timeZone` | `string` | IANA time zone identifier (e.g. `'Asia/Tokyo'`) |
| `options.intervalMs` | `number` | Tick interval (default `1000`) |

**Returns:** `Temporal.ZonedDateTime`

```tsx
const tokyo = useTemporalZonedNow('Asia/Tokyo');
```

---

## Duration and difference

### `useTemporalDuration(start, end)`

Returns the duration from `start` to `end` using `start.until(end)`.

**Returns:** `Temporal.Duration`

```tsx
const duration = useTemporalDuration(startInstant, endInstant);
duration.total('minutes'); // 90
```

---

### `useTemporalDiff(a, b)`

Alias-style hook returning `a.until(b)`.

**Returns:** `Temporal.Duration`

```tsx
const diff = useTemporalDiff(earlier, later);
diff.total('hours');
```

---

## Formatting and parsing

### `useTemporalFormat(temporalObj, locales?, options?)`

Formats a Temporal value using `toLocaleString`.

**Accepts:** `Instant`, `PlainDate`, `PlainTime`, `PlainDateTime`, `ZonedDateTime`

**Returns:** `string`

```tsx
const formatted = useTemporalFormat(
  Temporal.PlainDateTime.from('2026-07-05T14:30:00'),
  'en-US',
  { dateStyle: 'full', timeStyle: 'short' },
);
```

---

### `useTemporalParse(isoString)`

Parses an ISO 8601 string to `Temporal.Instant`. Memoized on `isoString`.

**Returns:** `Temporal.Instant`

```tsx
const instant = useTemporalParse('2026-07-05T12:00:00Z');
```

---

### `useTemporalRelative(from, to, locales?, options?)`

Locale-aware relative time via `Intl.RelativeTimeFormat`.

**Returns:** `string` (e.g. `"in 3 hours"`, `"2 days ago"`)

```tsx
const label = useTemporalRelative(past, future, 'en', { numeric: 'auto' });
```

---

## Calendar and ranges

### `useTemporalRange(start, end)`

Inclusive array of `PlainDate` from `start` to `end`.

**Returns:** `Temporal.PlainDate[]`

```tsx
const dates = useTemporalRange(
  Temporal.PlainDate.from('2026-07-01'),
  Temporal.PlainDate.from('2026-07-07'),
);
```

---

### `useTemporalWeek(date)`

All dates in the ISO week (Monday–Sunday) containing `date`.

**Returns:** `Temporal.PlainDate[]` (7 items)

```tsx
const week = useTemporalWeek(Temporal.PlainDate.from('2026-07-05'));
```

---

### `useTemporalMonth(date)`

All dates in the month of `date`.

**Returns:** `Temporal.PlainDate[]`

```tsx
const days = useTemporalMonth(Temporal.PlainDate.from('2026-07-15'));
```

---

### `useTemporalYear(date)`

First day of each month in the year of `date`.

**Returns:** `Temporal.PlainDate[]` (12 items)

```tsx
const months = useTemporalYear(Temporal.PlainDate.from('2026-07-05'));
```

---

## Validation

### `useTemporalCalendar(id)`

Validates a calendar identifier and returns the resolved calendar ID.

**Returns:** `string`

```tsx
const id = useTemporalCalendar('iso8601'); // 'iso8601'
```

---

### `useTemporalTimeZone(id)`

Validates an IANA time zone and returns the resolved time zone ID.

**Returns:** `string`

```tsx
const id = useTemporalTimeZone('Europe/Madrid'); // 'Europe/Madrid'
```

---

## Timers and scheduling

### `useTemporalInterval(callback, duration)`

Runs `callback` repeatedly at the given `Temporal.DurationLike` interval. Uses a ref for the callback to avoid stale closures.

```tsx
useTemporalInterval(() => refresh(), { seconds: 30 });
```

---

### `useTemporalCountdown(target, options?)`

Seconds remaining until `target`. Returns `0` after the target passes.

| Option | Description |
| --- | --- |
| `intervalMs` | Tick interval (default `1000`) |
| `onComplete` | Called once when countdown reaches zero |

### `useTemporalCountdownStatus(target, options?)`

Same as countdown but returns `{ seconds, isComplete }`.

### `useTemporalElapsed(since, options?)`

Live seconds elapsed since `since` (0 if `since` is in the future).

### `useTemporalStopwatch(start, options?)`

Returns `{ elapsed: Duration, seconds }` updating from `start`.

### `useTemporalLocalDate(timeZone, options?)`

Today's `PlainDate` in the given IANA zone (default tick: 60s).

---

### `useTemporalSchedule(callback, instant, options?)`

Schedules `callback` once at `instant`. Runs immediately when already past unless `runIfPast: false`.

```tsx
useTemporalSchedule(() => alert('Done!'), Temporal.Now.instant().add({ minutes: 5 }));
```

---

### `useTemporalCompare(a, b)`

Memoized `Temporal.Instant.compare` or `PlainDate.compare`.

### `useTemporalWithin(value, start, end)`

Inclusive range check (matching `Instant` or `PlainDate` operands).

### `useTemporalAdd(value, duration)`

Memoized `.add(duration)` for `Instant` or `PlainDate`.

---

## Type exports

| Export | Description |
| --- | --- |
| `TemporalInstant` | `Temporal.Instant` |
| `TemporalPlainDate` | `Temporal.PlainDate` |
| `TemporalPlainTime` | `Temporal.PlainTime` |
| `TemporalPlainDateTime` | `Temporal.PlainDateTime` |
| `TemporalZonedDateTime` | `Temporal.ZonedDateTime` |
| `TemporalDuration` | `Temporal.Duration` |
| `TemporalDurationLike` | `Temporal.DurationLike` |
| `TemporalNamespace` | `typeof Temporal` |
| `UseTemporalNowOptions` | Options for `useTemporalNow` |
| `UseTemporalClockOptions` | Options for `useTemporalClock` / `useTemporalZonedNow` |

See [TypeScript](./typescript.md) for usage examples.
