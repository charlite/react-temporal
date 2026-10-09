import { Temporal as TemporalPolyfill } from 'temporal-polyfill';

export type TemporalNamespace = typeof TemporalPolyfill;

declare global {
    var Temporal: TemporalNamespace | undefined;
}

/**
 * True when the host exposes a native `globalThis.Temporal` implementation.
 */
export function hasNativeTemporal(): boolean {
    return typeof globalThis !== 'undefined' && globalThis.Temporal !== undefined;
}

/**
 * Returns the Temporal namespace, preferring native host support
 * (Chrome 144+, Firefox 139+, Edge 144+, Node.js 26+) and falling back to
 * `temporal-polyfill` (smaller, spec-current) when native is missing.
 *
 * You may still install `@js-temporal/polyfill` in your app for typing or tooling;
 * this package does not load it automatically.
 */
export function getTemporal(): TemporalNamespace {
    if (hasNativeTemporal()) {
        return globalThis.Temporal as TemporalNamespace;
    }
    return TemporalPolyfill;
}

/** Cached Temporal namespace for hot paths inside hooks. */
export const Temporal: TemporalNamespace = getTemporal();
