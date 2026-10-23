import { NextRequest, NextResponse } from "next/server";
// Scaffold only: verify provider signatures and normalize provider-specific events before production use.
export async function POST(request: NextRequest) {
  if (!process.env.VOICE_WEBHOOK_SECRET || !process.env.VOICE_PROVIDER) {
    return NextResponse.json({ error: "Voice integration is not configured." }, { status: 501 });
  }
  await request.text();
  return NextResponse.json({ received: true, note: "Webhook adapter still needs provider-specific signature verification and booking logic." });
}
