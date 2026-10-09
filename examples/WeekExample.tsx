import React from 'react';
import { useTemporalWeek, Temporal } from '@charlite/react-temporal';

export function WeekExample() {
  const date = Temporal.PlainDate.from('2025-07-21');
  const week = useTemporalWeek(date);
  return (
    <ul>
      {week.map(day => (
        <li key={day.toString()}>{day.toString()}</li>
      ))}
    </ul>
  );
}
