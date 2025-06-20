// src/components/CycleModal.jsx

import React, { useState } from "react";

export default function CycleModal({ onClose, onSave }) {
  const [start, setStart] = useState("");
  const [bleedEnd, setBleedEnd] = useState("");
  const [ovulationEnd, setOvulationEnd] = useState("");

  const handleSubmit = () => {
    const data = { start, bleedEnd, ovulationEnd };
    localStorage.setItem("cycleData", JSON.stringify(data));
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-4">📊 Update Cycle Info</h2>
        <label className="block mb-2">
          Start of Period:
          <input
            type="date"
            className="w-full border mt-1 p-1"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Bleed End:
          <input
            type="date"
            className="w-full border mt-1 p-1"
            value={bleedEnd}
            onChange={(e) => setBleedEnd(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Ovulation End:
          <input
            type="date"
            className="w-full border mt-1 p-1"
            value={ovulationEnd}
            onChange={(e) => setOvulationEnd(e.target.value)}
          />
        </label>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
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
