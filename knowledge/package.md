---
type: Reference
title: react-temporal package
description: React hooks library built on the JavaScript Temporal API.
resource: https://www.npmjs.com/package/@charlite/react-temporal
tags: [react, temporal, hooks, npm]
status: stable
---

# react-temporal

Published as **`@charlite/react-temporal`** on npm. The package exposes:

- **Hooks** — `useTemporalNow`, `useTemporalClock`, `useTemporalZonedNow`, and related utilities (see [Hook catalog](./hooks.md)).
- **`Temporal`** — namespace resolved at runtime via [`getTemporal()`](./runtime-resolution.md).
- **Types** — `TemporalInstant`, `UseTemporalNowOptions`, and other exports from `src/types.ts`.

## Build outputs

Rollup produces:

- `dist/index.esm.js` (ESM)
- `dist/index.cjs` (CommonJS)
- `dist/index.d.ts` (TypeScript declarations)

`react` and `react-dom` are **peer dependencies**. Polyfills are **optional** peer dependencies.

## Versioning

Semantic versioning. Breaking changes are documented in [`../CHANGELOG.md`](../CHANGELOG.md) and [`../docs/migration.md`](../docs/migration.md).
