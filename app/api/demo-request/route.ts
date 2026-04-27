import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, nombre_boxes, message } = body

    // Validation
    if (!name?.trim()) {
      return NextResponse.json({ error: "Le nom est obligatoire." }, { status: 400 })
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: "L'email est obligatoire." }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("demo_requests").insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      nombre_boxes: nombre_boxes || null,
      message: message?.trim() || null,
    })

    if (error) {
      console.error("[demo-request] Supabase error:", error)
      return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[demo-request]", err)
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
  }
}
