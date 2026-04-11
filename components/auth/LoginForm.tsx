"use client"

import { useState, type FormEvent } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils/cn"

// ─── Reusable input style ──────────────────────────────────────────────────────
const inputCls = cn(
  "h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-900",
  "placeholder:text-slate-400 bg-white",
  "transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
)

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard"
  const justRegistered = searchParams.get("registered") === "true"

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email ou mot de passe incorrect.")
        setLoading(false)
        return
      }

      // Hard navigation to flush the router cache after session update
      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError("Une erreur inattendue s'est produite. Réessayez.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Success banner — shown after registration */}
      {justRegistered && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Compte créé avec succès ! Connectez-vous ci-dessous.
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Adresse email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="vous@exemple.com"
          className={inputCls}
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700"
          >
            Mot de passe
          </label>
          <a
            href="#"
            className="text-xs text-indigo-600 hover:underline"
            tabIndex={-1}
          >
            Mot de passe oublié ?
          </a>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className={cn(inputCls, "pr-10")}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label={showPassword ? "Masquer" : "Afficher"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg",
          "bg-indigo-600 text-sm font-medium text-white shadow-sm",
          "hover:bg-indigo-700 active:bg-indigo-800",
          "transition-colors focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-60"
        )}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  )
}
