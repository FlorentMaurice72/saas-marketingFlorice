import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret." }, { status: 400 })
  }

  let event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error("[stripe/webhook] signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const email = session.customer_email
    const plan = session.metadata?.plan

    if (email && (plan === "essentiel" || plan === "pro")) {
      const supabase = createServerSupabaseClient()
      await supabase.from("subscriptions").insert({
        email,
        plan,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        status: "active",
      })
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object
    const supabase = createServerSupabaseClient()
    await supabase
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("stripe_subscription_id", subscription.id)
  }

  return NextResponse.json({ received: true })
}
