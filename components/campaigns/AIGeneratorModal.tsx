"use client"

import { useState, useRef, type FormEvent } from "react"
import {
  X,
  Sparkles,
  Loader2,
  RotateCcw,
  Save,
  Copy,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils/cn"
import {
  generateCampaignAction,
  createCampaignAction,
} from "@/app/(app)/campaigns/actions"
import type { AIGeneratedCampaign } from "@/lib/ai/prompts"
import type { CampaignType } from "@/types/campaign"
import type { CampaignGoal } from "@/lib/ai/prompts"

// ─── Types ────────────────────────────────────────────────────────────────────

interface AIGeneratorModalProps {
  onSaved: () => void
  onClose: () => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPES: Array<{ value: CampaignType; label: string; emoji: string }> = [
  { value: "email", label: "Email", emoji: "✉️" },
  { value: "ads", label: "Publicité", emoji: "📢" },
  { value: "social", label: "Social", emoji: "📱" },
]

const GOALS: Array<{ value: CampaignGoal; label: string; description: string }> = [
  { value: "conversion", label: "Conversion", description: "Ventes & inscriptions" },
  { value: "traffic", label: "Trafic", description: "Visites & clics" },
  { value: "awareness", label: "Notoriété", description: "Visibilité & image" },
]

const inputCls = cn(
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900",
  "placeholder:text-slate-400 transition-colors",
  "focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20",
  "disabled:bg-slate-50 disabled:text-slate-400"
)

// ─── Result panel ─────────────────────────────────────────────────────────────

function ResultPanel({
  result,
  onRegenerate,
  onSave,
  saving,
}: {
  result: AIGeneratedCampaign
  onRegenerate: () => void
  onSave: () => void
  saving: boolean
}) {
  const [copied, setCopied] = useState(false)

  function copyAll() {
    const text = `${result.title}\n\n${result.hook}\n\n${result.body}\n\n${result.call_to_action}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100">
          <Sparkles className="h-3.5 w-3.5 text-violet-600" />
        </div>
        <p className="text-sm font-medium text-slate-700">Campagne générée</p>
        <button
          onClick={copyAll}
          className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-100 transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copié !" : "Tout copier"}
        </button>
      </div>

      {/* Title */}
      <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
          Titre
        </p>
        <p className="text-sm font-semibold text-slate-900">{result.title}</p>
      </div>

      {/* Hook */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Accroche
        </p>
        <p className="text-sm font-medium text-slate-800 italic">
          &ldquo;{result.hook}&rdquo;
        </p>
      </div>

      {/* Body */}
      <div className="rounded-xl border border-slate-100 bg-white p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Corps du message
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {result.body}
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
          CTA
        </p>
        <p className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
          {result.call_to_action}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onRegenerate}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Régénérer
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className={cn(
            "ml-auto flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white shadow-sm",
            "hover:bg-violet-700 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-60"
          )}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Sauvegarde…" : "Sauvegarder comme campagne"}
        </button>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AIGeneratorModal({ onSaved, onClose }: AIGeneratorModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedType, setSelectedType] = useState<CampaignType>("email")
  const [selectedGoal, setSelectedGoal] = useState<CampaignGoal>("conversion")
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<AIGeneratedCampaign | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function handleGenerate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setGenerating(true)

    const formData = new FormData(e.currentTarget)
    formData.set("type", selectedType)
    formData.set("goal", selectedGoal)

    const res = await generateCampaignAction(formData)
    setGenerating(false)

    if (res.fieldErrors) { setFieldErrors(res.fieldErrors); return }
    if (res.error) { setError(res.error); return }
    if (res.data) setResult(res.data)
  }

  async function handleSave() {
    if (!result) return
    setSaving(true)

    const formData = new FormData()
    formData.set("name", result.title)
    formData.set("type", selectedType)
    formData.set(
      "content",
      `${result.hook}\n\n${result.body}\n\nCTA : ${result.call_to_action}`
    )
    formData.set("status", "draft")

    const res = await createCampaignAction(formData)
    setSaving(false)

    if (res.success) {
      onSaved()
    } else {
      setError(res.error ?? "Erreur lors de la sauvegarde.")
    }
  }

  function handleRegenerate() {
    setResult(null)
    setError(null)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl shadow-slate-900/20 animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Générer avec IA
              </h2>
              <p className="text-xs text-slate-500">
                Campagne prête en quelques secondes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5">
          {result ? (
            // ── Step 2: Result ───────────────────────────────────────────────
            <ResultPanel
              result={result}
              onRegenerate={handleRegenerate}
              onSave={handleSave}
              saving={saving}
            />
          ) : (
            // ── Step 1: Form ─────────────────────────────────────────────────
            <form ref={formRef} onSubmit={handleGenerate} noValidate>
              <div className="space-y-5">
                {/* Global error */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Type */}
                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Canal <span className="text-red-400">*</span>
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {TYPES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setSelectedType(t.value)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all",
                          selectedType === t.value
                            ? "border-violet-400 bg-violet-50 text-violet-700 ring-2 ring-violet-400 shadow-sm"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        <span className="text-lg">{t.emoji}</span>
                        <span className="text-xs font-semibold">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product description */}
                <div>
                  <label
                    htmlFor="ai-product"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Produit / Service <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="ai-product"
                    name="productDescription"
                    rows={3}
                    placeholder="Ex: Application SaaS de gestion de campagnes marketing pour PME. Permet de créer, automatiser et analyser des campagnes email en 5 minutes."
                    className={cn(
                      inputCls,
                      "resize-none",
                      fieldErrors.productDescription && "border-red-400"
                    )}
                    disabled={generating}
                  />
                  {fieldErrors.productDescription && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.productDescription}
                    </p>
                  )}
                </div>

                {/* Target audience */}
                <div>
                  <label
                    htmlFor="ai-audience"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Audience cible <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="ai-audience"
                    name="targetAudience"
                    type="text"
                    placeholder="Ex: Dirigeants de PME, 35-55 ans, peu à l'aise avec le marketing digital"
                    className={cn(
                      inputCls,
                      fieldErrors.targetAudience && "border-red-400"
                    )}
                    disabled={generating}
                  />
                  {fieldErrors.targetAudience && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.targetAudience}
                    </p>
                  )}
                </div>

                {/* Goal */}
                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Objectif <span className="text-red-400">*</span>
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {GOALS.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setSelectedGoal(g.value)}
                        className={cn(
                          "flex flex-col gap-0.5 rounded-xl border p-3 text-left transition-all",
                          selectedGoal === g.value
                            ? "border-violet-400 bg-violet-50 text-violet-700 ring-2 ring-violet-400 shadow-sm"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        <span className="text-xs font-semibold">{g.label}</span>
                        <span className="text-[10px] opacity-70 leading-tight">
                          {g.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={generating}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white shadow-sm",
                    "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700",
                    "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-60"
                  )}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Génération en cours…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Générer la campagne
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
