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
import { getTranslations } from "next-intl/server";

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

  // Haal vertalingen op
  const t = await getTranslations({ locale: localeParam, namespace: 'organization' });

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
                {t('overview')}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {localeParam === 'nl' ? 
                  `AI-assistenten zijn niet meer weg te denken uit de moderne ${organization.name.toLowerCase()}. The Next Wilson biedt gespecialiseerde AI-oplossingen die zijn afgestemd op de unieke behoeften van uw organisatie en zorgen voor efficiëntie, creativiteit en betere resultaten.` : 
                  `AI assistants have become an integral part of modern ${organization.name.toLowerCase()}. The Next Wilson offers specialized AI solutions tailored to the unique needs of your organization, ensuring efficiency, creativity, and better outcomes.`}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('keyAdvantages')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {t('timeSavings')}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    {t('timeSavingsDesc')}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {t('secureCompliant')}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    {t('secureCompliantDesc')}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {t('easyIntegration')}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    {t('easyIntegrationDesc')}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ZapIcon className="h-4 w-4 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {t('enhancedEfficiency')}
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    {t('enhancedEfficiencyDesc')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('getStarted')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('getStartedDesc')}
                </p>
                
                <Button asChild variant="gradient" size="lg" className="w-full mb-4">
                  <Link href={`/${localeParam}/wizard`} className="flex items-center justify-center">
                    {t('exploreWizard')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href={`/${localeParam}/contact`}>
                    {t('contactUs')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Use Cases Section */}
        <Section 
          title={t('useCasesTitle')}
          description={`${t('useCasesDesc')} ${organization.name.toLowerCase()}`}
          tinted
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {orgUseCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t('benefitsTitle')}
                  </h4>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-600">{benefit}</span>
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
          title={t('availableAssistantsTitle')} 
          description={`${t('availableAssistantsDesc')} ${organization.name.toLowerCase()}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {organization.assistants.map((assistant) => (
              <Link 
                key={assistant.id}
                href={`/${localeParam}/organization/${organization.id}/assistant/${assistant.id}`}
                className="group block"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all duration-200 h-full group-hover:shadow-md">
                  <div className="h-48 overflow-hidden relative">
                    <Image 
                      src={assistant.image || `/images/${assistant.id}.jpg`}
                      alt={assistant.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {localeParam === 'nl' && assistant.nameNL ? assistant.nameNL : assistant.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {localeParam === 'nl' && assistant.descriptionNL ? assistant.descriptionNL : assistant.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-600">{t('viewDetails')}</span>
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                    </div>
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
              {t('readyTransform')} {organization.name}?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              {t('contactDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="default" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href={`/${localeParam}/contact`}>
                  {t('contactUs')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href={`/${localeParam}/wizard`}>
                  {t('startConfig')}
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
  const useCases = getUseCasesForType(organizationType, locale);
  
  return useCases.map(useCase => {
    return {
      title: useCase.title,
      description: useCase.description,
      benefits: useCase.benefits
    };
  });
}

// Helper functie om use cases op te halen op basis van organisatietype
function getUseCasesForType(type: string, locale: string) {
  const isNL = locale === 'nl';
  
  switch (type) {
    case 'hotel':
      return [
        {
          title: isNL ? "24/7 ondersteuning voor gasten" : "24/7 guest support",
          description: isNL 
            ? "Bied directe reacties op vragen en verzoeken van gasten op elk moment van de dag."
            : "Provide instant responses to guest inquiries and requests at any time of day.",
          benefits: isNL
            ? [
                "Verlaag de werkdruk bij de receptie met tot 40%",
                "Verbeter de tevredenheidsscores van gasten",
                "Handel meerdere vragen tegelijkertijd af"
              ]
            : [
                "Reduce front desk workload by up to 40%",
                "Improve guest satisfaction scores",
                "Handle multiple inquiries simultaneously"
              ]
        },
        {
          title: isNL ? "Gestroomlijnd boekingsproces" : "Streamlined booking process",
          description: isNL
            ? "Vereenvoudig het reserveringsproces en maximaliseer de bezettingsgraad."
            : "Simplify the reservation flow and maximize occupancy rates.",
          benefits: isNL
            ? [
                "Verhoog directe boekingen met tot 25%",
                "Verminder afgebroken boekingen",
                "Gepersonaliseerde kameraanbevelingen"
              ]
            : [
                "Increase direct bookings by up to 25%",
                "Reduce booking abandonment rates",
                "Personalized room recommendations"
              ]
        },
        {
          title: isNL ? "Omzetverhoging" : "Revenue enhancement",
          description: isNL
            ? "Verkoop op intelligente wijze aanvullende diensten en ervaringen aan gasten."
            : "Intelligently upsell services and experiences to guests.",
          benefits: isNL
            ? [
                "Verhoog de gemiddelde besteding per gast met 15-30%",
                "Promoot interne faciliteiten effectief",
                "Gepersonaliseerde aanbevelingen op basis van voorkeuren van gasten"
              ]
            : [
                "Increase average guest spend by 15-30%",
                "Promote in-house amenities effectively",
                "Personalized recommendations based on guest preferences"
              ]
        },
        {
          title: isNL ? "Operationele efficiëntie" : "Operational efficiency",
          description: isNL
            ? "Stroomlijn interne processen en communicatie tussen personeel."
            : "Streamline internal processes and staff communication.",
          benefits: isNL
            ? [
                "Verminder reactietijd op onderhoudsverzoeken",
                "Optimaliseer schoonmaakschema's",
                "Verbeter communicatie tussen afdelingen"
              ]
            : [
                "Reduce response time to maintenance requests",
                "Streamline housekeeping schedules",
                "Improve interdepartmental communication"
              ]
        }
      ];
    case 'municipality':
      return [
        {
          title: isNL ? "Informatiediensten voor burgers" : "Citizen information services",
          description: isNL
            ? "Bied nauwkeurige informatie over gemeentelijke diensten, procedures en evenementen."
            : "Provide accurate information about municipal services, procedures, and events.",
          benefits: isNL
            ? [
                "Verminder het volume van het callcenter met tot 45%",
                "24/7 beschikbaar om veelgestelde vragen te beantwoorden",
                "Ondersteuning in meerdere talen voor diverse gemeenschappen"
              ]
            : [
                "Reduce call center volume by up to 45%",
                "Available 24/7 to answer common questions",
                "Support in multiple languages for diverse communities"
              ]
        },
        {
          title: isNL ? "Aanvraag- & vergunningverwerking" : "Application & permit processing",
          description: isNL
            ? "Begeleid burgers bij vergunningsaanvragen en administratieve procedures."
            : "Guide citizens through permit applications and administrative procedures.",
          benefits: isNL
            ? [
                "Verminder aanvraagfouten met tot 60%",
                "Kortere verwerkingstijden",
                "Stapsgewijze begeleiding door complexe procedures"
              ]
            : [
                "Reduce application errors by up to 60%",
                "Shorter processing times",
                "Step-by-step guidance through complex procedures"
              ]
        },
        {
          title: isNL ? "Klachtenbeheer" : "Complaint management",
          description: isNL
            ? "Behandel en routeer klachten van burgers efficiënt naar de juiste afdelingen."
            : "Efficiently handle and route citizen complaints to appropriate departments.",
          benefits: isNL
            ? [
                "Snellere reactie op kritieke problemen",
                "Verbeterde tracking en follow-up",
                "Hogere burgertevredenheid bij probleemoplossing"
              ]
            : [
                "Faster response to critical issues",
                "Improved tracking and follow-up",
                "Better citizen satisfaction with issue resolution"
              ]
        },
        {
          title: isNL ? "Gemeenschapsbetrokkenheid" : "Community engagement",
          description: isNL
            ? "Vergroot de participatie van burgers in lokaal bestuur en gemeenschapsevenementen."
            : "Increase citizen participation in local governance and community events.",
          benefits: isNL
            ? [
                "Meer bewustzijn van gemeenschapsinitiatieven",
                "Verhoogde aanwezigheid bij openbare bijeenkomsten",
                "Meer inclusieve burgerparticipatie"
              ]
            : [
                "Higher awareness of community initiatives",
                "Increased attendance at public meetings",
                "More inclusive civic participation"
              ]
        }
      ];
    default:
      return [
        {
          title: isNL ? "Operationele efficiëntie" : "Operational efficiency",
          description: isNL
            ? "Stroomlijn processen en verminder handmatige werkdruk in uw hele organisatie."
            : "Streamline processes and reduce manual workload across your organization.",
          benefits: isNL
            ? [
                "Verminder administratieve taken met tot 40%",
                "Snellere reactietijden op vragen",
                "Meer consistente dienstverlening"
              ]
            : [
                "Reduce administrative tasks by up to 40%",
                "Faster response times to inquiries",
                "More consistent service delivery"
              ]
        },
        {
          title: isNL ? "Verbeterde klantervaring" : "Enhanced customer experience",
          description: isNL
            ? "Bied 24/7 ondersteuning en gepersonaliseerde service aan uw klanten."
            : "Provide 24/7 support and personalized service to your customers.",
          benefits: isNL
            ? [
                "Verhoog klanttevredenheidsscores",
                "Verkort wachttijden voor ondersteuning",
                "Meer persoonlijke interacties"
              ]
            : [
                "Increase customer satisfaction scores",
                "Reduce wait times for support",
                "More personalized interactions"
              ]
        }
      ];
  }
} 