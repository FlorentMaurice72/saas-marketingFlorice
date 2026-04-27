import { Star } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Philippe Mercier",
    role: "Gestionnaire — 28 boxes, Lyon",
    avatar: "PM",
    color: "bg-blue-100 text-blue-700",
    quote:
      "Avant BoxManager, je passais 3-4h par mois à rapprocher les virements et envoyer des relances. Maintenant ça me prend 20 minutes, top chrono. Je ne reviendrai jamais en arrière.",
  },
  {
    name: "Isabelle Fontaine",
    role: "Propriétaire — 15 boxes, Bordeaux",
    avatar: "IF",
    color: "bg-violet-100 text-violet-700",
    quote:
      "Ce qui m'a convaincu c'est la simplicité. J'ai configuré tout mon parc en une heure. Les contrats, les loyers, les relances automatiques... tout est là, dans une seule interface.",
  },
  {
    name: "Frédéric Aubin",
    role: "Investisseur — 54 boxes, Toulouse",
    avatar: "FA",
    color: "bg-amber-100 text-amber-700",
    quote:
      "J'ai passé au plan Pro pour mon deuxième site. L'export comptable m'économise une heure de travail par trimestre avec mon expert-comptable. L'outil se rembourse seul.",
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Témoignages
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Ils gèrent leurs boxes avec BoxManager
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Des gestionnaires comme vous, qui ont repris le contrôle de leur temps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
