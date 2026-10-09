import React from 'react';
import { useTemporalCalendar } from '@charlite/react-temporal';

export function CalendarExample() {
  const calendar = useTemporalCalendar('iso8601');
  return <div>Calendar ID: {calendar.id}</div>;
}
