import { ArrowRight } from "lucide-react"

export function CTAFinal() {
  return (
    <section className="bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-orange-500">
          Prêt à gagner du temps ?
        </p>
        <h2 className="text-4xl font-extrabold leading-tight text-zinc-50 sm:text-5xl">
          10, 20, 50 locataires.
          <br />
          <span className="text-orange-500">15 minutes par mois.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-400">
          Essayez BoxManager gratuitement — sans carte bancaire, sans engagement.
        </p>
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
      </div>
    </section>
  )
}
