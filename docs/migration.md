# Migration guide

## Upgrading to 1.0.0 from 0.0.3

Version **1.0.0** aligns the repo with the 2026 Temporal ecosystem and modern tooling. Library APIs are unchanged; development and CI requirements changed.

### Node.js

**Before:** Node.js 22+

**After:** Node.js **26+** (native Temporal in supported releases)

```bash
nvm install 26
nvm use 26
```

Update GitHub Actions / CI images to Node 26. End-user apps on older Node versions can still use **react-temporal** with a Temporal polyfill.

### Testing (contributors)

**Before:** Jest + `jest.config.json`

**After:** Vitest + `vitest.config.ts`

```bash
npm test          # vitest run
npm run test:watch
npm run test:coverage
```

Timer mocks use `vi` instead of `jest`:

```diff
- jest.useFakeTimers();
+ vi.useFakeTimers();
```

### Linting (contributors)

**Before:** `.eslintrc.json`

**After:** `eslint.config.js` (ESLint 10 flat config)

### Agent / knowledge layout

New OKF v0.2 bundle at [`knowledge/`](../knowledge/index.md) and [`AGENTS.md`](../AGENTS.md). No runtime impact on published npm code.

---

## Upgrading to 0.0.3 from 0.0.1 / 0.0.2

Version **0.0.3** modernizes the library for 2026 Temporal adoption. Most changes are additive; a few APIs changed behavior.

### Install / dependency changes

**Before (0.0.2):**

```bash
npm install react-temporal
# react and react-dom were bundled as direct dependencies
# polyfill was bundled inside the package
```

**After (0.0.3):**

```bash
npm install react-temporal
npm install temporal-polyfill   # recommended for SSR / Safari / Node
```

Ensure `react` and `react-dom` are in your app's `package.json` (peer dependencies).

### Import changes

You can now import `Temporal` from the package instead of `@js-temporal/polyfill`:

```diff
- import { useTemporalMonth } from 'react-temporal';
- import { Temporal } from '@js-temporal/polyfill';
+ import { useTemporalMonth, Temporal } from 'react-temporal';
```

### `useTemporalFormat`

Signature changed to match `toLocaleString`:

```diff
- useTemporalFormat(date, { dateStyle: 'full' })
+ useTemporalFormat(date, undefined, { dateStyle: 'full' })
+ useTemporalFormat(date, 'en-US', { dateStyle: 'full' })
```

### `useTemporalRelative`

Output format changed from manual strings (`"10 seconds ago"`) to `Intl.RelativeTimeFormat` (`"in 10 seconds"`). Pass a locale as the third argument:

```diff
- useTemporalRelative(from, to)
+ useTemporalRelative(from, to, 'en')
```

### `useTemporalDuration` / `useTemporalDiff`

These now use `until()` internally. Access total units with `.total()`:

```diff
- diff.hours
+ diff.total('hours')
```

### New hooks (optional adoption)

- `useTemporalClock({ intervalMs })` — configurable live clock
- `useTemporalZonedNow(timeZone, { intervalMs })` — zoned live clock
- `useTemporalNow({ intervalMs, timeZone })` — extended options

### No action needed

These hooks work the same way, with improved internals:

- `useTemporalParse`
- `useTemporalRange`
- `useTemporalWeek` / `useTemporalMonth` / `useTemporalYear`
- `useTemporalCalendar` / `useTemporalTimeZone`
- `useTemporalInterval`
- `useTemporalSchedule`
