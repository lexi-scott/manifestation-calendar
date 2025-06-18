// src/components/MyCalendar.jsx

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Views,
  dateFnsLocalizer,
} from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addDays,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

// --- Localization for date-fns ---
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// --- Configuration ---
const periodStart = new Date(2025, 5, 3); // June 3, 2025

// Placeholder moon phases for June 2025
const moonPhases = {
  "2025-06-06": "🌑", // New Moon
  "2025-06-14": "🌓", // First Quarter
  "2025-06-21": "🌕", // Full Moon
  "2025-06-28": "🌗", // Last Quarter
};

// Get the user's current cycle phase for any day
function getCyclePhase(date, startDate) {
  const diff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24)) % 28;
  if (diff < 5) return "🩸 Menstrual";
  if (diff < 14) return "🌱 Follicular";
  if (diff < 16) return "🌸 Ovulation";
  return "🔥 Luteal";
}

// Create 1 event per day for the current visible month
function generateCalendarEvents(monthDate) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  const events = [];

  let day = start;
  while (day <= end) {
    const dateStr = format(day, "yyyy-MM-dd");
    const moon = moonPhases[dateStr] || "";
    const phase = getCyclePhase(day, periodStart);

    events.push({
      title: `${moon} ${phase}`,
      start: day,
      end: day,
      allDay: true,
    });

    day = addDays(day, 1);
  }

  return events;
}

export default function MyCalendar() {
  const [view, setView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  // This memoizes the events based on the current month view
  const events = useMemo(
    () => generateCalendarEvents(currentDate),
    [currentDate]
  );

  return (
    <div className="h-[90vh] bg-white p-4 rounded shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={view}
        onView={setView}
        onNavigate={setCurrentDate}
        toolbar={true}
        views={['month', 'week', 'day']}
        messages={{
          month: "Cycle",
          week: "Energy",
          day: "Focus",
        }}
        style={{ height: "100%" }}
      />
    </div>
  );
}
