import Link from "next/link"
import { Zap } from "lucide-react"

/**
 * Layout shared by /auth/login and /auth/register.
 * Provides the centered card shell and branding header.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Top bar */}
      <header className="flex h-14 items-center border-b border-slate-200 bg-white px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 transition-transform group-hover:scale-105">
            <Zap className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-900">
            FlowMarketing
          </span>
        </Link>
      </header>

      {/* Centered content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400">
        © 2025 FlowMarketing —{" "}
        <a href="#" className="hover:text-slate-600 transition-colors">
          Confidentialité
        </a>{" "}
        ·{" "}
        <a href="#" className="hover:text-slate-600 transition-colors">
          CGU
        </a>
      </footer>
    </div>
  )
}
