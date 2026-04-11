"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface LogoutButtonProps {
  className?: string
  showLabel?: boolean
}

export function LogoutButton({
  className,
  showLabel = false,
}: LogoutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      title="Se déconnecter"
      className={cn(
        "flex items-center gap-2 rounded-lg p-1.5 text-slate-400",
        "hover:bg-red-50 hover:text-red-600 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
        className
      )}
    >
      <LogOut className="h-3.5 w-3.5" />
      {showLabel && <span className="text-sm">Déconnexion</span>}
    </button>
  )
}
