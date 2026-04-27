import { Zap, Bell, FileSpreadsheet } from "lucide-react"

const SOLUTIONS = [
  {
    icon: Zap,
    title: "Plus de vérification manuelle",
    description:
      "Vos loyers sont analysés automatiquement à partir de vos relevés bancaires. BoxManager identifie chaque paiement et met à jour votre tableau de bord sans que vous ayez à intervenir.",
  },
  {
    icon: Bell,
    title: "Plus d'impayés oubliés",
    description:
      "Les retards de paiement sont détectés immédiatement. Une alerte est générée dès qu'un loyer attendu n'est pas reçu, et les relances partent automatiquement.",
  },
  {
    icon: FileSpreadsheet,
    title: "Tout est prêt pour votre comptabilité",
    description:
      "Un export comptable clair, structuré et prêt pour votre déclaration d'impôts. En un clic, vous avez tout ce dont votre comptable a besoin.",
  },
]

export function Features() {
  return (
    <section className="bg-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            La solution
          </p>
          <h2 className="text-3xl font-extrabold text-zinc-50 sm:text-4xl">
            Une gestion entièrement automatisée
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            BoxManager prend en charge tout ce qui vous faisait perdre du temps.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {SOLUTIONS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10">
                  <Icon className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="font-semibold text-zinc-100">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {s.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
