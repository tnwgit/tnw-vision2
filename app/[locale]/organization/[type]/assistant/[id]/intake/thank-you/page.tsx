"use client";

import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import { organizationTypes } from "@/app/data/mockData";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { NextIntlClientProvider } from 'next-intl';
import { use } from 'react';

interface ThankYouPageProps {
  params: {
    type: string;
    id: string;
    locale: string;
  };
}

export default function ThankYouPage({ params }: ThankYouPageProps) {
  // Gebruik React.use() om de params properties veilig te gebruiken
  const paramsObj = use(params);
  const type = paramsObj.type;
  const id = paramsObj.id;
  const locale = paramsObj.locale;

  const organization = organizationTypes.find((org) => org.id === type);
  if (!organization) {
    notFound();
  }
  
  const assistant = organization.assistants.find((assistant) => assistant.id === id);
  if (!assistant) {
    notFound();
  }
  
  // Synchrone versie voor Client Component
  let messages = {};
  try {
    const messagesModule = require(`@/app/i18n/locales/${locale}/common.json`);
    messages = messagesModule.default || messagesModule;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`);
    try {
      const fallbackModule = require(`@/app/i18n/locales/en/common.json`);
      messages = fallbackModule.default || fallbackModule;
    } catch {
      // Kon geen fallback laden, gebruik leeg object
    }
  }
  
  const { name } = assistant;
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayout>
        <Section>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'nl' ? 'Bedankt!' : 'Thank you!'}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {locale === 'nl'
                ? `We hebben uw voorkeuren ontvangen voor ${name}.`
                : `We've received your preferences for ${name}.`}
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 text-left mb-10">
              <h3 className="font-bold text-blue-900 mb-3">
                {locale === 'nl' ? 'Wat gebeurt er nu?' : 'What happens next?'}
              </h3>
              <ol className="space-y-4 text-blue-800 ml-5 list-decimal">
                <li>
                  <strong>{locale === 'nl' ? 'Technische configuratie:' : 'Technical configuration:'}</strong>{' '}
                  {locale === 'nl' 
                    ? 'Onze experts configureren uw assistent op basis van uw voorkeuren'
                    : 'Our experts will configure your assistant based on your preferences'}
                </li>
                <li>
                  <strong>{locale === 'nl' ? 'Installatie & integratie:' : 'Setup & integration:'}</strong>{' '}
                  {locale === 'nl'
                    ? 'We werken samen met u om de assistent te integreren met uw systemen'
                    : "We'll work with you to integrate the assistant with your systems"}
                </li>
                <li>
                  <strong>{locale === 'nl' ? 'Beoordeling & goedkeuring:' : 'Review & approval:'}</strong>{' '}
                  {locale === 'nl'
                    ? 'U krijgt de kans om de uiteindelijke configuratie te beoordelen en goed te keuren'
                    : "You'll get a chance to review and approve the final configuration"}
                </li>
                <li>
                  <strong>{locale === 'nl' ? 'Implementatie & training:' : 'Deployment & training:'}</strong>{' '}
                  {locale === 'nl'
                    ? 'We implementeren uw assistent en trainen uw team in het gebruik ervan'
                    : "We'll deploy your assistant and train your team on how to use it"}
                </li>
              </ol>
            </div>
            
            <p className="text-gray-600 mb-8">
              {locale === 'nl'
                ? 'Onze medewerkers nemen binnen 1-2 werkdagen contact met u op om het proces voort te zetten.'
                : 'Our team will contact you within 1-2 business days to continue the process.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gradient">
                <Link href={`/${locale}`} className="flex items-center">
                  {locale === 'nl' ? 'Terug naar de startpagina' : 'Back to homepage'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link href={`/${locale}/organization/${type}`}>
                  {locale === 'nl' ? 'Bekijk andere assistenten' : 'View other assistants'}
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      </MainLayout>
    </NextIntlClientProvider>
  );
} 