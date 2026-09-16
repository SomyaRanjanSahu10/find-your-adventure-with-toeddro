const ENVIRONMENT_WEIGHTS = {
  mountains: { mountains: 4, hills: 3, himachal: 3, uttarakhand: 3, himalayas: 3, sikkim: 3, kashmir: 3 },
  beach: { beach: 4, coast: 3, coastal: 3, goa: 3, andaman: 3, kerala: 2 },
  forest: { forest: 4, wildlife: 3, wayanad: 3, "western ghats": 3, jungle: 3 },
  open: { open: 3, desert: 3, rajasthan: 3, sky: 2, ladakh: 3 },
};

const DIFFICULTY_BOOST = {
  easy: ["trekking", "camping", "safari", "wellness retreat"],
  moderate: ["trekking", "camping", "biking", "kayaking", "scuba", "rafting"],
  challenging: ["trekking", "rafting", "paragliding", "climbing", "biking", "kayaking"],
  extreme: ["bungee", "skydiving", "paragliding", "mountaineering", "climbing", "rafting"],
};

const EXPERIENCE_BOOST = {
  scenic: ["paragliding", "trekking", "camping", "safari", "biking", "scuba"],
  adrenaline: ["bungee", "skydiving", "paragliding", "rafting", "climbing", "scuba"],
  nature: ["trekking", "safari", "camping", "kayaking", "biking"],
  challenge: ["mountaineering", "climbing", "bungee", "skydiving", "paragliding", "rafting"],
};

export const Q1_ACTIVITIES = {
  flying: ["paragliding", "skydiving"],
  water: ["scuba", "rafting", "kayaking", "surfing", "sailing"],
  explore: ["trekking", "camping", "safari", "biking"],
  challenge: ["bungee", "climbing", "mountaineering", "paragliding", "skydiving", "rafting"],
};

export function scoreActivity(activity, answers, availableCounts = {}) {
  let score = Math.log1p(availableCounts[activity] ?? 0);
  if ((Q1_ACTIVITIES[answers.q1] ?? []).includes(activity)) score += 100;
  if ((answers.q2 && activityEnvironmentFit(activity, answers.q2))) score += 18;
  if ((DIFFICULTY_BOOST[answers.q3] ?? []).includes(activity)) score += 8;
  if ((EXPERIENCE_BOOST[answers.q5] ?? []).includes(activity)) score += 10;
  if (answers.q4 === "family" && ["bungee", "skydiving", "mountaineering"].includes(activity)) score -= 4;
  if (answers.q4 === "solo" && ["trekking", "scuba", "biking", "paragliding", "kayaking"].includes(activity)) score += 2;
  return score;
}

export function activityEnvironmentFit(activity, environment) {
  const map = {
    mountains: ["paragliding","trekking","camping","climbing","mountaineering","biking","rafting","bungee"],
    beach: ["scuba","surfing","sailing","kayaking","camping"],
    forest: ["trekking","camping","safari","biking","climbing","kayaking"],
    open: ["paragliding","skydiving","bungee","biking","safari","trekking","camping"],
  };
  return (map[environment] ?? []).includes(activity);
}

export function scoreOperator(operator, { activity, environment }) {
  let score = 0;
  if (operator.normalizedActivity === activity) score += 1000;
  if (operator.normalizedState || operator.normalizedLocation || operator.normalizedServiceAreas?.length) score += 2;
  const haystack = [
    operator.normalizedState,
    operator.normalizedLocation,
    ...(operator.normalizedServiceAreas ?? []),
  ].join(" ");
  for (const [token, weight] of Object.entries(ENVIRONMENT_WEIGHTS[environment] ?? {})) {
    if (haystack.includes(token)) score += weight * 10;
  }
  score += Number(operator.rating ?? 0);
  score += operator.name ? 0.1 : 0;
  return score;
}
