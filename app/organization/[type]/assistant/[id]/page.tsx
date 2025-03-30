import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { organizationTypes } from "@/app/data/mockData";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, ArrowLeft, Activity, Database, MessageSquare, Shield, Server, Globe } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { ModuleCategory } from "@/app/types";
import { getIcon } from "@/app/lib/utils";
import Image from "next/image";

interface AssistantDetailPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function AssistantDetailPage({ params }: AssistantDetailPageProps) {
  const { type, id } = params;
  
  const organization = organizationTypes.find((org) => org.id === type);
  if (!organization) {
    notFound();
  }
  
  const assistant = organization.assistants.find((assistant) => assistant.id === id);
  if (!assistant) {
    notFound();
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
              href={`/organization/${type}`} 
              className="inline-flex items-center text-white mb-4 hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {organization.name} assistants
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm">
              {name}
            </h1>
          </div>
        </div>
      </div>
      
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-lg text-gray-600 mb-8">
              {description}
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key benefits</h2>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available modules</h2>
            <p className="text-gray-600 mb-6">
              This assistant comes with {modules.length} modules that can be customized to your specific needs. 
              Our experts will handle the technical configuration for you, based on your preferences.
            </p>
            
            <div className="space-y-8">
              {Object.entries(modulesByCategory).map(([category, categoryModules]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      {getCategoryIcon(category as ModuleCategory)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {categoryModules.map((module) => {
                      const ModuleIcon = getIcon(module.icon);
                      return (
                        <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <ModuleIcon className="h-5 w-5 text-blue-700" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-lg font-medium text-gray-900">{module.name}</h4>
                                <div className="flex gap-2">
                                  {module.isRequired && (
                                    <Badge variant="info">Required</Badge>
                                  )}
                                  {module.defaultEnabled && !module.isRequired && (
                                    <Badge variant="success">Enabled by default</Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-600 mt-1">
                                {module.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get started</h3>
              <p className="text-gray-600 mb-6">
                Tell us your preferences and our team will configure the assistant for your organization. No technical expertise required.
              </p>
              
              <Button asChild size="lg" variant="gradient" className="w-full mb-4">
                <Link href={`/organization/${type}/assistant/${id}/wizard`} className="flex items-center justify-center">
                  Customize your assistant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link href="/contact">
                  Request a demo
                </Link>
              </Button>
              
              <hr className="my-6 border-gray-200" />
              
              <h4 className="font-medium text-gray-900 mb-2">Looking for something else?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Our team can build a custom solution tailored specifically to your organization's unique requirements.
              </p>
              <div className="flex items-center justify-between">
                <Link 
                  href="/contact" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Contact our team
                </Link>
                <Link 
                  href={`/organization/${type}/assistant/${id}/configure`}
                  className="text-gray-400 hover:text-gray-600 text-xs"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Testimonials Section */}
      <Section
        title="Klantreacties"
        description="Ontdek wat andere gebruikers zeggen over deze assistent"
        tinted
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <p className="text-gray-600 mb-4">
              "{name} heeft onze klantenservice volledig getransformeerd. We kunnen nu 24/7 vragen beantwoorden zonder extra personeel in te zetten. De configuratie was eenvoudig dankzij het team van The Next Wilson."
            </p>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 mr-3 overflow-hidden flex items-center justify-center">
                <div 
                  className="w-full h-full bg-center bg-cover" 
                  style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80')"
                  }}
                ></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Marieke van Dongen</p>
                <p className="text-sm text-gray-500">Customer Experience Manager</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <p className="text-gray-600 mb-4">
              "De implementatie was veel sneller dan verwacht. In minder dan twee weken hadden we een volledig functionerende AI-assistent die direct meerwaarde bood voor onze klanten. Zeer tevreden met de resultaten."
            </p>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 mr-3 overflow-hidden flex items-center justify-center">
                <div 
                  className="w-full h-full bg-center bg-cover" 
                  style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80')"
                  }}
                ></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Thomas de Vries</p>
                <p className="text-sm text-gray-500">Operationeel Directeur</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video testimonial */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <div className="relative aspect-video group cursor-pointer">
              {/* Achtergrond met transparante overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')` 
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-indigo-700/50"></div>
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/85 flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-blue-600 ml-1.5"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{name} in actie</h3>
              <p className="text-gray-600">
                Bekijk hoe deze AI assistent in de praktijk werkt en wat de voordelen zijn voor gebruikers.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 