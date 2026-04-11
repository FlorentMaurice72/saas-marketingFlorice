import type { DefaultSession } from "next-auth"

/**
 * Extend the built-in NextAuth types to include custom fields.
 * These fields are stored in the JWT and exposed via session.user.
 *
 * ─── DB migration path ───────────────────────────────────────────────────────
 * When Prisma is added, the User model will have these fields natively.
 * No changes to this file will be needed — just ensure the Prisma adapter
 * returns them in the jwt() callback.
 * ─────────────────────────────────────────────────────────────────────────────
 */
declare module "next-auth" {
  interface Session {
    user: {
      /** DB primary key (UUID) */
      id: string
      /** Subscription plan */
      plan: string
    } & DefaultSession["user"]
  }

  interface User {
    /** Subscription plan — returned from authorize() */
    plan?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    plan: string
  }
}
