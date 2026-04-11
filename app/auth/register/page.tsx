import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { RegisterForm } from "@/components/auth/RegisterForm"

export const metadata: Metadata = { title: "Créer un compte" }

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Créez votre compte
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Commencez à automatiser votre marketing en quelques secondes
        </p>
      </div>

      <Card className="shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
          <CardDescription>
            Remplissez le formulaire pour créer votre compte gratuit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-slate-500">
        Déjà un compte ?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-indigo-600 hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  )
}
