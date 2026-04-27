const STATS = [
  { value: "34", label: "boxes gérées" },
  { value: "30+", label: "locataires actifs" },
  { value: "10 ans", label: "d'expérience" },
]

export function SocialProof() {
  return (
    <section className="border-y border-zinc-800 bg-zinc-900 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-8 text-center text-sm font-medium text-zinc-400">
          Conçu et utilisé au quotidien par un propriétaire
        </p>
        <div className="grid grid-cols-3 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
