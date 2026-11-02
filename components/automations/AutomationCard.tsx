"use client"

import { useState, useTransition } from "react"
import { Zap, Trash2, Play, Pause, Users, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  TRIGGER_LABELS,
  AUTOMATION_STATUS_LABELS,
  AUTOMATION_STATUS_COLORS,
  STEP_TYPE_LABELS,
} from "@/types/automation"
import type { Automation, AutomationStep } from "@/types/automation"
import {
  deleteAutomationAction,
  toggleAutomationStatusAction,
} from "@/app/(app)/automations/actions"

interface Props {
  automation: Automation
}

const TRIGGER_ICONS: Record<string, string> = {
  contact_created:  "👤",
  campaign_opened:  "✉️",
  campaign_clicked: "🔗",
  tag_added:        "🏷️",
  time_delay:       "⏱️",
}

export function AutomationCard({ automation }: Props) {
  const [isPending, startTransition] = useTransition()
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const steps = (automation.steps as AutomationStep[] | null) ?? []

  function handleToggle() {
    startTransition(async () => {
      await toggleAutomationStatusAction(automation.id, automation.status)
    })
  }

  function handleDelete() {
    if (!deleteConfirm) { setDeleteConfirm(true); return }
    startTransition(async () => {
      await deleteAutomationAction(automation.id)
    })
  }

  const isActive = automation.status === "active"

  return (
    <Card className={`p-5 transition-opacity ${isPending ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-4">
        {/* Trigger icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg">
          {TRIGGER_ICONS[automation.trigger_type] ?? "⚡"}
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {automation.name}
            </h3>
            <Badge
              className={AUTOMATION_STATUS_COLORS[automation.status]}
            >
              {AUTOMATION_STATUS_LABELS[automation.status]}
            </Badge>
          </div>

          <p className="mt-0.5 text-xs text-slate-500">
            Déclencheur : {TRIGGER_LABELS[automation.trigger_type]}
          </p>

          {/* Steps preview */}
          {steps.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {steps.slice(0, 3).map((step, i) => (
                <span key={step.id} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                    {STEP_TYPE_LABELS[step.type]}
                  </span>
                </span>
              ))}
              {steps.length > 3 && (
                <span className="text-[10px] text-slate-400">
                  +{steps.length - 3} étapes
                </span>
              )}
            </div>
          )}

          {steps.length === 0 && (
            <p className="mt-1 text-xs text-slate-400 italic">Aucune étape définie</p>
          )}

          {/* Contacts enrolled */}
          {automation.contacts_enrolled > 0 && (
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <Users className="h-3 w-3" />
              <span>{automation.contacts_enrolled} contact{automation.contacts_enrolled > 1 ? "s" : ""} actif{automation.contacts_enrolled > 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {automation.status !== "draft" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggle}
              disabled={isPending}
              title={isActive ? "Mettre en pause" : "Activer"}
            >
              {isActive ? (
                <><Pause className="h-3.5 w-3.5" /><span className="hidden sm:inline">Pause</span></>
              ) : (
                <><Play className="h-3.5 w-3.5" /><span className="hidden sm:inline">Activer</span></>
              )}
            </Button>
          )}
          {automation.status === "draft" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggle}
              disabled={isPending}
            >
              <Play className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Activer</span>
            </Button>
          )}
          <Button
            variant={deleteConfirm ? "danger" : "ghost"}
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            onBlur={() => setDeleteConfirm(false)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            {deleteConfirm && <span className="hidden sm:inline">Confirmer</span>}
          </Button>
        </div>
      </div>
    </Card>
  )
}
