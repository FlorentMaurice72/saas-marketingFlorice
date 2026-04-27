"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Box } from "lucide-react"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Box className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold text-slate-900">BoxManager</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Fonctionnalités</a>
          <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Tarifs</a>
          <a href="#testimonials" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Avis</a>
          <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#demo"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Demander une démo
          </a>
          <a
            href="#pricing"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Démarrer gratuitement
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {["#features", "#pricing", "#testimonials", "#faq"].map((href) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                {href === "#features" && "Fonctionnalités"}
                {href === "#pricing" && "Tarifs"}
                {href === "#testimonials" && "Avis clients"}
                {href === "#faq" && "FAQ"}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            <a href="#demo" onClick={() => setOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700">
              Demander une démo
            </a>
            <a href="#pricing" onClick={() => setOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white">
              Démarrer gratuitement
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
