import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { getUserByEmail } from "./users"
import { verifyPassword } from "./password"
import { loginSchema } from "./validation"

/**
 * Full NextAuth configuration — Node.js runtime only.
 *
 * Exports:
 *  - handlers  → used in app/api/auth/[...nextauth]/route.ts
 *  - auth       → used in Server Components / Server Actions to read session
 *  - signIn     → used in Server Actions to programmatically sign in
 *  - signOut    → used in Server Actions to programmatically sign out
 *
 * ⚠️  Do NOT import this file in middleware.ts — it uses bcryptjs (Node-only).
 *     Use auth.config.ts in middleware instead.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days — enable when adding DB sessions
  },

  providers: [
    Credentials({
      /**
       * Validate the submitted credentials.
       * Returns a User object on success, null on failure.
       *
       * ─── DB migration path ────────────────────────────────────────────────
       * Replace getUserByEmail() with:  db.user.findUnique({ where: { email } })
       * No other changes needed in this function.
       * ──────────────────────────────────────────────────────────────────────
       */
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        const user = await getUserByEmail(email)
        if (!user) return null

        const isValid = await verifyPassword(password, user.hashedPassword)
        if (!isValid) return null

        // Return only non-sensitive fields
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
        }
      },
    }),
  ],

  callbacks: {
    // Inherit the authorized() callback from authConfig
    ...authConfig.callbacks,

    /**
     * jwt — called whenever a JWT is created or updated.
     * Persist extra fields (id, plan) in the token.
     */
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.plan = (user as { plan?: string }).plan ?? "free"
      }
      return token
    },

    /**
     * session — shapes the Session object exposed to the client.
     * Maps JWT fields to session.user.
     */
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.plan = (token.plan as string) ?? "free"
      }
      return session
    },
  },
})
