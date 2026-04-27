const STEPS = [
  {
    number: "01",
    title: "Importez votre relevé bancaire",
    description: "Glissez votre fichier CSV en quelques secondes. BoxManager lit et structure vos données bancaires automatiquement.",
  },
  {
    number: "02",
    title: "BoxManager analyse vos loyers",
    description: "Les paiements sont identifiés et rapprochés de vos locataires. Les impayés sont détectés immédiatement et mis en évidence.",
  },
  {
    number: "03",
    title: "Gérez en 15 minutes par mois",
    description: "Relances, suivi des impayés et export comptable — tout est prêt en quelques clics. Votre gestion ne prend plus que 15 minutes.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            Fonctionnement
          </p>
          <h2 className="text-3xl font-extrabold text-zinc-50 sm:text-4xl">
            Comment ça marche
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Opérationnel en moins de 10 minutes, sans formation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative flex flex-col">
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div className="absolute top-7 hidden h-px sm:block"
                  style={{ left: "calc(100% - 1.5rem)", width: "calc(100% - 1rem)", borderTop: "2px dashed #3f3f46" }}
                />
              )}

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-lg font-extrabold text-white shadow-lg shadow-orange-500/30">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-zinc-100">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
