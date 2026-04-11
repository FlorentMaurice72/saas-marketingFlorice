import type { Metadata } from "next";
import { Zap, ArrowRight, Clock, Tag, Mail, GitBranch } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Automations" };

const upcomingFeatures = [
  {
    icon: Mail,
    title: "Séquences email",
    description: "Envoyez des séries d'emails déclenchés automatiquement",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Clock,
    title: "Déclencheurs temporels",
    description: "Automatisez vos envois selon des dates ou délais",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: GitBranch,
    title: "Workflows conditionnels",
    description: "Créez des parcours adaptés au comportement de chaque contact",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Tag,
    title: "Gestion des tags",
    description: "Ajoutez ou supprimez des tags automatiquement",
    color: "bg-violet-50 text-violet-600",
  },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Automations</h1>
              <Badge variant="warning">Bientôt disponible</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Automatisez vos workflows marketing
            </p>
          </div>
        </div>
        <Button disabled className="gap-2 shrink-0">
          <Zap className="h-4 w-4" />
          Nouvelle automation
        </Button>
      </div>

      {/* Coming soon banner */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Zap className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-amber-900">Fonctionnalité en cours de développement</p>
            <p className="text-sm text-amber-700">
              Les automations seront disponibles dans la prochaine version. Soyez le premier informé.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 border-amber-200 bg-white text-amber-700 hover:bg-amber-50"
          >
            Être notifié
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Card>

      {/* Preview of upcoming features */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Fonctionnalités à venir
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {upcomingFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="flex items-start gap-4 p-5 opacity-75"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {feature.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {feature.description}
                  </p>
                </div>
                <Badge variant="outline" className="ml-auto shrink-0 text-[10px]">
                  Bientôt
                </Badge>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
