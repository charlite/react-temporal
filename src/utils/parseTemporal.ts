import { Temporal } from '../temporal';
import type { TemporalParseKind, TemporalParsedValue } from '../types';

export function parseTemporal<K extends TemporalParseKind>(
    kind: K,
    input: string,
): TemporalParsedValue<K> {
    switch (kind) {
        case 'instant':
            return Temporal.Instant.from(input) as TemporalParsedValue<K>;
        case 'plainDate':
            return Temporal.PlainDate.from(input) as TemporalParsedValue<K>;
        case 'plainTime':
            return Temporal.PlainTime.from(input) as TemporalParsedValue<K>;
        case 'plainDateTime':
            return Temporal.PlainDateTime.from(input) as TemporalParsedValue<K>;
        case 'zonedDateTime':
            return Temporal.ZonedDateTime.from(input) as TemporalParsedValue<K>;
        default: {
            const _exhaustive: never = kind;
            return _exhaustive;
        }
    }
}
