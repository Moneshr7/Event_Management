import React from 'react';
import { Calendar } from "@/components/ui/calendar";

const EventCalendar = ({ events, selectedDate, onDateSelect }) => {
  const eventDays = events.map(event => event.date);

  const modifiers = {
    hasEvent: eventDays,
  };

  return (
    <>
      <style>
        {`
          .rdp-day_hasEvent:after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            background-color: #3b82f6;
            border-radius: 50%;
          }
        `}
      </style>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md  bg-white/25 backdrop-blur-2xl text-zinc-300 p-3 shadow-lg"
        modifiers={modifiers}
        modifiersClassNames={{ hasEvent: 'rdp-day_hasEvent' }}
        
        // These props will now work correctly
        captionLayout="dropdown"
        fromYear={1925}
        toYear={2035}
      />
    </>
  );
};

export default EventCalendar;