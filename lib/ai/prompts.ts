import type { CampaignType } from "@/types/campaign"

// ─── Types ────────────────────────────────────────────────────────────────────

export type CampaignGoal = "conversion" | "traffic" | "awareness"

export interface AIGeneratorInput {
  type: CampaignType
  productDescription: string
  targetAudience: string
  goal: CampaignGoal
}

export interface AIGeneratedCampaign {
  title: string
  hook: string
  body: string
  call_to_action: string
}

// ─── Channel guidance ─────────────────────────────────────────────────────────

const CHANNEL_GUIDANCE: Record<CampaignType, string> = {
  email: `Canal EMAIL :
- Ton personnel et direct (tutoiement recommandé)
- Objet accrocheur qui donne envie d'ouvrir
- Structure claire : accroche → problème → solution → CTA
- Corps entre 150 et 250 mots
- CTA unique et visible`,

  ads: `Canal PUBLICITÉ (Google Ads / Meta Ads) :
- Texte ultra-court et percutant
- Headline qui arrête le scroll en < 5 mots
- Bénéfice immédiat mis en avant
- Corps entre 80 et 120 mots
- CTA impératif (Découvrez, Essayez, Obtenez...)`,

  social: `Canal SOCIAL (Instagram / LinkedIn / X) :
- Accroche qui crée de la curiosité ou de l'émotion
- Storytelling court avec une vraie valeur ajoutée
- Corps entre 100 et 180 mots
- Appel à l'engagement (commentez, partagez, cliquez)
- Ton authentique et humain`,
}

const GOAL_GUIDANCE: Record<CampaignGoal, string> = {
  conversion: "Objectif CONVERSION : maximiser les achats/inscriptions. Insiste sur la valeur immédiate, la preuve sociale, l'urgence.",
  traffic: "Objectif TRAFIC : générer des clics vers le site. Crée de la curiosité, mets en avant le contenu exclusif.",
  awareness: "Objectif NOTORIÉTÉ : faire connaître la marque. Raconte une histoire, mets en avant les valeurs et la différenciation.",
}

// ─── System prompt ────────────────────────────────────────────────────────────

export const SYSTEM_PROMPT = `Tu es un expert en marketing digital avec 15 ans d'expérience en copywriting et création de campagnes performantes pour des SaaS, e-commerce et startups.

Tu maîtrises :
- Les frameworks de copywriting : AIDA (Attention → Intérêt → Désir → Action), PAS (Problème → Agitation → Solution), FAB (Features → Avantages → Bénéfices)
- La psychologie de la persuasion : preuve sociale, urgence, réciprocité, autorité
- L'optimisation des taux de conversion (CRO)
- L'adaptation du message selon le canal de diffusion

Ton unique output est un objet JSON valide. Aucun texte avant, aucun texte après, aucun bloc markdown. Uniquement le JSON brut.`

// ─── User prompt builder ──────────────────────────────────────────────────────

export function buildUserPrompt(input: AIGeneratorInput): string {
  return `Génère une campagne marketing pour ces paramètres :

PRODUIT / SERVICE : ${input.productDescription}
AUDIENCE CIBLE : ${input.targetAudience}

${CHANNEL_GUIDANCE[input.type]}

${GOAL_GUIDANCE[input.goal]}

Retourne UNIQUEMENT ce JSON (strictement valide, aucun texte autour) :
{
  "title": "titre de la campagne (max 10 mots, accrocheur)",
  "hook": "phrase d'accroche percutante qui arrête l'attention (max 20 mots)",
  "body": "corps du message complet, persuasif et adapté au canal",
  "call_to_action": "texte du CTA (max 6 mots, impératif)"
}`
}
