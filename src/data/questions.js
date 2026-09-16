// Question/answer keys are contractual — another teammate's matching system
// and src/data/matching_rules.json depend on these exact strings.
export const questions = [
  {
    id: "q1",
    prompt: "What sounds exciting\nright now?",
    options: [
      { key: "flying", label: "Flying through the sky", emoji: "🪂" },
      { key: "water", label: "Riding the waves", emoji: "🌊" },
      { key: "explore", label: "Exploring the outdoors", emoji: "🥾" },
      { key: "challenge", label: "Testing my limits", emoji: "🔥" },
    ],
  },
  {
    id: "q2",
    prompt: "Pick your\nscenery",
    options: [
      { key: "mountains", label: "Mountains", emoji: "⛰️" },
      { key: "beach", label: "Beach", emoji: "🏖️" },
      { key: "forest", label: "Forest", emoji: "🌲" },
      { key: "open", label: "Open landscapes", emoji: "🌄" },
    ],
  },
  {
    id: "q3",
    prompt: "How far are you\nwilling to go?",
    options: [
      { key: "easy", label: "Keep it easy", emoji: "🌤️" },
      { key: "moderate", label: "A little adventure", emoji: "🚶" },
      { key: "challenging", label: "Give me a challenge", emoji: "⚡" },
      { key: "extreme", label: "Full adrenaline", emoji: "💥" },
    ],
  },
  {
    id: "q4",
    prompt: "Who's coming\nalong?",
    options: [
      { key: "solo", label: "Just me", emoji: "🧍" },
      { key: "friend", label: "A friend", emoji: "🧑‍🤝‍🧑" },
      { key: "group", label: "My squad", emoji: "👥" },
      { key: "family", label: "Family", emoji: "👨‍👩‍👧" },
    ],
  },
  {
    id: "q5",
    prompt: "Choose your perfect\nadventure day",
    options: [
      { key: "scenic", label: "Amazing views & memories", emoji: "📸" },
      { key: "adrenaline", label: "Adrenaline all day", emoji: "⚡" },
      { key: "nature", label: "Nature & exploration", emoji: "🍃" },
      { key: "challenge", label: "A challenge I'll never forget", emoji: "🏔️" },
    ],
  },
];
