"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const FAQS = [
  {
    q: "Est-ce que BoxManager fonctionne pour tout type de boxes ?",
    a: "Oui. BoxManager est conçu pour tous les types d'espaces de stockage locatifs : boxes individuels, garde-meubles, entrepôts divisés en lots. Si vous avez des locataires qui paient un loyer mensuel pour un espace de stockage, BoxManager est fait pour vous.",
  },
  {
    q: "Combien de temps pour tout configurer ?",
    a: "La plupart de nos utilisateurs sont opérationnels en moins d'une heure. L'ajout des boxes et des locataires est guidé pas à pas. Si vous avez une liste Excel, on peut vous aider à importer vos données.",
  },
  {
    q: "Les relances automatiques, comment ça marche exactement ?",
    a: "BoxManager surveille les dates d'échéance de chaque locataire. Si un loyer n'est pas marqué comme reçu à J+3, un email de rappel est envoyé automatiquement. Puis à J+7 et J+15. Vous pouvez personnaliser les délais et les messages.",
  },
  {
    q: "Puis-je essayer avant de payer ?",
    a: "Oui ! Le plan Gratuit vous permet de gérer jusqu'à 10 boxes sans limite de durée et sans carte bancaire. Vous pouvez passer à l'Essentiel ou au Pro à tout moment.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Toutes vos données sont hébergées sur des serveurs européens, chiffrées au repos et en transit. BoxManager respecte le RGPD. Vous restez propriétaire de vos données et pouvez les exporter à tout moment.",
  },
  {
    q: "Que se passe-t-il si je résilie ?",
    a: "Vous pouvez résilier à tout moment depuis votre espace. Vous conservez l'accès jusqu'à la fin de votre période payée, et vous pouvez exporter toutes vos données avant de partir. Aucune pénalité.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">FAQ</p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "ml-4 h-4 w-4 shrink-0 text-slate-400 transition-transform",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="border-t border-slate-100 px-5 pb-4 pt-3">
                  <p className="text-sm leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
