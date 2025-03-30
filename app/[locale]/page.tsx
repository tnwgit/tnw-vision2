import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { MainLayout } from "@/app/components/layout/main-layout";
import { HeroSection } from "@/app/components/ui/hero-section";
import { Section } from "@/app/components/ui/section";
import { OrganizationCard } from "@/app/components/ui/organization-card";
import { organizationTypes } from "@/app/data/mockData";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { headers } from 'next/headers';
import Image from "next/image";
import { ChatButton } from "@/app/components/ui/chat-button";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  // Haal locale veilig op met Promise.resolve voor Next.js 15
  const { locale } = await Promise.resolve(params);
  
  // Haal vertalingen op met server-side getTranslations
  const t = await getTranslations({ locale: locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        [locale]: `/${locale}`
      }
    }
  };
}

export default async function Home({ params }: { params: { locale: string } }) {
  // Haal locale veilig op met Promise.resolve voor Next.js 15
  const { locale } = await Promise.resolve(params);
  
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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayout>
        <HeroSection
          title={messages.hero.title}
          subtitle={messages.hero.subtitle}
          ctaText={messages.hero.ctaText}
          ctaLink="/demo"
          secondaryText={messages.hero.secondaryText}
          secondaryLink="/about"
        />

        <Section
          title={messages.sections.organizations.title}
          description={messages.sections.organizations.description}
          centered
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizationTypes.map((org) => (
              <OrganizationCard key={org.id} organization={org} />
            ))}
          </div>
        </Section>

        <Section
          title={messages.sections.features.title}
          description={messages.sections.features.description}
          centered
          tinted
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{messages.sections.features.items.deployment.title}</h3>
              <p className="text-gray-600">
                {messages.sections.features.items.deployment.description}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{messages.sections.features.items.security.title}</h3>
              <p className="text-gray-600">
                {messages.sections.features.items.security.description}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{messages.sections.features.items.design.title}</h3>
              <p className="text-gray-600">
                {messages.sections.features.items.design.description}
              </p>
            </div>
          </div>
        </Section>

        <Section
          title={messages.sections.testimonials.title}
          description={messages.sections.testimonials.description}
          centered
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {messages.sections.testimonials.items.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 mr-3 overflow-hidden flex items-center justify-center">
                    <div 
                      className="w-full h-full bg-center bg-cover" 
                      style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-${500 + index}?auto=format&fit=crop&w=256&q=80')`
                      }}
                    ></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 max-w-3xl mx-auto">
              <div className="relative aspect-video group cursor-pointer">
                {/* SVG testimonial video thumbnail in plaats van externe afbeelding */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" className="w-full h-full">
                    <rect width="100%" height="100%" fill="#f8fafc" />
                    <rect x="0" y="0" width="1200" height="675" fill="#eff6ff" />
                    
                    {/* Abstracte achtergrond */}
                    <path d="M0,338Q60,361,120,366Q180,371,240,362Q300,353,360,317Q420,282,480,258Q540,234,600,217Q660,200,720,238Q780,276,840,279Q900,282,960,288Q1020,294,1080,273Q1140,252,1170,231L1200,210L1200,0L1170,0Q1140,0,1080,0Q1020,0,960,0Q900,0,840,0Q780,0,720,0Q660,0,600,0Q540,0,480,0Q420,0,360,0Q300,0,240,0Q180,0,120,0Q60,0,30,0L0,0Z" fill="#e0e7ff" />
                    <path d="M0,217Q60,245,120,236Q180,227,240,229Q300,231,360,254Q420,276,480,279Q540,282,600,279Q660,276,720,265Q780,254,840,242Q900,231,960,215Q1020,200,1080,210Q1140,220,1170,230L1200,240L1200,0L1170,0Q1140,0,1080,0Q1020,0,960,0Q900,0,840,0Q780,0,720,0Q660,0,600,0Q540,0,480,0Q420,0,360,0Q300,0,240,0Q180,0,120,0Q60,0,30,0L0,0Z" fill="#c7d2fe" />
                    
                    {/* Presentatie figuur */}
                    <rect x="400" y="200" width="400" height="300" rx="4" fill="#fff" />
                    <rect x="450" y="230" width="300" height="20" rx="2" fill="#94a3b8" />
                    <rect x="450" y="270" width="300" height="20" rx="2" fill="#94a3b8" />
                    <rect x="450" y="310" width="300" height="20" rx="2" fill="#94a3b8" />
                    <rect x="450" y="350" width="200" height="20" rx="2" fill="#94a3b8" />
                    <rect x="450" y="390" width="150" height="20" rx="2" fill="#94a3b8" />
                    <rect x="450" y="430" width="250" height="20" rx="2" fill="#94a3b8" />
                    
                    {/* Persoon silhouet */}
                    <circle cx="250" cy="300" r="50" fill="#475569" />
                    <rect x="200" y="350" width="100" height="150" rx="4" fill="#475569" />
                    <rect x="230" y="500" width="15" height="100" rx="2" fill="#475569" />
                    <rect x="255" y="500" width="15" height="100" rx="2" fill="#475569" />
                    <rect x="150" y="390" width="50" height="15" rx="2" fill="#475569" />
                    <rect x="300" y="390" width="50" height="15" rx="2" fill="#475569" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-indigo-700/50 group-hover:opacity-75 transition-opacity"></div>
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                    <Play className="h-8 w-8 text-blue-600 ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{messages.sections.testimonials.video.title}</h3>
                <p className="text-gray-600">
                  {messages.sections.testimonials.video.description}
                </p>
                <button className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  {messages.sections.testimonials.video.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Section>
        
        <Section
          title={messages.sections.intake.title}
          description={messages.sections.intake.description}
          tinted
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-10 lg:mb-0">
              <div className="relative">
                <div className="rounded-lg shadow-lg w-full bg-white p-6 aspect-video flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" className="w-full h-full">
                    <rect width="100%" height="100%" fill="#f8fafc" />
                    <rect x="20" y="20" width="560" height="50" rx="4" fill="#e2e8f0" />
                    <rect x="40" y="35" width="120" height="20" rx="4" fill="#94a3b8" />
                    <rect x="180" y="35" width="80" height="20" rx="4" fill="#94a3b8" />
                    <rect x="280" y="35" width="100" height="20" rx="4" fill="#94a3b8" />
                    <rect x="400" y="35" width="140" height="20" rx="4" fill="#94a3b8" />
                    <rect x="20" y="90" width="270" height="130" rx="4" fill="#e2e8f0" />
                    <rect x="40" y="110" width="230" height="90" rx="4" fill="#cbd5e1" />
                    <rect x="310" y="90" width="270" height="130" rx="4" fill="#e2e8f0" />
                    <rect x="330" y="110" width="230" height="90" rx="4" fill="#cbd5e1" />
                    <rect x="20" y="240" width="560" height="130" rx="4" fill="#e2e8f0" />
                    <rect x="40" y="260" width="520" height="90" rx="4" fill="#cbd5e1" />
                    <rect x="60" y="280" width="40" height="50" rx="2" fill="#94a3b8" />
                    <rect x="120" y="280" width="40" height="25" rx="2" fill="#94a3b8" />
                    <rect x="180" y="280" width="40" height="40" rx="2" fill="#94a3b8" />
                    <rect x="240" y="280" width="40" height="30" rx="2" fill="#94a3b8" />
                    <rect x="300" y="280" width="40" height="15" rx="2" fill="#94a3b8" />
                    <rect x="360" y="280" width="40" height="35" rx="2" fill="#94a3b8" />
                    <rect x="420" y="280" width="40" height="25" rx="2" fill="#94a3b8" />
                    <rect x="480" y="280" width="40" height="45" rx="2" fill="#94a3b8" />
                  </svg>
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    "The setup process was incredibly user-friendly!"
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <ol className="relative border-l border-gray-200 ml-3">
                {messages.sections.intake.steps.map((step, index) => (
                  <li key={index} className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                      <span className="font-medium text-blue-800">{index + 1}</span>
                    </span>
                    <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
                    <p className="text-base text-gray-600">{step.description}</p>
                  </li>
                ))}
              </ol>
              
              <div className="mt-8">
                <Button variant="gradient" className="flex items-center">
                  <Link href={`/${locale}/wizard`} className="w-full h-full flex items-center justify-center">
                    {messages.sections.tailored.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
        
        <Section>
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {messages.sections.tailored.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {messages.sections.tailored.description}
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  messages.sections.tailored.benefits.process,
                  messages.sections.tailored.benefits.experts,
                  messages.sections.tailored.benefits.integration,
                  messages.sections.tailored.benefits.analytics,
                  messages.sections.tailored.benefits.support
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100">
                      <CheckCircle className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10">
                <Button variant="gradient" className="flex items-center">
                  <Link href={`/${locale}/wizard`} className="w-full h-full flex items-center justify-center">
                    {messages.sections.tailored.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <div className="rounded-lg shadow-lg w-full bg-white p-6 aspect-video flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" className="w-full h-full">
                  <rect width="100%" height="100%" fill="#f8fafc" />
                  <rect x="20" y="20" width="560" height="360" rx="4" fill="#e2e8f0" />
                  <rect x="50" y="50" width="200" height="300" rx="4" fill="#cbd5e1" />
                  <rect x="70" y="70" width="160" height="30" rx="2" fill="#94a3b8" />
                  <rect x="70" y="120" width="160" height="20" rx="2" fill="#94a3b8" />
                  <rect x="70" y="150" width="160" height="20" rx="2" fill="#94a3b8" />
                  <rect x="70" y="180" width="160" height="20" rx="2" fill="#94a3b8" />
                  <rect x="70" y="220" width="60" height="30" rx="2" fill="#3b82f6" />
                  <rect x="140" y="220" width="60" height="30" rx="2" fill="#94a3b8" />
                  <rect x="280" y="50" width="250" height="300" rx="4" fill="#fff" />
                  <rect x="300" y="70" width="210" height="40" rx="2" fill="#e2e8f0" />
                  <rect x="300" y="130" width="210" height="80" rx="2" fill="#e2e8f0" />
                  <rect x="300" y="230" width="100" height="40" rx="2" fill="#3b82f6" />
                  <rect x="410" y="230" width="100" height="40" rx="2" fill="#e2e8f0" />
                  <circle cx="320" cy="290" r="10" fill="#3b82f6" />
                  <rect x="340" y="285" width="150" height="10" rx="2" fill="#94a3b8" />
                  <circle cx="320" cy="320" r="10" fill="#e2e8f0" />
                  <rect x="340" y="315" width="150" height="10" rx="2" fill="#94a3b8" />
                </svg>
              </div>
            </div>
          </div>
        </Section>
      </MainLayout>
      
      {/* Chat knop */}
      <ChatButton />
    </NextIntlClientProvider>
  );
} 