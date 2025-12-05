import { NextResponse } from "next/server";

// Temporary fake data (replace with DB later)
const fakeDB: any = {
  "1": {
    id: "1",
    type: "Refund Scam",
    score: 0.91,
    upi: "scammer@oksbi",
    domain: "amazon-refund-help.in",
    cluster: "Cluster_17",
    extractedText: "Sir refund my amount...",
    timestamp: "2025-01-15 10:42",
  },
  "2": {
    id: "2",
    type: "KYC Phishing",
    score: 0.84,
    upi: "verify-fastag@okicici",
    domain: "fastag-verifymycard.in",
    cluster: "Cluster_05",
    extractedText: "Your FASTag KYC expired. Pay ₹1 to verify...",
    timestamp: "2025-01-15 10:10",
  },
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const item = fakeDB[id];

  if (!item) {
    return NextResponse.json({ error: "Log not found" }, { status: 404 });
  }

  return NextResponse.json(item, { status: 200 });
}
