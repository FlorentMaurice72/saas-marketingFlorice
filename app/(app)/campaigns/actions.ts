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
import { generateCampaignSchema } from "@/lib/validation/ai.schema"
import { generateCampaignAI } from "@/lib/ai/generateCampaign"
import { TEMPLATE_TO_TYPE } from "@/lib/ai/prompts"
import type { AIGeneratedCampaign } from "@/lib/ai/prompts"
import type { CampaignType } from "@/types/campaign"

// ─── Shared result type ───────────────────────────────────────────────────────

export interface ActionResult {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

// ─── createCampaignAction ─────────────────────────────────────────────────────

export async function createCampaignAction(
  formData: FormData
): Promise<ActionResult> {
  const user = await requireUser()

  const raw = {
    name: formData.get("name"),
    type: formData.get("type"),
    content: formData.get("content") || undefined,
    status: formData.get("status") || "draft",
  }

  const parsed = createCampaignSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = issue.message
    }
    return { fieldErrors }
  }

  const result = await createCampaign({
    ...parsed.data,
    content: parsed.data.content ?? null,
    user_id: user.id,
  })

  if (!result.success) return { error: result.error }

  revalidatePath("/campaigns")
  return { success: true }
}

// ─── deleteCampaignAction ─────────────────────────────────────────────────────

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

// ─── generateCampaignAction ───────────────────────────────────────────────────

export interface GenerateActionResult {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string>
  data?: AIGeneratedCampaign
  campaignType?: CampaignType
}

/**
 * Generates a marketing campaign using the Claude AI engine.
 * Secured: requires authenticated user.
 */
export async function generateCampaignAction(
  formData: FormData
): Promise<GenerateActionResult> {
  await requireUser()

  const raw = {
    template: formData.get("template"),
    productDescription: formData.get("productDescription"),
    targetAudience: formData.get("targetAudience"),
    goal: formData.get("goal"),
    tone: formData.get("tone"),
    audienceLevel: formData.get("audienceLevel"),
  }

  const parsed = generateCampaignSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = issue.message
    }
    return { fieldErrors }
  }

  const result = await generateCampaignAI(parsed.data)
  if (!result.success) return { error: result.error }

  return {
    success: true,
    data: result.data,
    campaignType: TEMPLATE_TO_TYPE[parsed.data.template],
  }
}
