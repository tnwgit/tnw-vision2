import { organizationTypes } from "@/app/data/mockData";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string, type: string, id: string } }): Promise<Metadata> {
  const { locale, type, id } = params;
  
  const organization = organizationTypes.find((org) => org.id === type);
  if (!organization) {
    return {
      title: 'Not Found',
      description: 'The requested organization type could not be found'
    };
  }
  
  const assistant = organization.assistants.find((assistant) => assistant.id === id);
  if (!assistant) {
    return {
      title: 'Not Found',
      description: 'The requested assistant could not be found'
    };
  }
  
  return {
    title: `${assistant.name} - The Next Wilson`,
    description: assistant.description,
    alternates: {
      languages: {
        [locale]: `/${locale}/organization/${type}/assistant/${id}`
      }
    }
  };
} 