import { ArrowRight, Check } from "lucide-react"

const PROOF_POINTS = [
  "Aucune installation",
  "Données sécurisées",
  "Support inclus",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-50/80 to-transparent" />
        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-blue-700">Logiciel de gestion locative</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Gérez vos boxes{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                en 15 min
              </span>{" "}
              par mois
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              BoxManager centralise vos contrats, vos loyers et vos relances.
              10, 20, 50 locataires — tout est géré automatiquement.
              <strong className="text-slate-800"> Simple. Fiable. Sans prise de tête.</strong>
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {PROOF_POINTS.map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-sm text-slate-600">
                  <Check className="h-4 w-4 text-blue-500" />
                  {p}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all hover:shadow-lg"
              >
                Démarrer gratuitement
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Voir une démo
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Gratuit jusqu&apos;à 10 boxes — aucune carte bancaire requise
            </p>
          </div>

          {/* Right: dashboard mockup */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <div className="ml-3 h-5 flex-1 rounded-md bg-slate-200/80 px-3 flex items-center">
                  <span className="text-[10px] text-slate-400">app.boxmanager.fr</span>
                </div>
              </div>

              {/* Dashboard preview */}
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Tableau de bord</p>
                    <p className="text-lg font-bold text-slate-900">Juin 2025</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Tout à jour ✓
                  </span>
                </div>

                {/* Stats row */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Boxes occupées", value: "24/26", color: "text-blue-600" },
                    { label: "Loyers perçus", value: "3 840 €", color: "text-green-600" },
                    { label: "En attente", value: "2", color: "text-amber-600" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                      <p className="mt-0.5 text-[10px] text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tenant list */}
                <div className="space-y-2">
                  {[
                    { name: "Martin Dupont", box: "Box 04", status: "Payé", ok: true },
                    { name: "Sophie Bernard", box: "Box 11", status: "Payé", ok: true },
                    { name: "Lucas Petit", box: "Box 17", status: "En retard", ok: false },
                  ].map((t) => (
                    <div key={t.name} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                          {t.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-800">{t.name}</p>
                          <p className="text-[10px] text-slate-400">{t.box}</p>
                        </div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-4 -top-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
              <p className="text-xs font-semibold text-slate-700">Relance envoyée</p>
              <p className="text-[10px] text-slate-400">automatiquement 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
