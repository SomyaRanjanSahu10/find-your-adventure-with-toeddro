import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateEmbedding } from "./embeddingService.js";
import { normalizeActivity, normalizeLocation, normalizeOperator } from "../../src/matching/normalize.js";
import { scoreOperator } from "../../src/matching/scoring.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = path.resolve(here, "../../rag/operator-index.json");

export async function loadIndex() {
  const raw = await fs.readFile(INDEX_PATH, "utf8");
  return JSON.parse(raw);
}

function cosine(a, b) {
  let sum = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) sum += a[i] * b[i];
  return sum;
}

function structuredMatches(doc, intent) {
  const activities = (intent?.activity || []).map(normalizeActivity).filter(Boolean);
  const locations = (intent?.location || []).map(normalizeLocation).filter(Boolean);
  const activityHit = !activities.length || activities.includes(doc.normalizedActivity) ||
    activities.some(a => doc.services.some(s => normalizeActivity(s) === a));
  const locationText = [doc.normalizedLocation, doc.normalizedState, ...doc.normalizedServiceAreas].join(" ");
  const locationHit = !locations.length || locations.some(l => locationText.includes(l));
  return { activityHit, locationHit };
}

export async function retrieveOperators({ question, intent, limit = 15, contextOperatorIds = [] }) {
  const index = await loadIndex();
  const queryVector = await generateEmbedding(question);
  const ids = new Set((contextOperatorIds || []).map(String));
  const candidates = index.documents.map((doc) => {
    const semantic = cosine(queryVector, doc.embedding);
    const { activityHit, locationHit } = structuredMatches(doc, intent || {});
    const followUpBoost = ids.size && ids.has(String(doc.id)) ? 0.25 : 0;
    const hardActivity = (intent?.activity?.length || 0) ? (activityHit ? 0.25 : -0.35) : 0;
    const hardLocation = (intent?.location?.length || 0) ? (locationHit ? 0.25 : -0.2) : 0;
    return { doc, score: semantic + hardActivity + hardLocation + followUpBoost, activityHit, locationHit };
  });

  const hasActivity = intent?.activity?.length;
  const hasLocation = intent?.location?.length;
  let filtered = candidates;
  if (hasActivity) {
    const activityFiltered = candidates.filter(x => x.activityHit);
    if (activityFiltered.length) filtered = activityFiltered;
  }
  if (hasLocation) {
    const locationFiltered = filtered.filter(x => x.locationHit);
    if (locationFiltered.length) filtered = locationFiltered;
  }
  return filtered
    .map((x) => {
      const existingRank = scoreOperator(normalizeOperator({
        id: x.doc.id, name: x.doc.name, location: x.doc.location, state: x.doc.state,
        tag: x.doc.activity, rating: x.doc.rating, service_areas: x.doc.serviceAreas,
        services_offered: x.doc.services,
      }), {
        activity: x.doc.normalizedActivity,
        environment: intent?.environment?.[0],
      });
      return { ...x, combinedScore: x.score + Math.min(existingRank / 10000, 0.5) };
    })
    .sort((a,b) => b.combinedScore - a.combinedScore)
    .slice(0, limit)
    .map(x => ({ ...x.doc, retrievalScore: x.combinedScore }));
}
