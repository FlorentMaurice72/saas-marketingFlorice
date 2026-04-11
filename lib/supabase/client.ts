import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

/**
 * Browser-side Supabase client — anon key (subject to RLS).
 *
 * Currently used for:
 *   - Future realtime subscriptions (campaign status updates, etc.)
 *   - Public read queries (if any)
 *
 * ⚠️  This client does NOT have service-role privileges.
 *     All writes must go through Server Actions (which use the server client).
 *
 * Lazy singleton — instantiated once per browser session.
 */
let _client: ReturnType<typeof createClient<Database>> | null = null

export function getSupabaseBrowserClient() {
  if (_client) return _client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY."
    )
  }

  _client = createClient<Database>(url, anonKey)
  return _client
}
