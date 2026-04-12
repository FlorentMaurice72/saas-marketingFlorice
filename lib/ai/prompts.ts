import type { CampaignType } from "@/types/campaign"

// ─── Types ────────────────────────────────────────────────────────────────────

export type CampaignTemplate =
  | "prospection_email"
  | "product_launch"
  | "facebook_ads"
  | "linkedin_post"
  | "retargeting"

export type ToneType = "professionnel" | "direct" | "premium" | "agressif" | "fun"
export type AudienceLevel = "debutant" | "expert" | "entreprise" | "niche"
export type CampaignGoal = "conversion" | "engagement" | "traffic" | "vente"

export interface AIGeneratorInput {
  template: CampaignTemplate
  productDescription: string
  targetAudience: string
  goal: CampaignGoal
  tone: ToneType
  audienceLevel: AudienceLevel
}

export interface AIGeneratedCampaign {
  title: string
  hook: string
  body: string
  call_to_action: string
}

// ─── Template definitions ─────────────────────────────────────────────────────

const TEMPLATES: Record<
  CampaignTemplate,
  {
    name: string
    emoji: string
    description: string
    badge: string
    type: CampaignType
    framework: string
    instructions: string
  }
> = {
  prospection_email: {
    name: "Prospection B2B",
    emoji: "📧",
    description: "Email froid à forte délivrabilité",
    badge: "Email",
    type: "email",
    framework: "PAS — Problème → Agitation → Solution",
    instructions: `
Structure OBLIGATOIRE :
- title: Objet email accrocheur (max 8 mots, optimisé ouverture, sans emoji ni spam words)
- hook: 1ère phrase qui identifie PRÉCISÉMENT le problème du prospect (max 20 mots, personnalisée)
- body: 3 paragraphes courts :
  1. Problème identifié + agitation (amplifier la douleur avec un exemple concret)
  2. Solution + preuve sociale ou résultat chiffré (soyez spécifique)
  3. Proposition de valeur + micro-engagement naturel
  [120-180 mots, ton humain, pas commercial, pas de spam words]
- call_to_action: Action à faible engagement (répondre, réserver 15 min) — max 6 mots`,
  },

  product_launch: {
    name: "Lancement produit",
    emoji: "🚀",
    description: "Annonce d'un nouveau produit ou service",
    badge: "Email",
    type: "email",
    framework: "AIDA — Attention → Intérêt → Désir → Action",
    instructions: `
Structure OBLIGATOIRE :
- title: Titre qui crée curiosité ou annonce une transformation (max 10 mots)
- hook: Phrase d'accroche qui annonce le changement ou révèle quelque chose d'inattendu (max 25 mots)
- body: 4 paragraphes :
  1. Le problème universel que tout le monde connaît
  2. La révélation — ce produit/service change tout (comment et pourquoi)
  3. Les 3 bénéfices clés avec langage sensoriel et résultats concrets
  4. L'offre de lancement avec urgence réelle (places limitées, tarif spécial, bonus exclusif)
  [180-250 mots, enthousiasme contrôlé, chiffres concrets]
- call_to_action: CTA fort avec urgence (max 5 mots)`,
  },

  facebook_ads: {
    name: "Facebook / Meta Ads",
    emoji: "📢",
    description: "Publicité optimisée pour le feed et stories",
    badge: "Ads",
    type: "ads",
    framework: "Hook-Story-Offer",
    instructions: `
Structure OBLIGATOIRE :
- title: Headline de l'annonce (max 6 mots, ultra-direct, bénéfice immédiat visible)
- hook: 1er texte visible avant "Voir plus" — stopper le scroll (max 15 mots)
  Formats efficaces : question provocante | fait surprenant | affirmation choc
- body: 2-3 phrases seulement :
  1. Identification du problème ou du désir profond
  2. Solution + social proof (chiffre, témoignage résumé, résultat client)
  3. Offre ou incitation claire à cliquer
  [80-120 mots MAXIMUM — mobile first — langage universel — aucun jargon]
- call_to_action: Bouton (max 4 mots, impératif : Découvrez / Essayez / Obtenez / Profitez)`,
  },

  linkedin_post: {
    name: "Post LinkedIn autorité",
    emoji: "💼",
    description: "Contenu qui positionne comme expert du secteur",
    badge: "Social",
    type: "social",
    framework: "Storytelling + Insight actionnable",
    instructions: `
Structure OBLIGATOIRE :
- title: Titre interne de référence (pas affiché publiquement)
- hook: 1ère ligne visible avant "voir plus" — DOIT stopper le scroll (max 12 mots)
  Formats qui marchent : chiffre surprenant | question tabou | affirmation contre-intuitive | confession
- body: 5-7 paragraphes TRÈS courts (1-3 lignes chacun, ligne vide entre chaque) :
  1. Entrée en matière — contexte ou anecdote personnelle
  2. Le problème que tout le monde vit mais ne dit pas
  3. Ce que j'ai tenté / la méthode classique (et pourquoi ça ne marche pas)
  4. Le tournant — la découverte ou l'insight clé
  5. Ce que ça a changé — résultat concret si possible
  6. La leçon universelle applicable maintenant
  [150-220 mots — sauts de ligne généreux — 0 à 2 emojis max — authenticité]
- call_to_action: Question d'engagement en fin de post (max 15 mots)`,
  },

  retargeting: {
    name: "Relance / Retargeting",
    emoji: "🔄",
    description: "Reconquérir des prospects tièdes ou abandonnistes",
    badge: "Ads",
    type: "ads",
    framework: "FOMO + Levée d'objection",
    instructions: `
Structure OBLIGATOIRE :
- title: Objet de relance (rappel contexte + nouvelle raison d'agir, max 8 mots)
- hook: Rappel du contexte + accroche urgence ou objection levée (max 20 mots)
  Ne pas répéter le pitch — le prospect connaît déjà l'offre
- body: 3 blocs :
  1. Reconnaître l'intérêt du prospect + valider son hésitation (empathie)
  2. Lever la principale objection (prix ? confiance ? timing ? complexité ?)
     avec un argument nouveau : témoignage, garantie, comparaison, démo
  3. Nouvelle raison d'agir MAINTENANT : deadline réelle, bonus exclusif, stock limité
  [100-160 mots — ton humain et non-intrusif — urgence légitime, pas artificielle]
- call_to_action: CTA avec urgence + bénéfice clair (max 6 mots)`,
  },
}

