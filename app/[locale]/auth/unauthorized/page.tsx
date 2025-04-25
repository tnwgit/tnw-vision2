"use client";

import Link from "next/link";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function UnauthorizedPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth.unauthorized");

  return (
    <MainLayout>
      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          
          <div className="my-8">
            <svg
              className="w-16 h-16 mx-auto text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <p className="text-gray-600 mb-8">
            {t("message")}
          </p>
          
          <div>
            <Link
              href={`/${locale}`}
              className="text-blue-600 hover:underline block mt-4"
            >
              {t("backHome")}
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 