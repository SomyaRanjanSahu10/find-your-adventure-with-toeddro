import { pipeline } from "@huggingface/transformers";

const DEFAULT_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const EXPECTED_DIMENSIONS = 384;

let extractorPromise = null;

function getModelName() {
  return process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
}

async function getExtractor() {
  if (!extractorPromise) {
    const model = getModelName();
    extractorPromise = pipeline("feature-extraction", model, {
      dtype: "fp32",
    }).catch((error) => {
      extractorPromise = null;
      throw new Error(
        `Local embedding model initialization failed. The model may need to be downloaded on first use. ${error.message}`
      );
    });
  }
  return extractorPromise;
}

function toVector(output) {
  const vector = Array.from(output.data ?? output);
  if (vector.length !== EXPECTED_DIMENSIONS) {
    throw new Error(
      `Local embedding dimension mismatch: expected ${EXPECTED_DIMENSIONS}, received ${vector.length}.`
    );
  }
  return normalizeVector(vector);
}

export async function generateEmbeddings(texts) {
  if (!Array.isArray(texts) || texts.length === 0) {
    return [];
  }

  const extractor = await getExtractor();
  const vectors = [];

  for (const text of texts) {
    if (typeof text !== "string" || !text.trim()) {
      throw new Error("Cannot generate an embedding for empty text.");
    }

    const output = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });
    vectors.push(toVector(output));
  }

  return vectors;
}

export async function generateEmbedding(text) {
  const [vector] = await generateEmbeddings([text]);
  return vector;
}

function normalizeVector(vector) {
  const norm = Math.sqrt(vector.reduce((sum, x) => sum + x * x, 0)) || 1;
  return vector.map((x) => x / norm);
}
