# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-08

### Added

- [Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/open-knowledge-format) bundle in `knowledge/` for agent-friendly project context.
- `AGENTS.md` entry point linking OKF concepts, docs, and tooling.
- `.nvmrc` targeting Node.js 26.

### Changed

- **BREAKING**: Minimum Node.js version raised to **26** (`engines` field).
- Replaced **Jest** with **Vitest** (`vitest.config.ts`, `vitest.setup.ts`).
- Migrated to **ESLint 10** flat config (`eslint.config.js`).
- Documentation updated for Node.js 26 native Temporal, Vitest, and OKF.

## [0.0.3] - 2026-07-05

### Added

- Native Temporal support: uses `globalThis.Temporal` when available (Chrome 144+, Firefox 139+, Edge 144+), with automatic polyfill fallback.
- `getTemporal()` utility and re-exported `Temporal` namespace from the package.
- `useTemporalClock` — configurable-interval live clock hook.
- `useTemporalZonedNow` — live `ZonedDateTime` for any IANA time zone.
- `useTemporalNow` options: `intervalMs` and `timeZone`.
- TypeScript type exports (`TemporalInstant`, `TemporalPlainDate`, `UseTemporalNowOptions`, etc.).
- `Intl.RelativeTimeFormat` in `useTemporalRelative` for locale-aware output ("in 3 hours", "2 days ago").
- `useTemporalFormat` now uses Temporal's native `toLocaleString` and accepts any formattable Temporal type.
- Full documentation in the `docs/` folder.
- Documentation for 2026 Temporal adoption, browser support, and polyfill setup.

### Changed

- `react` and `react-dom` are peer dependencies only (no longer direct dependencies).
- Polyfill is no longer bundled — externalized via Rollup; install `@js-temporal/polyfill` or `temporal-polyfill` for non-native environments.
- `useTemporalDuration` and `useTemporalDiff` now use `until()` instead of manual epoch arithmetic.
- `useTemporalRelative` output format changed to `Intl.RelativeTimeFormat` strings.
- `useTemporalFormat` signature now accepts `(obj, locales?, options?)` instead of `(obj, options?)`.
- Minimum Node.js version raised to 22.
- Peer dependencies expanded to React 17, 18, and 19.
- CI updated to Node.js 22.
- Migrated tests from deprecated `@testing-library/react-hooks` to `@testing-library/react`.

### Fixed

- `useTemporalCountdown` uses `until().total('seconds')` for correct remaining time.
- `useTemporalSchedule` uses a ref for the callback to avoid stale closures.

## [0.0.2] - 2025-07-23

### Changed

- `react` and `react-dom` accept `^17.0.0` versions instead of exact `17.0.0`.

## [0.0.1] - 2025-07-21

### Added

- Initial release of `react-temporal`.
- 15 custom React hooks for date and time management using the JavaScript Temporal API.
- Example usage files for every hook in `examples/`.
- Comprehensive test suite for all hooks in `src/__tests__/`.
- Documentation and usage instructions in `README.md`.
- Semantic versioning and changelog support.

[1.0.0]: https://github.com/charlite/react-temporal/compare/v0.0.3...v1.0.0
[0.0.3]: https://github.com/charlite/react-temporal/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/charlite/react-temporal/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/charlite/react-temporal/releases/tag/v0.0.1
