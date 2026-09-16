import { scoreOperator } from "./scoring.js";

export function selectOperators(operators, { activity, environment }, max = 3) {
  const activityMatches = operators.filter(op => op.normalizedActivity === activity);
  if (!activityMatches.length) return [];

  return [...activityMatches]
    .sort((a,b) => {
      const diff = scoreOperator(b, { activity, environment }) - scoreOperator(a, { activity, environment });
      if (diff !== 0) return diff;
      return String(a.id).localeCompare(String(b.id));
    })
    .slice(0, max)
    .map(op => ({
      id: op.id,
      name: op.name,
      location: op.location ?? "",
      state: op.state ?? "",
      tag: op.tag ?? "",
      rating: op.rating ?? null,
      listingUrl: op.listingUrl ?? null,
    }));
}
