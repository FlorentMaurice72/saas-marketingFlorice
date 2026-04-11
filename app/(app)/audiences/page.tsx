import type { Metadata } from "next";
import { Users, Plus, Filter, Search, Tag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Audiences" };

const audienceExamples = [
  { name: "Nouveaux inscrits", desc: "Contacts créés il y a moins de 30 jours" },
  { name: "Clients actifs", desc: "Ayant acheté dans les 90 derniers jours" },
  { name: "Inactifs à réengager", desc: "Aucune ouverture depuis 60 jours" },
];

export default function AudiencesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audiences</h1>
          <p className="mt-1 text-sm text-slate-500">
            Définissez et gérez vos segments d&apos;audience
          </p>
        </div>
        <Button className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Nouvelle audience
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une audience..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-3.5 w-3.5" />
          Filtres
        </Button>
      </div>

      {/* Empty state with examples */}
      <Card className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50">
          <Users className="h-8 w-8 text-violet-600" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">
          Aucune audience définie
        </h3>
        <p className="mb-8 max-w-sm text-sm text-slate-500">
          Créez des segments d&apos;audience pour cibler les bonnes personnes avec
          vos campagnes.
        </p>

        {/* Example audiences */}
        <div className="mb-8 flex w-full max-w-lg flex-col gap-2 text-left">
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
            Exemples d&apos;audiences
          </p>
          {audienceExamples.map((ex) => (
            <div
              key={ex.name}
              className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <Tag className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{ex.name}</p>
                <p className="text-xs text-slate-400">{ex.desc}</p>
              </div>
              <Badge variant="outline" className="ml-auto shrink-0">
                Modèle
              </Badge>
            </div>
          ))}
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Créer une audience
        </Button>
      </Card>
    </div>
  );
}
