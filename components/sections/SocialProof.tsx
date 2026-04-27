const STATS = [
  { value: "500+", label: "Gestionnaires actifs" },
  { value: "12 000+", label: "Boxes suivies" },
  { value: "15 min", label: "Par mois en moyenne" },
  { value: "98%", label: "De satisfaction client" },
]

export function SocialProof() {
  return (
    <section className="border-y border-slate-100 bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-slate-900">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
