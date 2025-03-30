import Link from "next/link";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <MainLayout>
      <Section className="py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <ShieldAlert className="h-12 w-12 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Toegang geweigerd
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Je hebt geen toestemming om deze pagina te bekijken. Neem contact op met een beheerder als je denkt dat dit een fout is.
          </p>
          
          <div className="flex justify-center">
            <Link href="/" passHref>
              <Button className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug naar startpagina
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 