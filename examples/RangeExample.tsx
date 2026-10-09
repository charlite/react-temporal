import React from 'react';
import { useTemporalRange, Temporal } from '@charlite/react-temporal';

export function RangeExample() {
  const start = Temporal.PlainDate.from('2025-07-01');
  const end = Temporal.PlainDate.from('2025-07-03');
  const dates = useTemporalRange(start, end);
  return (
    <ul>
      {dates.map(date => (
        <li key={date.toString()}>{date.toString()}</li>
      ))}
    </ul>
  );
}
