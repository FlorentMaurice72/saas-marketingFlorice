import Link from "next/link"
import { Box } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <Box className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">BoxManager</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-5">
            <a href="#features" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Tarifs</a>
            <a href="#faq" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">FAQ</a>
            <a href="#demo" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Contact</a>
          </nav>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} BoxManager — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  )
}
