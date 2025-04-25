"use client";

import Link from "next/link";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function VerifyRequestPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth.verifyRequest");

  return (
    <MainLayout>
      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          
          <div className="my-8">
            <svg
              className="w-16 h-16 mx-auto text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          
          <p className="text-gray-600 mb-8">
            {t("message")}
          </p>
          
          <div>
            <Link
              href={`/${locale}/auth/login`}
              className="text-blue-600 hover:underline block mt-4"
            >
              {t("backLogin")}
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 