export function validateRecommendation(modelResponse, candidates) {
  const byId = new Map(candidates.map(op => [String(op.id), op]));
  const seen = new Set();
  const operators = [];
  for (const item of Array.isArray(modelResponse?.operators) ? modelResponse.operators : []) {
    const id = String(item?.id ?? "");
    if (!byId.has(id) || seen.has(id)) continue;
    seen.add(id);
    const source = byId.get(id);
    operators.push({
      id: source.id,
      name: source.name,
      location: source.location ?? "",
      state: source.state ?? "",
      tag: source.activity ?? "",
      rating: source.rating ?? null,
      listingUrl: source.listingUrl ?? null,
      services: source.services ?? [],
      serviceAreas: source.serviceAreas ?? [],
      reason: String(item?.reason || "This operator matches the retrieved information."),
    });
  }
  const answer = typeof modelResponse?.answer === "string" && modelResponse.answer.trim()
    ? modelResponse.answer.trim()
    : "I found relevant operators in the current dataset.";
  return { answer, operators: operators.slice(0, Number(process.env.RAG_MAX_RESULTS || 5)) };
}
