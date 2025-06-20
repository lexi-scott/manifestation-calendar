// src/features/Cycle/generatePredictedCycleEvents.js

import {
  getAnchors,
  setAnchor,
  getMostRecentAnchor
} from "./phaseTracker";


import {
  addDays,
  startOfMonth,
  endOfMonth
} from "date-fns";


const PHASE_ORDER = ["Menstrual", "Follicular", "Ovulation", "Luteal"];
const PHASE_LENGTHS = {
  Menstrual: 5,
  Follicular: 7,
  Ovulation: 2,
  Luteal: 14
};

function getNextPhase(currentPhase) {
  const index = PHASE_ORDER.indexOf(currentPhase);
  return PHASE_ORDER[(index + 1) % 4];
}

export function generatePredictedCycleEvents(monthDate) {
  const anchors = getAnchors();
  const events = [];

  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);

  const sortedAnchors = Object.keys(anchors)
    .map((d) => ({ date: new Date(d), phase: anchors[d] }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  for (const anchor of sortedAnchors) {
    let day = new Date(anchor.date);
    let currentPhase = anchor.phase;
    let length = PHASE_LENGTHS[currentPhase];

    // Push anchor and predicted days
    while (day <= monthEnd) {
      for (let i = 0; i < length; i++) {
        if (day >= monthStart && day <= monthEnd) {
          events.push({
            title: `${currentPhase}`,
            start: new Date(day),
            end: new Date(day),
            allDay: true,
             phase: currentPhase, // ✅ This enables recognition
          });
        }
        day = addDays(day, 1);
      }

      currentPhase = getNextPhase(currentPhase);
      length = PHASE_LENGTHS[currentPhase];
    }
  }

  return events;
}
console.log("Anchors in prediction:", getAnchors());
