# react-temporal

[![npm version](https://badge.fury.io/js/@charlite%2Freact-temporal.svg)](https://www.npmjs.com/package/@charlite/react-temporal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/charlite/react-temporal/actions/workflows/ci.yml/badge.svg)](https://github.com/charlite/react-temporal/actions/workflows/ci.yml)

**react-temporal** is a React hooks library for date and time, built on the JavaScript [Temporal API](https://tc39.es/proposal-temporal/). Temporal reached **Stage 4** in 2026 and ships natively in Chrome 144+, Firefox 139+, Edge 144+, and **Node.js 26+**. This library uses native Temporal when available and falls back to a polyfill for Safari, older browsers, and test environments.

Replace `Date`, Moment.js, and most `date-fns` use cases with immutable, time-zone-aware Temporal types — wrapped in idiomatic React hooks.

📖 **[Full documentation](./docs/README.md)** — getting started, API reference, polyfill guide, and TypeScript types.

🤖 **[Agent guide (OKF v0.2)](./AGENTS.md)** — machine-readable knowledge in [`knowledge/`](./knowledge/index.md).

---

## Why Temporal in 2026?

| | Legacy `Date` | Temporal |
| --- | --- | --- |
| Immutability | Mutable | Immutable value objects |
| Time zones | Error-prone offsets | First-class `ZonedDateTime` |
| Arithmetic | Millisecond hacks | `add`, `subtract`, `until`, `since` |
| Parsing | Implementation-defined | Strict ISO 8601 |
| Browser support | Everywhere | Chrome 144+, Firefox 139+, Edge 144+ |
| Node.js | Legacy APIs | **26+** native Temporal (polyfill optional) |

---

## Install

```bash
npm install @charlite/react-temporal
```

### Polyfill (Safari, older browsers, Node &lt; 26)

Native Temporal is used automatically when available. For environments without it, install one polyfill:

```bash
# Smaller production polyfill (~20 KB gzip) — recommended
npm install temporal-polyfill

# Official reference implementation (~44 KB gzip)
npm install @js-temporal/polyfill
```

For `temporal-polyfill`, add this once at your app entry point:

```ts
import 'temporal-polyfill/global';
```

`temporal-polyfill` is installed automatically as an optional dependency and used as the fallback when native Temporal is unavailable (`@js-temporal/polyfill` remains supported as an optional peer if you install it yourself).

---

## Usage

All hooks are named exports. Import `Temporal` from the package or from your polyfill:

```tsx
import { useTemporalNow, useTemporalZonedNow, Temporal } from '@charlite/react-temporal';

function Clock() {
  const now = useTemporalNow();
  const tokyo = useTemporalZonedNow('Asia/Tokyo');

  return (
    <div>
      <p>UTC: {now.toString()}</p>
      <p>Tokyo: {tokyo.toLocaleString()}</p>
    </div>
  );
}
```

### Configurable clock

```tsx
import { useTemporalNow, useTemporalClock } from '@charlite/react-temporal';

// Update every 100 ms for a smooth timer UI
const now = useTemporalClock({ intervalMs: 100 });

// Or get zoned time with a custom interval
const local = useTemporalNow({ timeZone: 'Europe/Madrid', intervalMs: 5000 });
```

---

## Hooks

| Hook | Description |
| --- | --- |
| `useTemporalNow` | Current `Instant` or `ZonedDateTime` (with `timeZone` option), auto-updating |
| `useTemporalClock` | Current `Instant` with configurable tick interval |
| `useTemporalZonedNow` | Current `ZonedDateTime` for an IANA time zone |
| `useTemporalInterval` | Run a callback on a `Duration` interval |
| `useTemporalDuration` | `Duration` between two instants (`start.until(end)`) |
| `useTemporalCalendar` | Validate and return a calendar ID |
| `useTemporalTimeZone` | Validate and return a time zone ID |
| `useTemporalFormat` | Locale-aware formatting via `toLocaleString` |
| `useTemporalRange` | Inclusive array of `PlainDate` between two dates |
| `useTemporalRelative` | Relative time via `Intl.RelativeTimeFormat` ("in 3 hours") |
| `useTemporalCountdown` | Seconds remaining until a target instant |
| `useTemporalSchedule` | `setTimeout` aligned to a target instant |
| `useTemporalParse` | Parse an ISO string to `Instant` |
| `useTemporalDiff` | `Duration` difference between two instants |
| `useTemporalWeek` | All dates in the ISO week (Mon–Sun) |
| `useTemporalMonth` | All dates in a month |
| `useTemporalYear` | First day of each month in a year |
| `useTemporalFrom` | Parse ISO strings into any Temporal type |
| `useTemporalSafeParse` | Non-throwing parse (`{ value, error }`) |
| `useTemporalElapsed` | Seconds since an instant (live) |
| `useTemporalStopwatch` | Live `{ elapsed, seconds }` from a start instant |
| `useTemporalLocalDate` | Today's `PlainDate` in a time zone |
| `useTemporalCompare` | Memoized `Temporal.*.compare` |
| `useTemporalWithin` | Inclusive range check for instants or dates |
| `useTemporalAdd` | Memoized `.add(duration)` |
| `useTemporalCountdownStatus` | `{ seconds, isComplete }` countdown |

See [`examples/`](examples/README.md) for copy-paste examples, or the [`docs/`](docs/README.md) folder for full documentation.

---

## Utilities

| Export | Description |
| --- | --- |
| `Temporal` | The Temporal namespace (native or polyfill) |
| `getTemporal()` | Explicit resolver — native first, polyfill fallback |
| `hasNativeTemporal()` | Whether `globalThis.Temporal` is available |

---

## TypeScript

Full type exports are included. Types are sourced from `temporal-polyfill` and work with native Temporal at runtime:

```ts
import type { TemporalInstant, TemporalPlainDate, UseTemporalNowOptions } from '@charlite/react-temporal';
```

---

## Testing

```bash
npm test
```

Unit tests use **Vitest** and live in [`src/__tests__/`](src/__tests__/).

---

## Development

```bash
git clone https://github.com/charlite/react-temporal.git
cd react-temporal
nvm use 26   # requires Node.js 26+
npm install
npm test
npm run build
```

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) and the [OKF knowledge bundle](./knowledge/index.md) for agent-oriented context.

---

## License

MIT © [charlite](https://github.com/charlite)
