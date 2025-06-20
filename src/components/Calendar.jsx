// src/components/Calendar.jsx

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
import { generateFoodEvents } from "../features/Food/generateFoodEvents";
import AddButton from "./AddButton";
import CycleModal from "./CycleModal";
import CycleTodayModal from "./CycleTodayModal";
import { generatePredictedCycleEvents } from "../features/Cycle/generatePredictedCycleEvents";
import { setSingleAnchor } from "../features/Cycle/phaseTracker";
import CustomDayView from "./CustomDayView";


// --- Localization setup for date-fns ---
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// --- Static config (for now) ---
const moonPhases = {
  "2025-06-06": "🌑",
  "2025-06-14": "🌓",
  "2025-06-21": "🌕",
  "2025-06-28": "🌗"
};

// Determine the cycle phase based on saved data
function getCyclePhase(date) {
  const stored = JSON.parse(localStorage.getItem("cycleData"));
  if (!stored) return "No data";

  const d = new Date(date);
  const start = new Date(stored.start);
  const bleedEnd = new Date(stored.bleedEnd);
  const ovulationEnd = new Date(stored.ovulationEnd);

  if (d >= start && d <= bleedEnd) return "🩸 Menstrual";
  if (d > bleedEnd && d <= ovulationEnd) return "🌱 Follicular";
  if (d > ovulationEnd) return "🔥 Luteal";
  return "Unknown";
}

// Generate events for current visible month
function generateCalendarEvents(monthDate) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  const events = [];

  let day = start;
  while (day <= end) {
    const dateStr = format(day, "yyyy-MM-dd");
    const moon = moonPhases[dateStr] || "";
    const phase = getCyclePhase(day);

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


// --- Main Component ---
export default function MyCalendar() {
  const [view, setView] = useState(Views.DAY);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Modals
  const [cycleModalOpen, setCycleModalOpen] = useState(false);
  const [phaseModalOpen, setPhaseModalOpen] = useState(false);
  const [cycleData, setCycleData] = useState(() =>
    JSON.parse(localStorage.getItem("cycleData") || "{}")
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Combined events
  const events = useMemo(() => {
    return [
      ...generatePredictedCycleEvents(currentDate),
      ...generateFoodEvents(currentDate),
    ];
  }, [currentDate]);

  return (
   <div className="relative h-[90vh] bg-gray text-gray p-4 rounded shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={view}
        date={currentDate}
        selectable={true}
        view={view}
        onView={(newView) => setView(newView)}
       onNavigate={(date) => setCurrentDate(date)}
       onSelectSlot={({ start }) => {
          if (view !== "day") {
            const localDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    setCurrentDate(start);
    setView(Views.DAY); 
          }
        }}
        toolbar={true}
        views={{ month: true, week: true, day: true }}
        messages={{
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        components={{
          day: CustomDayView
        }}
        onSelectEvent={(event) => {
          // If the event is a phase, open the modal to edit it
          if (event.phase) {
            setSelectedDate(new Date(event.start));
            setPhaseModalOpen(true);
             } else {
    // You could eventually open journal, food, etc.
    console.log("Event clicked:", event);
          }
        }}
        style={{ height: "100%" }
        }
      />

      {/* 🔘 Add Button */}
      <AddButton onClick={() => setPhaseModalOpen(true)} />

      {/* 📅 Optional: Modal to input full cycle range */}
      {cycleModalOpen && (
        <CycleModal
          onClose={() => setCycleModalOpen(false)}
          onSave={(data) => setCycleData(data)}
        />
      )}

      {/* 📍 Today's phase declaration modal */}
      {phaseModalOpen && (
        <CycleTodayModal
          date={selectedDate}
          onClose={() => setPhaseModalOpen(false)}
          onSave={(data) => {
            setSingleAnchor(data.date, data.phase);
            setCurrentDate((prev) => new Date(prev.getTime() + 1000)); // ✅ force rerender
          }}
        />

      )}
    </div>
  );
}
