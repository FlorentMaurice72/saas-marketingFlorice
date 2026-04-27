"use client"

import { useState } from "react"
import { Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const inputCls = cn(
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900",
  "placeholder:text-slate-400 transition-colors",
  "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
  "disabled:bg-slate-50 disabled:text-slate-400"
)

const BOX_RANGES = [
  "Moins de 10 boxes",
  "10 à 25 boxes",
  "25 à 50 boxes",
  "Plus de 50 boxes",
]

export function DemoForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    boxes_count: "",
    message: "",
  })

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error ?? "Une erreur est survenue.")
      }
    } catch {
      setError("Impossible d'envoyer votre demande. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="demo" className="bg-blue-600 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-200">
            Demander une démo
          </p>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Voyez BoxManager en action
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Remplissez ce formulaire et nous vous recontactons sous 24h pour une
            démonstration personnalisée — gratuite et sans engagement.
          </p>
        </div>

        {success ? (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-xl">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">Demande reçue !</h3>
            <p className="mt-2 text-sm text-slate-600">
              Nous vous contacterons sous 24h pour organiser votre démonstration.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
          >
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Nom <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Jean Dupont"
                  required
                  disabled={loading}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="jean@exemple.fr"
                  required
                  disabled={loading}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Société / Nom du site{" "}
                  <span className="text-xs font-normal text-slate-400">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Stockage Lyon Nord"
                  disabled={loading}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Nombre de boxes
                </label>
                <select
                  value={form.boxes_count}
                  onChange={(e) => set("boxes_count", e.target.value)}
                  disabled={loading}
                  className={inputCls}
                >
                  <option value="">Choisissez...</option>
                  {BOX_RANGES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Message{" "}
                <span className="text-xs font-normal text-slate-400">(optionnel)</span>
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Décrivez votre situation, vos questions ou besoins spécifiques…"
                disabled={loading}
                className={cn(inputCls, "resize-none")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Envoi en cours…" : "Demander ma démo gratuite"}
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Réponse sous 24h — Aucun engagement
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
