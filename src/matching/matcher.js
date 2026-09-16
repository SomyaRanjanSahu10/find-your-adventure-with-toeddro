import { normalizeOperator } from "./normalize.js";
import { Q1_ACTIVITIES, scoreActivity } from "./scoring.js";
import { selectOperators } from "./operatorSelector.js";

const DESCRIPTIONS = {
  paragliding: "Your choices point toward open skies, dramatic landscapes and a flying adventure.",
  skydiving: "Your choices point toward open skies and a high-adrenaline free-fall experience.",
  scuba: "Your choices point toward the water and an underwater adventure.",
  rafting: "Your choices point toward moving water, shared thrills and an active river experience.",
  kayaking: "Your choices point toward water, exploration and a hands-on paddling adventure.",
  surfing: "Your choices point toward the coast and an active wave-riding experience.",
  sailing: "Your choices point toward open water and a scenic sailing experience.",
  trekking: "Your choices point toward exploring the outdoors on foot.",
  camping: "Your choices point toward a slower outdoor escape with nature at the center.",
  safari: "Your choices point toward wildlife, nature and exploration.",
  biking: "Your choices point toward exploring landscapes on two wheels.",
  climbing: "Your choices point toward a technical physical challenge.",
  mountaineering: "Your choices point toward a serious mountain challenge.",
  bungee: "Your choices point toward a short, intense adrenaline rush.",
  "wellness retreat": "Your choices point toward a nature-oriented retreat experience.",
};

function environmentLabel(environment) {
  return {
    mountains: "Mountain destinations",
    beach: "Coastal destinations",
    forest: "Forest and nature destinations",
    open: "Open-landscape destinations",
  }[environment] ?? "India";
}

function validateAnswers(answers) {
  const allowed = {
    q1: ["flying","water","explore","challenge"],
    q2: ["mountains","beach","forest","open"],
    q3: ["easy","moderate","challenging","extreme"],
    q4: ["solo","friend","group","family"],
    q5: ["scenic","adrenaline","nature","challenge"],
  };
  for (const [key, values] of Object.entries(allowed)) {
    if (!values.includes(answers?.[key])) throw new Error(`Invalid ${key}: ${answers?.[key]}`);
  }
}

export function getRecommendation(answers, operators, matchingRules = {}) {
  validateAnswers(answers);
  const normalized = (operators ?? []).map(normalizeOperator);
  const counts = Object.fromEntries(
    normalized.map(op => op.normalizedActivity)
      .filter(Boolean)
      .reduce((m, a) => m.set(a, (m.get(a) ?? 0) + 1), new Map())
  );

  const intentActivities = Q1_ACTIVITIES[answers.q1] ?? [];
  const intentMatches = intentActivities.filter((activity) => counts[activity] > 0);
  if (!intentMatches.length) {
    return {
      activity: "Adventure",
      region: environmentLabel(answers.q2),
      description: "No operator activity in the supplied dataset reliably matches this quiz intent yet.",
      operators: [],
    };
  }
  const candidateActivities = intentMatches.sort((a,b) => {
    const diff = scoreActivity(b, answers, counts) - scoreActivity(a, answers, counts);
    return diff || a.localeCompare(b);
  });
  const activity = candidateActivities[0];
  const selected = selectOperators(normalized, { activity, environment: answers.q2 }, 3);
  const region = selected[0]?.state || selected[0]?.location || environmentLabel(answers.q2);

  return {
    activity: matchingRules?.activityDisplayNames?.[activity] ?? displayName(activity),
    region,
    description: DESCRIPTIONS[activity] ?? "Your choices point toward an adventure supported by the available Toeddro operator data.",
    operators: selected,
  };
}

function displayName(value) {
  return value.replace(/\b\w/g, c => c.toUpperCase());
}
