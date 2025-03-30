import { NextIntlClientProvider } from 'next-intl';
import { WizardContent } from '@/app/components/wizard-content';
import { searchParams } from 'next/navigation';

export default async function WizardPage({ params, searchParams }: { 
  params: { locale: string },
  searchParams?: { 
    assistant?: string,
    organization?: string 
  }
}) {
  // Server-side variabele voor locale
  const locale = params.locale;
  
  // Verkrijg de assistant en organization parameters uit de URL
  const assistantId = searchParams?.assistant || '';
  const organizationType = searchParams?.organization || '';
  
  // Server-side import van berichten
  const messages = await import(`@/app/i18n/locales/${locale}/common.json`).then(
    (module) => module.default
  ).catch((error) => {
    console.error(`Failed to load messages for locale: ${locale}`);
    // Fallback naar Engels als de vertaling niet kan worden geladen
    return import(`@/app/i18n/locales/en/common.json`).then(module => module.default);
  });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <WizardContent preselectedAssistant={assistantId} preselectedOrganization={organizationType} />
    </NextIntlClientProvider>
  );
} 