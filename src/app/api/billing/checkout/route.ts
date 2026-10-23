import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST() {
  const secret = process.env.STRIPE_SECRET_KEY;
  const price = process.env.STRIPE_PRICE_ID;
  if (!secret || !price) return NextResponse.json({ error: "Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID first." }, { status: 501 });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    success_url: `${appUrl}/?billing=success`,
    cancel_url: `${appUrl}/?billing=cancelled`
  });
  return NextResponse.json({ url: session.url });
}
