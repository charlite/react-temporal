import { useMemo } from 'react';
import type {
    TemporalParseKind,
    TemporalParsedValue,
    TemporalSafeParseResult,
} from '../types';
import { parseTemporal } from '../utils/parseTemporal';

/**
 * Like `useTemporalFrom`, but returns `{ value, error }` instead of throwing.
 */
export function useTemporalSafeParse<K extends TemporalParseKind>(
    kind: K,
    input: string,
): TemporalSafeParseResult<TemporalParsedValue<K>> {
    return useMemo(() => {
        try {
            return { value: parseTemporal(kind, input), error: null };
        } catch (error) {
            return {
                value: null,
                error: error instanceof Error ? error : new Error(String(error)),
            };
        }
    }, [kind, input]);
}
