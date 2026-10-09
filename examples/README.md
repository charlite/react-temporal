# Usage Examples

Examples for every hook in **react-temporal**. Import `Temporal` from the package (re-exported from native or polyfill):

```tsx
import { Temporal } from '@charlite/react-temporal';
```

For apps without native Temporal (Node.js SSR, Safari), install a polyfill — see the [polyfill guide](../docs/polyfill.md).

---

## Clock (`useTemporalNow`)

```tsx
import { useTemporalNow } from '@charlite/react-temporal';

function ClockExample() {
  const now = useTemporalNow();
  return <div>Current time: {now.toString()}</div>;
}
```

## Live clock with options (`useTemporalClock` / `useTemporalNow`)

```tsx
import { useTemporalClock, useTemporalNow } from '@charlite/react-temporal';

function LiveClock() {
  const fast = useTemporalClock({ intervalMs: 100 });
  const madrid = useTemporalNow({ timeZone: 'Europe/Madrid', intervalMs: 5000 });

  return (
    <div>
      <p>High-frequency: {fast.toString()}</p>
      <p>Madrid: {madrid.toLocaleString()}</p>
    </div>
  );
}
```

## Zoned clock (`useTemporalZonedNow`)

```tsx
import { useTemporalZonedNow } from '@charlite/react-temporal';

function TokyoClock() {
  const tokyo = useTemporalZonedNow('Asia/Tokyo');
  return <div>Tokyo: {tokyo.toLocaleString()}</div>;
}
```

## Month (`useTemporalMonth`)

```tsx
import { useTemporalMonth, Temporal } from '@charlite/react-temporal';

function MonthExample() {
  const dates = useTemporalMonth(Temporal.PlainDate.from('2026-07-01'));
  return (
    <ul>
      {dates.map((date) => (
        <li key={date.toString()}>{date.toString()}</li>
      ))}
    </ul>
  );
}
```

## Countdown (`useTemporalCountdown`)

```tsx
import { useTemporalCountdown, Temporal } from '@charlite/react-temporal';

function CountdownExample() {
  const target = Temporal.Instant.from('2026-12-31T23:59:59Z');
  const remaining = useTemporalCountdown(target);
  return <div>Seconds remaining: {remaining}</div>;
}
```

## Calendar (`useTemporalCalendar`)

```tsx
import { useTemporalCalendar } from '@charlite/react-temporal';

function CalendarExample() {
  const calendarId = useTemporalCalendar('iso8601');
  return <div>Calendar ID: {calendarId}</div>;
}
```

## Diff (`useTemporalDiff`)

```tsx
import { useTemporalDiff, Temporal } from '@charlite/react-temporal';

function DiffExample() {
  const a = Temporal.Instant.from('2026-07-21T00:00:00Z');
  const b = Temporal.Instant.from('2026-07-21T01:00:00Z');
  const diff = useTemporalDiff(a, b);
  return <div>Difference: {diff.total('hours')} hours</div>;
}
```

## Duration (`useTemporalDuration`)

```tsx
import { useTemporalDuration, Temporal } from '@charlite/react-temporal';

function DurationExample() {
  const start = Temporal.Instant.from('2026-07-21T00:00:00Z');
  const end = Temporal.Instant.from('2026-07-21T00:01:00Z');
  const duration = useTemporalDuration(start, end);
  return <div>Duration: {duration.total('seconds')} seconds</div>;
}
```

## Format (`useTemporalFormat`)

```tsx
import { useTemporalFormat, Temporal } from '@charlite/react-temporal';

function FormatExample() {
  const date = Temporal.PlainDateTime.from('2026-07-21T12:34:56');
  const formatted = useTemporalFormat(date, 'en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });
  return <div>Formatted: {formatted}</div>;
}
```

## Interval (`useTemporalInterval`)

```tsx
import { useTemporalInterval } from '@charlite/react-temporal';
import { useState } from 'react';

function IntervalExample() {
  const [count, setCount] = useState(0);
  useTemporalInterval(() => setCount((c) => c + 1), { seconds: 1 });
  return <div>Interval count: {count}</div>;
}
```

## Parse (`useTemporalParse`)

```tsx
import { useTemporalParse } from '@charlite/react-temporal';

function ParseExample() {
  const instant = useTemporalParse('2026-07-21T00:00:00Z');
  return <div>Parsed Instant: {instant.toString()}</div>;
}
```

## Range (`useTemporalRange`)

```tsx
import { useTemporalRange, Temporal } from '@charlite/react-temporal';

function RangeExample() {
  const start = Temporal.PlainDate.from('2026-07-01');
  const end = Temporal.PlainDate.from('2026-07-03');
  const dates = useTemporalRange(start, end);
  return (
    <ul>
      {dates.map((date) => (
        <li key={date.toString()}>{date.toString()}</li>
      ))}
    </ul>
  );
}
```

## Relative (`useTemporalRelative`)

```tsx
import { useTemporalRelative, Temporal } from '@charlite/react-temporal';

function RelativeExample() {
  const from = Temporal.Instant.from('2026-07-21T00:00:00Z');
  const to = Temporal.Instant.from('2026-07-21T00:00:10Z');
  const relative = useTemporalRelative(from, to, 'en');
  return <div>Relative: {relative}</div>;
}
```

## Schedule (`useTemporalSchedule`)

```tsx
import { useTemporalSchedule, Temporal } from '@charlite/react-temporal';
import { useState } from 'react';

function ScheduleExample() {
  const [triggered, setTriggered] = useState(false);
  const instant = Temporal.Now.instant().add({ seconds: 2 });
  useTemporalSchedule(() => setTriggered(true), instant);
  return <div>Scheduled: {triggered ? 'Triggered!' : 'Waiting...'}</div>;
}
```

## Time zone (`useTemporalTimeZone`)

```tsx
import { useTemporalTimeZone } from '@charlite/react-temporal';

function TimeZoneExample() {
  const tz = useTemporalTimeZone('UTC');
  return <div>Time Zone: {tz}</div>;
}
```

## Week (`useTemporalWeek`)

```tsx
import { useTemporalWeek, Temporal } from '@charlite/react-temporal';

function WeekExample() {
  const date = Temporal.PlainDate.from('2026-07-21');
  const week = useTemporalWeek(date);
  return (
    <ul>
      {week.map((day) => (
        <li key={day.toString()}>{day.toString()}</li>
      ))}
    </ul>
  );
}
```

## Year (`useTemporalYear`)

```tsx
import { useTemporalYear, Temporal } from '@charlite/react-temporal';

function YearExample() {
  const date = Temporal.PlainDate.from('2026-07-21');
  const months = useTemporalYear(date);
  return (
    <ul>
      {months.map((month) => (
        <li key={month.toString()}>{month.toString()}</li>
      ))}
    </ul>
  );
}
```

---

All hooks are named exports from `@charlite/react-temporal`. See the [API reference](../docs/api-reference.md) and [main README](../README.md).
