"use client";

import { useState } from "react";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { organizationTypes } from "@/app/data/mockData";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { NextIntlClientProvider } from 'next-intl';
import { useTranslations } from "next-intl";
import { use } from 'react';
import { Module, ModuleCategory } from "@/app/types";
import { Radio } from "@/app/components/ui/radio";
import { Label } from "@/app/components/ui/label";
import { Shield, Database, Server, MessageSquare, Activity, Globe } from "lucide-react";
import { getIcon } from "@/app/lib/utils";

interface IntakePageProps {
  params: {
    type: string;
    id: string;
    locale: string;
  };
}

export default function IntakePage({ params }: IntakePageProps) {
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
  
  const router = useRouter();
  
  // State voor de stappen van het intake proces
  const [currentStep, setCurrentStep] = useState(0);
  
  // Verkrijg modules gegroepeerd op categorie
  const modulesByCategory = assistant.modules.reduce((acc, module) => {
    const { category } = module;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(module);
    return acc;
  }, {} as Record<ModuleCategory, Module[]>);
  
  // Dynamisch stappen genereren op basis van aanwezige modulecategorieën
  const moduleSteps = Object.keys(modulesByCategory).map(category => ({
    title: locale === 'nl' ? `${category} Instellingen` : `${category} Settings`,
    description: locale === 'nl'
      ? `Geef aan hoe u de ${category.toLowerCase()} functionaliteit wilt gebruiken`
      : `Indicate how you want to use the ${category.toLowerCase()} functionality`
  }));
  
  // Basis stappen + module stappen + bevestiging stap
  const steps = [
    {
      title: locale === 'nl' ? 'Welkom bij het intake proces' : 'Welcome to the intake process',
      description: locale === 'nl' 
        ? `We gaan ${assistant.name} aanpassen aan uw behoeften. Dit is het klantgerichte deel waarin we uw wensen inventariseren.`
        : `We're going to customize ${assistant.name} to meet your needs. This is the customer-focused part where we identify your requirements.`
    },
    {
      title: locale === 'nl' ? 'Doelen & Verwachtingen' : 'Goals & Expectations',
      description: locale === 'nl'
        ? 'Wat wilt u bereiken met deze AI-assistent? Waar gaat u hem voor gebruiken?'
        : 'What do you want to achieve with this AI assistant? What will you use it for?'
    },
    {
      title: locale === 'nl' ? 'Gebruikerscontext' : 'User Context',
      description: locale === 'nl'
        ? 'Wie zijn de gebruikers van de assistent? Welke rollen hebben zij in uw organisatie?'
        : 'Who are the users of the assistant? What roles do they have in your organization?'
    },
    ...moduleSteps,
    {
      title: locale === 'nl' ? 'Integraties & Systemen' : 'Integrations & Systems',
      description: locale === 'nl'
        ? 'Met welke bestaande systemen moet de assistent integreren?'
        : 'Which existing systems should the assistant be integrated with?'
    },
    {
      title: locale === 'nl' ? 'Bevestiging' : 'Confirmation',
      description: locale === 'nl'
        ? 'Bevestig uw voorkeuren voordat we het technische configuratieproces starten.'
        : 'Confirm your preferences before we start the technical configuration process.'
    }
  ];
  
  // Uitgebreide state voor de antwoorden van de gebruiker met modulekeuzes
  const [answers, setAnswers] = useState({
    goals: '',
    users: '',
    integrations: '',
    modules: Object.keys(modulesByCategory).reduce((acc, category) => {
      modulesByCategory[category as ModuleCategory].forEach(module => {
        acc[module.id] = {
          enabled: module.isRequired || module.defaultEnabled,
          preferences: ''
        };
      });
      return acc;
    }, {} as Record<string, { enabled: boolean; preferences: string }>)
  });
  
  // Handleiding voor het bijwerken van antwoorden
  const handleAnswerChange = (field: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handler voor het bijwerken van module-specifieke antwoorden
  const handleModuleAnswerChange = (moduleId: string, field: 'enabled' | 'preferences', value: boolean | string) => {
    setAnswers(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          [field]: value
        }
      }
    }));
  };
  
  // Ga naar de volgende stap
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Laatste stap - verzend gegevens en ga naar bedanktpagina
      handleSubmit();
    }
  };
  
  // Ga naar de vorige stap
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Verzend het formulier bij de laatste stap
  const handleSubmit = () => {
    console.log('Intake proces voltooid met antwoorden:', answers);
    // Redirect naar bedanktpagina
    router.push(`/${locale}/organization/${type}/assistant/${id}/intake/thank-you`);
  };
  
  // Helper functie om het juiste pictogram voor een modulecategorie te verkrijgen
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
  
  // Render de huidige stap van het intake proces
  const renderStepContent = () => {
    // Basisstappen: 0 (welkom), 1 (doelen), 2 (gebruikers)
    if (currentStep === 0) {
      return (
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
            <Info className="h-10 w-10 text-blue-600" />
          </div>
          <Image 
            src="/images/intake-wizard.jpg"
            alt="Intake process"
            width={600}
            height={400}
            className="rounded-lg shadow-md mb-6 mx-auto"
          />
          <p className="text-lg text-gray-600 mb-6">
            {locale === 'nl' 
              ? `Dit intake proces is ontworpen om uw behoeften te begrijpen, zodat wij ${assistant.name} perfect kunnen aanpassen aan uw organisatie.`
              : `This intake process is designed to understand your needs, so we can perfectly customize ${assistant.name} for your organization.`}
          </p>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-left mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              {locale === 'nl' ? 'Hoe werkt het?' : 'How does it work?'}
            </h3>
            <ol className="list-decimal ml-5 space-y-2 text-blue-800">
              <li>{locale === 'nl' ? 'U beantwoordt enkele eenvoudige vragen over uw behoeften' : 'You answer a few simple questions about your needs'}</li>
              <li>{locale === 'nl' ? 'Ons team configureert de assistent op basis van uw antwoorden' : 'Our team configures the assistant based on your answers'}</li>
              <li>{locale === 'nl' ? 'U krijgt een perfecte assistent die klaar is voor gebruik' : 'You get a perfect assistant ready to use'}</li>
              <li>{locale === 'nl' ? 'Wij bieden ondersteuning bij de implementatie' : 'We provide support with implementation'}</li>
            </ol>
          </div>
        </div>
      );
    } else if (currentStep === 1) { // Doelen
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === 'nl' ? 'Wat zijn uw doelen?' : 'What are your goals?'}
          </h3>
          <p className="text-gray-600 mb-6">
            {locale === 'nl' 
              ? 'Beschrijf in uw eigen woorden wat u wilt bereiken met deze AI-assistent.'
              : 'Describe in your own words what you want to achieve with this AI assistant.'}
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={locale === 'nl' ? 'Bijv. we willen 24/7 klantenservice bieden, administratieve taken automatiseren...' : 'E.g. we want to provide 24/7 customer service, automate administrative tasks...'}
            value={answers.goals}
            onChange={(e) => handleAnswerChange('goals', e.target.value)}
          />
        </div>
      );
    } else if (currentStep === 2) { // Gebruikerscontext
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === 'nl' ? 'Wie gaat de assistent gebruiken?' : 'Who will use the assistant?'}
          </h3>
          <p className="text-gray-600 mb-6">
            {locale === 'nl'
              ? 'Beschrijf de verschillende typen gebruikers en hun rollen binnen uw organisatie.'
              : 'Describe the different types of users and their roles within your organization.'}
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={locale === 'nl' ? 'Bijv. klantenservicemedewerkers, managers, klanten...' : 'E.g. customer service agents, managers, customers...'}
            value={answers.users}
            onChange={(e) => handleAnswerChange('users', e.target.value)}
          />
        </div>
      );
    } else if (currentStep === steps.length - 2) { // Integraties (voorlaatste stap)
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === 'nl' ? 'Welke systemen gebruikt u?' : 'Which systems do you use?'}
          </h3>
          <p className="text-gray-600 mb-6">
            {locale === 'nl'
              ? 'Met welke bestaande systemen moet de assistent geïntegreerd worden?'
              : 'Which existing systems should the assistant be integrated with?'}
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={locale === 'nl' ? 'Bijv. CRM-systeem, kennisinformatie, interne databases...' : 'E.g. CRM system, knowledge information, internal databases...'}
            value={answers.integrations}
            onChange={(e) => handleAnswerChange('integrations', e.target.value)}
          />
        </div>
      );
    } else if (currentStep === steps.length - 1) { // Bevestiging (laatste stap)
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === 'nl' ? 'Bevestig uw informatie' : 'Confirm your information'}
          </h3>
          <p className="text-gray-600 mb-6">
            {locale === 'nl'
              ? 'Controleer uw antwoorden voordat u ze indient.'
              : 'Review your answers before submitting.'}
          </p>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'nl' ? 'Doelen & Verwachtingen' : 'Goals & Expectations'}
                </h4>
                <p className="text-gray-600 whitespace-pre-line">{answers.goals || (locale === 'nl' ? '(Niet ingevuld)' : '(Not provided)')}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'nl' ? 'Gebruikers' : 'Users'}
                </h4>
                <p className="text-gray-600 whitespace-pre-line">{answers.users || (locale === 'nl' ? '(Niet ingevuld)' : '(Not provided)')}</p>
              </CardContent>
            </Card>
            
            {/* Module-specifieke antwoorden */}
            {Object.entries(modulesByCategory).map(([category, modules]) => (
              <Card key={category}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      {getCategoryIcon(category as ModuleCategory)}
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {category}
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    {modules.map(module => (
                      <div key={module.id} className="border-b border-gray-100 pb-2 mb-2 last:border-0">
                        <div className="flex items-start">
                          <div className="w-6 flex-shrink-0 pt-1">
                            {answers.modules[module.id]?.enabled ? 
                              <CheckCircle className="h-4 w-4 text-green-500" /> :
                              <span className="h-4 w-4 block rounded-full bg-gray-200"></span>
                            }
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{module.name}</p>
                            {answers.modules[module.id]?.preferences && (
                              <p className="text-sm text-gray-600 whitespace-pre-line mt-1">
                                {answers.modules[module.id].preferences}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'nl' ? 'Integraties & Systemen' : 'Integrations & Systems'}
                </h4>
                <p className="text-gray-600 whitespace-pre-line">{answers.integrations || (locale === 'nl' ? '(Niet ingevuld)' : '(Not provided)')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else {
      // Module-specifieke stappen
      // Bereken welke modulecategorie we nu behandelen
      const moduleStepIndex = currentStep - 3; // Na welkom, doelen en gebruikers
      const moduleCategories = Object.keys(modulesByCategory);
      const currentCategory = moduleCategories[moduleStepIndex];
      
      return (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              {getCategoryIcon(currentCategory as ModuleCategory)}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {currentCategory}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            {locale === 'nl'
              ? `Geef aan welke ${currentCategory.toLowerCase()} functionaliteit u nodig heeft`
              : `Indicate which ${currentCategory.toLowerCase()} functionality you need`}
          </p>
          
          <div className="space-y-8">
            {modulesByCategory[currentCategory as ModuleCategory].map((module) => {
              const ModuleIcon = getIcon(module.icon);
              const isModuleEnabled = answers.modules[module.id]?.enabled;
              
              // Genereer relevante vragen op basis van de modulecategorie
              let moduleQuestion = "";
              let modulePlaceholder = "";
              
              switch(module.category) {
                case ModuleCategory.Authentication:
                  moduleQuestion = locale === 'nl' 
                    ? 'Hoe willen gebruikers zich identificeren? Welke beveiligingseisen heeft u?'
                    : 'How do you want users to identify themselves? What security requirements do you have?';
                  modulePlaceholder = locale === 'nl'
                    ? 'Bijv. inloggen met bedrijfse-mail, interne systemen, multi-factor authenticatie...'
                    : 'E.g. login with company email, internal systems, multi-factor authentication...';
                  break;
                  
                case ModuleCategory.Security:
                  moduleQuestion = locale === 'nl'
                    ? 'Welke beveiligingsniveaus heeft u nodig? Zijn er specifieke privacyvereisten?'
                    : 'What security levels do you need? Are there specific privacy requirements?';
                  modulePlaceholder = locale === 'nl'
                    ? 'Bijv. data moet worden geanonimiseerd, voldoen aan AVG, ISO certificeringen...'
                    : 'E.g. data must be anonymized, comply with GDPR, ISO certifications...';
                  break;
                  
                case ModuleCategory.Integration:
                  moduleQuestion = locale === 'nl'
                    ? 'Hoe wilt u dit koppelen met uw huidige systemen?'
                    : 'How do you want to connect this with your current systems?';
                  modulePlaceholder = locale === 'nl'
                    ? 'Bijv. API koppelingen, SSO integratie, specifieke databronnen...'
                    : 'E.g. API connections, SSO integration, specific data sources...';
                  break;
                  
                case ModuleCategory.Communication:
                  moduleQuestion = locale === 'nl'
                    ? 'Hoe moet de assistent communiceren met gebruikers?'
                    : 'How should the assistant communicate with users?';
                  modulePlaceholder = locale === 'nl'
                    ? 'Bijv. chat widget op website, integratie met Teams of Slack, email...'
                    : 'E.g. chat widget on website, integration with Teams or Slack, email...';
                  break;
                  
                case ModuleCategory.Knowledge:
                  moduleQuestion = locale === 'nl'
                    ? 'Welke informatiebronnen moet de assistent gebruiken?'
                    : 'What information sources should the assistant use?';
                  modulePlaceholder = locale === 'nl'
                    ? 'Bijv. interne documenten, website content, kennisbank, FAQs...'
                    : 'E.g. internal documents, website content, knowledge base, FAQs...';
                  break;
                  
                case ModuleCategory.Reporting:
                  moduleQuestion = locale === 'nl'
                    ? 'Welke inzichten wilt u verkrijgen uit rapportages?'
                    : 'What insights do you want to gain from reporting?';
                  modulePlaceholder = locale === 'nl'
                    ? 'Bijv. gebruiksstatistieken, veelgestelde vragen, klanttevredenheid...'
                    : 'E.g. usage statistics, frequently asked questions, customer satisfaction...';
                  break;
                  
                default:
                  moduleQuestion = locale === 'nl'
                    ? 'Heeft u specifieke wensen voor deze functionaliteit?'
                    : 'Do you have specific requirements for this functionality?';
                  modulePlaceholder = locale === 'nl'
                    ? 'Beschrijf uw wensen hier...'
                    : 'Describe your requirements here...';
              }
              
              return (
                <div key={module.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <ModuleIcon className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-lg font-medium text-gray-900 mr-2">{module.name}</h4>
                        {module.isRequired && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {locale === 'nl' ? 'Vereist' : 'Required'}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">{module.description}</p>
                    </div>
                  </div>
                  
                  {!module.isRequired && (
                    <div className="mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`${module.id}-yes`}
                            name={`enable-${module.id}`}
                            className="h-4 w-4 text-blue-600"
                            checked={isModuleEnabled}
                            onChange={() => handleModuleAnswerChange(module.id, 'enabled', true)}
                          />
                          <label htmlFor={`${module.id}-yes`} className="text-sm text-gray-700">
                            {locale === 'nl' ? 'Ja, inschakelen' : 'Yes, enable'}
                          </label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`${module.id}-no`}
                            name={`enable-${module.id}`}
                            className="h-4 w-4 text-blue-600"
                            checked={!isModuleEnabled}
                            onChange={() => handleModuleAnswerChange(module.id, 'enabled', false)}
                          />
                          <label htmlFor={`${module.id}-no`} className="text-sm text-gray-700">
                            {locale === 'nl' ? 'Nee, niet nodig' : 'No, not needed'}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(isModuleEnabled || module.isRequired) && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">{moduleQuestion}</p>
                      <textarea
                        className="w-full border border-gray-300 rounded-md p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={modulePlaceholder}
                        value={answers.modules[module.id]?.preferences || ''}
                        onChange={(e) => handleModuleAnswerChange(module.id, 'preferences', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayout>
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 py-4">
            <Link 
              href={`/${locale}/organization/${type}/assistant/${id}`} 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {locale === 'nl' ? 'Terug naar assistent details' : 'Back to assistant details'}
            </Link>
          </div>
        </div>
        
        <Section className="py-8">
          <div className="max-w-3xl mx-auto">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
                <div className="text-sm text-gray-500">
                  {locale === 'nl' ? 'Stap' : 'Step'} {currentStep + 1} / {steps.length}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Current step content */}
            {renderStepContent()}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-10">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
              >
                {locale === 'nl' ? 'Vorige' : 'Previous'}
              </Button>
              
              <Button
                variant="gradient"
                onClick={handleNextStep}
                className="flex items-center"
              >
                {currentStep === steps.length - 1 
                  ? (locale === 'nl' ? 'Verzenden' : 'Submit') 
                  : (locale === 'nl' ? 'Volgende' : 'Next')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Section>
      </MainLayout>
    </NextIntlClientProvider>
  );
} 