---
type: Reference
title: Temporal runtime resolution
description: How react-temporal chooses native Temporal vs a polyfill.
tags: [temporal, polyfill, node, browser]
---

# Temporal runtime resolution

Implementation: [`../src/temporal.ts`](../src/temporal.ts).

## Resolution order

1. **`globalThis.Temporal`** when the host provides a conforming implementation (modern browsers; **Node.js 26+** when enabled).
2. **`temporal-polyfill`** when native Temporal is missing (default optional dependency — smaller bundle, 2026 spec alignment).

`hasNativeTemporal()` exposes whether step 1 is active. `getTemporal()` and the exported `Temporal` constant use the same resolution.

## Why not `@js-temporal/polyfill` by default?

| | `temporal-polyfill` | `@js-temporal/polyfill` |
| --- | --- | --- |
| Maintenance | Active (FullCalendar) | Slower release cadence |
| Size (gzip) | ~20 KB | ~50 KB |
| Spec | 2026 | Older reference snapshot |

Apps may still install `@js-temporal/polyfill` as an optional peer for their own imports; **@charlite/react-temporal does not auto-load it**.

## When consumers need a polyfill

| Environment | Typical need |
| --- | --- |
| Chrome / Firefox / Edge (current) | Usually none |
| Safari | Often needs a polyfill |
| Node.js &lt; 26 | Polyfill at process entry |
| Vitest + jsdom | Handled inside the library via `temporal-polyfill` import |

Rollup **externalizes** polyfill packages so they are not bundled into `@charlite/react-temporal`.
