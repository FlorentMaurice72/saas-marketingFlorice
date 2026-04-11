"use server"

import { revalidatePath } from "next/cache"
import { requireUser } from "@/lib/auth/session"
import {
  createCampaign,
  deleteCampaign,
  toggleCampaignStatus,
} from "@/lib/api/campaigns"
import {
  createCampaignSchema,
  deleteCampaignSchema,
  toggleStatusSchema,
} from "@/lib/validation/campaign.schema"

// ─── Shared result type ───────────────────────────────────────────────────────

export interface ActionResult {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

// ─── createCampaignAction ─────────────────────────────────────────────────────

/**
 * Creates a new campaign scoped to the current authenticated user.
 *
 * Security:
 *  1. requireUser() — aborts if no valid session (redirects to /auth/login)
 *  2. Zod validation — validates all inputs before touching the DB
 *  3. user_id injected from session — client can never forge ownership
 */
export async function createCampaignAction(
  formData: FormData
): Promise<ActionResult> {
  // ── Auth guard ───────────────────────────────────────────────────────────
  const user = await requireUser()

  // ── Input extraction ──────────────────────────────────────────────────────
  const raw = {
    name: formData.get("name"),
    type: formData.get("type"),
    content: formData.get("content") || undefined,
    status: formData.get("status") || "draft",
  }

  // ── Zod validation ────────────────────────────────────────────────────────
  const parsed = createCampaignSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = issue.message
    }
    return { fieldErrors }
  }

  // ── DB write — user_id from session, never from client ────────────────────
  const result = await createCampaign({
    ...parsed.data,
    content: parsed.data.content ?? null,
    user_id: user.id,
  })

  if (!result.success) return { error: result.error }

  // ── Invalidate cache so the list refreshes ────────────────────────────────
  revalidatePath("/campaigns")
  return { success: true }
}

// ─── deleteCampaignAction ─────────────────────────────────────────────────────

/**
 * Deletes a campaign — verifies ownership in the DB query (double-check).
 */
export async function deleteCampaignAction(
  id: string
): Promise<ActionResult> {
  const user = await requireUser()

  const parsed = deleteCampaignSchema.safeParse({ id })
  if (!parsed.success) return { error: "Identifiant invalide." }

  const result = await deleteCampaign(parsed.data.id, user.id)
  if (!result.success) return { error: result.error }

  revalidatePath("/campaigns")
  return { success: true }
}

// ─── toggleCampaignStatusAction ───────────────────────────────────────────────

/**
 * Toggles draft ↔ published — verifies ownership in the DB query.
 */
export async function toggleCampaignStatusAction(
  id: string,
  currentStatus: "draft" | "published"
): Promise<ActionResult> {
  const user = await requireUser()

  const parsed = toggleStatusSchema.safeParse({ id, currentStatus })
  if (!parsed.success) return { error: "Paramètres invalides." }

  const result = await toggleCampaignStatus(
    parsed.data.id,
    user.id,
    parsed.data.currentStatus
  )
  if (!result.success) return { error: result.error }

  revalidatePath("/campaigns")
  return { success: true }
}
