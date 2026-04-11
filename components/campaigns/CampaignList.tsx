"use client"

import { Megaphone } from "lucide-react"
import { CampaignCard } from "./CampaignCard"
import type { Campaign } from "@/types/campaign"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CampaignListProps {
  campaigns: Campaign[]
  onMutated: () => void
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
        <Megaphone className="h-7 w-7 text-indigo-400" />
      </div>
      <h3 className="mb-1 text-sm font-semibold text-slate-800">
        Aucune campagne pour l&apos;instant
      </h3>
      <p className="max-w-xs text-xs text-slate-500 leading-relaxed">
        Cliquez sur &laquo;&nbsp;Nouvelle campagne&nbsp;&raquo; pour démarrer votre
        première campagne marketing.
      </p>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CampaignList({ campaigns, onMutated }: CampaignListProps) {
  if (campaigns.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onMutated={onMutated}
        />
      ))}
    </div>
  )
}
