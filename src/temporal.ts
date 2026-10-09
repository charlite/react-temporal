import { Temporal as PolyfillTemporal } from '@js-temporal/polyfill';

export type TemporalNamespace = typeof PolyfillTemporal;

declare global {
    var Temporal: TemporalNamespace | undefined;
}

/**
 * Returns the Temporal namespace, preferring native host support
 * (Chrome 144+, Firefox 139+, Edge 144+, Node.js 26+) and falling back to the polyfill.
 */
export function getTemporal(): TemporalNamespace {
    if (typeof globalThis !== 'undefined' && globalThis.Temporal) {
        return globalThis.Temporal;
    }
    return PolyfillTemporal;
}

/** Cached Temporal namespace for hot paths inside hooks. */
export const Temporal: TemporalNamespace = getTemporal();
