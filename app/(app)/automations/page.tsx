import type { Metadata } from "next"
import { requireUser } from "@/lib/auth/session"
import { getUserAutomations } from "@/lib/api/automations"
import { AutomationsPageClient } from "@/components/automations/AutomationsPageClient"

export const metadata: Metadata = { title: "Automations" }

export const dynamic = "force-dynamic"

export default async function AutomationsPage() {
  const user = await requireUser()
  const result = await getUserAutomations(user.id)

  const automations = result.success ? result.data : []

  return (
    <div className="space-y-6">
      <AutomationsPageClient automations={automations} />

      {!result.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {result.error}
        </div>
      )}
    </div>
  )
}
