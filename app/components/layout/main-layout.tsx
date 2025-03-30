"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { useParams } from 'next/navigation';
import { ChatButton } from "../ui/chat-button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-28">{children}</main>
      <Footer />
      <ChatButton />
    </div>
  );
} 