import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="BoxManager" width={28} height={28} className="rounded-lg" />
            <span className="text-sm font-bold text-zinc-100">BoxManager</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-5">
            <a href="#features" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Tarifs</a>
            <a href="#faq" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">FAQ</a>
            <a href="#demo" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Contact</a>
          </nav>

          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} BoxManager
          </p>
        </div>
      </div>
    </footer>
  )
}
