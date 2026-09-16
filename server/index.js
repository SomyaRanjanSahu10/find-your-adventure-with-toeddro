import "dotenv/config";
import express from "express";
import cors from "cors";
import ragRouter from "./routes/rag.js";

const app = express();
const port = Number(process.env.PORT || 3001);
app.use(cors({ origin: true }));
app.use(express.json({ limit: "64kb" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/rag", ragRouter);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "We couldn't complete the AI recommendation right now. Please try again or use the adventure quiz." });
});
app.listen(port, () => console.log(`RAG backend listening on http://localhost:${port}`));
