const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://boxmanager-site.vercel.app"

const FAQ_ITEMS = [
  {
    q: "Est-ce que BoxManager est adapté si j'ai peu de locataires ?",
    a: "Oui. Le plan gratuit est conçu pour les petits parcs jusqu'à 10 boxes. Dès le premier locataire, BoxManager vous fait gagner du temps sur le suivi des loyers et les relances.",
  },
  {
    q: "Comment fonctionne l'import des loyers ?",
    a: "Vous exportez votre relevé bancaire au format CSV depuis votre banque, puis vous le glissez dans BoxManager. Le logiciel identifie automatiquement les virements de vos locataires et met à jour votre tableau de bord.",
  },
  {
    q: "Est-ce que je peux tester gratuitement ?",
    a: "Oui. Le plan gratuit est disponible sans limite de durée pour jusqu'à 10 boxes. Le plan Pro inclut 14 jours d'essai offerts, sans carte bancaire requise.",
  },
  {
    q: "Est-ce sécurisé ?",
    a: "Toutes vos données sont chiffrées au repos et en transit. BoxManager est hébergé en France et respecte le RGPD. Vous restez propriétaire de vos données et pouvez les exporter à tout moment.",
  },
  {
    q: "Est-ce que BoxManager remplace mon comptable ?",
    a: "Non. BoxManager vous aide à avoir une gestion propre et à produire des exports comptables clairs. Votre comptable reste indispensable pour votre déclaration — BoxManager lui mâche simplement le travail.",
  },
  {
    q: "Est-ce compliqué à utiliser ?",
    a: "Non. La prise en main prend moins de 10 minutes. L'interface est pensée pour des propriétaires, pas pour des comptables ou des développeurs. Si vous savez utiliser Excel, vous saurez utiliser BoxManager.",
  },
]

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BoxManager",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Logiciel de gestion locative pour boxes de stockage et garages. Suivi automatique des loyers, détection des impayés, relances et export comptable.",
    offers: [
      {
        "@type": "Offer",
        name: "Gratuit",
        price: "0",
        priceCurrency: "EUR",
        description: "Jusqu'à 10 boxes — gratuit sans limite de durée",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "19",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "19",
          priceCurrency: "EUR",
          unitCode: "MON",
        },
        description: "Boxes illimités, toutes les fonctionnalités incluses",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "3",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BoxManager",
    url: SITE_URL,
    description:
      "Logiciel de gestion locative pour propriétaires de boxes de stockage et garages",
    foundingDate: "2024",
    areaServed: "FR",
    knowsAbout: [
      "gestion locative",
      "boxes de stockage",
      "suivi des loyers",
      "gestion des impayés",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
]

export function JsonLd() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