// ─── Tone guidance ────────────────────────────────────────────────────────────

const TONE_GUIDANCE: Record<ToneType, string> = {
  professionnel:
    "TON PROFESSIONNEL : phrases structurées, vocabulaire soigné, orienté résultats. Inspire confiance et crédibilité sans être froid.",
  direct:
    "TON DIRECT : phrases courtes, aucune fioriture, faits et bénéfices uniquement. Chaque mot gagne sa place. Zéro remplissage.",
  premium:
    "TON PREMIUM : vocabulaire raffiné, sentiment de rareté et d'accès privilégié. Suggère une expérience exclusive et haut de gamme.",
  agressif:
    "TON ASSERTIF ET URGENT : FOMO maximal, urgence forte, bénéfices martelés. Pousser à l'action immédiate. (Rester éthique et factuel)",
  fun:
    "TON FUN ET HUMAIN : accessible, chaleureux, touche d'humour pertinente. Désacraliser l'achat, mettre à l'aise, créer de la connexion.",
}

// ─── Audience level guidance ──────────────────────────────────────────────────

const AUDIENCE_GUIDANCE: Record<AudienceLevel, string> = {
  debutant:
    "AUDIENCE DÉBUTANTE : langage simple et accessible, expliquer sans condescendance, éviter le jargon, rassurer et accompagner.",
  expert:
    "AUDIENCE EXPERTE : terminologie technique bienvenue, aller droit au but, pas d'explication basique, traiter d'égal à égal.",
  entreprise:
    "AUDIENCE B2B/ENTREPRISE : focus ROI, KPIs, scalabilité et réduction de risques. Logique business et chiffres concrets avant tout.",
  niche:
    "AUDIENCE NICHE : utiliser le vocabulaire exact du secteur, montrer une compréhension profonde de leurs problèmes spécifiques.",
}

