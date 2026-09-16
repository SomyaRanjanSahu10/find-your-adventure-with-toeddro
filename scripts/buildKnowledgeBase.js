import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toOperatorDocument } from "../server/utils/operatorDocument.js";
import { generateEmbeddings } from "../server/services/embeddingService.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(root, "../src/data/operators.json");
const outputPath = path.resolve(root, "../rag/operator-index.json");

const operators = JSON.parse(await fs.readFile(dataPath, "utf8"));
const docs = operators.map(toOperatorDocument);
const batchSize = 32;
const vectors = [];
for (let i = 0; i < docs.length; i += batchSize) {
  const batch = docs.slice(i, i + batchSize);
  console.log(`Embedding ${Math.min(i + batch.length, docs.length)}/${docs.length} operators...`);
  vectors.push(...await generateEmbeddings(batch.map(d => d.text)));
}
const documents = docs.map((doc, i) => ({ ...doc, embedding: vectors[i] }));
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, JSON.stringify({
  version: 1,
  source: "src/data/operators.json",
  createdAt: new Date().toISOString(),
  count: documents.length,
  documents,
}, null, 2));
console.log(`Wrote ${documents.length} operator vectors to ${outputPath}`);
