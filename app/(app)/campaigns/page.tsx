import type { Metadata } from "next"
import { requireUser } from "@/lib/auth/session"
import { getUserCampaigns } from "@/lib/api/campaigns"
import { CampaignsPageClient } from "@/components/campaigns/CampaignsPageClient"

export const metadata: Metadata = { title: "Campagnes" }

// Force dynamic rendering — data changes on every mutation
export const dynamic = "force-dynamic"

export default async function CampaignsPage() {
  const user = await requireUser()
  const result = await getUserCampaigns(user.id)

  const campaigns = result.success ? result.data : []

  return (
    <div className="space-y-6">
      <CampaignsPageClient campaigns={campaigns} />

      {/* Graceful DB error banner */}
      {!result.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {result.error}
        </div>
      )}
    </div>
  )
}
