"use client";

import { useState } from "react";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { organizationTypes } from "@/app/data/mockData";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import { getIcon } from "@/app/lib/utils";
import { ModuleCategory } from "@/app/types";

// Define wizard steps
type WizardStep = {
  id: string;
  title: string;
  description: string;
};

export default function WizardPage() {
  const params = useParams();
  const typeId = params.type as string;
  const assistantId = params.id as string;
  
  const organization = organizationTypes.find(org => org.id === typeId);
  const assistant = organization?.assistants.find(assistant => assistant.id === assistantId);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>({});
  const [preferences, setPreferences] = useState<Record<string, any>>({});
  
  if (!organization || !assistant) {
    return <div>Assistant not found</div>;
  }
  
  const { name, modules } = assistant;
  
  // Group modules by category
  const modulesByCategory = modules.reduce((acc, module) => {
    const { category } = module;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(module);
    return acc;
  }, {} as Record<ModuleCategory, typeof modules>);
  
  // Define wizard steps based on module categories
  const steps: WizardStep[] = [
    { id: "intro", title: "Welcome", description: "Let's customize your assistant to fit your needs" },
    ...Object.keys(modulesByCategory).map(category => ({
      id: category,
      title: category,
      description: `Select your preferences for ${category.toLowerCase()} features`
    })),
    { id: "review", title: "Review", description: "Review your selections before submitting" }
  ];
  
  const currentStep = steps[currentStepIndex];
  
  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  
  const handleSubmit = () => {
    // Here you would typically send the selections to your backend
    console.log("Selected modules:", selectedModules);
    console.log("Preferences:", preferences);
    // For now, just redirect to a thank you page
    window.location.href = `/organization/${typeId}/assistant/${assistantId}/wizard/thank-you`;
  };
  
  const renderStepContent = () => {
    // Introduction step
    if (currentStep.id === "intro") {
      return (
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
            <Info className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Customize Your {name}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This wizard will guide you through a few simple steps to understand your needs.
            Our experts will then configure the perfect assistant for your organization.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 text-left mb-8">
            <div className="flex">
              <Info className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">How this works</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>You'll tell us your preferences in plain language</li>
                  <li>Our technical team will handle the complex configuration</li>
                  <li>Your assistant will be set up according to your specific needs</li>
                  <li>No technical expertise required from your side</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Review step
    if (currentStep.id === "review") {
      const selectedModuleIds = Object.entries(selectedModules)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => id);
      
      const selectedModulesList = modules.filter(module => 
        module.isRequired || selectedModuleIds.includes(module.id)
      );
      
      return (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Your Preferences</h2>
          <p className="text-gray-600 mb-6">
            Here's a summary of what you've told us. Our team will use this information
            to configure your assistant.
          </p>
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Selected Features</h3>
            <ul className="space-y-3">
              {selectedModulesList.map(module => (
                <li key={module.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{module.name}</h4>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">What happens next?</h3>
            <ol className="space-y-2 text-blue-800 ml-5 list-decimal">
              <li>Our team receives your preferences</li>
              <li>We'll configure your assistant based on these preferences</li>
              <li>We'll contact you when your assistant is ready to use</li>
              <li>You can request adjustments at any time after deployment</li>
            </ol>
          </div>
        </div>
      );
    }
    
    // Category steps
    const categoryModules = modulesByCategory[currentStep.id] || [];
    
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStep.title} Features</h2>
        <p className="text-gray-600 mb-6">
          Select which capabilities you'd like in your assistant.
        </p>
        
        <div className="space-y-4 mb-8">
          {categoryModules.map(module => {
            const ModuleIcon = getIcon(module.icon);
            const isSelected = selectedModules[module.id] || module.isRequired;
            
            return (
              <div 
                key={module.id}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-colors
                  ${isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}
                  ${module.isRequired ? 'opacity-75 cursor-not-allowed' : ''}
                `}
                onClick={() => {
                  if (!module.isRequired) {
                    handleModuleToggle(module.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <ModuleIcon className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {module.name}
                        {module.isRequired && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </h3>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                        ${isSelected ? 'bg-blue-600' : 'border-2 border-gray-300'}`}
                      >
                        {isSelected && <Check className="h-4 w-4 text-white" />}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">{module.description}</p>
                    
                    {/* User-friendly explanation would go here */}
                    <div className="mt-2 text-sm text-gray-500">
                      {module.id === 'email-integration' && 
                        'This lets your assistant connect with your email system to send notifications.'}
                      {module.id === 'calendar-integration' && 
                        'This allows your assistant to schedule and manage appointments.'}
                      {/* Add more user-friendly explanations as needed */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <MainLayout>
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link 
            href={`/organization/${typeId}/assistant/${assistantId}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assistant Details
          </Link>
        </div>
      </div>
      
      <Section>
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {currentStep.title}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Step content */}
        {renderStepContent()}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          <Button 
            variant="outline" 
            onClick={handlePreviousStep}
            disabled={currentStepIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {currentStepIndex < steps.length - 1 ? (
            <Button 
              variant="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleNextStep}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
            >
              Submit Preferences
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </Section>
    </MainLayout>
  );
} 