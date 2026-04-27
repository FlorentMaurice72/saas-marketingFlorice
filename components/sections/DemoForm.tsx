"use client"

import { useState } from "react"
import { Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const inputCls = cn(
  "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100",
  "placeholder:text-zinc-500 transition-colors",
  "focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20",
  "disabled:opacity-50"
)

const BOX_RANGES = [
  "Moins de 10 boxes",
  "10 à 25 boxes",
  "25 à 50 boxes",
  "Plus de 50 boxes",
]

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? ""

export function DemoForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nombre_boxes: "",
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
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.error ?? "Une erreur est survenue.")
        return
      }

      if (FORMSPREE_URL) {
        fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone || "—",
            nombre_boxes: form.nombre_boxes || "—",
            message: form.message || "—",
          }),
        }).catch(() => {})
      }

      setSuccess(true)
    } catch {
      setError("Impossible d'envoyer votre demande. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="demo" className="bg-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            Contact
          </p>
          <h2 className="text-3xl font-extrabold text-zinc-50 sm:text-4xl">
            Prendre contact
          </h2>
          <p className="mt-4 text-zinc-400">
            Remplissez ce formulaire et nous vous recontactons sous 24h.
          </p>
        </div>

        {success ? (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-orange-500" />
            <h3 className="mt-4 text-lg font-bold text-zinc-100">Message reçu !</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Nous vous répondrons sous 24h.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8"
          >
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Nom <span className="text-orange-500">*</span>
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
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Email <span className="text-orange-500">*</span>
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
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Téléphone <span className="text-zinc-600">(optionnel)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="06 12 34 56 78"
                  disabled={loading}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Nombre de boxes
                </label>
                <select
                  value={form.nombre_boxes}
                  onChange={(e) => set("nombre_boxes", e.target.value)}
                  disabled={loading}
                  className={cn(inputCls, "bg-zinc-800")}
                >
                  <option value="">Choisissez...</option>
                  {BOX_RANGES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Message <span className="text-zinc-600">(optionnel)</span>
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Décrivez votre situation ou vos questions…"
                disabled={loading}
                className={cn(inputCls, "resize-none")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Envoi en cours…" : "Envoyer ma demande"}
            </button>

            <p className="mt-3 text-center text-xs text-zinc-600">
              Réponse sous 24h — Aucun engagement
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
