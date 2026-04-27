import { Star } from "lucide-react"

const TESTIMONIALS = [
  {
    quote: "Depuis que j'utilise BoxManager, je ne passe plus que 15 minutes par mois sur ma gestion.",
    name: "Florent Maurice",
    role: "Propriétaire de 34 boxes",
    avatar: "FM",
  },
  {
    quote: "Je gérais tout sur Excel, c'était vite ingérable. Maintenant tout est clair et je vois immédiatement les impayés.",
    name: "Sébastien B.",
    role: "18 boxes",
    avatar: "SB",
  },
  {
    quote: "Le gain de temps est énorme. Je ne reviens plus en arrière.",
    name: "Marie-Christine R.",
    role: "27 boxes",
    avatar: "MR",
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            Témoignages
          </p>
          <h2 className="text-3xl font-extrabold text-zinc-50 sm:text-4xl">
            Ils gèrent leurs boxes avec BoxManager
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-zinc-800 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
