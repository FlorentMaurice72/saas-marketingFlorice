import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Tables } from "@/types/database"
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

// ─── Mapping helper ───────────────────────────────────────────────────────────

type DbUser = Tables<"users">

function toStoredUser(row: DbUser): StoredUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    hashedPassword: row.hashed_password ?? "",
    plan: (row.plan as PlanType) ?? "free",
    createdAt: new Date(row.created_at),
  }
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getUserByEmail(
  email: string
): Promise<StoredUser | null> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle()

  if (error) {
    console.error("[users.getUserByEmail]", error)
    return null
  }
  return data ? toStoredUser(data) : null
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error("[users.getUserById]", error)
    return null
  }
  return data ? toStoredUser(data) : null
}

export async function userExists(email: string): Promise<boolean> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle()

  if (error) {
    console.error("[users.userExists]", error)
    return false
  }
  return data !== null
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function createUser(data: {
  email: string
  name: string
  hashedPassword: string
}): Promise<PublicUser> {
  const supabase = createServerSupabaseClient()
  const { data: row, error } = await supabase
    .from("users")
    .insert({
      id: crypto.randomUUID(), // provide explicitly — avoids uuid_generate_v4() dependency
      email: data.email.toLowerCase(),
      name: data.name,
      hashed_password: data.hashedPassword,
      plan: "free",
    })
    .select()
    .single()

  if (error || !row) {
    console.error("[users.createUser] Supabase error:", JSON.stringify(error))
    throw new Error(`DB insert failed: ${error?.message ?? "no row returned"}`)
  }

  const user = toStoredUser(row)
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    plan: user.plan,
    createdAt: user.createdAt,
  }
}
