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
import { getTranslations } from "next-intl/server";

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

  // Haal vertalingen op
  const t = await getTranslations({ locale, namespace: 'organization' });
  
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
  
  // Kies de juiste naam en beschrijving op basis van de locale
  const displayName = locale === 'nl' && assistant.nameNL ? assistant.nameNL : assistant.name;
  const displayDescription = locale === 'nl' && assistant.descriptionNL ? assistant.descriptionNL : assistant.description;
  
  const { image, benefits, modules } = assistant;
  const assistantImage = image || `/images/${id}.jpg`;
  
  // Vertaal de voordelen naar Nederlands als dat nodig is
  const displayBenefits = locale === 'nl' && assistant.benefitsNL ? assistant.benefitsNL : benefits;
  
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
  
  // Categorieën vertaling
  const getCategoryTranslation = (category: string) => {
    if (locale !== 'nl') return category;
    
    const translations: Record<string, string> = {
      'Authentication': 'Authenticatie',
      'Security': 'Beveiliging',
      'Integration': 'Integratie',
      'Communication': 'Communicatie',
      'Knowledge': 'Kennis',
      'Reporting': 'Rapportage'
    };
    
    return translations[category] || category;
  };
  
  // Module naam en beschrijving vertaling
  const getModuleTranslation = (module: any) => {
    if (locale !== 'nl') return { name: module.name, description: module.description };
    
    // Hier voeg je vertalingen toe voor modules, dit kan je uitbreiden met alle modules
    const nameTranslations: Record<string, string> = {
      'Authentication': 'Authenticatie',
      'Anonymization layer': 'Anonimiseringslaag',
      'LLM selection': 'LLM selectie',
      'Hosting location': 'Hostinglocatie',
      'Chat widget': 'Chat widget',
      'Knowledge base (RAG)': 'Kennisbank (RAG)',
      'Reporting dashboard': 'Rapportage dashboard',
      'Booking system integration': 'Boekingssysteem integratie',
      'Guest services module': 'Gastendiensten module',
      'Medical knowledge base': 'Medische kennisbank',
      'EHR integration': 'EPD integratie',
      'Voice transcription': 'Spraaktranscriptie'
    };
    
    const descTranslations: Record<string, string> = {
      'Handles user authentication and authorization': 'Regelt gebruikersauthenticatie en -autorisatie',
      'Ensures user data privacy and compliance': 'Zorgt voor privacybescherming en compliance van gebruikersgegevens',
      'Choose and configure the LLM to power your assistant': 'Kies en configureer het LLM dat je assistent aandrijft',
      'Configure where your solution will be hosted': 'Configureer waar je oplossing wordt gehost',
      'Customizable chat interface for your users': 'Aanpasbare chatinterface voor je gebruikers',
      'Import and manage your knowledge sources': 'Importeer en beheer je kennisbronnen',
      'Analytics and insights about your assistant usage': 'Analyses en inzichten over het gebruik van je assistent',
      'Connect to your hotel booking system': 'Verbind met je hotel boekingssysteem',
      'Handle guest service requests and room service': 'Verwerk verzoeken van gasten en roomservice',
      'Comprehensive medical reference system with up-to-date clinical guidelines': 'Uitgebreid medisch referentiesysteem met actuele klinische richtlijnen',
      'Connect to your electronic health record system': 'Verbind met je elektronisch patiëntendossier',
      'Transcribe clinical notes and patient encounters': 'Transcribeer klinische notities en patiëntengesprekken'
    };
    
    return { 
      name: nameTranslations[module.name] || module.name, 
      description: descTranslations[module.description] || module.description
    };
  };
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayout>
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0">
            <Image 
              src={assistantImage}
              alt={`${displayName} cover image`}
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
                  `Terug naar assistenten voor ${organization.name}` : 
                  `Back to assistants for ${organization.name}`}
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm">
                {displayName}
              </h1>
            </div>
          </div>
        </div>
        
        <Section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="lead text-lg text-gray-700">
                  {displayDescription}
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                  {locale === 'nl' ? 'Voordelen' : 'Benefits'}
                </h2>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <p className="text-gray-600 italic max-w-md">
                    {locale === 'nl' ? 'De belangrijkste voordelen van deze assistent voor uw organisatie:' : 'Key benefits of this assistant for your organization:'}
                  </p>
                  
                  <Link 
                    href={`/${locale}/organization/${type}/assistant/${id}/intake`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg border-2 border-white/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] min-w-[240px]"
                    style={{ letterSpacing: "0.025em", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                  >
                    <span>{locale === 'nl' ? 'Assistent aanpassen' : 'Customize assistant'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </Link>
                </div>
                <ul className="space-y-3 my-4 border-l-4 border-green-100 pl-4">
                  {displayBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                  {locale === 'nl' ? 'Beschikbare Modules' : 'Available Modules'}
                </h2>
                
                <div className="space-y-6">
                  {Object.entries(modulesByCategory).map(([category, modules]) => (
                    <div key={category} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
                        <div className="mr-2">
                          {getCategoryIcon(category as ModuleCategory)}
                        </div>
                        <h3 className="font-medium text-gray-900">
                          {getCategoryTranslation(category)}
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {modules.map((module) => {
                          const { name, description } = getModuleTranslation(module);
                          return (
                            <div key={module.id} className="px-6 py-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{name}</h4>
                                <Badge variant={module.isRequired ? "success" : "outline"}>
                                  {locale === 'nl' ? 
                                    (module.isRequired ? "Inbegrepen" : "Optioneel") : 
                                    (module.isRequired ? "Included" : "Optional")}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">{description}</p>
                            </div>
                          );
                        })}
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
                    'Begin met het configureren van uw eigen assistent of neem contact met ons op voor meer informatie.' : 
                    'Start configuring your own assistant or contact us for more information.'}
                </p>
                
                <Link 
                  href={`/${locale}/contact?assistant=${id}&organization=${type}`}
                  className="mb-4 w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg border-2 border-white/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ letterSpacing: "0.025em", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                >
                  <span>{locale === 'nl' ? 'Neem contact op' : 'Contact us'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </Link>
                
                <Link 
                  href={`/${locale}/demo?assistant=${id}`}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-base font-medium rounded-lg transition-colors"
                >
                  <span>{locale === 'nl' ? 'Bekijk demo' : 'View demo'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </Link>
                
                <div className="mt-6 pt-6 border-t border-blue-200">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {locale === 'nl' ? 'Verken opties' : 'Explore options'}
                  </h4>
                  <ul className="space-y-3">
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