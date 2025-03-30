import { organizationTypes } from "@/app/data/mockData";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string, type: string } }): Promise<Metadata> {
  const locale = params.locale;
  const type = params.type;
  
  const organization = organizationTypes.find((org) => org.id === type);
  if (!organization) {
    return {
      title: 'Not Found',
      description: 'The requested organization type could not be found'
    };
  }
  
  return {
    title: `${organization.name} - AI assistants voor uw organisatie | The Next Wilson`,
    description: locale === 'nl' 
      ? `Ontdek onze AI-assistenten speciaal ontwikkeld voor ${organization.name.toLowerCase()}. Verhoog uw efficiëntie met op maat gemaakte AI-oplossingen.`
      : `Discover our AI assistants specially developed for ${organization.name.toLowerCase()}. Increase your efficiency with customized AI solutions.`,
    alternates: {
      languages: {
        [locale]: `/${locale}/organization/${type}`
      }
    }
  };
} 