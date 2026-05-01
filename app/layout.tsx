import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://boxmanager-site.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BoxManager — Logiciel de gestion locative pour boxes de stockage",
    template: "%s | BoxManager",
  },
  description:
    "Logiciel de gestion locative pour boxes de stockage et garages. Suivi automatique des loyers, détection des impayés, relances et export comptable. Essai gratuit — sans carte bancaire.",
  keywords: [
    "logiciel gestion locative box",
    "gestion boxes stockage",
    "gestion locataires garages",
    "logiciel gestion loyers box",
    "suivi loyers garages",
    "gestion location box stockage",
    "logiciel box locataires",
  ],
  authors: [{ name: "BoxManager" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "BoxManager",
    title: "BoxManager — Logiciel de gestion locative pour boxes de stockage",
    description:
      "Suivi des loyers, détection des impayés, relances automatiques. Gérez vos boxes de stockage en 15 minutes par mois.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BoxManager — Tableau de bord de gestion locative pour boxes de stockage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoxManager — Logiciel de gestion locative pour boxes de stockage",
    description:
      "Suivi des loyers, impayés et relances automatisés. Essai gratuit.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
