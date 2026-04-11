import { z } from "zod"

// ─── Create ───────────────────────────────────────────────────────────────────

export const createCampaignSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .trim(),

  type: z.enum(["email", "ads", "social"], {
    error: () => "Type invalide : choisissez email, ads ou social",
  }),

  content: z
    .string()
    .max(10_000, "Le contenu ne peut pas dépasser 10 000 caractères")
    .optional()
    .transform((v) => v?.trim() || null),

  status: z.enum(["draft", "published"]).default("draft"),
})

// ─── Update ───────────────────────────────────────────────────────────────────

export const updateCampaignSchema = createCampaignSchema.partial().extend({
  id: z.string().uuid("Identifiant de campagne invalide"),
})

// ─── Delete ───────────────────────────────────────────────────────────────────

export const deleteCampaignSchema = z.object({
  id: z.string().uuid("Identifiant de campagne invalide"),
})

// ─── Status toggle ────────────────────────────────────────────────────────────

export const toggleStatusSchema = z.object({
  id: z.string().uuid("Identifiant invalide"),
  currentStatus: z.enum(["draft", "published"]),
})

// ─── Inferred types ───────────────────────────────────────────────────────────

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>
export type DeleteCampaignInput = z.infer<typeof deleteCampaignSchema>
export type ToggleStatusInput = z.infer<typeof toggleStatusSchema>
