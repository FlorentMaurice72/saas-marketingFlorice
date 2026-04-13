import Anthropic from "@anthropic-ai/sdk"
import {
  SYSTEM_PROMPT,
  buildUserPrompt,
  type AIGeneratorInput,
  type AIGeneratedCampaign,
} from "./prompts"

// ─── Config ───────────────────────────────────────────────────────────────────

const MODEL = "claude-haiku-4-5-20251001" // Fast + cost-efficient for generation
const MAX_TOKENS = 1024
const TIMEOUT_MS = 25_000 // 25s hard timeout (Vercel serverless limit: 30s)

// ─── Result type ──────────────────────────────────────────────────────────────

export type GenerateResult =
  | { success: true; data: AIGeneratedCampaign }
  | { success: false; error: string }

// ─── Client (lazy singleton) ──────────────────────────────────────────────────

let _client: Anthropic | null = null

function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error(
        "[AI] Missing ANTHROPIC_API_KEY. Add it to .env.local and Vercel environment variables."
      )
    }
    _client = new Anthropic({ apiKey })
  }
  return _client
}

// ─── JSON extraction ──────────────────────────────────────────────────────────

function extractJSON(text: string): AIGeneratedCampaign {
  // Strip potential markdown code fences
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim()

  const parsed = JSON.parse(cleaned)

  // Validate required fields
  const { title, hook, body, call_to_action } = parsed
  if (
    typeof title !== "string" ||
    typeof hook !== "string" ||
    typeof body !== "string" ||
    typeof call_to_action !== "string"
  ) {
    throw new Error("Invalid JSON structure: missing required fields")
  }

  return { title, hook, body, call_to_action }
}

// ─── Core generation function ─────────────────────────────────────────────────

/**
 * Calls the Claude API to generate a structured marketing campaign.
 *
 * Design decisions:
 * - claude-haiku-4-5 for speed (<5s p95) and low cost per generation
 * - Hard 25s timeout via AbortSignal to stay within Vercel serverless limits
 * - JSON extracted via regex-cleaned parse (handles markdown fences)
 * - Errors are caught and returned as typed failures (never throws to caller)
 *
 * Scaling path:
 * - Switch model to claude-sonnet-4-6 for higher-quality output on paid plans
 * - Add streaming (stream: true) for progressive UX on long generations
 * - Cache identical inputs with Redis for cost reduction at scale
 */
export async function generateCampaignAI(
  input: AIGeneratorInput
): Promise<GenerateResult> {
  try {
    const client = getClient()

    const response = await client.messages.create(
      {
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: buildUserPrompt(input),
          },
        ],
      },
      {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }
    )

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { type: "text"; text: string }).text)
      .join("")

    if (!text) {
      return { success: false, error: "La réponse de l'IA était vide." }
    }

    const data = extractJSON(text)
    return { success: true, data }
  } catch (err) {
    console.error("[generateCampaignAI] error:", err)

    if (err instanceof Error) {
      if (err.name === "TimeoutError" || err.message.includes("timeout")) {
        return {
          success: false,
          error: "La génération a pris trop de temps. Réessayez.",
        }
      }
      if (err.message.includes("ANTHROPIC_API_KEY")) {
        return {
          success: false,
          error: "Clé API manquante. Vérifiez ANTHROPIC_API_KEY dans Vercel.",
        }
      }
      if (err.message.includes("JSON")) {
        return {
          success: false,
          error: "Erreur de format dans la réponse IA. Réessayez.",
        }
      }
      // Surface the actual error message to help diagnose
      return {
        success: false,
        error: `Erreur IA : ${err.message}`,
      }
    }

    return {
      success: false,
      error: `Erreur inconnue : ${String(err)}`,
    }
  }
}
