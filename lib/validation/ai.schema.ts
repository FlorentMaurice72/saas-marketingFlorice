import { z } from "zod"

export const generateCampaignSchema = z.object({
  template: z.enum(
    ["prospection_email", "product_launch", "facebook_ads", "linkedin_post", "retargeting"],
    { error: () => "Choisissez un template" }
  ),

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

  goal: z.enum(["conversion", "engagement", "traffic", "vente"], {
    error: () => "Choisissez un objectif",
  }),

  tone: z.enum(["professionnel", "direct", "premium", "agressif", "fun"], {
    error: () => "Choisissez un ton",
  }),

  audienceLevel: z.enum(["debutant", "expert", "entreprise", "niche"], {
    error: () => "Choisissez un niveau d'audience",
  }),
})

export type GenerateCampaignInput = z.infer<typeof generateCampaignSchema>
