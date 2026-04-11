import type { Metadata } from "next";
import Link from "next/link";
import {
  Megaphone,
  Users,
  TrendingUp,
  MousePointerClick,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  {
    title: "Campagnes actives",
    value: "0",
    hint: "Aucune campagne pour l'instant",
    icon: Megaphone,
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Audiences",
    value: "0",
    hint: "Aucune audience définie",
    icon: Users,
    iconBg: "bg-violet-50 text-violet-600",
  },
  {
    title: "Emails envoyés",
    value: "0",
    hint: "Commencez à envoyer",
    icon: TrendingUp,
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Taux de clic",
    value: "—",
    hint: "Pas encore de données",
    icon: MousePointerClick,
    iconBg: "bg-amber-50 text-amber-600",
  },
];

const quickActions = [
  {
    title: "Créer une campagne",
    description: "Lancez une nouvelle campagne email ou SMS en quelques minutes",
    href: "/campaigns",
    icon: Megaphone,
    badge: "Populaire",
    badgeVariant: "info" as const,
  },
  {
    title: "Définir une audience",
    description: "Segmentez vos contacts pour cibler les bonnes personnes",
    href: "/audiences",
    icon: Users,
    badge: null,
    badgeVariant: "default" as const,
  },
  {
    title: "Explorer les automations",
    description: "Créez des workflows automatisés basés sur des déclencheurs",
    href: "/automations",
    icon: Sparkles,
    badge: "Bientôt",
    badgeVariant: "warning" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Bienvenue sur FlowMarketing — votre plateforme de marketing automation
          </p>
        </div>
        <Link href="/campaigns">
          <Button className="gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            Nouvelle campagne
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{stat.hint}</p>
                </div>
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Pour commencer
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <Card className="group cursor-pointer p-5 transition-all hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 text-sm">
                          {action.title}
                        </h3>
                        {action.badge && (
                          <Badge variant={action.badgeVariant} className="text-[10px] px-1.5">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent activity — empty state */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Activité récente
        </h2>
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Megaphone className="h-7 w-7 text-slate-400" />
          </div>
          <h3 className="mb-1 font-semibold text-slate-900">
            Aucune activité récente
          </h3>
          <p className="mb-6 max-w-xs text-sm text-slate-500">
            Créez votre première campagne pour voir l&apos;activité apparaître ici.
          </p>
          <Link href="/campaigns">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-3.5 w-3.5" />
              Créer ma première campagne
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
