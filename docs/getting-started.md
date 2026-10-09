# Getting started

This guide walks you through installing **react-temporal** and using it in a React app.

## Prerequisites

- Node.js **26** or later (for local development of this repo)
- React **17**, **18**, or **19**
- A bundler that supports ES modules (Vite, Next.js, Webpack 5, etc.)

## 1. Install the package

```bash
npm install @charlite/react-temporal
```

## 2. Add a polyfill (if needed)

Skip this step if you only target browsers with native Temporal (Chrome 144+, Firefox 139+, Edge 144+) **and** run Node.js 26+ on the server without needing a fallback.

For **Safari**, **Node.js &lt; 26**, or mixed environments:

```bash
# Recommended — smaller bundle (~20 KB gzip)
npm install temporal-polyfill

# Or the official reference implementation
npm install @js-temporal/polyfill
```

Add the polyfill once at your app entry point:

```ts
// main.tsx or _app.tsx
import 'temporal-polyfill/global';
```

See the [Polyfill guide](./polyfill.md) for details.

## 3. Use a hook

```tsx
import { useTemporalNow } from '@charlite/react-temporal';

export function Clock() {
  const now = useTemporalNow();
  return <time dateTime={now.toString()}>{now.toLocaleString()}</time>;
}
```

## 4. Import Temporal types

You do not need a separate polyfill import for types or values — the package re-exports `Temporal`:

```tsx
import { Temporal, useTemporalMonth } from '@charlite/react-temporal';

export function JulyCalendar() {
  const dates = useTemporalMonth(Temporal.PlainDate.from('2026-07-01'));

  return (
    <ul>
      {dates.map((date) => (
        <li key={date.toString()}>{date.day}</li>
      ))}
    </ul>
  );
}
```

## Common patterns

### Live clock with time zone

```tsx
import { useTemporalZonedNow } from '@charlite/react-temporal';

export function LocalClock({ timeZone }: { timeZone: string }) {
  const now = useTemporalZonedNow(timeZone, { intervalMs: 1000 });
  return <span>{now.toLocaleString()}</span>;
}
```

### Countdown timer

```tsx
import { useTemporalCountdown, Temporal } from '@charlite/react-temporal';

export function Countdown({ iso }: { iso: string }) {
  const target = Temporal.Instant.from(iso);
  const seconds = useTemporalCountdown(target);
  return <span>{seconds}s remaining</span>;
}
```

### Relative time label

```tsx
import { useTemporalRelative, Temporal } from '@charlite/react-temporal';

export function RelativeLabel({ instant }: { instant: Temporal.Instant }) {
  const label = useTemporalRelative(Temporal.Now.instant(), instant, 'en');
  return <span>{label}</span>;
}
```

## Next steps

- [API reference](./api-reference.md) — full hook documentation
- [TypeScript](./typescript.md) — type exports and annotations
- [Examples](../examples/README.md) — one example per hook
