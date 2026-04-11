import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Campaign, CampaignInsert, CampaignUpdate } from "@/types/campaign"

// ─── Result type ──────────────────────────────────────────────────────────────

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all campaigns for a specific user, ordered by creation date (newest first).
 *
 * Security: always filters by user_id — even with service role, every query
 * is scoped to the authenticated user.
 */
export async function getUserCampaigns(
  userId: string
): Promise<ApiResult<Campaign[]>> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", userId) // ← application-level isolation
      .order("created_at", { ascending: false })

    if (error) throw error

    return { success: true, data: data ?? [] }
  } catch (err) {
    console.error("[campaigns.getUserCampaigns]", err)
    return {
      success: false,
      error: "Impossible de charger les campagnes. Réessayez.",
    }
  }
}

/**
 * Fetch a single campaign by ID, verifying ownership.
 */
export async function getCampaignById(
  id: string,
  userId: string
): Promise<ApiResult<Campaign>> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId) // ← ownership check
      .single()

    if (error) throw error
    if (!data) return { success: false, error: "Campagne introuvable.", code: "NOT_FOUND" }

    return { success: true, data }
  } catch (err) {
    console.error("[campaigns.getCampaignById]", err)
    return { success: false, error: "Impossible de charger la campagne." }
  }
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Create a new campaign.
 * user_id is always injected from the server — never trusted from the client.
 */
export async function createCampaign(
  input: Omit<CampaignInsert, "id" | "created_at" | "updated_at">
): Promise<ApiResult<Campaign>> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        ...input,
        status: input.status ?? "draft",
      })
      .select()
      .single()

    if (error) throw error
    if (!data) throw new Error("No data returned after insert")

    return { success: true, data }
  } catch (err) {
    console.error("[campaigns.createCampaign]", err)
    return { success: false, error: "Impossible de créer la campagne. Réessayez." }
  }
}

/**
 * Update a campaign — always scoped to the owner (user_id check in WHERE).
 */
export async function updateCampaign(
  id: string,
  userId: string,
  update: Omit<CampaignUpdate, "id" | "user_id">
): Promise<ApiResult<Campaign>> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("campaigns")
      .update({ ...update, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId) // ← ownership check
      .select()
      .single()

    if (error) throw error
    if (!data) return { success: false, error: "Campagne introuvable.", code: "NOT_FOUND" }

    return { success: true, data }
  } catch (err) {
    console.error("[campaigns.updateCampaign]", err)
    return { success: false, error: "Impossible de modifier la campagne." }
  }
}

/**
 * Delete a campaign — always scoped to the owner.
 * Supabase returns 0 rows affected (not an error) if ID or user_id don't match.
 */
export async function deleteCampaign(
  id: string,
  userId: string
): Promise<ApiResult<void>> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("campaigns")
      .delete()
      .eq("id", id)
      .eq("user_id", userId) // ← ownership check

    if (error) throw error

    return { success: true, data: undefined }
  } catch (err) {
    console.error("[campaigns.deleteCampaign]", err)
    return { success: false, error: "Impossible de supprimer la campagne." }
  }
}

/**
 * Toggle a campaign's status between draft ↔ published.
 */
export async function toggleCampaignStatus(
  id: string,
  userId: string,
  currentStatus: "draft" | "published"
): Promise<ApiResult<Campaign>> {
  const newStatus = currentStatus === "draft" ? "published" : "draft"
  return updateCampaign(id, userId, { status: newStatus })
}
