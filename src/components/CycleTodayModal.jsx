// src/components/CycleTodayModal.jsx

import React, { useState } from "react";
import { setSingleAnchor } from "../features/Cycle/phaseTracker";


export default function CycleTodayModal({ onClose, onSave, date }) {
  const [selectedPhase, setSelectedPhase] = useState("Menstrual");

  const handleSave = () => {
    const dateStr = date.toISOString().split("T")[0];
    const data = {
      phase: selectedPhase,
      date: new Date().toISOString().split("T")[0]
    };
    localStorage.setItem("cycleAnchor", JSON.stringify(data));
    setSingleAnchor(data.date, data.phase);
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-4">📍 Mark Today's Cycle Phase</h2>
        <select
          value={selectedPhase}
          onChange={(e) => setSelectedPhase(e.target.value)}
          className="w-full border p-2 mb-4"
        >
          <option>🩸 Menstrual</option>
          <option>🌱 Follicular</option>
          <option>🌸 Ovulation</option>
          <option>🥀 Luteal</option>
        </select>
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
