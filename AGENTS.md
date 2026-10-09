# Agent guide

This repository ships machine-readable project knowledge as an [Open Knowledge Format (OKF)](https://github.com/GoogleCloudPlatform/open-knowledge-format) **v0.2** bundle under [`knowledge/`](./knowledge/index.md).

## Where to start

1. Read [`knowledge/index.md`](./knowledge/index.md) for the concept map.
2. Use [`docs/README.md`](./docs/README.md) for human-oriented tutorials and API docs.
3. Run **`npm test`** (Vitest) and **`npm run build`** before proposing library changes.

## Repository layout

| Path | Purpose |
| --- | --- |
| `src/hooks/` | React hooks (one file per hook) |
| `src/temporal.ts` | Native-first `Temporal` resolver |
| `src/__tests__/` | Vitest unit tests |
| `knowledge/` | OKF v0.2 concepts for agents |
| `docs/` | User documentation (Markdown) |
| `examples/` | Runnable React examples |

## Tooling (2026)

- **Node.js** 26+ (`engines` in `package.json`)
- **Tests**: Vitest + jsdom + `@testing-library/react`
- **Lint**: ESLint 10 flat config (`eslint.config.js`)
- **Build**: Rollup → ESM + CJS in `dist/`

## Temporal runtime

Hooks call `getTemporal()` which prefers `globalThis.Temporal` (browsers, Node.js 26+) and falls back to `@js-temporal/polyfill`. See [`knowledge/runtime-resolution.md`](./knowledge/runtime-resolution.md).

## Conventions

- Keep hooks small and synchronous; use refs for callbacks that must not go stale.
- Match existing naming: `useTemporal*` prefix, options interfaces in `src/types.ts`.
- Update OKF `knowledge/log.md` when you add or materially change concepts.
