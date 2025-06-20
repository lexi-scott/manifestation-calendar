// src/components/AddButton.jsx

import React from "react";

export default function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 z-50"
      title="Add cycle or manifestation info"
    >
      ➕
    </button>
  );
}
