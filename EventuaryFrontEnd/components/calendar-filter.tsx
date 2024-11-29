'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Calendar from 'react-calendar';
import { DateRange } from "react-day-picker";
import 'react-calendar/dist/Calendar.css';

interface CalendarFilterProps {
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function CalendarFilter({ onDateRangeChange }: CalendarFilterProps) {
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());

  const handleDateChange = (value: Date | [Date, Date]) => {
    setDate(value);
    
    // Convert react-calendar date format to DateRange format
    if (Array.isArray(value)) {
      onDateRangeChange({
        from: value[0],
        to: value[1]
      });
    } else {
      onDateRangeChange({
        from: value,
        to: value
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter by Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          onChange={handleDateChange}
          value={date}
          selectRange={true}
          className="rounded-md border"
          minDetail="month"
          nextLabel="→"
          next2Label="⇒"
          prevLabel="←"
          prev2Label="⇐"
          showNeighboringMonth={false}
        />
      </CardContent>
    </Card>
  );
}