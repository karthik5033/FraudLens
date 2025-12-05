import { NextResponse } from "next/server";
import { runOCR } from "@/lib/ocr";
import { extractFeatures } from "@/lib/extractFeatures";
import { runNLP } from "@/lib/loadNLP";

// TODO: Ensure transaction.ts exists in src/lib/ directory
import { fuseScores, ModelOutput } from "@/lib/fuse";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // 1️⃣ Convert file → buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2️⃣ OCR text
    const ocrText = await runOCR(buffer.toString("base64"));

    // 3️⃣ Extract UPI, domain, phone, etc.
    const features = extractFeatures(ocrText);

    // 4️⃣ Run all models
    // 4️⃣ Run all models
    const languageScore = await runNLP(features.text);
    const transactionScore = await runTransactionModel(features);

    const behaviorScore: ModelOutput = {
      risk: 0,
      fraud_type: undefined,
      cluster: undefined,
      explanation: undefined
    }; // (placeholder until you track behavior)
    // 5️⃣ Fuse scores
    const final = fuseScores({
      transaction: transactionScore,
      behavior: behaviorScore,
      nlp: {
        risk: 0,
        fraud_type: undefined,
        cluster: undefined,
        explanation: undefined
      },
      gnn: {
        risk: 0,
        fraud_type: undefined,
        cluster: undefined,
        explanation: undefined
      }
    });

    return NextResponse.json({
      ok: true,
      extracted: features,
      ocr: ocrText,
      ...final,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function runTransactionModel(features: any): Promise<ModelOutput> {
  return {
    risk: 0,
    fraud_type: undefined,
    cluster: undefined,
    explanation: undefined
  };
}
