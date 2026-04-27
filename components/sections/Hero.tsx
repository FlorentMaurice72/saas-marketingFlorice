import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Subtle orange glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className="text-xs font-semibold text-orange-400 tracking-wide">
            Logiciel de gestion locative pour boxes de stockage
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          Quel que soit le nombre de locataires,{" "}
          <span className="text-orange-500">votre gestion prend 15 minutes</span>{" "}
          par mois.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Automatisez. Contrôlez. Gagnez du temps.
        </p>

        {/* Social proof line */}
        <p className="mt-4 text-sm text-zinc-500">
          Conçu par un propriétaire de{" "}
          <span className="font-semibold text-zinc-300">34 boxes</span> et{" "}
          <span className="font-semibold text-zinc-300">30+ locataires actifs</span>.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-orange-500/25 hover:bg-orange-600 transition-all"
          >
            Essai gratuit
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-all"
          >
            Prendre contact
          </a>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50">
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="ml-3 h-5 flex-1 max-w-xs rounded-md bg-zinc-800 px-3 flex items-center">
              <span className="text-[10px] text-zinc-500">app.boxmanager.fr</span>
            </div>
          </div>

          {/* Dashboard */}
          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500">Tableau de bord</p>
                <p className="text-lg font-bold text-zinc-100">Juin 2025</p>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                Tout à jour ✓
              </span>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3">
              {[
                { label: "Boxes occupées", value: "34/34", color: "text-orange-400" },
                { label: "Loyers perçus", value: "6 120 €", color: "text-emerald-400" },
                { label: "Impayés", value: "2", color: "text-red-400" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:p-4">
                  <p className={`text-base font-bold sm:text-lg ${s.color}`}>{s.value}</p>
                  <p className="mt-0.5 text-[10px] text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { name: "Martin D.", box: "Box 04", status: "Payé", ok: true },
                { name: "Sophie B.", box: "Box 11", status: "Payé", ok: true },
                { name: "Lucas P.", box: "Box 17", status: "En retard", ok: false },
              ].map((t) => (
                <div key={t.name} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-200">{t.name}</p>
                      <p className="text-[10px] text-zinc-500">{t.box}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.ok ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
