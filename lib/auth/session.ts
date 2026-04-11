import { auth } from "./auth"
import { redirect } from "next/navigation"

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  email: string
  name?: string | null
  plan: string
}

// ─── Server-side session helpers ───────────────────────────────────────────────
// Use these in Server Components, Route Handlers, and Server Actions.

/**
 * Returns the current session or null — never throws.
 * Use when authentication is optional.
 */
export async function getSession() {
  return auth()
}

/**
 * Returns the current user or null — never throws.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await auth()
  if (!session?.user?.email) return null
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    plan: session.user.plan ?? "free",
  }
}

/**
 * Returns the current session.
 * Redirects to /auth/login if the user is not authenticated.
 * Use in protected Server Components / Server Actions.
 */
export async function requireAuth() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")
  return session
}

/**
 * Returns the current user.
 * Redirects to /auth/login if the user is not authenticated.
 */
export async function requireUser(): Promise<AuthUser> {
  const session = await auth()
  if (!session?.user?.email) redirect("/auth/login")
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    plan: session.user.plan ?? "free",
  }
}
