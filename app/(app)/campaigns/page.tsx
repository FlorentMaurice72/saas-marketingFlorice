import type { Metadata } from "next";
import { Megaphone, Plus, Filter, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Campagnes" };

const campaignTypes = [
  { label: "Toutes", active: true },
  { label: "Email", active: false },
  { label: "SMS", active: false },
  { label: "Social", active: false },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campagnes</h1>
          <p className="mt-1 text-sm text-slate-500">
            Créez et gérez toutes vos campagnes marketing
          </p>
        </div>
        <Button className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Nouvelle campagne
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          {campaignTypes.map((type) => (
            <button
              key={type.label}
              className={
                type.active
                  ? "rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
                  : "rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
              }
            >
              {type.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 sm:w-56"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2 shrink-0">
            <Filter className="h-3.5 w-3.5" />
            Filtrer
          </Button>
        </div>
      </div>

      {/* Empty state */}
      <Card className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <Megaphone className="h-8 w-8 text-indigo-600" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">
          Aucune campagne pour l&apos;instant
        </h3>
        <p className="mb-2 max-w-sm text-sm text-slate-500">
          Créez votre première campagne marketing et commencez à atteindre
          votre audience cible.
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["Email", "SMS", "Social", "Push"].map((type) => (
            <Badge key={type} variant="outline">
              {type}
            </Badge>
          ))}
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Créer ma première campagne
        </Button>
      </Card>
    </div>
  );
}
