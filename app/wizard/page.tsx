"use client";

import { useState } from "react";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { useRouter } from "next/navigation";
import { organizationTypes } from "@/app/data/mockData";
import { ArrowRight, Info, Check } from "lucide-react";
import { getIcon } from "@/app/lib/utils";

export default function OrganizationSelectionWizard() {
  const router = useRouter();
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);
  
  // Get the selected organization data
  const organization = organizationTypes.find(org => org.id === selectedOrganization);
  
  const handleOrganizationSelect = (orgId: string) => {
    setSelectedOrganization(orgId);
    setSelectedAssistant(null); // Reset assistant selection when changing organization
  };
  
  const handleAssistantSelect = (assistantId: string) => {
    setSelectedAssistant(assistantId);
  };
  
  const handleContinue = () => {
    if (selectedOrganization && selectedAssistant) {
      router.push(`/organization/${selectedOrganization}/assistant/${selectedAssistant}/wizard`);
    }
  };
  
  return (
    <MainLayout>
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Info className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Start je customizatie</h1>
            <p className="text-lg text-gray-600">
              Selecteer je organisatietype en de assistent die je wilt aanpassen aan jouw behoeften.
            </p>
          </div>
          
          {/* Step 1: Organization Selection */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stap 1: Kies je organisatietype</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {organizationTypes.map((org) => {
                const IconComponent = getIcon(org.icon.replace("-icon", ""));
                const isSelected = selectedOrganization === org.id;
                
                return (
                  <Card 
                    key={org.id}
                    className={`border cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-300 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-200 shadow-sm'
                    }`}
                    onClick={() => handleOrganizationSelect(org.id)}
                  >
                    <CardContent className="flex items-center p-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r 
                        ${org.id === 'hotel' ? 'from-[#3182ce] to-[#5a9bd3]' :
                          org.id === 'legal' ? 'from-[#ff9e2c] to-[#e02424]' :
                          org.id === 'municipality' ? 'from-[#0d9488] to-[#16bdca]' :
                          'from-[#5a67d8] to-[#7e3af2]'
                        } 
                        flex items-center justify-center mr-4 shadow-sm`}
                      >
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{org.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{org.assistants.length} assistenten beschikbaar</p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Step 2: Assistant Selection */}
          {selectedOrganization && organization && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Stap 2: Kies je assistent</h2>
              <div className="space-y-3">
                {organization.assistants.map((assistant) => {
                  const isSelected = selectedAssistant === assistant.id;
                  
                  return (
                    <Card 
                      key={assistant.id}
                      className={`border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-blue-300 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-blue-200 shadow-sm'
                      }`}
                      onClick={() => handleAssistantSelect(assistant.id)}
                    >
                      <CardContent className="flex items-start p-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{assistant.name}</h3>
                          <p className="text-sm text-gray-600">{assistant.description}</p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center ml-2 mt-1">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Navigation Button */}
          <div className="flex justify-end">
            <Button 
              variant="gradient"
              disabled={!selectedOrganization || !selectedAssistant}
              onClick={handleContinue}
              className="flex items-center"
            >
              Doorgaan naar configuratie
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 