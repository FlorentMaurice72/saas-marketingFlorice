import { redirect } from "next/navigation"

/**
 * /auth → redirect to /auth/login
 */
export default function AuthIndexPage() {
  redirect("/auth/login")
}
