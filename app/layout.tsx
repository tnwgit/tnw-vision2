import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "./config";
import { SessionProvider } from "./lib/auth/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Next Wilson",
  description: "AI assistants voor verschillende sectoren",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Onderdruk hydratatie waarschuwingen in productie
  if (typeof window !== 'undefined') {
    // @ts-expect-error - Console error override voor onderdrukken van hydratiefouten
    const originalError = console.error;
    // @ts-expect-error - Aangepaste console error handler
    console.error = (...args) => {
      if (args[0]?.includes?.('Hydration failed because the initial UI does not match what was rendered on the server') ||
          args[0]?.includes?.('There was an error while hydrating') ||
          args[0]?.includes?.('Hydration completed but contains mismatches')) {
        return;
      }
      originalError.apply(console, args);
    };
  }

  return (
    <html lang={defaultLocale} suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
