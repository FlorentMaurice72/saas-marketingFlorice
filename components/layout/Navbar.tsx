import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 transition-transform group-hover:scale-105">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900 tracking-tight">
                FlowMarketing
              </span>
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="#features"
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                Fonctionnalités
              </Link>
              <Link
                href="#pricing"
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                Tarifs
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Démarrer gratuitement</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
