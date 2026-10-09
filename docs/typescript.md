# TypeScript

**react-temporal** is written in TypeScript and ships `.d.ts` declarations with the package.

## Importing types

```ts
import type {
  TemporalInstant,
  TemporalPlainDate,
  TemporalPlainDateTime,
  TemporalZonedDateTime,
  TemporalDuration,
  TemporalDurationLike,
  UseTemporalNowOptions,
  UseTemporalClockOptions,
  TemporalNamespace,
} from '@charlite/react-temporal';
```

## Importing values and types together

```ts
import { Temporal, useTemporalNow } from '@charlite/react-temporal';
import type { TemporalInstant } from '@charlite/react-temporal';

function logInstant(instant: TemporalInstant) {
  console.log(instant.toString());
}
```

## Hook return types

| Hook | Return type |
| --- | --- |
| `useTemporalNow()` | `TemporalInstant` |
| `useTemporalNow({ timeZone })` | `TemporalZonedDateTime` |
| `useTemporalClock()` | `TemporalInstant` |
| `useTemporalZonedNow(tz)` | `TemporalZonedDateTime` |
| `useTemporalDuration(a, b)` | `TemporalDuration` |
| `useTemporalDiff(a, b)` | `TemporalDuration` |
| `useTemporalParse(iso)` | `TemporalInstant` |
| `useTemporalCountdown(target)` | `number` |
| `useTemporalRelative(...)` | `string` |
| `useTemporalFormat(obj, ...)` | `string` |
| `useTemporalCalendar(id)` | `string` |
| `useTemporalTimeZone(id)` | `string` |
| `useTemporalRange(start, end)` | `TemporalPlainDate[]` |
| `useTemporalWeek(date)` | `TemporalPlainDate[]` |
| `useTemporalMonth(date)` | `TemporalPlainDate[]` |
| `useTemporalYear(date)` | `TemporalPlainDate[]` |

## Typing component props

```tsx
import type { TemporalInstant, TemporalPlainDate } from '@charlite/react-temporal';

interface EventCardProps {
  startsAt: TemporalInstant;
  date: TemporalPlainDate;
}

export function EventCard({ startsAt, date }: EventCardProps) {
  // ...
}
```

## `TemporalNamespace`

Use this when you need the type of the full `Temporal` namespace:

```ts
import type { TemporalNamespace } from '@charlite/react-temporal';

function useTemporalSafe(): TemporalNamespace {
  return getTemporal();
}
```

## Strict mode

The package is built with `strict: true`. All hooks use explicit parameter and return types.

## Source of Temporal types

Runtime types are sourced from `temporal-polyfill`, which tracks the TC39 Temporal specification. Native `Temporal` in modern browsers is structurally compatible at runtime.
