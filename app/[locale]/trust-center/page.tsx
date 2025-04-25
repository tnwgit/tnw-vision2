"use client";

import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { useTranslations } from "next-intl";
import { CheckCircle, Shield, Lock, FileText, Fingerprint, Award, Scale, Server, Globe, BookOpen } from "lucide-react";

export default function TrustCenterPage() {
  const t = useTranslations("trustCenter");
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <Section className="py-16 md:py-24 bg-blue-50">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
        </div>
      </Section>

      {/* Introduction */}
      <Section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("intro.title")}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {t("intro.description")}
          </p>
          <p className="text-lg text-gray-700">
            {t("intro.commitment")}
          </p>
        </div>
      </Section>

      {/* Compliance Grid */}
      <Section className="py-12 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("compliance.title")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* GDPR Compliance */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 mr-3 text-blue-600" />
                <h3 className="text-xl font-semibold">{t("compliance.gdpr.title")}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t("compliance.gdpr.description")}</p>
              <ul className="space-y-2">
                {["dataMinimization", "consent", "rights", "breach"].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(`compliance.gdpr.points.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Security */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Lock className="h-8 w-8 mr-3 text-blue-600" />
                <h3 className="text-xl font-semibold">{t("compliance.security.title")}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t("compliance.security.description")}</p>
              <ul className="space-y-2">
                {["encryption", "access", "monitoring", "testing"].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(`compliance.security.points.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Ethics */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 mr-3 text-blue-600" />
                <h3 className="text-xl font-semibold">{t("compliance.ethics.title")}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t("compliance.ethics.description")}</p>
              <ul className="space-y-2">
                {["fairness", "transparency", "humancentric", "oversight"].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(`compliance.ethics.points.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EU AI Act */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 mr-3 text-blue-600" />
                <h3 className="text-xl font-semibold">{t("compliance.aiAct.title")}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t("compliance.aiAct.description")}</p>
              <ul className="space-y-2">
                {["riskAssessment", "documentation", "transparency", "governance"].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(`compliance.aiAct.points.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Residency */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Server className="h-8 w-8 mr-3 text-blue-600" />
                <h3 className="text-xl font-semibold">{t("compliance.dataResidency.title")}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t("compliance.dataResidency.description")}</p>
              <ul className="space-y-2">
                {["euHosting", "transfers", "sovereignty", "locality"].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(`compliance.dataResidency.points.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 mr-3 text-blue-600" />
                <h3 className="text-xl font-semibold">{t("compliance.certifications.title")}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t("compliance.certifications.description")}</p>
              <ul className="space-y-2">
                {["iso27001", "soc2", "cloudSecurity", "privacy"].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(`compliance.certifications.points.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Commitment Section */}
      <Section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">{t("commitment.title")}</h2>
          <p className="text-lg text-gray-700 mb-8">
            {t("commitment.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="flex flex-col items-center max-w-xs">
              <Globe className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("commitment.transparency.title")}</h3>
              <p className="text-gray-700 text-center">{t("commitment.transparency.description")}</p>
            </div>
            <div className="flex flex-col items-center max-w-xs">
              <Fingerprint className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("commitment.privacy.title")}</h3>
              <p className="text-gray-700 text-center">{t("commitment.privacy.description")}</p>
            </div>
            <div className="flex flex-col items-center max-w-xs">
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("commitment.documentation.title")}</h3>
              <p className="text-gray-700 text-center">{t("commitment.documentation.description")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section className="py-12 md:py-20 bg-blue-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">{t("contact.title")}</h2>
          <p className="text-lg text-gray-700 mb-8">
            {t("contact.description")}
          </p>
          <a
            href="mailto:compliance@thenextwilson.com"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            {t("contact.cta")}
          </a>
        </div>
      </Section>
    </MainLayout>
  );
} 