import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { AssistantCard } from "@/app/components/ui/assistant-card";
import { organizationTypes } from "@/app/data/mockData";
import { getIcon } from "@/app/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";

interface OrganizationPageProps {
  params: {
    type: string;
  };
}

export default function OrganizationPage({ params }: OrganizationPageProps) {
  const { type } = params;
  const organization = organizationTypes.find((org) => org.id === type);

  if (!organization) {
    notFound();
  }

  const { name, description, icon, assistants } = organization;
  const IconComponent = getIcon(icon.replace("-icon", ""));
  const heroImage = `/images/${type}-hero.jpg`;

  return (
    <MainLayout>
      {/* Hero Section with large image */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image 
          src={heroImage}
          alt={`${name} hero image`}
          fill
          style={{ objectFit: "cover" }}
          priority
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block p-3 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
              {name} Solutions
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
              AI assistants specially designed for the {name.toLowerCase()} sector
            </p>
          </div>
        </div>
      </div>

      <Section className="bg-white">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            About our {name} AI assistants
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {description}
          </p>
          <div className="p-4 bg-blue-100 rounded-lg border border-blue-200">
            <p className="text-blue-800">
              <strong>Specialized AI assistants for the {name.toLowerCase()} sector</strong> - Each assistant is pre-configured with industry-specific knowledge and integrations, saving you time and resources.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Available assistants"
        description={`Choose from ${assistants.length} specialized AI assistants designed specifically for ${name.toLowerCase()} organizations.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assistants.map((assistant) => (
            <AssistantCard key={assistant.id} assistant={assistant} />
          ))}
        </div>
      </Section>

      <Section 
        title="Common use cases" 
        description={`Discover how our AI assistants can transform operations in ${name.toLowerCase()} organizations.`}
        tinted
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {getUseCases(type).map((useCase, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
              <p className="text-gray-600 mb-4">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
}

// Helper function to get use cases based on organization type
function getUseCases(type: string) {
  switch (type) {
    case 'hotel':
      return [
        {
          title: "24/7 guest support",
          description: "Provide instant responses to guest inquiries and requests at any time of day.",
          benefits: [
            "Reduce front desk workload by up to 40%",
            "Improve guest satisfaction scores",
            "Handle multiple inquiries simultaneously"
          ]
        },
        {
          title: "Streamlined booking process",
          description: "Simplify the reservation flow and maximize occupancy rates.",
          benefits: [
            "Increase direct bookings by up to 25%",
            "Reduce booking abandonment rates",
            "Personalized room recommendations"
          ]
        },
        {
          title: "Revenue enhancement",
          description: "Intelligently upsell services and experiences to guests.",
          benefits: [
            "Increase average guest spend by 15-30%",
            "Promote in-house amenities effectively",
            "Personalized recommendations based on guest preferences"
          ]
        },
        {
          title: "Operational efficiency",
          description: "Streamline internal processes and staff communication.",
          benefits: [
            "Reduce response time to maintenance requests",
            "Streamline housekeeping schedules",
            "Improve interdepartmental communication"
          ]
        }
      ];
    case 'municipality':
      return [
        {
          title: "Citizen information services",
          description: "Provide accurate information about municipal services, procedures, and events.",
          benefits: [
            "Reduce call center volume by up to 45%",
            "Available 24/7 to answer common questions",
            "Support in multiple languages for diverse communities"
          ]
        },
        {
          title: "Application & permit processing",
          description: "Guide citizens through permit applications and administrative procedures.",
          benefits: [
            "Reduce application errors by up to 60%",
            "Shorter processing times",
            "Step-by-step guidance through complex procedures"
          ]
        },
        {
          title: "Complaint management",
          description: "Efficiently handle and route citizen complaints to appropriate departments.",
          benefits: [
            "Faster response to critical issues",
            "Improved tracking and follow-up",
            "Better citizen satisfaction with issue resolution"
          ]
        },
        {
          title: "Community engagement",
          description: "Increase citizen participation in local governance and community events.",
          benefits: [
            "Higher awareness of community initiatives",
            "Increased attendance at public meetings",
            "More inclusive civic participation"
          ]
        }
      ];
    case 'legal':
      return [
        {
          title: "Client intake & screening",
          description: "Streamline the client onboarding process and initial case evaluation.",
          benefits: [
            "Reduce administrative workload by up to 35%",
            "Capture relevant case information efficiently",
            "Better client experience from first contact"
          ]
        },
        {
          title: "Legal research assistance",
          description: "Support attorneys with preliminary research and case preparation.",
          benefits: [
            "Save 5-10 hours per case on initial research",
            "Identify relevant precedents faster",
            "Better preparation for client consultations"
          ]
        },
        {
          title: "Document generation",
          description: "Create standardized legal documents and forms based on client information.",
          benefits: [
            "Reduce document preparation time by up to 70%",
            "Fewer errors in standard legal documents",
            "Consistent document formatting and language"
          ]
        },
        {
          title: "Client communication",
          description: "Maintain regular updates and answer common client questions.",
          benefits: [
            "Improved client satisfaction through regular updates",
            "Less time spent on routine inquiries",
            "More consistent client communication"
          ]
        }
      ];
    default:
      return [
        {
          title: "Operational efficiency",
          description: "Streamline processes and reduce manual workload across your organization.",
          benefits: [
            "Reduce administrative tasks by up to 40%",
            "Faster response times to inquiries",
            "More consistent service delivery"
          ]
        },
        {
          title: "Enhanced customer experience",
          description: "Provide 24/7 support and personalized service to your customers.",
          benefits: [
            "Increase customer satisfaction scores",
            "Reduce wait times for support",
            "More personalized interactions"
          ]
        }
      ];
  }
} 