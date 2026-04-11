"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { CampaignList } from "./CampaignList"
import { CampaignForm } from "./CampaignForm"
import type { Campaign } from "@/types/campaign"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CampaignsPageClientProps {
  campaigns: Campaign[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CampaignsPageClient({ campaigns }: CampaignsPageClientProps) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)

  function refresh() {
    router.refresh()
  }

  function handleSuccess() {
    setShowForm(false)
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
        <button
          onClick={() => setShowForm(true)}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Nouvelle campagne
        </button>
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

      {/* Create modal */}
      {showForm && (
        <CampaignForm
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  )
}
