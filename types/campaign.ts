import type { Tables, TablesInsert, TablesUpdate } from "./database"

// ─── Row types (exact DB shape) ───────────────────────────────────────────────
export type Campaign = Tables<"campaigns">
export type CampaignInsert = TablesInsert<"campaigns">
export type CampaignUpdate = TablesUpdate<"campaigns">

// ─── Enum types ───────────────────────────────────────────────────────────────
export type CampaignType = Campaign["type"]
export type CampaignStatus = Campaign["status"]

// ─── UI display helpers ───────────────────────────────────────────────────────

export const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  email: "Email",
  ads: "Publicité",
  social: "Social",
}

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  draft: "Brouillon",
  published: "Publié",
}

export const CAMPAIGN_TYPE_COLORS: Record<CampaignType, string> = {
  email: "bg-indigo-100 text-indigo-700",
  ads: "bg-violet-100 text-violet-700",
  social: "bg-emerald-100 text-emerald-700",
}

export const CAMPAIGN_STATUS_COLORS: Record<CampaignStatus, string> = {
  draft: "bg-amber-100 text-amber-700",
  published: "bg-emerald-100 text-emerald-700",
}
