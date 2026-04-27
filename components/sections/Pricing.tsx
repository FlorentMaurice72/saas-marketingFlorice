"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const PLANS = [
  {
    id: "free",
    name: "Gratuit",
    price: 0,
    period: null,
    description: "Pour démarrer et tester sans engagement.",
    cta: "Commencer gratuitement",
    ctaVariant: "outline" as const,
    highlight: false,
    features: [
      "Jusqu'à 10 boxes",
      "Suivi des loyers",
      "Tableau de bord",
      "Historique 6 mois",
      "Support par email",
    ],
    missing: ["Relances automatiques", "Contrats numériques", "Export comptable"],
  },
  {
    id: "essentiel",
    name: "Essentiel",
    price: 19,
    period: "mois",
    description: "Pour les gestionnaires jusqu'à 50 boxes.",
    cta: "Démarrer l'Essentiel",
    ctaVariant: "primary" as const,
    highlight: true,
    badge: "Le plus populaire",
    features: [
      "Jusqu'à 50 boxes",
      "Suivi des loyers",
      "Tableau de bord",
      "Historique complet",
      "Relances automatiques",
      "Contrats numériques PDF",
      "Export comptable CSV/PDF",
      "Support prioritaire",
    ],
    missing: [],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    period: "mois",
    description: "Pour les grands parcs de stockage.",
    cta: "Démarrer le Pro",
    ctaVariant: "dark" as const,
    highlight: false,
    features: [
      "Boxes illimitées",
      "Suivi des loyers",
      "Tableau de bord multi-site",
      "Historique complet",
      "Relances automatiques",
      "Contrats numériques PDF",
      "Export comptable CSV/PDF",
      "API & intégrations",
      "Support dédié (téléphone)",
      "Onboarding personnalisé",
    ],
    missing: [],
  },
]

export function Pricing() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout(planId: string) {
    if (planId === "free") {
      window.location.href = "#demo"
      return
    }

    setLoading(planId)
    setError(null)

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? "Une erreur est survenue.")
      }
    } catch {
      setError("Impossible de démarrer le paiement. Réessayez.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <section id="pricing" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Tarifs
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Un prix honnête. Sans surprise.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Commencez gratuitement. Passez au niveau supérieur quand vous en avez besoin.
          </p>
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-6",
                plan.highlight
                  ? "border-blue-500 shadow-xl shadow-blue-100 ring-2 ring-blue-500"
                  : "border-slate-200 shadow-sm"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white shadow">
                  {plan.badge}
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{plan.description}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}€</span>
                  {plan.period && (
                    <span className="mb-1 text-sm text-slate-500">/{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="mb-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-400 line-through">
                    <span className="mt-0.5 h-4 w-4 shrink-0 text-slate-300">—</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all disabled:opacity-60",
                  plan.ctaVariant === "primary" &&
                    "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
                  plan.ctaVariant === "outline" &&
                    "border border-slate-200 text-slate-700 hover:bg-slate-50",
                  plan.ctaVariant === "dark" &&
                    "bg-slate-900 text-white hover:bg-slate-800"
                )}
              >
                {loading === plan.id && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading === plan.id ? "Redirection…" : plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Paiement sécurisé par Stripe. Résiliation possible à tout moment. Sans engagement.
        </p>
      </div>
    </section>
  )
}
