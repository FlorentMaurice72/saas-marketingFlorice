import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, boxes_count, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Nom et email requis." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("demo_requests").insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company?.trim() || null,
      boxes_count: boxes_count || null,
      message: message?.trim() || null,
    })

    if (error) {
      console.error("[demo/route] Supabase error:", error)
      return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[demo/route]", err)
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
  }
}
