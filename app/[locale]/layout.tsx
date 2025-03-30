import { Inter } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { locales } from "../config";
import { I18nProvider } from "../i18n/provider";

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

  // Laad de berichten voor de geselecteerde taal
  let messages;
  try {
    messages = (await import(`../i18n/locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      {children}
    </I18nProvider>
  );
} 