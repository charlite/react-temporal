---
type: Reference
title: Temporal runtime resolution
description: How react-temporal chooses native Temporal vs a polyfill.
tags: [temporal, polyfill, node, browser]
---

# Temporal runtime resolution

Implementation: [`../src/temporal.ts`](../src/temporal.ts).

## Resolution order

1. **`globalThis.Temporal`** when the host provides a conforming implementation (modern browsers; **Node.js 26+** when enabled in the runtime).
2. **`@js-temporal/polyfill`** when native Temporal is missing (optional dependency, loaded as the synchronous fallback).

`getTemporal()` performs this check. The exported `Temporal` constant is initialized once at module load using the same logic.

## When consumers need a polyfill

| Environment | Typical need |
| --- | --- |
| Chrome / Firefox / Edge (current) | Usually none |
| Safari | Often needs `temporal-polyfill` or `@js-temporal/polyfill` |
| Node.js &lt; 26 | Polyfill at process entry |
| Node.js 26+ | Native when available; polyfill for older patch releases or test environments (jsdom) |
| Jest / Vitest + jsdom | Load a polyfill in test setup (see `vitest.setup.ts`) |

## Recommended polyfills

- **`temporal-polyfill`** — smaller production bundle; `import 'temporal-polyfill/global'`.
- **`@js-temporal/polyfill`** — reference implementation; used automatically by this package when native is absent.

Rollup **externalizes** both polyfill packages so they are not bundled into `react-temporal`.
