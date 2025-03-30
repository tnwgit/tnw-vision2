import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type ProviderProps = {
  locale: string;
  messages: Record<string, any>;
  children: ReactNode;
  now?: Date;
  timeZone?: string;
};

export function I18nProvider({
  locale,
  messages,
  children,
  now,
  timeZone
}: ProviderProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      now={now}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
} 