import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Bell,
  History,
  Download,
} from "lucide-react"

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Tableau de bord en temps réel",
    description:
      "Visualisez d'un coup d'œil vos boxes occupées, libres, les loyers perçus et les impayés du mois.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: CreditCard,
    title: "Suivi automatique des loyers",
    description:
      "BoxManager enregistre chaque paiement, calcule les retards et vous alerte dès qu'un loyer est en souffrance.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Bell,
    title: "Relances automatiques",
    description:
      "Les rappels de loyer partent automatiquement à J+3, J+7, J+15. Vous n'y pensez plus — BoxManager le fait pour vous.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: FileText,
    title: "Contrats numériques",
    description:
      "Créez un contrat en 2 minutes, archivez-le en PDF. Retrouvez n'importe quel contrat en 3 secondes.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: History,
    title: "Historique complet",
    description:
      "Consultez tout l'historique de chaque locataire : paiements, relances, entrées, sorties. Rien ne se perd.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Download,
    title: "Export comptable",
    description:
      "Exportez vos données en CSV ou PDF pour votre comptable. En un clic, prêt pour la déclaration.",
    color: "bg-slate-100 text-slate-600",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Fonctionnalités
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Tout ce dont vous avez besoin. Rien de superflu.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            BoxManager est pensé spécifiquement pour les gestionnaires de boxes.
            Pas un outil généraliste. Pas de fonctionnalités inutiles.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${f.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
