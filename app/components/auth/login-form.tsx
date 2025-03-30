"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Haal eventuele error parameter uit de URL
  const urlError = searchParams.get("error");
  const errorMessage = urlError === "CredentialsSignin" 
    ? "Ongeldige inloggegevens. Controleer je e-mailadres en wachtwoord."
    : urlError 
      ? "Er is een fout opgetreden bij het inloggen. Probeer het opnieuw."
      : error;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Gebruik signIn van next-auth/react
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Ongeldige inloggegevens. Controleer je e-mailadres en wachtwoord.");
        setLoading(false);
      } else {
        // Succesvol ingelogd, stuur naar de juiste pagina op basis van locale
        router.push(`/${locale}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Inloggen</h1>
        <p className="text-gray-500 mt-2">
          Log in om toegang te krijgen tot het beheerdersdashboard
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Wachtwoord
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            {loading ? "Bezig met inloggen..." : "Inloggen"}
          </Button>
        </div>
      </form>

      <div className="mt-4 flex items-center justify-center space-x-4">
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center w-full"
          onClick={() => signIn("google", { callbackUrl: `/${locale}` })}
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          Inloggen met Google
        </Button>
      </div>

      {/* Link naar registratiepagina */}
      <div className="text-center text-sm mt-6">
        <p className="text-gray-600">
          Nog geen account?{" "}
          <Link href={`/${locale}/auth/register`} className="text-blue-600 hover:underline">
            Registreer hier
          </Link>
        </p>
      </div>
    </div>
  );
} 