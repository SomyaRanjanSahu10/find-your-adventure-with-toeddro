import { understandIntent, generateOperatorRecommendation } from "./llmService.js";
import { retrieveOperators } from "./operatorRetriever.js";
import { validateRecommendation } from "../utils/responseValidator.js";

export async function askOperatorAI({ question, previousContext = {} }) {
  if (typeof question !== "string" || question.trim().length < 3) {
    const error = new Error("Please enter a more specific question.");
    error.statusCode = 400;
    throw error;
  }
  if (question.length > 1000) {
    const error = new Error("Please keep your question under 1000 characters.");
    error.statusCode = 400;
    throw error;
  }
  const intent = await understandIntent(question.trim(), previousContext);
  const candidates = await retrieveOperators({
    question: question.trim(),
    intent,
    limit: Number(process.env.RAG_TOP_K || 15),
    contextOperatorIds: previousContext?.operatorIds || [],
  });
  if (!candidates.length) {
    return {
      answer: "I couldn't find a reliable operator match in the current dataset. Try asking about another activity, destination, or service.",
      operators: [],
      intent,
    };
  }
  const response = await generateOperatorRecommendation({
    question: question.trim(),
    intent,
    operators: candidates,
    previousContext,
  });
  const validated = validateRecommendation(response, candidates);
  if (!validated.operators.length) {
    return {
      answer: "I couldn't find a reliable operator match in the current dataset. Try asking about another activity, destination, or service.",
      operators: [],
      intent,
    };
  }
  return { ...validated, intent };
}
