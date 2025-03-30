// Importeer de nodige componenten van next-intl
import { useTranslations } from 'next-intl';
import { locales, defaultLocale } from './config';

// Standaard padnamen voor routering
export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/contact': '/contact',
  '/solutions': '/solutions',
  '/benefits': '/benefits',
  '/demo': '/demo',
  '/wizard': '/wizard'
};

// We importeren Link en navigatiefuncties rechtstreeks in de componenten waar we ze nodig hebben
// Dit omzeilt het probleem met de niet-ondersteunde API in de huidige versie 