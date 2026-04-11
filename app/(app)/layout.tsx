import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/auth"
import { Sidebar } from "@/components/layout/Sidebar"

/**
 * Protected layout — wraps all app routes (dashboard, campaigns, etc.)
 *
 * Defense-in-depth: the middleware already redirects unauthenticated users,
 * but we re-verify the session here server-side as a second layer.
 */
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/login")
  }

  const user = {
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    plan: session.user.plan ?? "free",
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar user={user} />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 lg:px-10">
          {children}
        </div>
      </main>
    </div>
  )
}
