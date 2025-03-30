import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './config';

// Dit bestand wordt gebruikt door next-intl om de locale te bepalen
export default getRequestConfig(async ({ locale }) => {
  // Gebruik de locale parameter of de standaard
  const resolvedLocale = locale || defaultLocale;
  
  try {
    // Dynamisch laden van berichten op basis van locale
    const messages = (await import(`./locales/${resolvedLocale}/common.json`)).default;

    // Zorg dat de document lang correct is ingesteld op basis van de locale
    if (typeof document !== 'undefined') {
      document.documentElement.lang = resolvedLocale;
    }

    return {
      locale: resolvedLocale,
      messages
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${resolvedLocale}`, error);
    return {
      locale: defaultLocale, // Fallback naar Engels
      messages: await import('./locales/en/common.json').then(module => module.default)
    };
  }
}); 