"use server"

import { redirect } from "next/navigation"
import { hashPassword } from "@/lib/auth/password"
import { createUser, userExists } from "@/lib/auth/users"
import { registerSchema } from "@/lib/auth/validation"

export interface RegisterState {
  error?: string
  fieldErrors?: Record<string, string>
}

/**
 * Server Action — handles user registration form submission.
 *
 * Returns { error } on validation/logic failure.
 * Calls redirect() on success (throws NEXT_REDIRECT, caught by Next.js).
 *
 * ─── DB migration path ─────────────────────────────────────────────────────
 * Only createUser() and userExists() need to be swapped.
 * This function's logic stays identical.
 * ───────────────────────────────────────────────────────────────────────────
 */
export async function registerAction(
  formData: FormData
): Promise<RegisterState | void> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  // ── Validate with Zod ──────────────────────────────────────────────────────
  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = issue.message
    }
    return { fieldErrors }
  }

  const { name, email, password } = parsed.data

  // ── Check uniqueness ───────────────────────────────────────────────────────
  const exists = await userExists(email)
  if (exists) {
    return { error: "Un compte avec cet email existe déjà." }
  }

  // ── Create user ────────────────────────────────────────────────────────────
  const hashedPassword = await hashPassword(password)
  await createUser({ email, name, hashedPassword })

  // ── Redirect to login with success flag ───────────────────────────────────
  redirect("/auth/login?registered=true")
}
