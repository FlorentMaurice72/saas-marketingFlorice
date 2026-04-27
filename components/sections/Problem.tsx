import { FileSpreadsheet, Clock, AlertTriangle, FolderOpen } from "lucide-react"

const PAINS = [
  {
    icon: FileSpreadsheet,
    title: "Les tableurs qui se perdent",
    description:
      "Un fichier Excel par locataire, des versions qui s'accumulent, et impossible de retrouver qui a payé quoi en janvier.",
  },
  {
    icon: Clock,
    title: "Les relances oubliées",
    description:
      "Vous vous souvenez d'un impayé... 3 semaines après. À force d'oublier de relancer, certains ne paient plus.",
  },
  {
    icon: FolderOpen,
    title: "Les contrats introuvables",
    description:
      "Le contrat de M. Dupont ? Dans le tiroir du haut... ou peut-être le bas. Quand un locataire conteste, c'est le stress.",
  },
  {
    icon: AlertTriangle,
    title: "Les heures perdues chaque mois",
    description:
      "Rapprocher les virements, mettre à jour le tableau, envoyer les quittances... Des heures pour une activité qui devrait prendre 15 minutes.",
  },
]

export function Problem() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Le problème
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Gérer des boxes avec des outils bricolés, c&apos;est épuisant
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            La plupart des gestionnaires perdent des heures chaque mois sur des tâches qui devraient prendre quelques minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {PAINS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="flex gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                  <Icon className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
          <p className="text-base font-semibold text-blue-900">
            BoxManager résout tout ça. En moins de 15 minutes par mois.
          </p>
        </div>
      </div>
    </section>
  )
}
