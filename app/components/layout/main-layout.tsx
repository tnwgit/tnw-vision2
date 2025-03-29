import { ReactNode } from "react";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
} 