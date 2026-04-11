import Link from "next/link";
import {
  Zap,
  Megaphone,
  Users,
  BarChart3,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const features = [
  {
    icon: Megaphone,
    title: "Campagnes intelligentes",
    description:
      "Créez et gérez des campagnes marketing multi-canaux en quelques clics. Email, SMS, social — tout centralisé.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Users,
    title: "Segmentation précise",
    description:
      "Définissez des audiences ciblées avec des critères avancés. Atteignez les bonnes personnes au bon moment.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & ROI",
    description:
      "Suivez vos performances en temps réel. Optimisez vos campagnes avec des insights actionnables.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

const stats = [
  { value: "10x", label: "Gain de productivité" },
  { value: "85%", label: "Taux d'ouverture moyen" },
  { value: "3 min", label: "Pour créer une campagne" },
  { value: "500+", label: "Marketers actifs" },
];

const planIncludes = [
  "Campagnes email & SMS illimitées",
  "Segmentation d'audiences avancée",
  "Analytics & reporting en temps réel",
  "Automations & workflows",
  "IA générative de contenu",
  "Support prioritaire",
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 pt-32 pb-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Badge variant="info" className="mb-6 px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            Propulsé par l&apos;IA · Version Beta
          </Badge>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.1]">
            Crée tes campagnes
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              marketing en quelques secondes
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500">
            FlowMarketing est la plateforme d&apos;automation marketing qui transforme tes
            idées en campagnes performantes. Gérez vos audiences, générez du contenu
            et analysez vos résultats — tout en un.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 px-8 shadow-lg shadow-indigo-200">
                Accéder au dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="px-8">
                Voir les fonctionnalités
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Déjà adopté par{" "}
            <span className="font-semibold text-slate-600">500+ marketers</span> pour
            automatiser leurs campagnes
          </p>
        </div>

        {/* Dashboard preview */}
        <div className="mx-auto mt-20 w-full max-w-5xl px-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-1.5 shadow-2xl shadow-slate-200/60">
            <div className="rounded-xl border border-slate-100 bg-white">
              {/* Mock top bar */}
              <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-4 h-5 w-48 rounded-full bg-slate-100" />
              </div>
              {/* Mock dashboard */}
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="h-5 w-36 rounded-md bg-slate-200" />
                    <div className="mt-1.5 h-3 w-52 rounded-md bg-slate-100" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 w-24 rounded-lg bg-slate-100" />
                    <div className="h-9 w-32 rounded-lg bg-indigo-600" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Campagnes actives", value: "12", color: "text-indigo-600" },
                    { label: "Audiences", value: "8", color: "text-violet-600" },
                    { label: "Emails envoyés", value: "24.5k", color: "text-emerald-600" },
                    { label: "Taux de clic", value: "3.2%", color: "text-amber-600" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <p className="text-xs text-slate-400">{stat.label}</p>
                      <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="h-3 w-24 rounded-full bg-slate-200" />
                        <div className="h-5 w-12 rounded-full bg-indigo-100" />
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-indigo-400"
                          style={{ width: `${[72, 45, 88][i]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <Badge variant="info" className="mb-4">
              Fonctionnalités
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Tout ce dont vous avez besoin
            </h2>
            <p className="mx-auto max-w-2xl text-slate-500">
              Une suite complète d&apos;outils marketing conçue pour les équipes qui veulent
              aller vite et mesurer leur impact.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-8 transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ───────────────────────────────────────── */}
      <section id="pricing" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="info" className="mb-4">
            Tarifs
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Simple et transparent
          </h2>
          <p className="mb-12 text-slate-500">
            Un seul plan qui inclut tout. Pas de surprise.
          </p>

          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-10 text-white">
              <p className="mb-1 text-sm font-medium text-indigo-200">Plan Pro</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">49€</span>
                <span className="text-indigo-200">/mois</span>
              </div>
              <p className="mt-2 text-sm text-indigo-200">
                Tout inclus, sans engagement
              </p>
            </div>
            <div className="p-8">
              <ul className="space-y-3">
                {planIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="mt-8 block">
                <Button className="w-full" size="lg">
                  Commencer l&apos;essai gratuit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Prêt à transformer votre marketing ?
          </h2>
          <p className="mb-10 text-lg text-indigo-200">
            Rejoignez des centaines de marketers qui ont déjà automatisé leurs campagnes.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50 px-10 shadow-xl shadow-indigo-900/30"
            >
              Accéder au dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-900">FlowMarketing</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2025 FlowMarketing. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              {["Confidentialité", "CGU", "Contact"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
