"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Box } from "lucide-react"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
            <Box className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold text-zinc-50">BoxManager</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {[
            { label: "Fonctionnalités", href: "#features" },
            { label: "Comment ça marche", href: "#how" },
            { label: "Tarifs", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#demo"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
          >
            Prendre contact
          </a>
          <a
            href="#pricing"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Essai gratuit
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {[
              { label: "Fonctionnalités", href: "#features" },
              { label: "Comment ça marche", href: "#how" },
              { label: "Tarifs", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-zinc-800 pt-3">
            <a href="#demo" onClick={() => setOpen(false)} className="rounded-lg border border-zinc-700 px-4 py-2.5 text-center text-sm font-medium text-zinc-300">
              Prendre contact
            </a>
            <a href="#pricing" onClick={() => setOpen(false)} className="rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm font-medium text-white">
              Essai gratuit
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
