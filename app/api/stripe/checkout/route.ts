import { NextRequest, NextResponse } from "next/server"
import { getStripe, PLANS } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json()

    if (!plan || !(plan in PLANS)) {
      return NextResponse.json({ error: "Plan invalide." }, { status: 400 })
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS]

    if (!selectedPlan.priceId) {
      return NextResponse.json(
        { error: "Paiement non encore disponible. Contactez-nous." },
        { status: 503 }
      )
    }

    const origin = req.headers.get("origin") ?? "https://boxmanager.fr"

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: selectedPlan.priceId, quantity: 1 }],
      customer_email: email || undefined,
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      locale: "fr",
      metadata: { plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("[stripe/checkout]", err)
    return NextResponse.json({ error: "Erreur lors de la création de la session." }, { status: 500 })
  }
}
