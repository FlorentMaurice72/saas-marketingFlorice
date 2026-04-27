"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const FAQS = [
  {
    q: "Est-ce que BoxManager est adapté si j'ai peu de locataires ?",
    a: "Oui. Le plan gratuit est conçu pour les petits parcs jusqu'à 10 boxes. Dès le premier locataire, BoxManager vous fait gagner du temps sur le suivi des loyers et les relances.",
  },
  {
    q: "Comment fonctionne l'import des loyers ?",
    a: "Vous exportez votre relevé bancaire au format CSV depuis votre banque, puis vous le glissez dans BoxManager. Le logiciel identifie automatiquement les virements de vos locataires et met à jour votre tableau de bord.",
  },
  {
    q: "Est-ce que je peux tester gratuitement ?",
    a: "Oui. Le plan gratuit est disponible sans limite de durée pour jusqu'à 10 boxes. Le plan Pro inclut 14 jours d'essai offerts, sans carte bancaire requise.",
  },
  {
    q: "Est-ce sécurisé ?",
    a: "Toutes vos données sont chiffrées au repos et en transit. BoxManager est hébergé en France et respecte le RGPD. Vous restez propriétaire de vos données et pouvez les exporter à tout moment.",
  },
  {
    q: "Est-ce que BoxManager remplace mon comptable ?",
    a: "Non. BoxManager vous aide à avoir une gestion propre et à produire des exports comptables clairs. Votre comptable reste indispensable pour votre déclaration — BoxManager lui mâche simplement le travail.",
  },
  {
    q: "Est-ce compliqué à utiliser ?",
    a: "Non. La prise en main prend moins de 10 minutes. L'interface est pensée pour des propriétaires, pas pour des comptables ou des développeurs. Si vous savez utiliser Excel, vous saurez utiliser BoxManager.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            FAQ
          </p>
          <h2 className="text-3xl font-extrabold text-zinc-50 sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>

        <div className="mt-10 space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-zinc-100">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "ml-4 h-4 w-4 shrink-0 text-zinc-500 transition-transform",
                    open === i && "rotate-180 text-orange-500"
                  )}
                />
              </button>
              {open === i && (
                <div className="border-t border-zinc-800 px-5 pb-4 pt-3">
                  <p className="text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
