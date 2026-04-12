"use client"

import { useState, useRef, type FormEvent } from "react"
import { X, Sparkles, Loader2, RotateCcw, Save, Copy, Check, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { generateCampaignAction, createCampaignAction } from "@/app/(app)/campaigns/actions"
import {
  TEMPLATE_META,
  type CampaignTemplate,
  type ToneType,
  type AudienceLevel,
  type CampaignGoal,
  type AIGeneratedCampaign,
} from "@/lib/ai/prompts"
import type { CampaignType } from "@/types/campaign"

// ─── Types ────────────────────────────────────────────────────────────────────

interface AIGeneratorModalProps {
  onSaved: () => void
  onClose: () => void
}

type Step = "template" | "form" | "result"

// ─── Options ──────────────────────────────────────────────────────────────────

const TONES: Array<{ value: ToneType; label: string; description: string }> = [
  { value: "professionnel", label: "Professionnel", description: "Sérieux & crédible" },
  { value: "direct", label: "Direct", description: "Court & factuel" },
  { value: "premium", label: "Premium", description: "Exclusif & raffiné" },
  { value: "agressif", label: "Assertif", description: "Urgent & percutant" },
  { value: "fun", label: "Fun", description: "Humain & accessible" },
]

const GOALS: Array<{ value: CampaignGoal; label: string }> = [
  { value: "conversion", label: "Conversion" },
  { value: "vente", label: "Vente directe" },
  { value: "engagement", label: "Engagement" },
  { value: "traffic", label: "Trafic" },
]

const AUDIENCE_LEVELS: Array<{ value: AudienceLevel; label: string; description: string }> = [
  { value: "debutant", label: "Débutant", description: "Langage simple" },
  { value: "expert", label: "Expert", description: "Technique ok" },
  { value: "entreprise", label: "B2B", description: "Focus ROI" },
  { value: "niche", label: "Niche", description: "Ultra-ciblé" },
]

const inputCls = cn(
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900",
  "placeholder:text-slate-400 transition-colors",
  "focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20",
  "disabled:bg-slate-50 disabled:text-slate-400"
)

// ─── Step 1: Template selector ────────────────────────────────────────────────

function TemplateStep({
  selected,
  onSelect,
}: {
  selected: CampaignTemplate | null
  onSelect: (t: CampaignTemplate) => void
}) {
  const templates = Object.entries(TEMPLATE_META) as Array<[CampaignTemplate, typeof TEMPLATE_META[CampaignTemplate]]>

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-slate-800">Choisissez un template</p>
        <p className="text-xs text-slate-500">Chaque template est optimisé pour un canal et un objectif spécifique</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {templates.map(([key, meta]) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={cn(
              "flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all",
              selected === key
                ? "border-violet-400 bg-violet-50 ring-2 ring-violet-400 shadow-sm"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <span className="text-2xl">{meta.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={cn("text-sm font-semibold", selected === key ? "text-violet-800" : "text-slate-800")}>
                  {meta.name}
                </p>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  selected === key ? "bg-violet-200 text-violet-700" : "bg-slate-100 text-slate-500"
                )}>
                  {meta.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{meta.description}</p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">{meta.framework}</p>
            </div>
            {selected === key && <Check className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step 2: Details form ─────────────────────────────────────────────────────

function DetailsStep({
  selectedTone,
  setSelectedTone,
  selectedGoal,
  setSelectedGoal,
  selectedAudienceLevel,
  setSelectedAudienceLevel,
  fieldErrors,
  generating,
}: {
  selectedTone: ToneType
  setSelectedTone: (t: ToneType) => void
  selectedGoal: CampaignGoal
  setSelectedGoal: (g: CampaignGoal) => void
  selectedAudienceLevel: AudienceLevel
  setSelectedAudienceLevel: (a: AudienceLevel) => void
  fieldErrors: Record<string, string>
  generating: boolean
}) {
  return (
    <div className="space-y-5">
      {/* Product description */}
      <div>
        <label htmlFor="ai-product" className="mb-1.5 block text-sm font-medium text-slate-700">
          Produit / Service <span className="text-red-400">*</span>
        </label>
        <textarea
          id="ai-product"
          name="productDescription"
          rows={3}
          placeholder="Ex: Application SaaS de gestion de campagnes marketing pour PME. Permet de créer, automatiser et analyser des campagnes en 5 minutes sans compétence technique."
          className={cn(inputCls, "resize-none", fieldErrors.productDescription && "border-red-400")}
          disabled={generating}
        />
        {fieldErrors.productDescription && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.productDescription}</p>
        )}
      </div>

      {/* Target audience */}
      <div>
        <label htmlFor="ai-audience" className="mb-1.5 block text-sm font-medium text-slate-700">
          Audience cible <span className="text-red-400">*</span>
        </label>
        <input
          id="ai-audience"
          name="targetAudience"
          type="text"
          placeholder="Ex: Dirigeants de PME 35-55 ans, peu à l'aise avec le marketing digital, CA 500k-2M€"
          className={cn(inputCls, fieldErrors.targetAudience && "border-red-400")}
          disabled={generating}
        />
        {fieldErrors.targetAudience && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.targetAudience}</p>
        )}
      </div>

      {/* Tone */}
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Ton <span className="text-red-400">*</span></p>
        <div className="grid grid-cols-5 gap-1.5">
          {TONES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setSelectedTone(t.value)}
              disabled={generating}
              className={cn(
                "flex flex-col gap-0.5 rounded-lg border p-2 text-center transition-all",
                selectedTone === t.value
                  ? "border-violet-400 bg-violet-50 text-violet-700 ring-2 ring-violet-400 shadow-sm"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              <span className="text-xs font-semibold">{t.label}</span>
              <span className="text-[9px] opacity-70 leading-tight">{t.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Goal + Audience level in 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Objectif <span className="text-red-400">*</span></p>
          <div className="grid grid-cols-2 gap-1.5">
            {GOALS.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setSelectedGoal(g.value)}
                disabled={generating}
                className={cn(
                  "rounded-lg border px-2 py-2 text-xs font-medium transition-all",
                  selectedGoal === g.value
                    ? "border-violet-400 bg-violet-50 text-violet-700 ring-1 ring-violet-400"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Niveau audience <span className="text-red-400">*</span></p>
          <div className="grid grid-cols-2 gap-1.5">
            {AUDIENCE_LEVELS.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setSelectedAudienceLevel(a.value)}
                disabled={generating}
                className={cn(
                  "flex flex-col gap-0.5 rounded-lg border p-2 text-center transition-all",
                  selectedAudienceLevel === a.value
                    ? "border-violet-400 bg-violet-50 text-violet-700 ring-1 ring-violet-400"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <span className="text-xs font-semibold">{a.label}</span>
                <span className="text-[9px] opacity-70">{a.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Result panel ─────────────────────────────────────────────────────

function ResultPanel({
  result,
  templateName,
  onRegenerate,
  onSave,
  saving,
}: {
  result: AIGeneratedCampaign
  templateName: string
  onRegenerate: () => void
  onSave: () => void
  saving: boolean
}) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  function copy(text: string, field: string) {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  function copyAll() {
    const full = `${result.title}\n\n${result.hook}\n\n${result.body}\n\n${result.call_to_action}`
    copy(full, "all")
  }

  const CopyBtn = ({ text, field }: { text: string; field: string }) => (
    <button
      type="button"
      onClick={() => copy(text, field)}
      className="ml-auto opacity-0 group-hover:opacity-100 rounded p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
    >
      {copiedField === field ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
    </button>
  )

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100">
          <Sparkles className="h-3 w-3 text-violet-600" />
        </div>
        <p className="text-sm font-medium text-slate-700">Campagne générée — <span className="text-slate-400">{templateName}</span></p>
        <button
          onClick={copyAll}
          className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200"
        >
          {copiedField === "all" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          Tout copier
        </button>
      </div>

      {/* Title */}
      <div className="group relative rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Titre / Objet</span>
          <CopyBtn text={result.title} field="title" />
        </div>
        <p className="text-sm font-bold text-slate-900">{result.title}</p>
      </div>

      {/* Hook */}
      <div className="group relative rounded-xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Accroche</span>
          <CopyBtn text={result.hook} field="hook" />
        </div>
        <p className="text-sm font-medium text-slate-800 italic">&ldquo;{result.hook}&rdquo;</p>
      </div>

      {/* Body */}
      <div className="group relative rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Corps du message</span>
          <CopyBtn text={result.body} field="body" />
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{result.body}</p>
      </div>

      {/* CTA */}
      <div className="group relative rounded-xl border border-emerald-100 bg-emerald-50 p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Call to Action</span>
          <CopyBtn text={result.call_to_action} field="cta" />
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
            {result.call_to_action}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onRegenerate}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200 disabled:opacity-50"
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
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Sauvegarde…" : "Sauvegarder comme campagne"}
        </button>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AIGeneratorModal({ onSaved, onClose }: AIGeneratorModalProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const [step, setStep] = useState<Step>("template")
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null)
  const [selectedTone, setSelectedTone] = useState<ToneType>("professionnel")
  const [selectedGoal, setSelectedGoal] = useState<CampaignGoal>("conversion")
  const [selectedAudienceLevel, setSelectedAudienceLevel] = useState<AudienceLevel>("entreprise")

  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<AIGeneratedCampaign | null>(null)
  const [campaignType, setCampaignType] = useState<CampaignType>("email")
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  function handleTemplateNext() {
    if (!selectedTemplate) return
    setStep("form")
  }

  async function handleGenerate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedTemplate) return
    setError(null)
    setFieldErrors({})
    setGenerating(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("template", selectedTemplate)
      formData.set("tone", selectedTone)
      formData.set("goal", selectedGoal)
      formData.set("audienceLevel", selectedAudienceLevel)

      const res = await generateCampaignAction(formData)
      setGenerating(false)

      if (res.fieldErrors) { setFieldErrors(res.fieldErrors); return }
      if (res.error) { setError(res.error); return }
      if (res.data) {
        setResult(res.data)
        setCampaignType(res.campaignType ?? "email")
        setStep("result")
      }
    } catch (err) {
      setGenerating(false)
      const msg = err instanceof Error ? err.message : String(err)
      if (!msg.includes("NEXT_REDIRECT")) {
        setError("Une erreur est survenue. Réessayez.")
      }
    }
  }

  async function handleSave() {
    if (!result) return
    setSaving(true)

    try {
      const formData = new FormData()
      formData.set("name", result.title)
      formData.set("type", campaignType)
      formData.set("content", `${result.hook}\n\n${result.body}\n\nCTA : ${result.call_to_action}`)
      formData.set("status", "draft")

      const res = await createCampaignAction(formData)
      setSaving(false)

      if (res.success) { onSaved() }
      else { setError(res.error ?? "Erreur lors de la sauvegarde.") }
    } catch (err) {
      setSaving(false)
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes("NEXT_REDIRECT")) { onSaved(); return }
      setError("Erreur lors de la sauvegarde. Réessayez.")
    }
  }

  function handleRegenerate() {
    setResult(null)
    setError(null)
    setStep("form")
  }

  const stepLabels: Record<Step, string> = {
    template: "1 / 3 — Template",
    form: "2 / 3 — Paramètres",
    result: "3 / 3 — Résultat",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl shadow-slate-900/20 animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Assistant Marketing IA</h2>
              <p className="text-xs text-violet-500 font-medium">{stepLabels[step]}</p>
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

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {step === "template" && (
            <TemplateStep
              selected={selectedTemplate}
              onSelect={setSelectedTemplate}
            />
          )}

          {step === "form" && (
            <form ref={formRef} onSubmit={handleGenerate} noValidate>
              <DetailsStep
                selectedTone={selectedTone}
                setSelectedTone={setSelectedTone}
                selectedGoal={selectedGoal}
                setSelectedGoal={setSelectedGoal}
                selectedAudienceLevel={selectedAudienceLevel}
                setSelectedAudienceLevel={setSelectedAudienceLevel}
                fieldErrors={fieldErrors}
                generating={generating}
              />

              {/* Generate button inside form */}
              <button
                id="generate-submit"
                type="submit"
                className="hidden"
              />
            </form>
          )}

          {step === "result" && result && (
            <ResultPanel
              result={result}
              templateName={selectedTemplate ? TEMPLATE_META[selectedTemplate].name : ""}
              onRegenerate={handleRegenerate}
              onSave={handleSave}
              saving={saving}
            />
          )}
        </div>

        {/* Footer navigation */}
        {step !== "result" && (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 shrink-0">
            <button
              type="button"
              onClick={() => step === "form" ? setStep("template") : onClose()}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {step === "form" ? "Retour" : "Annuler"}
            </button>

            {step === "template" && (
              <button
                type="button"
                onClick={handleTemplateNext}
                disabled={!selectedTemplate}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white shadow-sm",
                  "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700",
                  "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                Continuer
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {step === "form" && (
              <button
                type="button"
                disabled={generating}
                onClick={() => {
                  document.getElementById("generate-submit")?.click()
                }}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white shadow-sm",
                  "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700",
                  "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-60"
                )}
              >
                {generating ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Génération…</>
                ) : (
                  <><Sparkles className="h-4 w-4" />Générer la campagne</>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
