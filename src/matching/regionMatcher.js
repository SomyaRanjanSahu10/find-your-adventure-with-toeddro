export function regionCandidates(operators, environment) {
  const counts = new Map();
  for (const op of operators) {
    const labels = [op.state, op.location, ...(op.service_areas ?? [])].filter(Boolean);
    for (const label of labels) counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a,b) => b[1] - a[1]).map(([label]) => label);
}

export function deriveRegion(operators, environment) {
  const candidates = regionCandidates(operators, environment);
  if (!candidates.length) return "India";
  return candidates[0];
}
