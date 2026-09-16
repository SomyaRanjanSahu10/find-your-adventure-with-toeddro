import { normalizeOperator, normalizeActivity, normalizeLocation } from "../../src/matching/normalize.js";

export function toOperatorDocument(operator) {
  const op = normalizeOperator(operator);
  const services = Array.isArray(op.services_offered) ? op.services_offered.filter(Boolean) : [];
  const areas = Array.isArray(op.service_areas) ? op.service_areas.filter(Boolean) : [];
  const facts = [
    `Operator: ${op.name ?? ""}`,
    `Activity: ${op.tag ?? op.normalizedActivity ?? ""}`,
    `Location: ${op.location ?? ""}`,
    `State: ${op.state ?? ""}`,
    `Services: ${services.join(", ")}`,
    `Service areas: ${areas.join(", ")}`,
    `Rating: ${op.rating ?? ""}`,
  ];
  return {
    id: String(op.id),
    name: op.name ?? "",
    location: op.location ?? "",
    state: op.state ?? "",
    services,
    serviceAreas: areas,
    rating: Number.isFinite(Number(op.rating)) ? Number(op.rating) : null,
    listingUrl: op.listingUrl ?? null,
    verified: Boolean(op.verified),
    activity: op.tag ?? op.normalizedActivity ?? "",
    text: facts.filter((x) => !x.endsWith(": ")).join(". "),
    normalizedActivity: normalizeActivity(op.normalizedActivity ?? op.tag),
    normalizedLocation: normalizeLocation(op.normalizedLocation ?? op.location),
    normalizedState: normalizeLocation(op.normalizedState ?? op.state),
    normalizedServiceAreas: areas.map(normalizeLocation),
  };
}
