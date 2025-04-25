"use client";

import { useEffect, useRef, useState } from "react";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { organizationTypes } from "@/app/data/mockData";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from 'next-intl';
import Link from "next/link";
import { ArrowLeft, Database, BrainCircuit, ArrowRightLeft, MessageSquare, FileText, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import React from "react";
import { getIcon } from "@/app/lib/utils";

interface CollaborationPageProps {
  params: {
    type: string;
    locale: string;
  };
}

export default function CollaborationPage({ params }: CollaborationPageProps) {
  const unwrappedParams = React.use(params);
  const { type, locale } = unwrappedParams;
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  
  // Haal de organisatie op
  const organization = organizationTypes.find((org) => org.id === type);
  if (!organization) {
    notFound();
  }

  // Controleer of de organisatie assistenten heeft
  if (!organization.assistants || organization.assistants.length === 0) {
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
  
  // Genereer dataFlows op basis van de assistenten
  const generateDataFlows = () => {
    const flows = [];
    const assistants = organization.assistants || [];
    
    // Elke assistant krijgt een verbinding met de kennisbank
    assistants.forEach(assistant => {
      flows.push({
        from: "rag-knowledge-base",
        to: assistant.id,
        label: locale === 'nl' ? "Kennisoverdracht" : "Knowledge transfer"
      });
    });
    
    // Voeg horizontale verbindingen toe tussen assistenten
    for (let i = 0; i < assistants.length; i++) {
      for (let j = i + 1; j < assistants.length; j++) {
        flows.push({
          from: assistants[i].id,
          to: assistants[j].id,
          label: locale === 'nl' ? "Gegevensuitwisseling" : "Data exchange"
        });
      }
    }
    
    return flows;
  };
  
  const dataFlows = generateDataFlows();
  
  useEffect(() => {
    // In een echte implementatie zou je hier een visualisatie library zoals react-flow of D3.js gebruiken
    // Dit is een simulatie van het tekenen van verbindingen
    if (containerRef.current) {
      const canvas = document.createElement('canvas');
      const container = containerRef.current;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1';
      
      container.appendChild(canvas);
      
      return () => {
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      };
    }
  }, []);
  
  const toggleExpand = (id: string) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  // Functie om de positie van een assistent in de visualisatie te bepalen
  const getAssistantPosition = (index: number, total: number) => {
    if (total === 1) {
      return { top: '20%', left: '50%', transform: 'translateX(-50%)' };
    }
    
    if (total === 2) {
      return index === 0 
        ? { top: '20%', left: '25%' }
        : { top: '20%', right: '25%' };
    }
    
    if (total === 3) {
      if (index === 0) return { top: '20%', left: '20%' };
      if (index === 1) return { top: '20%', right: '20%' };
      return { bottom: '20%', left: '50%', transform: 'translateX(-50%)' };
    }
    
    // Voor meer dan 3 assistenten, verdeel ze op een cirkel
    const angle = (2 * Math.PI * index) / total;
    const x = 40 + 30 * Math.cos(angle);
    const y = 40 + 30 * Math.sin(angle);
    
    return { top: `${y}%`, left: `${x}%` };
  };

  // Functie om een kleur te bepalen voor een assistent
  const getAssistantColor = (index: number) => {
    const colors = ['green', 'purple', 'amber', 'blue', 'rose', 'teal'];
    return colors[index % colors.length];
  };
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayout>
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 py-4">
            <Link 
              href={`/${locale}/organization/${type}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {locale === 'nl' ? 'Terug naar organisatie' : 'Back to organization'}
            </Link>
          </div>
        </div>
        
        <Section className="py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                {locale === 'nl' ? 'Assistent Samenwerking' : 'Assistant Collaboration'}
              </h1>
              <p className="text-gray-600">
                {locale === 'nl' 
                  ? `Visualisatie van hoe de ${organization.name} assistenten samenwerken met dezelfde kennisbank.`
                  : `Visualization of how the ${organization.name} assistants collaborate using the same knowledge base.`}
              </p>
            </div>
            
            <Tabs defaultValue="workflow" className="mb-8">
              <TabsList>
                <TabsTrigger value="workflow">{locale === 'nl' ? 'Workflow Weergave' : 'Workflow View'}</TabsTrigger>
                <TabsTrigger value="details">{locale === 'nl' ? 'Gedetailleerde Weergave' : 'Detailed View'}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="workflow" className="mt-4">
                <div className="border border-gray-200 rounded-lg bg-white p-8">
                  <div ref={containerRef} className="relative min-h-[600px]">
                    {/* Centrale RAG Kennisbank node */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6 shadow-md w-64 flex flex-col items-center">
                        <Database className="h-10 w-10 text-blue-600 mb-2" />
                        <h3 className="font-bold text-lg text-center text-blue-800">
                          {locale === 'nl' ? 'Gedeelde RAG Kennisbank' : 'Shared RAG Knowledge Base'}
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleExpand("rag-knowledge-base")}
                          className="mt-2"
                        >
                          {expanded === "rag-knowledge-base" ? (
                            <><ChevronUp className="h-4 w-4 mr-1" /> {locale === 'nl' ? 'Minder' : 'Less'}</>
                          ) : (
                            <><ChevronDown className="h-4 w-4 mr-1" /> {locale === 'nl' ? 'Meer' : 'More'}</>
                          )}
                        </Button>
                        
                        {expanded === "rag-knowledge-base" && (
                          <div className="mt-2 text-xs text-gray-600 text-center">
                            <p className="mb-1">{locale === 'nl' ? 'Bronnen:' : 'Sources:'}</p>
                            <ul className="text-left ml-4 list-disc">
                              <li>{locale === 'nl' ? 'Interne documenten' : 'Internal documents'}</li>
                              <li>{locale === 'nl' ? 'Domeinspecifieke database' : 'Domain-specific database'}</li>
                              <li>{locale === 'nl' ? 'Klantgegevens' : 'Client data'}</li>
                              <li>{locale === 'nl' ? 'Marktgegevens' : 'Market data'}</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Dynamische assistenten nodes */}
                    {organization.assistants.map((assistant, index) => {
                      const position = getAssistantPosition(index, organization.assistants.length);
                      const color = getAssistantColor(index);
                      
                      return (
                        <div 
                          key={assistant.id}
                          className="absolute" 
                          style={position as React.CSSProperties}
                        >
                          <div className={`bg-${color}-50 border-2 border-${color}-400 rounded-lg p-4 shadow-md w-56`}>
                            <div className="flex items-center mb-2">
                              {assistant.modules && assistant.modules[0]?.icon ? (
                                React.createElement(getIcon(assistant.modules[0].icon), { 
                                  className: `h-6 w-6 text-${color}-600 mr-2` 
                                })
                              ) : (
                                <MessageSquare className={`h-6 w-6 text-${color}-600 mr-2`} />
                              )}
                              <h3 className={`font-bold text-${color}-800`}>
                                {locale === 'nl' ? assistant.nameNL : assistant.name}
                              </h3>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleExpand(assistant.id)}
                              className="mt-1 w-full flex justify-between items-center"
                            >
                              {expanded === assistant.id ? (
                                <><ChevronUp className="h-4 w-4" /> {locale === 'nl' ? 'Minder' : 'Less'}</>
                              ) : (
                                <><ChevronDown className="h-4 w-4" /> {locale === 'nl' ? 'Meer' : 'More'}</>
                              )}
                            </Button>
                            
                            {expanded === assistant.id && (
                              <div className="mt-2 text-xs text-gray-600">
                                <p className="mb-1">{locale === 'nl' ? 'Specialisatie:' : 'Specialization:'}</p>
                                <p>{locale === 'nl' ? assistant.descriptionNL : assistant.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Simulatie van verbindingslijnen - in een echte implementatie zou je een visualisatie library gebruiken */}
                    <div className="absolute inset-0 z-0">
                      <svg width="100%" height="100%" className="absolute">
                        {organization.assistants.length === 2 && (
                          <>
                            <path d="M320,150 L480,300" className="stroke-blue-300 stroke-2 fill-none" strokeDasharray="5,5" />
                            <path d="M740,150 L480,300" className="stroke-purple-300 stroke-2 fill-none" strokeDasharray="5,5" />
                            <path d="M320,150 L740,150" className="stroke-green-300 stroke-2 fill-none" strokeDasharray="5,5" />
                          </>
                        )}
                        {organization.assistants.length === 3 && (
                          <>
                            <path d="M320,150 L480,300" className="stroke-blue-300 stroke-2 fill-none" strokeDasharray="5,5" />
                            <path d="M740,150 L480,300" className="stroke-purple-300 stroke-2 fill-none" strokeDasharray="5,5" />
                            <path d="M480,450 L480,300" className="stroke-amber-300 stroke-2 fill-none" strokeDasharray="5,5" />
                            <path d="M320,150 L740,150" className="stroke-green-300 stroke-2 fill-none" strokeDasharray="5,5" />
                            <path d="M320,150 L480,450" className="stroke-green-300 stroke-2 fill-none" strokeDasharray="5,5" />
                            <path d="M740,150 L480,450" className="stroke-purple-300 stroke-2 fill-none" strokeDasharray="5,5" />
                          </>
                        )}
                      </svg>
                    </div>
                    
                    {/* Legenda */}
                    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                      <div className="text-sm font-medium mb-2">{locale === 'nl' ? 'Legenda' : 'Legend'}</div>
                      <div className="flex items-center text-xs mb-1">
                        <div className="w-4 h-0 border-t-2 border-blue-300 border-dashed mr-2"></div>
                        <span>{locale === 'nl' ? 'Kennisuitwisseling' : 'Knowledge exchange'}</span>
                      </div>
                      <div className="flex items-center text-xs mb-1">
                        <div className="w-4 h-0 border-t-2 border-green-300 mr-2"></div>
                        <span>{locale === 'nl' ? 'Gegevensuitwisseling' : 'Data exchange'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Database className="h-5 w-5 text-blue-600 mr-2" />
                        <CardTitle>{locale === 'nl' ? 'Gedeelde RAG Kennisbank' : 'Shared RAG Knowledge Base'}</CardTitle>
                      </div>
                      <CardDescription>
                        {locale === 'nl' 
                          ? 'Centrale kennisbank gebruikt door alle assistenten'
                          : 'Central knowledge base used by all assistants'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-1">{locale === 'nl' ? 'Bronnen' : 'Sources'}</h4>
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            <li>{locale === 'nl' ? 'Interne documentatie' : 'Internal documentation'}</li>
                            <li>{locale === 'nl' ? 'Domeinspecifieke database' : 'Domain-specific database'}</li>
                            <li>{locale === 'nl' ? 'Rapportages' : 'Reports'}</li>
                            <li>{locale === 'nl' ? 'Klantgegevens' : 'Client data'}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">{locale === 'nl' ? 'Functionaliteit' : 'Functionality'}</h4>
                          <p className="text-sm text-gray-600">
                            {locale === 'nl'
                              ? 'Vectordatabase voor semantisch zoeken, kennisextractie, en bijwerken van informatie.'
                              : 'Vector database for semantic search, knowledge extraction, and information updating.'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Dynamische assistent-kaarten */}
                  {organization.assistants.map((assistant, index) => {
                    const color = getAssistantColor(index);
                    const IconComponent = assistant.modules && assistant.modules[0]?.icon 
                      ? getIcon(assistant.modules[0].icon)
                      : MessageSquare;
                    
                    return (
                      <Card key={assistant.id}>
                        <CardHeader>
                          <div className="flex items-center">
                            {React.createElement(IconComponent, { 
                              className: `h-5 w-5 text-${color}-600 mr-2` 
                            })}
                            <CardTitle>{locale === 'nl' ? assistant.nameNL : assistant.name}</CardTitle>
                          </div>
                          <CardDescription>
                            {locale === 'nl' ? assistant.descriptionNL : assistant.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-sm mb-1">{locale === 'nl' ? 'Gegevensuitwisseling' : 'Data Exchange'}</h4>
                              <ul className="text-sm list-disc pl-5 space-y-1">
                                <li>
                                  <span className="font-medium">{locale === 'nl' ? 'Ontvangt van' : 'Receives from'}</span>: 
                                  <span className="text-blue-600 ml-1">{locale === 'nl' ? 'Kennisbank' : 'Knowledge Base'}</span> 
                                </li>
                                {organization.assistants
                                  .filter(a => a.id !== assistant.id)
                                  .map(otherAssistant => (
                                    <li key={`${assistant.id}-${otherAssistant.id}`}>
                                      <span className="font-medium">{locale === 'nl' ? 'Interactie met' : 'Interacts with'}</span>: 
                                      <span className="ml-1">{locale === 'nl' ? otherAssistant.nameNL : otherAssistant.name}</span>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                            {assistant.benefits && (
                              <div>
                                <h4 className="font-medium text-sm mb-1">{locale === 'nl' ? 'Voordelen' : 'Benefits'}</h4>
                                <ul className="text-sm list-disc pl-5 space-y-1">
                                  {(locale === 'nl' ? assistant.benefitsNL : assistant.benefits)
                                    .slice(0, 3)
                                    .map((benefit, i) => (
                                      <li key={i}>{benefit}</li>
                                    ))
                                  }
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-700 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">
                    {locale === 'nl' ? 'Hoe werkt de samenwerking?' : 'How does the collaboration work?'}
                  </h3>
                  <p className="text-blue-700 mb-4 text-sm">
                    {locale === 'nl' 
                      ? `De ${organization.name} assistenten werken samen door informatie te delen via een gedeelde RAG (Retrieval Augmented Generation) kennisbank. Dit zorgt voor consistente antwoorden en efficiënte kennisoverdracht tussen de assistenten.`
                      : `The ${organization.name} assistants collaborate by sharing information through a common RAG (Retrieval Augmented Generation) knowledge base. This ensures consistent answers and efficient knowledge transfer between assistants.`}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-md p-3 border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">
                        {locale === 'nl' ? 'Consistente kennisbasis' : 'Consistent knowledge base'}
                      </h4>
                      <p className="text-blue-600">
                        {locale === 'nl'
                          ? 'Alle assistenten gebruiken dezelfde informatiebron, waardoor tegenstrijdigheden worden vermeden.'
                          : 'All assistants use the same information source, eliminating contradictions.'}
                      </p>
                    </div>
                    <div className="bg-white rounded-md p-3 border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">
                        {locale === 'nl' ? 'Gespecialiseerde expertise' : 'Specialized expertise'}
                      </h4>
                      <p className="text-blue-600">
                        {locale === 'nl'
                          ? 'Elke assistent is geoptimaliseerd voor specifieke taken terwijl ze informatie delen.'
                          : 'Each assistant is optimized for specific tasks while sharing information.'}
                      </p>
                    </div>
                    <div className="bg-white rounded-md p-3 border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">
                        {locale === 'nl' ? 'Automatische updates' : 'Automatic updates'}
                      </h4>
                      <p className="text-blue-600">
                        {locale === 'nl'
                          ? 'Nieuwe informatie wordt automatisch beschikbaar voor alle assistenten.'
                          : 'New information automatically becomes available to all assistants.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </MainLayout>
    </NextIntlClientProvider>
  );
} 