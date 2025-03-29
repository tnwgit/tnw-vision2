import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { organizationTypes } from "@/app/data/mockData";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface ThankYouPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function ThankYouPage({ params }: ThankYouPageProps) {
  const { type, id } = params;
  
  const organization = organizationTypes.find(org => org.id === type);
  const assistant = organization?.assistants.find(assistant => assistant.id === id);
  
  if (!organization || !assistant) {
    return <div>Assistant not found</div>;
  }
  
  const { name } = assistant;
  
  return (
    <MainLayout>
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank you!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            We've received your preferences for your {name}.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 text-left mb-10">
            <h3 className="font-bold text-blue-900 mb-3">What happens next?</h3>
            <ol className="space-y-4 text-blue-800 ml-5 list-decimal">
              <li>
                <strong>Technical configuration:</strong> Our experts will configure your assistant based on your preferences
              </li>
              <li>
                <strong>Setup & integration:</strong> We'll work with you to integrate the assistant with your systems
              </li>
              <li>
                <strong>Review & approval:</strong> You'll get a chance to review and approve the final configuration
              </li>
              <li>
                <strong>Deployment & training:</strong> We'll deploy your assistant and train your team on how to use it
              </li>
            </ol>
          </div>
          
          <p className="text-gray-600 mb-8">
            Our team will be in touch within 1-2 business days to discuss next steps.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline">
              <Link href={`/organization/${type}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {organization.name} assistants
              </Link>
            </Button>
            
            <Button asChild variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/contact">
                Contact support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 