import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { context } = await req.json();

  // For hackathon: simple model
  const risk =
    context?.tab_switches > 2 ||
    context?.scroll_loops > 1 ||
    context?.hesitation > 4
      ? 0.55
      : 0.15;

  return NextResponse.json({
    risk,
    pattern: risk > 0.5 ? "victim_like_behavior" : "normal",
  });
}
