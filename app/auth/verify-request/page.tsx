import Link from "next/link";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";

export default function VerifyRequestPage() {
  return (
    <MainLayout>
      <Section className="py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Mail className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Controleer je e-mail
          </h1>
          
          <p className="text-lg text-gray-600 mb-4">
            Er is een verificatielink verzonden naar je e-mailadres. Klik op de link in de e-mail om je account te activeren.
          </p>
          
          <p className="text-md text-gray-500 mb-8">
            De e-mail kan enkele minuten onderweg zijn. Controleer ook je spam of ongewenste e-mail als je de e-mail niet kunt vinden.
          </p>
          
          <div className="flex justify-center">
            <Link href="/auth/login" passHref>
              <Button className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug naar inloggen
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 