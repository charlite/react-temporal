import type { TemporalInstant } from '../types';
import { useTemporalFrom } from './useTemporalFrom';

/** Parses an ISO string to Temporal.Instant. */
export function useTemporalParse(isoString: string): TemporalInstant {
    return useTemporalFrom('instant', isoString);
}
