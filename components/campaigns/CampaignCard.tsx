"use client"

import { useState } from "react"
import { Trash2, ToggleLeft, ToggleRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import {
  deleteCampaignAction,
  toggleCampaignStatusAction,
  type ActionResult,
} from "@/app/(app)/campaigns/actions"
import type { Campaign } from "@/types/campaign"
import {
  CAMPAIGN_TYPE_LABELS,
  CAMPAIGN_TYPE_COLORS,
  CAMPAIGN_STATUS_LABELS,
  CAMPAIGN_STATUS_COLORS,
} from "@/types/campaign"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CampaignCardProps {
  campaign: Campaign
  onMutated: () => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CampaignCard({ campaign, onMutated }: CampaignCardProps) {
  const [toggling, setToggling] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const busy = toggling || deleting

  async function handleToggle() {
    setError(null)
    setToggling(true)
    const result: ActionResult = await toggleCampaignStatusAction(
      campaign.id,
      campaign.status as "draft" | "published"
    )
    setToggling(false)
    if (!result.success) setError(result.error ?? "Erreur inattendue.")
    else onMutated()
  }

  async function handleDelete() {
    if (
      !window.confirm(
        `Supprimer la campagne « ${campaign.name} » ? Cette action est irréversible.`
      )
    )
      return

    setError(null)
    setDeleting(true)
    const result: ActionResult = await deleteCampaignAction(campaign.id)
    setDeleting(false)
    if (!result.success) setError(result.error ?? "Erreur inattendue.")
    else onMutated()
  }

  const isDraft = campaign.status === "draft"

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm",
        "transition-shadow hover:shadow-md",
        busy && "opacity-70 pointer-events-none"
      )}
    >
      {/* Top row — type badge + status badge */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            CAMPAIGN_TYPE_COLORS[campaign.type as keyof typeof CAMPAIGN_TYPE_COLORS]
          )}
        >
          {CAMPAIGN_TYPE_LABELS[campaign.type as keyof typeof CAMPAIGN_TYPE_LABELS]}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            CAMPAIGN_STATUS_COLORS[campaign.status as keyof typeof CAMPAIGN_STATUS_COLORS]
          )}
        >
          {CAMPAIGN_STATUS_LABELS[campaign.status as keyof typeof CAMPAIGN_STATUS_LABELS]}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
        {campaign.name}
      </h3>

      {/* Content preview (if any) */}
      {campaign.content && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {campaign.content}
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="rounded-md bg-red-50 px-2 py-1.5 text-xs text-red-600">
          {error}
        </p>
      )}

      {/* Footer — date + actions */}
      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="text-[11px] text-slate-400">
          {formatDate(campaign.created_at)}
        </span>

        <div className="flex items-center gap-1">
          {/* Toggle status */}
          <button
            type="button"
            onClick={handleToggle}
            disabled={busy}
            title={isDraft ? "Publier" : "Repasser en brouillon"}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
              isDraft
                ? "text-emerald-600 hover:bg-emerald-50"
                : "text-amber-600 hover:bg-amber-50"
            )}
          >
            {toggling ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isDraft ? (
              <ToggleLeft className="h-3.5 w-3.5" />
            ) : (
              <ToggleRight className="h-3.5 w-3.5" />
            )}
            {isDraft ? "Publier" : "Brouillon"}
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            title="Supprimer"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            {deleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
