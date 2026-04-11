import type { PlanType } from "@/types"

// ─── Domain types ──────────────────────────────────────────────────────────────

export interface StoredUser {
  id: string
  email: string
  name: string
  hashedPassword: string
  plan: PlanType
  createdAt: Date
}

export type PublicUser = Omit<StoredUser, "hashedPassword">

// ─── In-memory store (MVP) ─────────────────────────────────────────────────────
//
// ⚠️  MIGRATION PATH — replace each function body with Prisma / Drizzle calls:
//
//   getUserByEmail  → db.user.findUnique({ where: { email } })
//   getUserById     → db.user.findUnique({ where: { id } })
//   createUser      → db.user.create({ data })
//   userExists      → !!(await db.user.count({ where: { email } }))
//
// The function signatures are intentionally identical to what Prisma would use,
// so the swap is a one-line change per function.
//
// ──────────────────────────────────────────────────────────────────────────────

const store = new Map<string, StoredUser>()

export async function getUserByEmail(
  email: string
): Promise<StoredUser | null> {
  // Future: return db.user.findUnique({ where: { email: email.toLowerCase() } })
  return store.get(email.toLowerCase()) ?? null
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  // Future: return db.user.findUnique({ where: { id } })
  for (const user of store.values()) {
    if (user.id === id) return user
  }
  return null
}

export async function createUser(data: {
  email: string
  name: string
  hashedPassword: string
}): Promise<PublicUser> {
  // Future: return db.user.create({ data: { ...data, plan: "free" } })
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: data.email.toLowerCase(),
    name: data.name,
    hashedPassword: data.hashedPassword,
    plan: "free",
    createdAt: new Date(),
  }
  store.set(user.email, user)
  // Return without hashedPassword
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    plan: user.plan,
    createdAt: user.createdAt,
  }
}

export async function userExists(email: string): Promise<boolean> {
  // Future: return !!(await db.user.count({ where: { email: email.toLowerCase() } }))
  return store.has(email.toLowerCase())
}
