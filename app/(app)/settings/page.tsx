import type { Metadata } from "next";
import { Bell, Lock, Palette, CreditCard, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Paramètres" };

const settingsSections = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Gérez vos alertes et préférences d'emails",
    color: "bg-indigo-50 text-indigo-600",
    action: "Configurer",
    disabled: false,
  },
  {
    icon: Lock,
    title: "Sécurité",
    description: "Mot de passe, 2FA et sessions actives",
    color: "bg-emerald-50 text-emerald-600",
    action: "Gérer",
    disabled: false,
  },
  {
    icon: Palette,
    title: "Apparence",
    description: "Thème, langue et personnalisation",
    color: "bg-violet-50 text-violet-600",
    action: "Personnaliser",
    disabled: false,
  },
  {
    icon: Users,
    title: "Équipe",
    description: "Invitez et gérez les membres de votre équipe",
    color: "bg-amber-50 text-amber-600",
    action: "Gérer l'équipe",
    disabled: false,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="mt-1 text-sm text-slate-500">
          Gérez votre compte, votre équipe et vos préférences
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>Vos informations personnelles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white">
              FM
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-900">Florent Maurice</p>
                <Badge variant="info">Pro</Badge>
              </div>
              <p className="text-sm text-slate-500">florent@flowmarketing.io</p>
              <p className="mt-0.5 text-xs text-slate-400">
                Membre depuis avril 2025
              </p>
            </div>
            <Button variant="outline" size="sm">
              Modifier
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan & Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Plan & Facturation</CardTitle>
          <CardDescription>Votre abonnement actuel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                <CreditCard className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900">Plan Pro</p>
                  <Badge variant="success">Actif</Badge>
                </div>
                <p className="text-sm text-slate-500">49€/mois · Renouvellement le 1er mai 2026</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Changer de plan
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500">
                Factures
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings grid */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Préférences
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.title}
                className="flex items-center gap-4 p-5"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${section.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm">{section.title}</p>
                  <p className="text-xs text-slate-500">{section.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={section.disabled}
                  className="shrink-0"
                >
                  {section.action}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Danger zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">Zone de danger</CardTitle>
          <CardDescription>Actions irréversibles pour votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Supprimer le compte</p>
              <p className="text-xs text-slate-500">
                Supprime définitivement votre compte et toutes vos données
              </p>
            </div>
            <Button variant="danger" size="sm">
              Supprimer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
