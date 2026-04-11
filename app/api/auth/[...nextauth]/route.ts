import { handlers } from "@/lib/auth/auth"

/**
 * NextAuth.js catch-all route handler.
 * Handles: GET /api/auth/session, POST /api/auth/callback/credentials, etc.
 */
export const { GET, POST } = handlers
