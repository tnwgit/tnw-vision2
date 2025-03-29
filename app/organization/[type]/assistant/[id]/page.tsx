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
              Back to {organization.name} Assistants
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
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
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
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Modules</h2>
            <p className="text-gray-600 mb-6">
              This assistant comes with {modules.length} modules that can be customized to your specific needs. 
              You can enable or disable modules and configure their settings during the setup process.
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started</h3>
              <p className="text-gray-600 mb-6">
                Configure this assistant to match your exact requirements and integrate with your existing systems.
              </p>
              
              <Button asChild size="lg" variant="gradient" className="w-full mb-4">
                <Link href={`/organization/${type}/assistant/${id}/configure`} className="flex items-center justify-center">
                  Configure Assistant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link href="/contact">
                  Request a Demo
                </Link>
              </Button>
              
              <hr className="my-6 border-gray-200" />
              
              <h4 className="font-medium text-gray-900 mb-2">Looking for something else?</h4>
              <p className="text-sm text-gray-600 mb-4">
                We can build a custom assistant tailored to your specific requirements.
              </p>
              <Link 
                href="/contact" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Contact our team
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 