import { Router } from "express";
import { askOperatorAI } from "../services/ragService.js";

const router = Router();
router.post("/ask", async (req, res) => {
  try {
    const result = await askOperatorAI({
      question: req.body?.question,
      previousContext: req.body?.context || {},
    });
    res.json(result);
  } catch (error) {
    const status = error.statusCode || 503;
    console.error("RAG request failed:", error.message);
    res.status(status).json({
      error: status === 400 ? error.message : "We couldn't complete the AI recommendation right now. Please try again or use the adventure quiz.",
    });
  }
});
export default router;
