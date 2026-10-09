---
type: Reference
title: Hook catalog
description: Exported React hooks and their Temporal types.
tags: [hooks, api]
---

# Hook catalog

All hooks live under [`../src/hooks/`](../src/hooks/) and are re-exported from [`../src/index.ts`](../src/index.ts).

| Hook | Returns / effect |
| --- | --- |
| `useTemporalNow` | Live `Instant` or `ZonedDateTime` (`timeZone`, `pauseWhenHidden`) |
| `useTemporalClock` | Live `Instant` with configurable `intervalMs` |
| `useTemporalZonedNow` | Live `ZonedDateTime` for an IANA zone |
| `useTemporalInterval` | Repeated callback on a `Duration` interval |
| `useTemporalDuration` | `Duration` from `start.until(end)` |
| `useTemporalCalendar` | Validated calendar ID string |
| `useTemporalTimeZone` | Validated time zone ID string |
| `useTemporalFormat` | Locale string via `toLocaleString` |
| `useTemporalRange` | Inclusive `PlainDate[]` between bounds |
| `useTemporalRelative` | `Intl.RelativeTimeFormat` label |
| `useTemporalCountdown` | Seconds remaining until target (`onComplete`, `intervalMs`) |
| `useTemporalCountdownStatus` | `{ seconds, isComplete }` |
| `useTemporalSchedule` | One-shot timeout at target instant (`runIfPast`) |
| `useTemporalParse` | Parse ISO string to `Instant` |
| `useTemporalFrom` | Parse ISO to `instant` \| `plainDate` \| … |
| `useTemporalSafeParse` | Non-throwing parse |
| `useTemporalDiff` | `Duration` between instants |
| `useTemporalWeek` | ISO week `PlainDate[]` |
| `useTemporalMonth` | Month `PlainDate[]` |
| `useTemporalYear` | First day of each month in a year |
| `useTemporalElapsed` | Seconds since an instant |
| `useTemporalStopwatch` | Live elapsed duration from start |
| `useTemporalLocalDate` | Today in a time zone |
| `useTemporalCompare` | Memoized compare |
| `useTemporalWithin` | Inclusive range membership |
| `useTemporalAdd` | Memoized `.add()` |

Examples for each hook: [`../examples/README.md`](../examples/README.md). Narrative API docs: [`../docs/api-reference.md`](../docs/api-reference.md).