// ─── Goal guidance ────────────────────────────────────────────────────────────

const GOAL_GUIDANCE: Record<CampaignGoal, string> = {
  conversion:
    "OBJECTIF CONVERSION : maximiser inscriptions et achats. Urgence, preuve sociale, garantie, offre avec bénéfice immédiat.",
  engagement:
    "OBJECTIF ENGAGEMENT : générer interactions et partages. Contenu qui interpelle, question ouverte, prise de position claire.",
  traffic:
    "OBJECTIF TRAFIC : générer des clics vers la destination. Curiosité, teasing, promesse de valeur exclusive derrière le lien.",
  vente:
    "OBJECTIF VENTE DIRECTE : conclure la transaction maintenant. Prix, comparaison, urgence, garantie, friction minimale.",
}

// ─── Public exports for UI ────────────────────────────────────────────────────

export const TEMPLATE_META = TEMPLATES

export const TEMPLATE_TO_TYPE: Record<CampaignTemplate, CampaignType> = {
  prospection_email: "email",
  product_launch: "email",
  facebook_ads: "ads",
  linkedin_post: "social",
  retargeting: "ads",
}

// ─── System prompt ────────────────────────────────────────────────────────────

export const SYSTEM_PROMPT = `Tu es un expert copywriter et stratège marketing avec 15 ans d'expérience.
Tu as conçu des campagnes qui ont généré plusieurs millions d'euros de revenus pour tes clients (startups, PME, grands comptes).
Tu maîtrises parfaitement : AIDA, PAS, Hook-Story-Offer, Storytelling, FOMO, Objection Handling.

Tes principes :
1. Chaque mot est choisi stratégiquement — jamais de remplissage
2. Tu adaptes le ton, la structure et le vocabulaire à l'audience exacte
3. Ton output est immédiatement utilisable, sans aucune modification
4. Tu ne produis jamais de contenu générique — chaque campagne est unique

RÈGLE ABSOLUE : Ton unique output est un objet JSON valide et strict.
Aucun texte avant, aucun texte après, aucun bloc de code markdown.`

// ─── User prompt builder ──────────────────────────────────────────────────────

export function buildUserPrompt(input: AIGeneratorInput): string {
  const template = TEMPLATES[input.template]

  return `MISSION : Génère une campagne marketing professionnelle avec le template "${template.name}".

━━━ CONTEXTE PRODUIT ━━━
PRODUIT / SERVICE : ${input.productDescription}
AUDIENCE CIBLE : ${input.targetAudience}

━━━ PARAMÈTRES CRÉATIFS ━━━
${TONE_GUIDANCE[input.tone]}
${AUDIENCE_GUIDANCE[input.audienceLevel]}
${GOAL_GUIDANCE[input.goal]}

━━━ FRAMEWORK : ${template.framework} ━━━${template.instructions}

━━━ EXIGENCES QUALITÉ ━━━
- Contenu directement utilisable sans modification
- Aucune phrase creuse ni remplissage
- Chaque section respecte strictement la structure du template
- Le ton "${input.tone}" est maintenu du début à la fin

Retourne UNIQUEMENT ce JSON (valide, aucun texte autour) :
{
  "title": "titre ou objet de la campagne",
  "hook": "accroche percutante selon le template",
  "body": "corps complet respectant la structure et les contraintes de longueur",
  "call_to_action": "CTA optimisé pour l'objectif"
}`
}
