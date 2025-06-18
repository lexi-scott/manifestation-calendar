import React from "react";
import Calendar from "./features/Calendar/Calendar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Manifestation Calendar</h1>
      <Calendar />
    </div>
  );
}

export default App;
