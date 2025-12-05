import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount, upi } = await req.json();

  let risk = 0.1;
  let fraud_type = "safe";

  // Suspicious patterns
  if (amount === 1) {
    risk = 0.9;
    fraud_type = "verification_scam";
  } else if (amount && amount > 0 && amount < 20) {
    risk = 0.6;
    fraud_type = "unusual_small_amount";
  }

  return NextResponse.json({
    risk,
    fraud_type,
  });
}
