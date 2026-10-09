import { useMemo } from 'react';
import { parseTemporal } from '../utils/parseTemporal';
import type { TemporalParseKind, TemporalParsedValue } from '../types';

/**
 * Parses an ISO string into the requested Temporal type (memoized on `input`).
 */
export function useTemporalFrom<K extends TemporalParseKind>(
    kind: K,
    input: string,
): TemporalParsedValue<K> {
    return useMemo(() => parseTemporal(kind, input), [kind, input]);
}
