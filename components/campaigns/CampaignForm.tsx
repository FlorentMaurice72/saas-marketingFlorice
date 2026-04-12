"use client"

import { useState, useRef, type FormEvent } from "react"
import { X, Loader2, Megaphone, MonitorPlay, Share2 } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { createCampaignAction, type ActionResult } from "@/app/(app)/campaigns/actions"
import type { CampaignType } from "@/types/campaign"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CampaignFormProps {
  onSuccess: () => void
  onCancel: () => void
}

// ─── Type selector options ────────────────────────────────────────────────────

const CAMPAIGN_TYPES: Array<{
  value: CampaignType
  label: string
  description: string
  icon: React.ElementType
  color: string
  ring: string
}> = [
  {
    value: "email",
    label: "Email",
    description: "Campagne d'emailing ciblée",
    icon: Megaphone,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    ring: "ring-indigo-500",
  },
  {
    value: "ads",
    label: "Publicité",
    description: "Google Ads, Meta Ads...",
    icon: MonitorPlay,
    color: "bg-violet-50 text-violet-600 border-violet-200",
    ring: "ring-violet-500",
  },
  {
    value: "social",
    label: "Social",
    description: "Instagram, LinkedIn, X...",
    icon: Share2,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    ring: "ring-emerald-500",
  },
]

const inputCls = cn(
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900",
  "placeholder:text-slate-400 transition-colors",
  "focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
  "disabled:bg-slate-50 disabled:text-slate-400"
)

// ─── Component ────────────────────────────────────────────────────────────────

export function CampaignForm({ onSuccess, onCancel }: CampaignFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState<ActionResult>({})
  const [selectedType, setSelectedType] = useState<CampaignType>("email")
  const [charCount, setCharCount] = useState(0)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({})
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("type", selectedType)

      const result = await createCampaignAction(formData)
      setLoading(false)

      if (result.success) {
        formRef.current?.reset()
        setCharCount(0)
        onSuccess()
        return
      }
      setState(result)
    } catch (err) {
      setLoading(false)
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes("NEXT_REDIRECT")) { onSuccess(); return }
      setState({ error: "Une erreur est survenue. Réessayez." })
    }
  }

  function fieldError(field: string) {
    return state.fieldErrors?.[field]
  }

  return (
    // ── Modal overlay ──────────────────────────────────────────────────────
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl shadow-slate-900/20 animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Nouvelle campagne
            </h2>
            <p className="text-xs text-slate-500">
              Remplissez les informations ci-dessous
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col overflow-hidden">
          <div className="space-y-5 overflow-y-auto px-6 py-5">
            {/* Global error */}
            {state.error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {state.error}
              </div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="campaign-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Nom de la campagne
                <span className="ml-1 text-red-400">*</span>
              </label>
              <input
                id="campaign-name"
                name="name"
                type="text"
                required
                placeholder="Ex: Newsletter de juin, Black Friday 2025…"
                className={cn(
                  inputCls,
                  fieldError("name") && "border-red-400 focus:ring-red-500/20"
                )}
                disabled={loading}
                maxLength={100}
              />
              {fieldError("name") && (
                <p className="mt-1 text-xs text-red-600">{fieldError("name")}</p>
              )}
            </div>

            {/* Type selector */}
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Type de campagne
                <span className="ml-1 text-red-400">*</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {CAMPAIGN_TYPES.map((t) => {
                  const Icon = t.icon
                  const active = selectedType === t.value
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setSelectedType(t.value)}
                      disabled={loading}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border p-3 text-center",
                        "transition-all focus-visible:outline-none focus-visible:ring-2",
                        active
                          ? `${t.color} ${t.ring} ring-2 shadow-sm`
                          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          active ? "" : "text-slate-400"
                        )}
                      />
                      <div>
                        <p className="text-xs font-semibold">{t.label}</p>
                        <p className="mt-0.5 text-[10px] leading-tight opacity-70">
                          {t.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
              {/* Hidden input for type */}
              <input type="hidden" name="type" value={selectedType} />
            </div>

            {/* Content */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="campaign-content"
                  className="text-sm font-medium text-slate-700"
                >
                  Contenu
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    (optionnel)
                  </span>
                </label>
                <span
                  className={cn(
                    "text-xs",
                    charCount > 9000 ? "text-red-500" : "text-slate-400"
                  )}
                >
                  {charCount} / 10 000
                </span>
              </div>
              <textarea
                id="campaign-content"
                name="content"
                rows={4}
                placeholder="Décrivez votre campagne, rédigez votre message, ou collez votre brief IA…"
                className={cn(
                  inputCls,
                  "resize-none leading-relaxed",
                  fieldError("content") && "border-red-400"
                )}
                disabled={loading}
                maxLength={10000}
                onChange={(e) => setCharCount(e.target.value.length)}
              />
              {fieldError("content") && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldError("content")}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Statut</p>
              <div className="flex gap-2">
                {(["draft", "published"] as const).map((s) => (
                  <label
                    key={s}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm",
                      "transition-all has-[:checked]:border-indigo-400 has-[:checked]:bg-indigo-50",
                      "has-[:checked]:text-indigo-700 text-slate-600 border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      defaultChecked={s === "draft"}
                      className="sr-only"
                    />
                    {s === "draft" ? "Brouillon" : "Publier maintenant"}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4 shrink-0">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm",
                "hover:bg-indigo-700 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-60"
              )}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Création…" : "Créer la campagne"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
