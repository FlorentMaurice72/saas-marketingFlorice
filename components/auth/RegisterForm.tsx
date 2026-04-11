"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { registerAction } from "@/app/auth/register/actions"

const inputCls = cn(
  "h-10 w-full rounded-lg border px-3 text-sm text-slate-900 bg-white",
  "placeholder:text-slate-400 transition-colors",
  "focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
)

const passwordChecks = [
  { label: "8 caractères minimum", test: (p: string) => p.length >= 8 },
  { label: "Une lettre majuscule", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Un chiffre", test: (p: string) => /[0-9]/.test(p) },
]

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await registerAction(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }
    if (result?.fieldErrors) {
      setFieldErrors(result.fieldErrors)
      setLoading(false)
      return
    }

    // Success: registerAction calls redirect() — this line won't be reached
    router.refresh()
  }

  function fieldCls(field: string) {
    return cn(
      inputCls,
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-200 focus:border-indigo-500"
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Global error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Nom complet
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Jean Dupont"
          className={fieldCls("name")}
          disabled={loading}
        />
        {fieldErrors.name && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
        )}
      </div>

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
          className={fieldCls("email")}
          disabled={loading}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Mot de passe
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(fieldCls("password"), "pr-10")}
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

        {/* Password strength checklist */}
        {password.length > 0 && (
          <ul className="mt-2 space-y-1">
            {passwordChecks.map((c) => {
              const ok = c.test(password)
              return (
                <li key={c.label} className="flex items-center gap-2">
                  {ok ? (
                    <Check className="h-3 w-3 shrink-0 text-emerald-500" />
                  ) : (
                    <X className="h-3 w-3 shrink-0 text-slate-300" />
                  )}
                  <span
                    className={cn(
                      "text-xs",
                      ok ? "text-emerald-600" : "text-slate-400"
                    )}
                  >
                    {c.label}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
        {fieldErrors.password && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
        )}
      </div>

      {/* Confirm password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Confirmer le mot de passe
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          required
          placeholder="••••••••"
          className={fieldCls("confirmPassword")}
          disabled={loading}
        />
        {fieldErrors.confirmPassword && (
          <p className="mt-1 text-xs text-red-600">
            {fieldErrors.confirmPassword}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg",
          "bg-indigo-600 text-sm font-medium text-white shadow-sm",
          "hover:bg-indigo-700 active:bg-indigo-800 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-60"
        )}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Création du compte…" : "Créer mon compte"}
      </button>

      <p className="text-center text-xs text-slate-400">
        En créant un compte, vous acceptez nos{" "}
        <a href="#" className="text-indigo-600 hover:underline">
          conditions d&apos;utilisation
        </a>
        .
      </p>
    </form>
  )
}
