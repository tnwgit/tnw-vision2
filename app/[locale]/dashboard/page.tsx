"use client";

import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  
  return (
    <MainLayout>
      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{t("welcome")}</h2>
              <p className="text-gray-600">
                {t("welcomeMessage")}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{t("quickActions")}</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">{t("editProfile")}</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">{t("newProject")}</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">{t("help")}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 