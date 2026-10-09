import React from 'react';
import { useTemporalParse } from '@charlite/react-temporal';

export function ParseExample() {
  const instant = useTemporalParse('2025-07-21T00:00:00Z');
  return <div>Parsed Instant: {instant.toString()}</div>;
}
