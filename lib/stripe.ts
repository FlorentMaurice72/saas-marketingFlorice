import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY environment variable")
    _stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia", typescript: true })
  }
  return _stripe
}

export const PLANS = {
  essentiel: {
    name: "Essentiel",
    priceId: process.env.STRIPE_PRICE_ESSENTIEL_ID ?? "",
    price: 19,
  },
  pro: {
    name: "Pro",
    priceId: process.env.STRIPE_PRICE_PRO_ID ?? "",
    price: 49,
  },
} as const
