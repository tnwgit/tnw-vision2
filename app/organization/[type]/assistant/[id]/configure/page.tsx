"use client";

import { useState } from "react";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { organizationTypes } from "@/app/data/mockData";
import { ArrowLeft, ArrowRight, Info, X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { ModuleConfig } from "@/app/components/configurator/module-config";
import { getIcon } from "@/app/lib/utils";
import { AssistantConfig, Module, ModuleConfig as ModuleConfigType } from "@/app/types";
import { Badge } from "@/app/components/ui/badge";

export default function ConfigurePage() {
  const params = useParams();
  const typeId = params.type as string;
  const assistantId = params.id as string;
  
  const organization = organizationTypes.find(org => org.id === typeId);
  const assistant = organization?.assistants.find(assistant => assistant.id === assistantId);
  
  const [config, setConfig] = useState<AssistantConfig>({
    assistantId,
    modules: assistant?.modules
      .filter(module => module.isRequired || module.defaultEnabled)
      .map(module => ({
        moduleId: module.id,
        enabled: true,
        settings: {}
      })) || []
  });
  
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
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
  }, {} as Record<string, Module[]>);
  
  const getModuleConfig = (moduleId: string): ModuleConfigType | undefined => {
    return config.modules.find(m => m.moduleId === moduleId);
  };
  
  const isModuleEnabled = (moduleId: string): boolean => {
    const moduleConfig = getModuleConfig(moduleId);
    return !!moduleConfig?.enabled;
  };
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const handleModuleSelect = (moduleId: string) => {
    setActiveModuleId(moduleId);
  };
  
  const handleModuleConfigSave = (moduleConfig: ModuleConfigType) => {
    setConfig(prev => {
      const existingIndex = prev.modules.findIndex(m => m.moduleId === moduleConfig.moduleId);
      
      if (existingIndex >= 0) {
        // Update existing module config
        const updatedModules = [...prev.modules];
        updatedModules[existingIndex] = moduleConfig;
        return { ...prev, modules: updatedModules };
      } else {
        // Add new module config
        return { ...prev, modules: [...prev.modules, moduleConfig] };
      }
    });
    
    setActiveModuleId(null);
  };
  
  const handleModuleConfigCancel = () => {
    setActiveModuleId(null);
  };
  
  const activeModule = activeModuleId ? modules.find(m => m.id === activeModuleId) : null;
  
  const handleExportConfig = () => {
    const configData = JSON.stringify(config, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${organization.name.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    a.click();
    
    URL.revokeObjectURL(url);
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Module selection */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg">Configuration Modules</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Select modules to configure your assistant
                </p>
              </div>
              
              <div className="p-2">
                {Object.entries(modulesByCategory).map(([category, categoryModules]) => (
                  <div key={category} className="mb-2">
                    <button
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                      onClick={() => toggleCategory(category)}
                    >
                      <span className="font-medium">{category}</span>
                      {expandedCategories[category] ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                    
                    {expandedCategories[category] && (
                      <div className="ml-2 border-l-2 border-gray-100 pl-2 space-y-1 mt-1">
                        {categoryModules.map(module => {
                          const ModuleIcon = getIcon(module.icon);
                          const isEnabled = isModuleEnabled(module.id);
                          const isActive = activeModuleId === module.id;
                          
                          return (
                            <button
                              key={module.id}
                              className={`w-full text-left p-2 rounded-md flex items-center ${
                                isActive
                                  ? 'bg-blue-50 text-blue-700'
                                  : isEnabled
                                  ? 'text-gray-900 hover:bg-gray-50'
                                  : 'text-gray-400 hover:bg-gray-50'
                              }`}
                              onClick={() => handleModuleSelect(module.id)}
                            >
                              <div className="w-6 h-6 mr-2 flex-shrink-0">
                                <ModuleIcon className="h-5 w-5" />
                              </div>
                              <span className="text-sm">{module.name}</span>
                              {module.isRequired && (
                                <Badge variant="info" className="ml-auto">Required</Badge>
                              )}
                              {!module.isRequired && isEnabled && (
                                <Check size={16} className="ml-auto text-green-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium text-blue-900">Configuration Tips</h3>
                  <ul className="mt-2 text-sm text-blue-800 space-y-2">
                    <li>Required modules cannot be disabled</li>
                    <li>Click on a module to configure its settings</li>
                    <li>Export your configuration when finished</li>
                    <li>You can revisit and update your configuration later</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:w-3/4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Configure {name}
            </h1>
            
            {activeModule ? (
              <ModuleConfig
                module={activeModule}
                initialConfig={getModuleConfig(activeModule.id)}
                onSave={handleModuleConfigSave}
                onCancel={handleModuleConfigCancel}
              />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-10 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <Info className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a module to configure
                </h2>
                <p className="text-gray-600 mb-8 max-w-md">
                  Choose from the modules list on the left to customize your assistant configuration.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setExpandedCategories(Object.fromEntries(
                      Object.keys(modulesByCategory).map(cat => [cat, true])
                    ))}
                  >
                    Expand All Categories
                  </Button>
                </div>
              </div>
            )}
            
            {!activeModule && (
              <div className="mt-8 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Configuration Summary
                  </h2>
                  <p className="text-gray-600">
                    {config.modules.filter(m => m.enabled).length} of {modules.length} modules enabled
                  </p>
                </div>
                <div className="space-x-4">
                  <Button variant="outline" onClick={handleExportConfig}>
                    Export Config
                  </Button>
                  <Button asChild variant="gradient">
                    <Link href={`/organization/${typeId}/assistant/${assistantId}/dashboard`} className="flex items-center">
                      View Dashboards
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 