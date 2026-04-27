"use client"

import { useState } from "react"
import { Check, Loader2, Shield, Lock, Server, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const FREE_FEATURES = [
  "Jusqu'à 10 boxes",
  "Import CSV mensuel",
  "Détection des impayés",
  "Relances simples",
]

const PRO_FEATURES = [
  "Boxes illimités",
  "Import CSV multi-biens",
  "Détection et historique des impayés",
  "Relances avec archivage automatique",
  "Export comptable prêt pour la déclaration",
  "Dashboard complet",
]

const TRUST_BADGES = [
  { icon: RotateCcw, label: "Satisfait ou remboursé 30 jours" },
  { icon: Lock, label: "Paiement sécurisé" },
  { icon: Shield, label: "Données chiffrées" },
  { icon: Server, label: "Hébergé en France" },
]

export function Pricing() {
  const [annual, setAnnual] = useState(true)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout(plan: string) {
    if (plan === "free") {
      window.location.href = "#demo"
      return
    }
    setLoading(plan)
    setError(null)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
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
    <section id="pricing" className="bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            Tarifs
          </p>
          <h2 className="text-3xl font-extrabold text-zinc-50 sm:text-4xl">
            Tarifs simples et transparents
          </h2>
          <p className="mt-3 text-zinc-400">
            Choisissez l&apos;offre adaptée à votre gestion
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={cn("text-sm", !annual ? "text-zinc-100 font-medium" : "text-zinc-500")}>
            Mensuel
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={cn(
              "relative h-6 w-11 rounded-full border transition-colors",
              annual ? "border-orange-500 bg-orange-500" : "border-zinc-600 bg-zinc-800"
            )}
          >
            <span className={cn(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
              annual ? "translate-x-5" : "translate-x-0.5"
            )} />
          </button>
          <span className={cn("text-sm", annual ? "text-zinc-100 font-medium" : "text-zinc-500")}>
            Annuel
            <span className="ml-1.5 rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-semibold text-orange-400">
              2 mois offerts
            </span>
          </span>
        </div>

        {error && (
          <div className="mx-auto mt-4 max-w-sm rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Plans */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Free */}
          <div className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-5">
              <h3 className="text-base font-bold text-zinc-100">Gratuit</h3>
              <p className="mt-1 text-xs text-zinc-500">Pour démarrer sans engagement</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-zinc-50">0€</span>
                <span className="mb-1 text-sm text-zinc-500">/mois</span>
              </div>
            </div>

            <ul className="mb-6 flex-1 space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout("free")}
              className="w-full rounded-xl border border-zinc-700 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
            >
              Commencer gratuitement
            </button>
          </div>

          {/* Pro */}
          <div className="relative flex flex-col rounded-2xl border border-orange-500/60 bg-zinc-900 p-6 shadow-xl shadow-orange-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white shadow">
              Recommandé
            </div>

            <div className="mb-5">
              <h3 className="text-base font-bold text-zinc-100">Pro</h3>
              <p className="mt-1 text-xs text-zinc-500">Pour une gestion complète</p>
              <div className="mt-4">
                {annual ? (
                  <div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-zinc-50">13€</span>
                      <span className="mb-1 text-sm text-zinc-500">/mois</span>
                    </div>
                    <p className="mt-0.5 text-xs text-orange-400 font-medium">
                      159€/an — 2 mois offerts
                    </p>
                  </div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-zinc-50">19€</span>
                    <span className="mb-1 text-sm text-zinc-500">/mois</span>
                  </div>
                )}
              </div>
            </div>

            <ul className="mb-4 flex-1 space-y-3">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="mb-4 text-center text-xs text-zinc-500">
              14 jours d&apos;essai offerts — sans carte bancaire
            </p>

            <button
              onClick={() => handleCheckout("essentiel")}
              disabled={loading === "essentiel"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-all disabled:opacity-60"
            >
              {loading === "essentiel" && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading === "essentiel" ? "Redirection…" : "Essai gratuit"}
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRUST_BADGES.map((b) => {
            const Icon = b.icon
            return (
              <div
                key={b.label}
                className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2.5"
              >
                <Icon className="h-4 w-4 shrink-0 text-orange-500" />
                <span className="text-xs text-zinc-400">{b.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
