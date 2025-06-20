// src/components/CustomDayView.jsx

import React from "react";
import { format } from "date-fns";

export default function CustomDayView({ date, events }) {
  const todayEvents = events.filter(
    (e) => new Date(e.start).toDateString() === new Date(date).toDateString()
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{format(date, "EEEE, MMMM d")}</h2>

      <ul className="space-y-3">
        {todayEvents.map((event, idx) => (
          <li
            key={idx}
            onClick={() => alert(`Clicked: ${event.title}`)} // swap in modal call
            className="p-3 bg-blue-100 border border-blue-300 rounded cursor-pointer hover:bg-blue-200 transition"
          >
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
