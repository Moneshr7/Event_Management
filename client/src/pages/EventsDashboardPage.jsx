import React, { useState } from 'react';
import EventCalendar from '../components/EventCalendar';

const sampleEvents = [
  {
    title: 'Team Meeting',
    date: new Date(2025, 7, 5), 
  },
  {
    title: 'Project Deadline',
    date: new Date(2025, 7, 15),
  },
];

const EventsDashboardPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-linear-to-br from-fuchsia-400 to-violet-400 flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
        ☄️ Event Dashboard
      </h1>
      
      <EventCalendar 
        events={sampleEvents} 
        selectedDate={date} 
        onDateSelect={setDate} 
      />
    </div>
  );
};

export default EventsDashboardPage;