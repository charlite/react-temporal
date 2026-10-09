# react-temporal Documentation

React hooks for date and time built on the JavaScript [Temporal API](https://tc39.es/proposal-temporal/).

## Table of contents

| Document | Description |
| --- | --- |
| [Getting started](./getting-started.md) | Install, configure, and write your first component |
| [Installation](./installation.md) | Package managers, peer dependencies, and polyfill options |
| [Polyfill guide](./polyfill.md) | Native vs polyfill runtime, SSR, and browser support |
| [API reference](./api-reference.md) | Every hook, utility, and type export |
| [TypeScript](./typescript.md) | Type imports, generics, and IDE support |
| [Migration guide](./migration.md) | Upgrading across major versions |
| [Examples](../examples/README.md) | Copy-paste React components for each hook |
| [Agent knowledge (OKF)](../knowledge/index.md) | OKF v0.2 bundle for AI agents |

## Quick reference

```tsx
import {
  useTemporalNow,
  useTemporalZonedNow,
  useTemporalRelative,
  Temporal,
} from 'react-temporal';

function Dashboard() {
  const now = useTemporalNow();
  const tokyo = useTemporalZonedNow('Asia/Tokyo');
  const deadline = Temporal.Instant.from('2026-12-31T23:59:59Z');
  const relative = useTemporalRelative(Temporal.Now.instant(), deadline, 'en');

  return (
    <div>
      <p>UTC: {now.toString()}</p>
      <p>Tokyo: {tokyo.toLocaleString()}</p>
      <p>Deadline: {relative}</p>
    </div>
  );
}
```

## Requirements

- **Node.js** 26+ (development and CI)
- **React** 17, 18, or 19
- **Temporal** — native in modern browsers and Node.js 26+, or a polyfill elsewhere (see [Polyfill guide](./polyfill.md))

## Support

- [GitHub Issues](https://github.com/charlite/react-temporal/issues)
- [Changelog](../CHANGELOG.md)
