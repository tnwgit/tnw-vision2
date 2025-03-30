"use client";

import { useSession } from "next-auth/react";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card } from "@/app/components/ui/card";
import { Settings, Users, Database, FileText, BarChart } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login page if not authenticated or not an admin
  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/nl/auth/login");
      return;
    }
    
    if (session.user.role !== "admin") {
      router.push("/nl/auth/unauthorized");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <MainLayout>
        <Section className="py-16 md:py-24">
          <div className="flex items-center justify-center h-40">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </Section>
      </MainLayout>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null; // Will redirect via the useEffect
  }

  return (
    <MainLayout>
      <Section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded">
              Administrator
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Gebruikers</p>
                  <h3 className="text-2xl font-bold mt-1">324</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-3 text-xs text-green-600 flex items-center">
                <span>+12% </span>
                <span className="ml-1">sinds vorige maand</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Organisaties</p>
                  <h3 className="text-2xl font-bold mt-1">87</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Database className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
              <div className="mt-3 text-xs text-green-600 flex items-center">
                <span>+8% </span>
                <span className="ml-1">sinds vorige maand</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Documenten</p>
                  <h3 className="text-2xl font-bold mt-1">1,856</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-3 text-xs text-green-600 flex items-center">
                <span>+16% </span>
                <span className="ml-1">sinds vorige maand</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Inkomsten</p>
                  <h3 className="text-2xl font-bold mt-1">€32,489</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <BarChart className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-3 text-xs text-green-600 flex items-center">
                <span>+23% </span>
                <span className="ml-1">sinds vorige maand</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2 p-6">
              <h3 className="text-lg font-medium mb-4">Recente Gebruikers</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naam</th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-2 py-3 whitespace-nowrap">Jan Smit</td>
                      <td className="px-2 py-3 whitespace-nowrap">jan@example.com</td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Admin</span>
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Actief</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-3 whitespace-nowrap">Petra de Vries</td>
                      <td className="px-2 py-3 whitespace-nowrap">petra@example.com</td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">Content</span>
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Actief</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-3 whitespace-nowrap">Mohamed Achmed</td>
                      <td className="px-2 py-3 whitespace-nowrap">mohamed@example.com</td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">Gebruiker</span>
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">Inactief</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Alle gebruikers bekijken →
                </button>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Snelle Acties</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Nieuwe gebruiker toevoegen</p>
                    <p className="text-xs text-gray-500">Maak een nieuwe gebruikersaccount aan</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Database className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Organisatie toevoegen</p>
                    <p className="text-xs text-gray-500">Registreer een nieuwe organisatie</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Rapportage maken</p>
                    <p className="text-xs text-gray-500">Genereer een nieuwe rapportage</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <Settings className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Systeeminstellingen</p>
                    <p className="text-xs text-gray-500">Configureer systeeminstellingen</p>
                  </div>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 