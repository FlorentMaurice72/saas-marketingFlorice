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
      demo_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          nombre_boxes: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          nombre_boxes?: string | null
          message?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string | null
          nombre_boxes?: string | null
          message?: string | null
        }
        Relationships: []
      }

      subscriptions: {
        Row: {
          id: string
          email: string
          plan: "essentiel" | "pro"
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          status: "active" | "canceled" | "past_due"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          plan: "essentiel" | "pro"
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: "active" | "canceled" | "past_due"
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          plan?: "essentiel" | "pro"
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: "active" | "canceled" | "past_due"
          updated_at?: string
        }
        Relationships: []
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]
