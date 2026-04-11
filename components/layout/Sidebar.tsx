"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Zap,
  Settings,
  ChevronRight,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Campagnes",
    href: "/campaigns",
    icon: Megaphone,
  },
  {
    label: "Audiences",
    href: "/audiences",
    icon: Users,
  },
  {
    label: "Automations",
    href: "/automations",
    icon: Zap,
    badge: "Bientôt",
  },
] as const;

const bottomItems = [
  {
    label: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="flex h-full w-60 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="font-semibold text-slate-900 tracking-tight">
          FlowMarketing
        </span>
      </div>

      {/* Main navigation */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const itemWithBadge = item as typeof item & { badge?: string };

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
                  active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {itemWithBadge.badge && (
                <Badge variant="info" className="text-[10px] px-1.5 py-0">
                  {itemWithBadge.badge}
                </Badge>
              )}
              {active && (
                <ChevronRight className="h-3 w-3 text-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="shrink-0 border-t border-slate-100 p-3">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

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
          );
        })}

        {/* User avatar */}
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-semibold text-white">
            FM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              Florent Maurice
            </p>
            <p className="truncate text-xs text-slate-400">Plan Pro</p>
          </div>
          <button className="rounded p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
