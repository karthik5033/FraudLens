

"use server";

import fs from "fs";
import path from "path";
import { Tokenizer } from "tokenizers";
import { InferenceSession, Tensor } from "onnxruntime-node";


// ----------------------------
// MODEL + TOKENIZER LOADING
// ----------------------------

let session: InferenceSession | null = null;
let tokenizer: Tokenizer | null = null;

async function loadTokenizer() {
  if (!tokenizer) {
    const filePath = path.join(process.cwd(), "models/nlp/tokenizer.json");
    const json = fs.readFileSync(filePath, "utf8");
    tokenizer = await Tokenizer.fromString(json);
  }
  return tokenizer;
}

async function loadSession() {
  if (!session) {
    const modelPath = path.join(process.cwd(), "models/nlp/model.onnx");
    session = await InferenceSession.create(modelPath, {
      executionProviders: ["cpu"],
    });
  }
  return session;
}

// ----------------------------
// RUN NLP MODEL
// ----------------------------

export async function runNLP(text: string): Promise<number> {
  const tok = await loadTokenizer();
  const model = await loadSession();

  const encoded = await tok.encode(text);

  const ids = encoded.getIds();
  const inputIds = new Tensor(
    "int64",
    BigInt64Array.from(ids.map(BigInt)),
    [1, ids.length]
  );

  const attentionMask = encoded.getAttentionMask();
  const attention = new Tensor(
    "int64",
    BigInt64Array.from(attentionMask.map(BigInt)),
    [1, attentionMask.length]
  );

  const outputs = await model.run({
    input_ids: inputIds,
    attention_mask: attention,
  });

  // Assuming model returns logits or probability at "output"
  const logits = outputs["output"] as Tensor;

  // Convert logits → probability (sigmoid)
  const val = Number(logits.data[0]);
  const prob = 1 / (1 + Math.exp(-val)); // sigmoid

  return prob; // number between 0–1
}
