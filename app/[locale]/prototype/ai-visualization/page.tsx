import { Metadata } from "next";
import { MainLayout } from "@/app/components/layout/main-layout";
import { OrganizationVisualization } from "./organization-visualization";

export async function generateMetadata({ 
  params 
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Haal locale veilig op
  const { locale } = await Promise.resolve(params);
  
  // Gebruik directe titels in plaats van vertalingen
  const titles = {
    nl: {
      title: 'AI-assistenten visualisatie',
      description: 'Ontdek hoe AI-assistenten jouw organisatie kunnen versterken'
    },
    en: {
      title: 'AI assistants visualization',
      description: 'Discover how AI assistants can strengthen your organization'
    }
  };
  
  const content = titles[locale as 'nl' | 'en'] || titles.en;
  
  return {
    title: content.title,
    description: content.description,
    alternates: {
      languages: {
        [locale]: `/${locale}/prototype/ai-visualization`
      }
    }
  };
}

export default async function AIVisualizationPage({ 
  params 
}: {
  params: { locale: string };
}) {
  // Haal locale veilig op
  const { locale } = await Promise.resolve(params);
  
  // Gebruik directe titels in plaats van vertalingen
  const titles = {
    nl: {
      title: 'AI-assistenten visualisatie',
      description: 'Ontdek hoe AI-assistenten jouw organisatie kunnen versterken'
    },
    en: {
      title: 'AI assistants visualization',
      description: 'Discover how AI assistants can strengthen your organization'
    }
  };
  
  const content = titles[locale as 'nl' | 'en'] || titles.en;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">{content.title}</h1>
        <p className="text-center text-gray-600 mb-10">{content.description}</p>
        
        <div className="flex flex-col items-center gap-4">
          {/* Animatie container met vaste hoogte, geen overlap mogelijk met voice-over */}
          <div className="w-full max-w-4xl aspect-[4/3] bg-gray-50 rounded-xl shadow-md p-6 border border-gray-200 relative">
            <div className="h-full w-full">
              <OrganizationVisualization locale={locale} />
            </div>
          </div>
          
          {/* Aparte ruimte voor voice-over tekst, buiten het animatie component */}
          <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm py-6 px-8 rounded-lg shadow-md min-h-[100px] voice-over-container">
            {/* Deze div wordt als doelwit gebruikt voor de voice-over tekst via JavaScript in de OrganizationVisualization component */}
            <div id="voice-over-target" className="text-xl font-medium text-gray-800 text-center"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 