"use server";

import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { organizationTypes } from "@/app/data/mockData";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { ChevronRight, Lock, ShieldCheck, Clock, ZapIcon } from "lucide-react";
import Image from "next/image";
import { NextIntlClientProvider } from 'next-intl';

interface OrganizationPageProps {
  params: {
    type: string;
    locale: string;
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  // Server-side variabelen voor params - Next.js 15 compatible
  const { locale: localeParam, type: typeParam } = await Promise.resolve(params);
  
  // Zoek de organisatie in de mock data
  const organization = organizationTypes.find((org) => org.id === typeParam);
  if (!organization) {
    notFound();
  }

  // Haal berichten op voor de huidige locale
  let messages = {};
  try {
    const messagesModule = require(`@/app/i18n/locales/${localeParam}/common.json`);
    messages = messagesModule.default || messagesModule;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${localeParam}`);
    // Fallback naar Engels als de vertaling niet kan worden geladen
    try {
      const fallbackModule = require(`@/app/i18n/locales/en/common.json`);
      messages = fallbackModule.default || fallbackModule;
    } catch {
      // Kon geen fallback laden, gebruik leeg object
    }
  }
  
  // Haal de use cases voor deze organisatie
  const orgUseCases = getUseCases(organization.id, localeParam);
  
  // Helper functie om afbeelding te krijgen, met fallback
  const getHeaderImage = () => {
    const basePath = `/images/organization/${organization.id}-header.jpg`;
    return basePath;
  };
  
  return (
    <NextIntlClientProvider locale={localeParam} messages={messages}>
      <MainLayout>
        {/* Hero Section */}
        <div className="relative">
          <div className="h-[30vh] sm:h-[40vh] overflow-hidden relative bg-blue-900">
            <Image 
              src={getHeaderImage()} 
              alt={`${organization.name} Header`}
              fill
              style={{ objectFit: 'cover' }}
              className="mix-blend-overlay opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-indigo-900/60" />
            <div className="container mx-auto px-4 sm:px-6 h-full flex items-center relative z-10">
              <div className="max-w-xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {localeParam === 'nl' ? 
                    `AI Assistenten voor ${organization.name}` : 
                    `AI Assistants for ${organization.name}`}
                </h1>
                <p className="mt-4 text-lg text-blue-100">
                  {localeParam === 'nl' ? 
                    `Ontdek hoe The Next Wilson ${organization.name.toLowerCase()} kan transformeren met op maat gemaakte AI assistenten` : 
                    `Discover how The Next Wilson can transform ${organization.name.toLowerCase()} with tailored AI assistants`}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overview Section */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {localeParam === 'nl' ? 'Overzicht' : 'Overview'}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {localeParam === 'nl' ? 
                  `AI-assistenten zijn niet meer weg te denken uit de moderne ${organization.name.toLowerCase()}. The Next Wilson biedt gespecialiseerde AI-oplossingen die zijn afgestemd op de unieke behoeften van uw organisatie en zorgen voor efficiëntie, creativiteit en betere resultaten.` : 
                  `AI assistants have become an integral part of modern ${organization.name.toLowerCase()}. The Next Wilson offers specialized AI solutions tailored to the unique needs of your organization, ensuring efficiency, creativity, and better outcomes.`}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {localeParam === 'nl' ? 'Belangrijkste voordelen' : 'Key advantages'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {localeParam === 'nl' ? 'Tijdsbesparing' : 'Time Savings'}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    {localeParam === 'nl' ? 
                      'Reduceer repetitieve taken en focus op strategische activiteiten die echt waarde toevoegen.' : 
                      'Reduce repetitive tasks and focus on strategic activities that truly add value.'}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {localeParam === 'nl' ? 'Veilig & Compliant' : 'Secure & Compliant'}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    {localeParam === 'nl' ? 
                      'Ontworpen met privacy en veiligheid als prioriteit, voldoet aan alle relevante regelgeving.' : 
                      'Designed with privacy and security as a priority, complies with all relevant regulations.'}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {localeParam === 'nl' ? 'Eenvoudige Integratie' : 'Easy Integration'}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    {localeParam === 'nl' ? 
                      'Naadloze integratie met bestaande systemen zonder grote infrastructurele veranderingen.' : 
                      'Seamless integration with existing systems without major infrastructural changes.'}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ZapIcon className="h-4 w-4 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {localeParam === 'nl' ? 'Verbeterde Efficiëntie' : 'Enhanced Efficiency'}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    {localeParam === 'nl' ? 
                      'Automatiseer processen en verkort reactietijden voor betere service en hogere productiviteit.' : 
                      'Automate processes and reduce response times for better service and higher productivity.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {localeParam === 'nl' ? 'Aan de slag' : 'Get started'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {localeParam === 'nl' ? 
                    'Klaar om uw organisatie te transformeren met AI? Ontdek onze assistenten of neem contact op voor een gepersonaliseerde demo.' : 
                    'Ready to transform your organization with AI? Explore our assistants or contact us for a personalized demo.'}
                </p>
                
                <Button asChild variant="gradient" size="lg" className="w-full mb-4">
                  <Link href={`/${localeParam}/wizard`} className="flex items-center justify-center">
                    {localeParam === 'nl' ? 'Ontdek de wizard' : 'Explore the wizard'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href={`/${localeParam}/contact`}>
                    {localeParam === 'nl' ? 'Neem contact op' : 'Contact us'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Use Cases Section */}
        <Section 
          title={localeParam === 'nl' ? "Toepassingen" : "Use Cases"} 
          description={localeParam === 'nl' ? `Ontdek hoe AI-assistenten ${organization.name.toLowerCase()} kunnen transformeren` : `Discover how AI assistants can transform ${organization.name.toLowerCase()}`}
          tinted
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {orgUseCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {localeParam === 'nl' ? 'Voordelen' : 'Benefits'}
                  </h4>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="rounded-full bg-green-100 p-1 mt-0.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>
        
        {/* Available Assistants Section */}
        <Section 
          title={localeParam === 'nl' ? "Beschikbare assistenten" : "Available assistants"} 
          description={localeParam === 'nl' ? `Ontdek onze AI-assistenten speciaal ontworpen voor ${organization.name.toLowerCase()}` : `Discover our AI assistants specially designed for ${organization.name.toLowerCase()}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {organization.assistants.map((assistant) => (
              <Link
                key={assistant.id}
                href={`/${localeParam}/organization/${typeParam}/assistant/${assistant.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <Image 
                    src={assistant.image || `/images/${assistant.id}.jpg`}
                    alt={assistant.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{assistant.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{assistant.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-600">
                      {localeParam === 'nl' ? 'Meer details' : 'View details'}
                    </span>
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
        
        {/* CTA Section */}
        <Section tinted>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg py-10 px-6 sm:px-10 md:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {localeParam === 'nl' ? 
                `Klaar om ${organization.name} te transformeren met AI?` : 
                `Ready to transform ${organization.name} with AI?`}
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              {localeParam === 'nl' ? 
                'Neem vandaag nog contact met ons op voor een gepersonaliseerde demo of doorloop onze configuratiewizard om uw eigen AI-assistent samen te stellen.' : 
                'Contact us today for a personalized demo or go through our configuration wizard to build your own AI assistant.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="default" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href={`/${localeParam}/contact`}>
                  {localeParam === 'nl' ? 'Neem contact op' : 'Contact us'}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href={`/${localeParam}/wizard`}>
                  {localeParam === 'nl' ? 'Start de configuratie' : 'Start configuration'}
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      </MainLayout>
    </NextIntlClientProvider>
  );
}

// Helper functie om use cases te krijgen voor een specifiek type organisatie
function getUseCases(organizationType: string, locale: string) {
  // Terugvallen op een standaard array als useCasesData niet bestaat
  const useCases = getUseCasesForType(organizationType);
  
  return useCases.map(useCase => {
    return {
      title: useCase.title,
      description: useCase.description,
      benefits: useCase.benefits
    };
  });
}

// Helper functie om use cases op te halen op basis van organisatietype
function getUseCasesForType(type: string) {
  switch (type) {
    case 'hotel':
      return [
        {
          title: "24/7 guest support",
          description: "Provide instant responses to guest inquiries and requests at any time of day.",
          benefits: [
            "Reduce front desk workload by up to 40%",
            "Improve guest satisfaction scores",
            "Handle multiple inquiries simultaneously"
          ]
        },
        {
          title: "Streamlined booking process",
          description: "Simplify the reservation flow and maximize occupancy rates.",
          benefits: [
            "Increase direct bookings by up to 25%",
            "Reduce booking abandonment rates",
            "Personalized room recommendations"
          ]
        },
        {
          title: "Revenue enhancement",
          description: "Intelligently upsell services and experiences to guests.",
          benefits: [
            "Increase average guest spend by 15-30%",
            "Promote in-house amenities effectively",
            "Personalized recommendations based on guest preferences"
          ]
        },
        {
          title: "Operational efficiency",
          description: "Streamline internal processes and staff communication.",
          benefits: [
            "Reduce response time to maintenance requests",
            "Streamline housekeeping schedules",
            "Improve interdepartmental communication"
          ]
        }
      ];
    case 'municipality':
      return [
        {
          title: "Citizen information services",
          description: "Provide accurate information about municipal services, procedures, and events.",
          benefits: [
            "Reduce call center volume by up to 45%",
            "Available 24/7 to answer common questions",
            "Support in multiple languages for diverse communities"
          ]
        },
        {
          title: "Application & permit processing",
          description: "Guide citizens through permit applications and administrative procedures.",
          benefits: [
            "Reduce application errors by up to 60%",
            "Shorter processing times",
            "Step-by-step guidance through complex procedures"
          ]
        },
        {
          title: "Complaint management",
          description: "Efficiently handle and route citizen complaints to appropriate departments.",
          benefits: [
            "Faster response to critical issues",
            "Improved tracking and follow-up",
            "Better citizen satisfaction with issue resolution"
          ]
        },
        {
          title: "Community engagement",
          description: "Increase citizen participation in local governance and community events.",
          benefits: [
            "Higher awareness of community initiatives",
            "Increased attendance at public meetings",
            "More inclusive civic participation"
          ]
        }
      ];
    default:
      return [
        {
          title: "Operational efficiency",
          description: "Streamline processes and reduce manual workload across your organization.",
          benefits: [
            "Reduce administrative tasks by up to 40%",
            "Faster response times to inquiries",
            "More consistent service delivery"
          ]
        },
        {
          title: "Enhanced customer experience",
          description: "Provide 24/7 support and personalized service to your customers.",
          benefits: [
            "Increase customer satisfaction scores",
            "Reduce wait times for support",
            "More personalized interactions"
          ]
        }
      ];
  }
} 