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
| `useTemporalNow` | Live `Instant` or `ZonedDateTime` (`timeZone` option) |
| `useTemporalClock` | Live `Instant` with configurable `intervalMs` |
| `useTemporalZonedNow` | Live `ZonedDateTime` for an IANA zone |
| `useTemporalInterval` | Repeated callback on a `Duration` interval |
| `useTemporalDuration` | `Duration` from `start.until(end)` |
| `useTemporalCalendar` | Validated calendar ID string |
| `useTemporalTimeZone` | Validated time zone ID string |
| `useTemporalFormat` | Locale string via `toLocaleString` |
| `useTemporalRange` | Inclusive `PlainDate[]` between bounds |
| `useTemporalRelative` | `Intl.RelativeTimeFormat` label |
| `useTemporalCountdown` | Seconds until target instant |
| `useTemporalSchedule` | One-shot timeout at target instant |
| `useTemporalParse` | Parse ISO string to `Instant` |
| `useTemporalDiff` | `Duration` between instants |
| `useTemporalWeek` | ISO week `PlainDate[]` |
| `useTemporalMonth` | Month `PlainDate[]` |
| `useTemporalYear` | First day of each month in a year |

Examples for each hook: [`../examples/README.md`](../examples/README.md). Narrative API docs: [`../docs/api-reference.md`](../docs/api-reference.md).
