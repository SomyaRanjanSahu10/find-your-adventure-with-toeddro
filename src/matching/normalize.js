export function normalizeText(value = "") {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s/-]/g, " ")
    .replace(/[_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ACTIVITY_ALIASES = new Map([
  ["scuba", "scuba"],
  ["scuba diving", "scuba"],
  ["rafting", "rafting"],
  ["river rafting", "rafting"],
  ["white water rafting", "rafting"],
  ["biking", "biking"],
  ["mountain biking", "biking"],
  ["cycling", "biking"],
  ["atv quad biking", "biking"],
  ["safari", "safari"],
  ["wildlife safari", "safari"],
  ["zip lining", "zip lining"],
  ["ziplining", "zip lining"],
]);

export function normalizeActivity(value = "") {
  const normalized = normalizeText(value);
  return ACTIVITY_ALIASES.get(normalized) ?? normalized;
}

export function normalizeLocation(value = "") {
  return normalizeText(value);
}

export function normalizeState(value = "") {
  return normalizeText(value);
}

export function normalizeOperator(operator) {
  return {
    ...operator,
    normalizedActivity: normalizeActivity(operator.normalizedActivity ?? operator.tag),
    normalizedLocation: normalizeLocation(operator.normalizedLocation ?? operator.location),
    normalizedState: normalizeState(operator.normalizedState ?? operator.state),
    normalizedServiceAreas: (operator.normalizedServiceAreas ?? operator.service_areas ?? [])
      .map(normalizeLocation)
      .filter(Boolean),
  };
}
