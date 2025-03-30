import { Locale, defaultLocale } from './config';

export async function getMessages(locale: string) {
  // Zorg ervoor dat we een geldige locale hebben
  const safeLocale = locale || defaultLocale;

  try {
    // Gebruik een relatief pad dat goed werkt met de huidige structuur
    return (await import(`./locales/${safeLocale}/common.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${safeLocale}`, error);
    // Als er een fout is, probeer de standaardtaal te laden
    if (safeLocale !== defaultLocale) {
      try {
        return (await import(`./locales/${defaultLocale}/common.json`)).default;
      } catch (fallbackError) {
        console.error(`Failed to load default messages too`, fallbackError);
      }
    }
    // Als alles faalt, geef een leeg object terug
    return {};
  }
} 