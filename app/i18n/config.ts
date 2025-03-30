import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'nl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const pathnames = {
  '/': '/',
  '/demo': '/demo',
  '/about': '/about',
  '/wizard': '/wizard'
} satisfies Pathnames<typeof locales>;

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands'
}; 