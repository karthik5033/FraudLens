import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { upi, domain } = await req.json();

  // Fake known scam networks for demo
  const knownBadUPIs = [
    "scammer@oksbi",
    "refundhelp@okaxis",
    "verify1@okicici",
  ];
  const knownBadDomains = ["fastag-update.in", "kyc-verifyportal.in"];

  let risk = 0.1;
  let cluster = null;

  if (upi && knownBadUPIs.includes(upi.toLowerCase())) {
    risk = 0.9;
    cluster = "FraudCluster17";
  }

  if (domain && knownBadDomains.includes(domain.toLowerCase())) {
    risk = Math.max(risk, 0.85);
    cluster = cluster || "FraudCluster12";
  }

  return NextResponse.json({
    risk,
    cluster,
  });
}
