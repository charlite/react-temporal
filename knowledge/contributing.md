---
type: Playbook
title: Contributing workflow
description: Commands and checks for library changes.
tags: [development, vitest, node]
---

# Contributing workflow

## Prerequisites

- **Node.js 26+** (see `.nvmrc`)
- npm 10+

```bash
npm install
```

## Checks before a PR

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Tests

- Runner: **Vitest** (`vitest.config.ts`)
- Environment: **jsdom** with Temporal polyfill in `vitest.setup.ts`
- Pattern: `src/**/*.test.ts` using `@testing-library/react` `renderHook`

Timer-dependent tests use `vi.useFakeTimers()` / `vi.advanceTimersByTime()`.

## Lint

ESLint 10 **flat config** in `eslint.config.js` (TypeScript recommended rules).

## Knowledge updates

When behavior or public API changes, update:

- [`../CHANGELOG.md`](../CHANGELOG.md)
- [`../docs/`](./../docs/) as needed
- This bundle’s [`log.md`](./log.md) and affected concept files
