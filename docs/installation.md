# Installation

## npm

```bash
npm install react-temporal
```

## yarn

```bash
yarn add react-temporal
```

## pnpm

```bash
pnpm add react-temporal
```

## Peer dependencies

`react-temporal` expects React to already be installed in your project:

| Package | Supported versions |
| --- | --- |
| `react` | `^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0` |
| `react-dom` | `^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0` |

If npm warns about missing peers, install React explicitly:

```bash
npm install react react-dom
```

## Optional polyfill dependencies

For environments without native Temporal, install **one** of:

| Package | Size (gzip) | Notes |
| --- | --- | --- |
| [`temporal-polyfill`](https://www.npmjs.com/package/temporal-polyfill) | ~20 KB | Recommended; installed automatically with `react-temporal` |
| [`@js-temporal/polyfill`](https://www.npmjs.com/package/@js-temporal/polyfill) | ~44 KB | Official reference implementation (install manually if needed) |

```bash
npm install temporal-polyfill
# or
npm install @js-temporal/polyfill
```

## Node.js version

Development and CI for this package require **Node.js 26+**. Your end-user app can run on older Node versions if you install a Temporal polyfill when native Temporal is missing.

## Package exports

The package ships ESM and CommonJS builds:

```json
{
  "import": "./dist/index.esm.js",
  "require": "./dist/index.cjs",
  "types": "./dist/index.d.ts"
}
```

Tree-shaking is supported (`"sideEffects": false`).

## Bundler notes

### Vite / CRA / Webpack

No special configuration required. Install a polyfill for SSR or test environments running in Node.js without native Temporal.

### Next.js

Add the polyfill import in `instrumentation.ts` or your root layout for server components that use Temporal hooks on the server:

```ts
import 'temporal-polyfill/global';
```

Client components can use hooks normally.

### Vitest

Ensure the test environment loads a polyfill before tests run (see root `vitest.setup.ts` in this repository).
