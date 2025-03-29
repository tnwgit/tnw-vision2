import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Next Wilson - AI Assistants",
  description: "Bringing AI assistants to all organizations with a human touch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Voorkom hydratatie waarschuwingen voor externe attributen
  // Zoals 'cz-shortcut-listen' die door browser extensies worden toegevoegd
  if (typeof window !== 'undefined') {
    // @ts-expect-error
    const originalError = console.error;
    // @ts-expect-error
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
