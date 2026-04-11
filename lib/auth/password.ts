import { hash, compare } from "bcryptjs"

/** Cost factor — 12 for production. Lower in tests for speed. */
const SALT_ROUNDS = process.env.NODE_ENV === "test" ? 4 : 12

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS)
}

export async function verifyPassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return compare(plain, hashed)
}
