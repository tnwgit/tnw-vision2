"use client";

import { useState } from "react";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";
import Link from "next/link";
import { useParams } from "next/navigation";
import { organizationTypes, dashboardData } from "@/app/data/mockData";
import { ArrowLeft, BarChart2, Users, Activity, Workflow } from "lucide-react";
import { DashboardType } from "@/app/types";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { MetricCard } from "@/app/components/dashboard/metric-card";

export default function DashboardPage() {
  const params = useParams();
  const typeId = params.type as string;
  const assistantId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<DashboardType>(DashboardType.Customer);
  
  const organization = organizationTypes.find(org => org.id === typeId);
  const assistant = organization?.assistants.find(assistant => assistant.id === assistantId);
  
  if (!organization || !assistant) {
    return <div>Assistant not found</div>;
  }
  
  const { name } = assistant;
  
  const getDashboardIcon = (type: DashboardType) => {
    switch (type) {
      case DashboardType.Customer:
        return <Users className="h-4 w-4" />;
      case DashboardType.Management:
        return <BarChart2 className="h-4 w-4" />;
      case DashboardType.Technical:
        return <Workflow className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  
  const handleTabChange = (tab: DashboardType) => {
    setActiveTab(tab);
  };
  
  const metrics = dashboardData[activeTab]?.metrics || [];
  
  return (
    <MainLayout>
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link 
            href={`/organization/${typeId}/assistant/${assistantId}/configure`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Configuration
          </Link>
        </div>
      </div>
      
      <Section>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {name} Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor performance metrics and insights for your AI assistant
            </p>
          </div>
          
          <div className="inline-flex rounded-md shadow-sm">
            {Object.values(DashboardType).map((type) => (
              <Button
                key={type}
                variant={activeTab === type ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-2",
                  activeTab === type ? "" : "bg-white hover:bg-gray-50",
                  type === DashboardType.Customer ? "rounded-l-md rounded-r-none" : "",
                  type === DashboardType.Technical ? "rounded-r-md rounded-l-none" : "",
                  type === DashboardType.Management ? "rounded-none border-x-0" : ""
                )}
                onClick={() => handleTabChange(type)}
              >
                {getDashboardIcon(type)}
                {type}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          {activeTab === DashboardType.Customer && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
              <strong>Customer Dashboard:</strong> Track user engagement, satisfaction, and interaction metrics.
            </div>
          )}
          
          {activeTab === DashboardType.Management && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
              <strong>Management Dashboard:</strong> Monitor business value, ROI, and operational KPIs.
            </div>
          )}
          
          {activeTab === DashboardType.Technical && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
              <strong>Technical Dashboard:</strong> View system performance, uptime, and technical metrics.
            </div>
          )}
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
        
        {/* Placeholder for charts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-80 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart2 className="h-10 w-10 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">Usage Over Time</p>
              <p className="text-sm text-gray-400">Chart placeholder</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-80 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Activity className="h-10 w-10 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">Performance Metrics</p>
              <p className="text-sm text-gray-400">Chart placeholder</p>
            </div>
          </div>
        </div>
        
        {/* Info panel */}
        <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">About This Dashboard</h2>
          <p className="text-gray-600">
            This dashboard displays sample data to demonstrate the reporting capabilities of your configured 
            assistant. In a production environment, these metrics would reflect actual usage and performance 
            data from your deployed assistant.
          </p>
        </div>
      </Section>
    </MainLayout>
  );
} 