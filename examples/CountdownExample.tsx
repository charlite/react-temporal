import React from 'react';
import { useTemporalCountdown, Temporal } from '@charlite/react-temporal';

export function CountdownExample() {
  const target = Temporal.Instant.from('2025-08-01T00:00:00Z');
  const remaining = useTemporalCountdown(target);
  return <div>Seconds remaining: {remaining}</div>;
}
