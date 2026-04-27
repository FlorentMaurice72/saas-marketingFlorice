import { Clock, AlertTriangle, Table2 } from "lucide-react"

const PROBLEMS = [
  {
    icon: Clock,
    title: "Vous perdez du temps à vérifier vos loyers",
    description:
      "Rapprocher les virements un par un, vérifier qui a payé, relancer manuellement… des heures chaque mois pour une tâche qui pourrait prendre 5 minutes.",
  },
  {
    icon: AlertTriangle,
    title: "Vous ratez des impayés",
    description:
      "Un loyer non perçu peut passer inaperçu pendant plusieurs semaines. Sans système d'alerte, les retards s'accumulent avant que vous les détectiez.",
  },
  {
    icon: Table2,
    title: "Votre tableur devient ingérable",
    description:
      "Au-delà de quelques locataires, Excel atteint ses limites. Les erreurs se multiplient, les données se perdent, et le suivi devient un casse-tête.",
  },
]

export function Problem() {
  return (
    <section id="features" className="bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            Le problème
          </p>
          <h2 className="text-3xl font-extrabold text-zinc-50 sm:text-4xl">
            La gestion devient un problème dès que vous avez plusieurs locataires
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {PROBLEMS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                  <Icon className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="font-semibold text-zinc-100">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {p.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
