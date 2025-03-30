"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { useLocale } from 'next-intl';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
} 