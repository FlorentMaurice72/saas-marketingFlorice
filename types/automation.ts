import type { Tables, TablesInsert, TablesUpdate } from "./database"

// ─── Row types (exact DB shape) ───────────────────────────────────────────────
export type Automation = Tables<"automations">
export type AutomationInsert = TablesInsert<"automations">
export type AutomationUpdate = TablesUpdate<"automations">

// ─── Enum types ───────────────────────────────────────────────────────────────
export type AutomationStatus = Automation["status"]
export type AutomationTriggerType = Automation["trigger_type"]

// ─── Step types ───────────────────────────────────────────────────────────────
export type StepType = "send_email" | "wait" | "add_tag" | "remove_tag"

export interface AutomationStep {
  id: string
  type: StepType
  delay_minutes?: number
  config: {
    subject?: string
    body?: string
    tag?: string
  }
}

// ─── UI display helpers ───────────────────────────────────────────────────────

export const TRIGGER_LABELS: Record<AutomationTriggerType, string> = {
  contact_created:  "Nouveau contact",
  campaign_opened:  "Email ouvert",
  campaign_clicked: "Lien cliqué",
  tag_added:        "Tag ajouté",
  time_delay:       "Délai temporel",
}

export const TRIGGER_DESCRIPTIONS: Record<AutomationTriggerType, string> = {
  contact_created:  "Se déclenche quand un contact est créé",
  campaign_opened:  "Se déclenche quand un email est ouvert",
  campaign_clicked: "Se déclenche quand un lien est cliqué",
  tag_added:        "Se déclenche quand un tag est ajouté à un contact",
  time_delay:       "Se déclenche après un délai défini",
}

export const AUTOMATION_STATUS_LABELS: Record<AutomationStatus, string> = {
  draft:  "Brouillon",
  active: "Active",
  paused: "En pause",
}

export const AUTOMATION_STATUS_COLORS: Record<AutomationStatus, string> = {
  draft:  "bg-slate-100 text-slate-600",
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-amber-100 text-amber-700",
}

export const STEP_TYPE_LABELS: Record<StepType, string> = {
  send_email: "Envoyer un email",
  wait:       "Attendre",
  add_tag:    "Ajouter un tag",
  remove_tag: "Retirer un tag",
}
