"use client"

import { useState } from "react"
import { Zap, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { AutomationCard } from "./AutomationCard"
import { CreateAutomationModal } from "./CreateAutomationModal"
import type { Automation } from "@/types/automation"

interface Props {
  automations: Automation[]
}

const STATUS_FILTERS = [
  { value: "all",    label: "Toutes" },
  { value: "active", label: "Actives" },
  { value: "paused", label: "En pause" },
  { value: "draft",  label: "Brouillons" },
] as const

type Filter = (typeof STATUS_FILTERS)[number]["value"]

export function AutomationsPageClient({ automations }: Props) {
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState<Filter>("all")
  const [search, setSearch] = useState("")

  const visible = automations
    .filter((a) => filter === "all" || a.status === filter)
    .filter((a) =>
      search.trim() === "" ||
      a.name.toLowerCase().includes(search.toLowerCase())
    )

  const activeCount = automations.filter((a) => a.status === "active").length

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Automations</h1>
            {activeCount > 0 && (
              <Badge variant="success">{activeCount} active{activeCount > 1 ? "s" : ""}</Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Automatisez vos workflows marketing
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Nouvelle automation
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filter === f.value
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {f.label}
              {f.value !== "all" && (
                <span className={`ml-1 ${filter === f.value ? "text-indigo-200" : "text-slate-400"}`}>
                  ({automations.filter((a) => a.status === f.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      {automations.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{automations.length}</p>
            <p className="text-xs text-slate-500">Total</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
            <p className="text-xs text-slate-500">Actives</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">
              {automations.reduce((s, a) => s + a.contacts_enrolled, 0)}
            </p>
            <p className="text-xs text-slate-500">Contacts actifs</p>
          </Card>
        </div>
      )}

      {/* List */}
      {visible.length > 0 ? (
        <div className="space-y-3">
          {visible.map((automation) => (
            <AutomationCard key={automation.id} automation={automation} />
          ))}
        </div>
      ) : automations.length === 0 ? (
        /* First empty state */
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <Zap className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            Aucune automation créée
          </h3>
          <p className="mb-8 max-w-sm text-sm text-slate-500">
            Créez des workflows automatiques pour engager vos contacts au bon moment,
            sans effort.
          </p>
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Créer ma première automation
          </Button>

          {/* Feature hints */}
          <div className="mt-10 grid w-full max-w-md grid-cols-2 gap-3 text-left">
            {[
              { icon: "👤", title: "Bienvenue", desc: "Email auto à chaque nouveau contact" },
              { icon: "⏱️", title: "Nurturing", desc: "Séquence d'emails espacés dans le temps" },
              { icon: "🏷️", title: "Segmentation", desc: "Tags auto selon le comportement" },
              { icon: "✉️", title: "Réengagement", desc: "Relance quand un email est ouvert" },
            ].map((hint) => (
              <div
                key={hint.title}
                className="rounded-xl border border-slate-100 bg-slate-50 p-3"
              >
                <div className="mb-1 text-xl">{hint.icon}</div>
                <p className="text-xs font-semibold text-slate-700">{hint.title}</p>
                <p className="text-xs text-slate-500">{hint.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        /* Filtered empty state */
        <Card className="flex flex-col items-center justify-center py-12 text-center">
          <SlidersHorizontal className="mb-3 h-8 w-8 text-slate-300" />
          <p className="text-sm font-medium text-slate-600">
            Aucune automation ne correspond à vos filtres.
          </p>
          <button
            onClick={() => { setFilter("all"); setSearch("") }}
            className="mt-2 text-sm text-indigo-600 hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </Card>
      )}

      {/* Modal */}
      {showCreate && <CreateAutomationModal onClose={() => setShowCreate(false)} />}
    </>
  )
}
