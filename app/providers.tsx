"use client"

import { SessionProvider } from "next-auth/react"

/**
 * Client-side providers wrapper.
 * SessionProvider makes useSession() available in all Client Components.
 *
 * Add other providers here as the app grows (ThemeProvider, QueryClient, etc.)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
