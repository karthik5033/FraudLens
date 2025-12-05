import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ risk: 0, fraud_type: "unknown" });
  }

  // ------ MOCK NLP MODEL ------
  const suspiciousWords = [
    "refund",
    "mistake",
    "kyc",
    "urgent",
    "agent",
    "verify",
  ];

  const matched = suspiciousWords.some((w) => text.toLowerCase().includes(w));

  const risk = matched ? 0.85 : 0.15;

  return NextResponse.json({
    risk,
    fraud_type: matched ? "language_scam" : "safe",
    explanation: matched
      ? "Text contains known scam keywords"
      : "No scam language detected",
  });
}
