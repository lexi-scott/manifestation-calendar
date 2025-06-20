// src/features/Food/generateFoodEvents.js

import { format, startOfMonth, endOfMonth, addDays } from "date-fns";
import mindyFoods from "./mindyFoods.json";

// Hardcoded period start — update or make dynamic later
const periodStart = new Date(2025, 5, 3); // June 3, 2025

// Determine the cycle phase from day offset
function getCyclePhase(date, startDate) {
  const diff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24)) % 28;
  if (diff < 5) return "Menstrual";
  if (diff < 14) return "Follicular";
  if (diff < 16) return "Ovulation";
  return "Luteal";
}

// Cycle through food suggestions for variety each day
function getRotatedFoods(foodList, offset, count = 3) {
  const rotated = [];
  for (let i = 0; i < count; i++) {
    rotated.push(foodList[(offset + i) % foodList.length]);
  }
  return rotated;
}

// Main export: generates events for a full calendar view
export function generateFoodEvents(monthDate) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  const events = [];

  let day = start;
  let offset = 0;

  while (day <= end) {
    const phase = getCyclePhase(day, periodStart);
    const foodGroup = mindyFoods[phase];
    if (foodGroup) {
      const foods = getRotatedFoods(foodGroup.foods, offset);
      const title = `🍽️ ${phase} Foods: ${foods.join(", ")}`;

      events.push({
        title,
        start: day,
        end: day,
        allDay: true,
      });

      offset++;
    }

    day = addDays(day, 1);
  }

  return events;
}
