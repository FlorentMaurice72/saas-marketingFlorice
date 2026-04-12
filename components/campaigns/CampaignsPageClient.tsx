"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Sparkles } from "lucide-react"
import { CampaignList } from "./CampaignList"
import { CampaignForm } from "./CampaignForm"
import { AIGeneratorModal } from "./AIGeneratorModal"
import type { Campaign } from "@/types/campaign"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CampaignsPageClientProps {
  campaigns: Campaign[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CampaignsPageClient({ campaigns }: CampaignsPageClientProps) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [showAI, setShowAI] = useState(false)

  function refresh() {
    router.refresh()
  }

  function handleFormSuccess() {
    setShowForm(false)
    refresh()
  }

  function handleAISaved() {
    setShowAI(false)
    refresh()
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campagnes</h1>
          <p className="mt-1 text-sm text-slate-500">
            Créez et gérez toutes vos campagnes marketing
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 items-center gap-2">
          {/* AI generator button */}
          <button
            onClick={() => setShowAI(true)}
            className="flex items-center gap-2 rounded-lg border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm hover:from-violet-100 hover:to-indigo-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          >
            <Sparkles className="h-4 w-4" />
            Générer avec IA
          </button>

          {/* Manual create button */}
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Nouvelle campagne
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="flex items-center gap-6 text-sm text-slate-500">
        <span>
          <strong className="font-semibold text-slate-900">{campaigns.length}</strong>{" "}
          {campaigns.length === 1 ? "campagne" : "campagnes"}
        </span>
        <span>
          <strong className="font-semibold text-emerald-600">
            {campaigns.filter((c) => c.status === "published").length}
          </strong>{" "}
          publiée{campaigns.filter((c) => c.status === "published").length > 1 ? "s" : ""}
        </span>
        <span>
          <strong className="font-semibold text-amber-600">
            {campaigns.filter((c) => c.status === "draft").length}
          </strong>{" "}
          brouillon{campaigns.filter((c) => c.status === "draft").length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Campaign list */}
      <CampaignList campaigns={campaigns} onMutated={refresh} />

      {/* Manual create modal */}
      {showForm && (
        <CampaignForm
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* AI generator modal */}
      {showAI && (
        <AIGeneratorModal
          onSaved={handleAISaved}
          onClose={() => setShowAI(false)}
        />
      )}
    </>
  )
}
