"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Zap,
  Settings,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { Badge } from "@/components/ui/Badge"
import { LogoutButton } from "@/components/auth/LogoutButton"

// ─── Types ─────────────────────────────────────────────────────────────────────

interface SidebarUser {
  name?: string | null
  email?: string | null
  plan?: string | null
}

interface SidebarProps {
  user: SidebarUser
}

// ─── Navigation items ──────────────────────────────────────────────────────────

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Campagnes", href: "/campaigns", icon: Megaphone },
  { label: "Audiences", href: "/audiences", icon: Users },
  { label: "Automations", href: "/automations", icon: Zap, badge: "Bientôt" },
] as const

const bottomItems = [
  { label: "Paramètres", href: "/settings", icon: Settings },
] as const

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }
  return (email ?? "?").slice(0, 2).toUpperCase()
}

function getPlanLabel(plan?: string | null): string {
  const labels: Record<string, string> = {
    free: "Gratuit",
    starter: "Starter",
    pro: "Pro",
    enterprise: "Entreprise",
  }
  return labels[plan ?? "free"] ?? "Gratuit"
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const displayName = user.name ?? user.email ?? "Utilisateur"
  const initials = getInitials(user.name, user.email)
  const planLabel = getPlanLabel(user.plan)

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="font-semibold tracking-tight text-slate-900">
          FlowMarketing
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          const itemWithBadge = item as typeof item & { badge?: string }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active
                    ? "text-indigo-600"
                    : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {itemWithBadge.badge && (
                <Badge variant="info" className="px-1.5 text-[10px]">
                  {itemWithBadge.badge}
                </Badge>
              )}
              {active && <ChevronRight className="h-3 w-3 text-indigo-400" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom nav + user */}
      <div className="shrink-0 border-t border-slate-100 p-3">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-indigo-600" : "text-slate-400"
                )}
              />
              {item.label}
            </Link>
          )
        })}

        {/* User card */}
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
          {/* Avatar */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-semibold text-white">
            {initials}
          </div>

          {/* Name + plan */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              {displayName}
            </p>
            <p className="truncate text-xs text-slate-400">{planLabel}</p>
          </div>

          {/* Logout */}
          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}
