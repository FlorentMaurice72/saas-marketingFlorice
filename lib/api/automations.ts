import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Automation, AutomationInsert, AutomationUpdate, AutomationStatus } from "@/types/automation"

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getUserAutomations(userId: string): Promise<ApiResult<Automation[]>> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("automations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { success: true, data: data ?? [] }
  } catch (err) {
    console.error("[automations.getUserAutomations]", err)
    return { success: false, error: "Impossible de charger les automations. Réessayez." }
  }
}

export async function getAutomationById(id: string, userId: string): Promise<ApiResult<Automation>> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("automations")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single()

    if (error) throw error
    if (!data) return { success: false, error: "Automation introuvable.", code: "NOT_FOUND" }
    return { success: true, data }
  } catch (err) {
    console.error("[automations.getAutomationById]", err)
    return { success: false, error: "Impossible de charger l'automation." }
  }
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function createAutomation(
  input: Omit<AutomationInsert, "id" | "created_at" | "updated_at">
): Promise<ApiResult<Automation>> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("automations")
      .insert({ ...input, status: input.status ?? "draft" })
      .select()
      .single()

    if (error) throw error
    if (!data) throw new Error("No data returned after insert")
    return { success: true, data }
  } catch (err) {
    console.error("[automations.createAutomation]", err)
    return { success: false, error: "Impossible de créer l'automation. Réessayez." }
  }
}

export async function updateAutomation(
  id: string,
  userId: string,
  update: Omit<AutomationUpdate, "id" | "user_id">
): Promise<ApiResult<Automation>> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("automations")
      .update({ ...update, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) throw error
    if (!data) return { success: false, error: "Automation introuvable.", code: "NOT_FOUND" }
    return { success: true, data }
  } catch (err) {
    console.error("[automations.updateAutomation]", err)
    return { success: false, error: "Impossible de modifier l'automation." }
  }
}

export async function deleteAutomation(id: string, userId: string): Promise<ApiResult<void>> {
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase
      .from("automations")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)

    if (error) throw error
    return { success: true, data: undefined }
  } catch (err) {
    console.error("[automations.deleteAutomation]", err)
    return { success: false, error: "Impossible de supprimer l'automation." }
  }
}

export async function toggleAutomationStatus(
  id: string,
  userId: string,
  currentStatus: AutomationStatus
): Promise<ApiResult<Automation>> {
  const next: AutomationStatus = currentStatus === "active" ? "paused" : "active"
  return updateAutomation(id, userId, { status: next })
}
