import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BoxManager — Gestion locative pour boxes de stockage",
  description:
    "Gérez vos boxes de stockage en 15 minutes par mois. Contrats, loyers, relances — tout en un seul endroit. Simple. Fiable.",
  openGraph: {
    title: "BoxManager — Gestion locative simplifiée",
    description: "10, 20, 50 locataires. 15 minutes par mois.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
