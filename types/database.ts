/**
 * Database type definitions — mirrors the Supabase schema exactly.
 *
 * ─── How to keep this in sync ────────────────────────────────────────────────
 * After any schema change, regenerate with:
 *   npx supabase gen types typescript --project-id <project-id> > types/database.ts
 *
 * Until then, update manually to match supabase/schema.sql.
 * ──────────────────────────────────────────────────────────────────────────────
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // ── users ──────────────────────────────────────────────────────────────
      // Custom users table — stores credentials for our NextAuth-based auth.
      // Migration path: replace with Supabase Auth (auth.users) when ready.
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          hashed_password: string | null
          plan: "free" | "starter" | "pro" | "enterprise"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          hashed_password?: string | null
          plan?: "free" | "starter" | "pro" | "enterprise"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          hashed_password?: string | null
          plan?: "free" | "starter" | "pro" | "enterprise"
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      // ── campaigns ──────────────────────────────────────────────────────────
      campaigns: {
        Row: {
          id: string
          user_id: string
          name: string
          type: "email" | "ads" | "social"
          content: string | null
          status: "draft" | "published"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: "email" | "ads" | "social"
          content?: string | null
          status?: "draft" | "published"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: "email" | "ads" | "social"
          content?: string | null
          status?: "draft" | "published"
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      campaign_status: "draft" | "published"
      campaign_type: "email" | "ads" | "social"
    }
  }
}

// ─── Convenience row type aliases ─────────────────────────────────────────────
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]
