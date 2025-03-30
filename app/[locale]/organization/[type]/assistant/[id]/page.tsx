"use server";

import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { organizationTypes } from "@/app/data/mockData";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, ArrowLeft, Activity, Database, MessageSquare, Shield, Server, Globe, Play } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { ModuleCategory } from "@/app/types";
import { getIcon } from "@/app/lib/utils";
import Image from "next/image";
import { NextIntlClientProvider } from 'next-intl';

interface AssistantDetailPageProps {
  params: {
    type: string;
    id: string;
    locale: string;
  };
}

export default async function AssistantDetailPage({ params }: AssistantDetailPageProps) {
  // Server-side variabelen voor params - Next.js 15 compatible
  const { locale, type, id } = await Promise.resolve(params);
  
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
    // Fallback naar Engels als de vertaling niet kan worden geladen
    try {
      const fallbackModule = require(`@/app/i18n/locales/en/common.json`);
      messages = fallbackModule.default || fallbackModule;
    } catch {
      // Kon geen fallback laden, gebruik leeg object
    }
  }
  
  const { name, description, image, benefits, modules } = assistant;
  const assistantImage = image || `/images/${id}.jpg`;
  
  // Group modules by category
  const modulesByCategory = modules.reduce((acc, module) => {
    const { category } = module;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(module);
    return acc;
  }, {} as Record<ModuleCategory, typeof modules>);
  
  const getCategoryIcon = (category: ModuleCategory) => {
    switch (category) {
      case ModuleCategory.Authentication:
        return <Shield className="h-5 w-5" />;
      case ModuleCategory.Security:
        return <Shield className="h-5 w-5" />;
      case ModuleCategory.Integration:
        return <Server className="h-5 w-5" />;
      case ModuleCategory.Communication:
        return <MessageSquare className="h-5 w-5" />;
      case ModuleCategory.Knowledge:
        return <Database className="h-5 w-5" />;
      case ModuleCategory.Reporting:
        return <Activity className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayout>
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0">
            <Image 
              src={assistantImage}
              alt={`${name} cover image`}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-indigo-900/60" />
          </div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
            <div className="pb-8">
              <Link 
                href={`/${locale}/organization/${type}`} 
                className="inline-flex items-center text-white mb-4 hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {locale === 'nl' ? 
                  `Terug naar ${organization.name} assistenten` : 
                  `Back to ${organization.name} assistants`}
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm">
                {name}
              </h1>
            </div>
          </div>
        </div>
        
        <Section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="lead text-lg text-gray-700">
                  {description}
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                  {locale === 'nl' ? 'Voordelen' : 'Benefits'}
                </h2>
                <ul className="space-y-3 my-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                  {locale === 'nl' ? 'Beschikbare modules' : 'Available modules'}
                </h2>
                
                <div className="space-y-6">
                  {Object.entries(modulesByCategory).map(([category, modules]) => (
                    <div key={category} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
                        <div className="mr-2">
                          {getCategoryIcon(category as ModuleCategory)}
                        </div>
                        <h3 className="font-medium text-gray-900">
                          {category}
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {modules.map((module) => (
                          <div key={module.id} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{module.name}</h4>
                              <Badge variant={module.included ? "success" : "outline"}>
                                {module.included ? 
                                  (locale === 'nl' ? 'Inbegrepen' : 'Included') : 
                                  (locale === 'nl' ? 'Optioneel' : 'Optional')}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{module.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-lg border border-blue-100 p-6 sticky top-8">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {locale === 'nl' ? 'Geïnteresseerd in deze assistent?' : 'Interested in this assistant?'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {locale === 'nl' ?
                    'Neem contact met ons op voor meer informatie of een demonstratie van deze AI-assistent.' :
                    'Contact us for more information or a demonstration of this AI assistant.'}
                </p>
                
                <Button asChild variant="gradient" size="lg" className="w-full mb-4">
                  <Link href={`/${locale}/contact?assistant=${id}&organization=${type}`}>
                    {locale === 'nl' ? 'Neem contact op' : 'Contact us'}
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href={`/${locale}/demo?assistant=${id}`}>
                    {locale === 'nl' ? 'Bekijk demo' : 'View demo'}
                  </Link>
                </Button>
                
                <div className="mt-6 pt-6 border-t border-blue-200">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {locale === 'nl' ? 'Meer opties verkennen' : 'Explore more options'}
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href={`/${locale}/organization/${type}/assistant/${id}/intake`}
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        {locale === 'nl' ? 'Pas deze assistent aan' : 'Customize this assistant'}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${locale}/organization/${type}`}
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        {locale === 'nl' ? 'Bekijk alle assistenten' : 'View all assistants'}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </MainLayout>
    </NextIntlClientProvider>
  );
} 