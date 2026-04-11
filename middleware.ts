import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth/auth.config"

/**
 * Next.js Middleware — runs on the Edge runtime before every matched request.
 *
 * Uses the edge-safe authConfig (no Node.js modules).
 * Route authorization logic lives in authConfig.callbacks.authorized.
 *
 * What it protects:
 *   /dashboard, /campaigns, /audiences, /automations, /settings
 *   → redirect to /auth/login if unauthenticated
 *
 *   /auth/* (login, register)
 *   → redirect to /dashboard if already authenticated
 */
export default NextAuth(authConfig).auth

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     *  - api/auth   — NextAuth API routes (must pass through)
     *  - _next/*    — Next.js internals
     *  - favicon*   — favicons
     *  - public/*   — static assets
     */
    "/((?!api/auth|_next/static|_next/image|favicon|public).*)",
  ],
}
