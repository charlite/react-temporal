# Polyfill guide

**react-temporal** uses native `Temporal` when available and falls back to a polyfill automatically.

## How runtime resolution works

```ts
import { getTemporal, Temporal } from '@charlite/react-temporal';

// getTemporal() checks globalThis.Temporal first, then falls back to temporal-polyfill
const T = getTemporal();
```

Resolution order:

1. **`globalThis.Temporal`** — used when the host provides native Temporal
2. **`temporal-polyfill`** — loaded when native Temporal is unavailable (optional dependency)

You rarely need to call `getTemporal()` directly; hooks use it internally.

## Browser support (2026)

| Browser | Native Temporal | Action |
| --- | --- | --- |
| Chrome 144+ | Yes | No polyfill needed |
| Firefox 139+ | Yes | No polyfill needed |
| Edge 144+ | Yes | No polyfill needed |
| Safari | Partial / preview | Use a polyfill |
| Older browsers | No | Use a polyfill |

## Node.js

**Node.js 26+** ships Temporal by default in current releases. Older Node versions and some test environments (for example jsdom) still need a polyfill for SSR and unit tests:

```bash
npm install temporal-polyfill
```

```ts
import 'temporal-polyfill/global';
```

## Choosing a polyfill

### temporal-polyfill (recommended)

- Smaller bundle (~20 KB gzip)
- Maintained by the FullCalendar team
- Near-perfect TC39 spec compliance

```ts
import 'temporal-polyfill/global';
```

### @js-temporal/polyfill

- Official reference implementation from Temporal proposal champions
- Larger (~44 KB gzip)
- Installed automatically as an optional dependency of `@charlite/react-temporal`

No global import is required — the package loads it when native Temporal is missing.

## SSR checklist

1. Install `temporal-polyfill` or ensure `@js-temporal/polyfill` is available
2. Import the polyfill at the server entry point **before** any hook runs
3. Verify your SSR bundle does not tree-shake away the polyfill import

## Testing

In **Vitest** with `jsdom`, native Temporal is typically unavailable. This library imports `temporal-polyfill` inside `src/temporal.ts`, so tests do not need to assign `globalThis.Temporal` unless your app code reads the global directly.

## FAQ

**Do I need to import Temporal separately?**

No. Import `Temporal` from `@charlite/react-temporal`:

```ts
import { Temporal } from '@charlite/react-temporal';
```

**Can I use only native Temporal and skip the polyfill?**

Yes, if you only support browsers with native Temporal and run Node.js 26+ on the server. Remove optional polyfill dependencies and ensure your build does not resolve `@js-temporal/polyfill`.

**Does the polyfill get bundled into my app?**

No. The polyfill is an external dependency — your bundler includes it only if you import it (or if the fallback path resolves at runtime in Node).
