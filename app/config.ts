// Ondersteunde talen in de applicatie
export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'en';

// Type voor ondersteunde talen
export type Locale = (typeof locales)[number];

// Type voor beschikbare organisatietypes
export type OrganizationType = 
  | 'healthcare' 
  | 'education' 
  | 'government' 
  | 'energy' 
  | 'finance' 
  | 'tech' 
  | 'retail' 
  | 'manufacturing'; 