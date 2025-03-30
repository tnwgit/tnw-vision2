import { Inter } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { locales } from "../config";

const inter = Inter({ subsets: ["latin"] });

// Valideer of de huidige locale ondersteund wordt
export async function validateLocale(locale: string) {
  return locales.includes(locale);
}

// Next.js 15 compatibele aanpak
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Server-side variabele voor locale - Next.js 15 compatible
  const { locale } = await Promise.resolve(params);
  
  // Valideer de locale server-side
  const isValidLocale = locales.includes(locale);

  if (!isValidLocale) {
    notFound();
  }

  return <>{children}</>;
} 