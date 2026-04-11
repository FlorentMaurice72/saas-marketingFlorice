import type { NextAuthConfig } from "next-auth"

/**
 * Edge-compatible auth configuration.
 *
 * ⚠️  MUST NOT import Node.js-only modules (bcrypt, prisma, etc.)
 *     This runs in the Edge runtime (middleware).
 *
 * Providers are intentionally empty here — they are added in auth.ts
 * which runs only on the Node.js runtime.
 */
export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    error: "/auth/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl

      // ── Protected app routes ─────────────────────────────────────────────
      const isProtectedRoute =
        /^\/(dashboard|campaigns|audiences|automations|settings)(\/|$)/.test(
          pathname
        )

      if (isProtectedRoute) {
        // Authenticated → allow; unauthenticated → redirect to pages.signIn
        return isLoggedIn
      }

      // ── Auth routes (login / register) ───────────────────────────────────
      // Redirect already-authenticated users to the dashboard
      if (pathname.startsWith("/auth") && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      // ── Everything else is public ─────────────────────────────────────────
      return true
    },
  },

  // Populated with providers in auth.ts (Node.js runtime only)
  providers: [],
} satisfies NextAuthConfig
