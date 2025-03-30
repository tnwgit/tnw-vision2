"use client";

import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  const locale = useLocale();

  return (
    <MainLayout>
      <Section className="py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
              <ShieldAlert className="h-10 w-10 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Geen toegang
          </h1>
          
          <p className="text-gray-600 mb-8">
            Je hebt niet de juiste rechten om deze pagina te bekijken. Neem contact op met een beheerder als je denkt dat dit een fout is.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}`}>
              <Button variant="outline">
                Terug naar home
              </Button>
            </Link>
            
            <Link href={`/${locale}/profile`}>
              <Button>
                Naar mijn profiel
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 