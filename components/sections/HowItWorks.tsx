const STEPS = [
  {
    number: "01",
    title: "Ajoutez vos boxes et locataires",
    description:
      "En 10 minutes, importez vos boxes et renseignez vos locataires. BoxManager prend en charge tout le reste.",
  },
  {
    number: "02",
    title: "BoxManager gère les loyers",
    description:
      "Les échéances sont suivies automatiquement. Dès qu'un paiement est en retard, le locataire reçoit une relance.",
  },
  {
    number: "03",
    title: "Vous gardez le contrôle en 15 min/mois",
    description:
      "Connectez-vous une fois par mois pour valider les paiements reçus et consulter votre tableau de bord. C'est tout.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Comment ça marche
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Opérationnel en 10 minutes
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Pas de formation, pas de manuel. BoxManager est conçu pour être
            utilisé immédiatement.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-full top-7 hidden h-px w-full -translate-y-1/2 border-t-2 border-dashed border-blue-200 sm:block" style={{ width: "calc(100% - 2rem)", left: "calc(100% - 1rem)" }} />
              )}

              <div className="flex flex-col items-start">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-extrabold text-white shadow-lg shadow-blue-200">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
