import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

/**
 * Server-side Supabase client — service role key.
 *
 * ⚠️  Rules:
 *   1. ONLY use inside Server Components / Server Actions / Route Handlers.
 *   2. NEVER import in client components or expose to the browser.
 *   3. Service role bypasses RLS → always filter by user_id in every query.
 *
 * ─── Security model ──────────────────────────────────────────────────────────
 * Even though service role bypasses RLS, every query in lib/api/* explicitly
 * adds `.eq("user_id", userId)` as an application-level guard.
 *
 * RLS policies are still created in Supabase for defense-in-depth:
 * if this client is ever replaced by an anon-key client or Supabase Auth
 * is added, the policies kick in automatically.
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * ─── Migration to Supabase Auth ──────────────────────────────────────────────
 * When Supabase Auth replaces NextAuth:
 *   1. Switch to @supabase/ssr createServerClient() with cookie handling.
 *   2. RLS auth.uid() policies will enforce isolation at DB level.
 *   3. Remove explicit .eq("user_id") guards (or keep for clarity).
 * ──────────────────────────────────────────────────────────────────────────────
 */
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Copy .env.example to .env.local and fill in your project credentials."
    )
  }

  return createClient<Database>(url, key, {
    auth: {
      // Disable cookie-based session — we manage sessions via NextAuth
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
