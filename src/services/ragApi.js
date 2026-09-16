export async function askOperatorAI(question, context = {}) {
  const response = await fetch("/api/rag/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, context }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "We couldn't complete the AI recommendation right now.");
  return data;
}
