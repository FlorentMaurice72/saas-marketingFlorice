"use server"

import { revalidatePath } from "next/cache"
import { requireUser } from "@/lib/auth/session"
import {
  createAutomation,
  deleteAutomation,
  toggleAutomationStatus,
  updateAutomation,
} from "@/lib/api/automations"
import type { AutomationStatus, AutomationTriggerType, AutomationStep } from "@/types/automation"

export interface ActionResult {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

// ─── createAutomationAction ───────────────────────────────────────────────────

export async function createAutomationAction(
  formData: FormData
): Promise<ActionResult> {
  const user = await requireUser()

  const name = String(formData.get("name") ?? "").trim()
  const trigger_type = String(formData.get("trigger_type") ?? "") as AutomationTriggerType

  if (!name) return { fieldErrors: { name: "Le nom est requis." } }
  if (!trigger_type) return { fieldErrors: { trigger_type: "Le déclencheur est requis." } }

  const validTriggers: AutomationTriggerType[] = [
    "contact_created", "campaign_opened", "campaign_clicked", "tag_added", "time_delay",
  ]
  if (!validTriggers.includes(trigger_type)) {
    return { fieldErrors: { trigger_type: "Déclencheur invalide." } }
  }

  const result = await createAutomation({
    user_id: user.id,
    name,
    trigger_type,
    trigger_config: {},
    steps: [],
    status: "draft",
  })

  if (!result.success) return { error: result.error }

  revalidatePath("/automations")
  return { success: true }
}

// ─── deleteAutomationAction ───────────────────────────────────────────────────

export async function deleteAutomationAction(id: string): Promise<ActionResult> {
  const user = await requireUser()
  if (!id) return { error: "Identifiant invalide." }

  const result = await deleteAutomation(id, user.id)
  if (!result.success) return { error: result.error }

  revalidatePath("/automations")
  return { success: true }
}

// ─── toggleAutomationStatusAction ────────────────────────────────────────────

export async function toggleAutomationStatusAction(
  id: string,
  currentStatus: AutomationStatus
): Promise<ActionResult> {
  const user = await requireUser()
  if (!id) return { error: "Identifiant invalide." }

  const result = await toggleAutomationStatus(id, user.id, currentStatus)
  if (!result.success) return { error: result.error }

  revalidatePath("/automations")
  return { success: true }
}

// ─── updateAutomationStepsAction ──────────────────────────────────────────────

export async function updateAutomationStepsAction(
  id: string,
  steps: AutomationStep[]
): Promise<ActionResult> {
  const user = await requireUser()
  if (!id) return { error: "Identifiant invalide." }

  const result = await updateAutomation(id, user.id, {
    steps: steps as unknown as import("@/types/database").Json,
  })
  if (!result.success) return { error: result.error }

  revalidatePath("/automations")
  return { success: true }
}
