// Interfaces voor The Next Wilson applicatie

// Organisatietype
export interface OrganizationType {
  id: string;
  name: string;
  description: string;
  icon: string;
  assistants: Assistant[];
}

// Assistent
export interface Assistant {
  id: string;
  name: string;
  description: string;
  image: string;
  benefits: string[];
  organizationTypeId: string;
  modules: Module[];
}

// Module
export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ModuleCategory;
  configOptions: ConfigOption[];
  isRequired: boolean;
  defaultEnabled: boolean;
}

// Module categorieën
export enum ModuleCategory {
  Authentication = "Authentication",
  Security = "Security",
  Integration = "Integration",
  Communication = "Communication",
  Knowledge = "Knowledge",
  Reporting = "Reporting"
}

// Configuratie optie
export interface ConfigOption {
  id: string;
  name: string;
  description: string;
  type: ConfigOptionType;
  required: boolean;
  defaultValue?: string | boolean | number;
  options?: string[] | number[];
}

// Configuratie optie type
export enum ConfigOptionType {
  Text = "Text",
  Select = "Select",
  Toggle = "Toggle",
  Number = "Number",
  MultiSelect = "MultiSelect"
}

// Configuratie van een assistent
export interface AssistantConfig {
  assistantId: string;
  modules: ModuleConfig[];
}

// Configuratie van een module
export interface ModuleConfig {
  moduleId: string;
  enabled: boolean;
  settings: Record<string, string | boolean | number | string[]>;
}

// Dashboard type
export enum DashboardType {
  Customer = "Customer",
  Management = "Management",
  Technical = "Technical"
}

// Dashboard data
export interface DashboardData {
  type: DashboardType;
  metrics: Metric[];
}

// Metriek voor dashboards
export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  chart?: Record<string, unknown>; // Complexere structuur voor chartdata
} 