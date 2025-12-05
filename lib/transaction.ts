"use server";

import path from "path";
import { InferenceSession, Tensor } from "onnxruntime-node";

let session: InferenceSession | null = null;

async function loadSession() {
  if (!session) {
    const modelPath = path.join(
      process.cwd(),
      "models/transaction/transaction_model.onnx"
    );

    session = await InferenceSession.create(modelPath, {
      executionProviders: ["cpu"],
    });
  }

  return session;
}

/**
 * Example input:
 * {
 *   amount: 500,
 *   refundFlag: 1,
 *   suspiciousPattern: 0.8,
 *   isVerification: 0,
 * }
 */
export async function runTransaction(features: Record<string, number>) {
  const session = await loadSession();

  // Convert features object → Float32Array
  const inputValues = Object.values(features);
  const inputTensor = new Tensor("float32", Float32Array.from(inputValues), [
    1,
    inputValues.length,
  ]);

  // 'input' should match your ONNX model input name.
  // If your model input is named differently, update the key.
  const outputs = await session.run({ input: inputTensor });

  // Get the output tensor (usually named "output" or model-specific)
  const outputName = Object.keys(outputs)[0];
  const raw = outputs[outputName].data[0] as number;

  // Apply sigmoid if model outputs logits
  const prob = 1 / (1 + Math.exp(-raw));

  return prob; // a number between 0–1
}
