// src/features/Cycle/phaseTracker.js

export function getAnchors() {
  const stored = JSON.parse(localStorage.getItem("phaseAnchors") || "{}");
  return stored;
}

export function setSingleAnchor(dateStr, phase) {
  const newAnchor = { [dateStr]: phase };
  localStorage.setItem("phaseAnchors", JSON.stringify(newAnchor));
}

export function getMostRecentAnchor(beforeDate) {
  const anchors = getAnchors();
  const keys = Object.keys(anchors)
    .filter((d) => new Date(d) <= beforeDate)
    .sort((a, b) => new Date(b) - new Date(a));

  if (keys.length === 0) return null;
  return { date: new Date(keys[0]), phase: anchors[keys[0]] };
}
