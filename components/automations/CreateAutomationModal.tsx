"use client"

import { useState, useTransition, useRef } from "react"
import { X, ChevronRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TRIGGER_LABELS, TRIGGER_DESCRIPTIONS } from "@/types/automation"
import type { AutomationTriggerType } from "@/types/automation"
import { createAutomationAction } from "@/app/(app)/automations/actions"

const TRIGGERS: AutomationTriggerType[] = [
  "contact_created",
  "campaign_opened",
  "campaign_clicked",
  "tag_added",
  "time_delay",
]

const TRIGGER_ICONS: Record<AutomationTriggerType, string> = {
  contact_created:  "👤",
  campaign_opened:  "✉️",
  campaign_clicked: "🔗",
  tag_added:        "🏷️",
  time_delay:       "⏱️",
}

interface Props {
  onClose: () => void
}

export function CreateAutomationModal({ onClose }: Props) {
  const [step, setStep] = useState<"name" | "trigger">("name")
  const [name, setName] = useState("")
  const [trigger, setTrigger] = useState<AutomationTriggerType | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState("")
  const [isPending, startTransition] = useTransition()
  const nameRef = useRef<HTMLInputElement>(null)

  function handleNameNext(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) { setFieldErrors({ name: "Le nom est requis." }); return }
    setFieldErrors({})
    setStep("trigger")
  }

  function handleSubmit() {
    if (!trigger) { setFieldErrors({ trigger_type: "Choisissez un déclencheur." }); return }
    setFieldErrors({})
    setServerError("")

    const fd = new FormData()
    fd.set("name", name.trim())
    fd.set("trigger_type", trigger)

    startTransition(async () => {
      const result = await createAutomationAction(fd)
      if (result.fieldErrors) { setFieldErrors(result.fieldErrors); return }
      if (result.error) { setServerError(result.error); return }
      onClose()
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <Zap className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-slate-900">
              {step === "name" ? "Nom de l'automation" : "Choisir un déclencheur"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 px-6 pt-4">
          {(["name", "trigger"] as const).map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s === step || (step === "trigger" && s === "name")
                  ? "bg-indigo-600"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {step === "name" && (
            <form onSubmit={handleNameNext} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Nom de l'automation
                </label>
                <input
                  ref={nameRef}
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Bienvenue nouveaux contacts"
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                  Annuler
                </Button>
                <Button type="submit" size="sm" className="gap-1.5">
                  Suivant <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </form>
          )}

          {step === "trigger" && (
            <div className="space-y-4">
              <div className="space-y-2">
                {TRIGGERS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTrigger(t)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      trigger === t
                        ? "border-indigo-400 bg-indigo-50 ring-1 ring-indigo-400"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xl">{TRIGGER_ICONS[t]}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900">{TRIGGER_LABELS[t]}</p>
                      <p className="text-xs text-slate-500">{TRIGGER_DESCRIPTIONS[t]}</p>
                    </div>
                    {trigger === t && (
                      <div className="h-4 w-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">✓</div>
                    )}
                  </button>
                ))}
              </div>

              {fieldErrors.trigger_type && (
                <p className="text-xs text-red-600">{fieldErrors.trigger_type}</p>
              )}
              {serverError && (
                <p className="text-xs text-red-600">{serverError}</p>
              )}

              <div className="flex justify-between gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("name")}
                >
                  Retour
                </Button>
                <Button
                  type="button"
                  size="sm"
                  loading={isPending}
                  disabled={!trigger || isPending}
                  onClick={handleSubmit}
                >
                  Créer l'automation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
