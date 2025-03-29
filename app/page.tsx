import { MainLayout } from "@/app/components/layout/main-layout";
import { HeroSection } from "@/app/components/ui/hero-section";
import { Section } from "@/app/components/ui/section";
import { OrganizationCard } from "@/app/components/ui/organization-card";
import { organizationTypes } from "@/app/data/mockData";
import { ArrowRight, ArrowLeft, CheckCircle, Zap, Shield, UserPlus, Info, Settings, Database, Code, Layers, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection
        title="Build tailored AI assistants for your organization"
        subtitle="The Next Wilson platform helps you create, configure, and deploy custom AI assistants that address your specific needs and integrate with your existing systems."
        ctaText="Get Started"
        ctaLink="/demo"
        secondaryText="Learn More"
        secondaryLink="/about"
      />

      <Section
        title="Choose your organization type"
        description="We offer specialized AI assistants for various organization types. Select yours to see relevant options and templates."
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizationTypes.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      </Section>

      <Section
        title="Why choose The Next Wilson?"
        description="Our platform offers unique benefits that set us apart from generic AI solutions."
        centered
        tinted
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
              <Zap className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Rapid Deployment</h3>
            <p className="text-gray-600">
              Get up and running quickly with pre-built templates tailored to your organization type.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
              <Shield className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy & Security</h3>
            <p className="text-gray-600">
              Your data stays yours with our robust privacy controls and secure hosting options.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
              <UserPlus className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Human-Centered Design</h3>
            <p className="text-gray-600">
              AI assistants that feel approachable and helpful, creating positive user experiences.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Complete customization and control
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our powerful configurator allows you to tailor every aspect of your AI assistant to meet your exact requirements.
            </p>
            
            <ul className="mt-8 space-y-4">
              {[
                "Drag-and-drop module configuration",
                "Fine-grained control over AI behavior and interactions",
                "Seamless integration with your existing systems",
                "Comprehensive analytics and reporting dashboards",
                "Regular updates and new features"
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-10">
              <Button asChild variant="gradient">
                <Link href="/demo" className="w-full h-full flex items-center justify-center">
                  Try the Configurator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-10 lg:mt-0 relative">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
              {/* Configurator UI mockup */}
              <div className="bg-white h-[400px] w-full relative">
                {/* Header */}
                <div className="bg-blue-50 border-b border-blue-100 p-4">
                  <div className="flex items-center">
                    <ArrowLeft className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-blue-600 text-sm">Terug naar Assistant Details</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex h-[350px]">
                  {/* Left sidebar */}
                  <div className="w-1/4 border-r border-gray-200 p-4">
                    <h3 className="font-bold text-sm mb-2">Configuratie Modules</h3>
                    <div className="space-y-2">
                      <div className="border border-blue-500 bg-blue-50 rounded p-2 text-xs flex items-center">
                        <Database className="h-3 w-3 mr-2 text-blue-600" />
                        <span className="text-blue-800">Database Integratie</span>
                      </div>
                      <div className="border border-gray-200 rounded p-2 text-xs flex items-center">
                        <Code className="h-3 w-3 mr-2 text-gray-600" />
                        <span>API Verbindingen</span>
                      </div>
                      <div className="border border-gray-200 rounded p-2 text-xs flex items-center">
                        <Settings className="h-3 w-3 mr-2 text-gray-600" />
                        <span>Gebruikersinstellingen</span>
                      </div>
                      <div className="border border-gray-200 rounded p-2 text-xs flex items-center">
                        <Layers className="h-3 w-3 mr-2 text-gray-600" />
                        <span>Knowledge Base</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-2 bg-blue-50 rounded-md border border-blue-100">
                      <div className="flex items-start">
                        <Info className="h-3 w-3 text-blue-600 mt-0.5 mr-1 flex-shrink-0" />
                        <p className="text-[10px] text-blue-800">
                          Configureer modules om uw assistent op maat in te stellen
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="w-3/4 p-4">
                    <h2 className="text-lg font-bold mb-4">Database Integratie Configuratie</h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Verbindingstype</label>
                        <div className="border border-gray-300 rounded h-6 bg-white"></div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Server URL</label>
                        <div className="border border-gray-300 rounded h-6 bg-white"></div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Authenticatiemethode</label>
                        <div className="flex space-x-2">
                          <div className="border border-blue-500 bg-blue-50 rounded-full px-2 py-1 text-[10px] flex items-center">
                            <Check className="h-2 w-2 mr-1 text-blue-600" />
                            <span className="text-blue-800">OAuth 2.0</span>
                          </div>
                          <div className="border border-gray-200 rounded-full px-2 py-1 text-[10px]">
                            Basic Auth
                          </div>
                          <div className="border border-gray-200 rounded-full px-2 py-1 text-[10px]">
                            API Key
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <div className="bg-white border border-gray-300 rounded-md px-3 py-1 text-xs">
                        Annuleren
                      </div>
                      <div className="bg-gradient-to-r from-[#3182ce] to-[#7e3af2] text-white rounded-md px-3 py-1 text-xs">
                        Configuratie Opslaan
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#3182ce] to-[#7e3af2] text-white rounded-full px-4 py-2 shadow-md font-medium text-sm">
                Intuïtieve interface
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        className="bg-blue-900 text-white"
        title="Ready to get started?"
        description="Join organizations that are already transforming their operations with our AI assistants."
        titleClassName="text-white"
        descriptionClassName="text-blue-100"
        centered
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link href="/demo" className="w-full h-full flex items-center justify-center">
              Book a Demo
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
            <Link href="/contact" className="w-full h-full flex items-center justify-center">
              Contact Us
            </Link>
          </Button>
        </div>
      </Section>
    </MainLayout>
  );
}
