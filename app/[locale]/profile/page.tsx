"use client";

import { useSession } from "next-auth/react";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card } from "@/app/components/ui/card";
import { Settings, User, Mail, Shield } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/nl/auth/login");
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

  if (!session) {
    return null; // Will redirect via the useEffect
  }

  return (
    <MainLayout>
      <Section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mijn Profiel</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {session.user.name || "Gebruiker"}
                </h2>
                <p className="text-gray-500 flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {session.user.email}
                </p>
                
                {session.user.role && (
                  <p className="flex items-center mt-1 text-gray-500">
                    <Shield className="h-4 w-4 mr-2 text-gray-400" />
                    Rol: 
                    <span className="ml-1 inline-block px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-800">
                      {session.user.role === "admin" ? "Administrator" : 
                      session.user.role === "contentManager" ? "Content Manager" : "Gebruiker"}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Settings className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium">Account instellingen</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Beheer je accountinstellingen, wachtwoord en voorkeuren.
              </p>
              <button
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Instellingen beheren
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </Card>
            
            <Card className="p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Privacy en beveiliging</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Beheer je privacy-instellingen en beveiligingsvoorkeuren.
              </p>
              <button
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Privacy beheren
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </Card>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 