import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './config';

// Dit bestand wordt gebruikt door next-intl om de locale te bepalen
export default getRequestConfig(async ({ locale }) => {
  // Gebruik de locale parameter of de standaard
  const resolvedLocale = locale || defaultLocale;
  
  try {
    // Basisbericht laden (common namespace)
    const commonMessages = (await import(`./locales/${resolvedLocale}/common.json`)).default;
    
    // Alle andere beschikbare namespaces laden
    let allMessages = { ...commonMessages };
    
    try {
      // AI-visualisatie berichten laden
      const aiVisualizationMessages = (await import(`./locales/${resolvedLocale}/ai-visualization.json`)).default;
      allMessages = { ...allMessages, 'ai-visualization': aiVisualizationMessages };
    } catch (error) {
      console.warn(`Could not load ai-visualization messages for locale: ${resolvedLocale}`);
    }
    
    try {
      // Organisatie visualisatie berichten laden
      const orgVisualizationMessages = (await import(`./locales/${resolvedLocale}/organization-visualization.json`)).default;
      allMessages = { ...allMessages, 'organization-visualization': orgVisualizationMessages };
    } catch (error) {
      console.warn(`Could not load organization-visualization messages for locale: ${resolvedLocale}`);
    }
    
    try {
      // Organisatie berichten laden
      const organizationMessages = (await import(`./locales/${resolvedLocale}/organization.json`)).default;
      allMessages = { ...allMessages, 'organization': organizationMessages };
    } catch (error) {
      console.warn(`Could not load organization messages for locale: ${resolvedLocale}`);
    }

    // Zorg dat de document lang correct is ingesteld op basis van de locale
    if (typeof document !== 'undefined') {
      document.documentElement.lang = resolvedLocale;
    }

    return {
      locale: resolvedLocale,
      messages: allMessages
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${resolvedLocale}`, error);
    return {
      locale: defaultLocale, // Fallback naar Engels
      messages: await import('./locales/en/common.json').then(module => module.default)
    };
  }
}); 