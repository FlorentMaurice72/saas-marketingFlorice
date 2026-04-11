import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: {
    default: "FlowMarketing — Marketing Automation SaaS",
    template: "%s | FlowMarketing",
  },
  description:
    "Créez des campagnes marketing performantes en quelques secondes. Gérez vos audiences, automatisez vos workflows et analysez vos résultats.",
  keywords: ["marketing automation", "campagnes", "email marketing", "SaaS"],
  openGraph: {
    type: "website",
    title: "FlowMarketing — Marketing Automation SaaS",
    description:
      "Créez des campagnes marketing performantes en quelques secondes.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
