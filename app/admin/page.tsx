import { auth } from "@/app/lib/auth/auth";
import { notFound, redirect } from "next/navigation";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";

export default async function AdminPage() {
  const session = await auth();
  
  // Check of de gebruiker is ingelogd en admin rechten heeft
  if (!session || session.user.role !== "admin") {
    // Redirect naar ongeautoriseerde pagina als er geen admin rechten zijn
    return redirect("/auth/unauthorized");
  }
  
  return (
    <MainLayout>
      <Section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Welkom, {session.user.name || session.user.email}</h2>
            <p className="text-gray-600 mb-6">
              Dit is het admin panel waar je alle aspecten van de website kunt beheren.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Gebruikersbeheer</h3>
                <p className="text-blue-700 mb-3 text-sm">
                  Beheer gebruikersaccounts, rollen en machtigingen
                </p>
                <div className="text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Bekijken &rarr;
                  </button>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-lg font-medium text-green-800 mb-2">Content beheer</h3>
                <p className="text-green-700 mb-3 text-sm">
                  Beheer teksten, afbeeldingen en andere content
                </p>
                <div className="text-right">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Bekijken &rarr;
                  </button>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="text-lg font-medium text-purple-800 mb-2">Assistenten</h3>
                <p className="text-purple-700 mb-3 text-sm">
                  Beheer AI assistent configuraties en modules
                </p>
                <div className="text-right">
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Bekijken &rarr;
                  </button>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h3 className="text-lg font-medium text-amber-800 mb-2">Statistieken</h3>
                <p className="text-amber-700 mb-3 text-sm">
                  Bekijk websitegebruik en conversie statistieken
                </p>
                <div className="text-right">
                  <button className="text-amber-600 hover:text-amber-800 text-sm font-medium">
                    Bekijken &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 