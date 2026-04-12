import { z } from "zod"

export const generateCampaignSchema = z.object({
  type: z.enum(["email", "ads", "social"], {
    error: () => "Type invalide : choisissez email, ads ou social",
  }),

  productDescription: z
    .string()
    .min(10, "Décrivez votre produit en au moins 10 caractères")
    .max(500, "Description trop longue (max 500 caractères)")
    .trim(),

  targetAudience: z
    .string()
    .min(5, "Décrivez votre audience en au moins 5 caractères")
    .max(200, "Audience trop longue (max 200 caractères)")
    .trim(),

  goal: z.enum(["conversion", "traffic", "awareness"], {
    error: () => "Objectif invalide",
  }),
})

export type GenerateCampaignInput = z.infer<typeof generateCampaignSchema>
