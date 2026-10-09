import React from 'react';
import { useTemporalMonth, Temporal } from '@charlite/react-temporal';

export function MonthExample() {
  const dates = useTemporalMonth(Temporal.PlainDate.from('2025-07-01'));
  return (
    <ul>
      {dates.map(date => (
        <li key={date.toString()}>{date.toString()}</li>
      ))}
    </ul>
  );
}
