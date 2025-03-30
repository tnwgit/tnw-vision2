import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './app/i18n/config';
import { NextResponse, type NextRequest } from 'next/server';

// Deze middleware zorgt voor taaldetectie en routering
const intlMiddleware = createMiddleware({
  // Beschikbare talen
  locales,
  
  // Standaardtaal
  defaultLocale,
  
  // Als de huidige URL geen taalcode heeft, gebruik dan de browser taal
  // of anders de standaard
  localeDetection: true
});

// Wrapper functie rondom de intl middleware om extra headers toe te voegen
export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  
  // Haal de locale uit de URL
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  // Als we een locale hebben, voeg die toe aan de headers
  if (!pathnameIsMissingLocale) {
    const locale = pathname.split('/')[1];
    
    // Zorg dat de volgende headers beschikbaar zijn voor client-side rendering
    // Dit zorgt ervoor dat het HTML element de juiste taal krijgt
    response.headers.set('x-next-locale', locale);
  }
  
  return response;
}

export const config = {
  // Matcher configureert op welke routes de middleware wordt toegepast
  // Skip NextJS systeem routes en statische bestanden
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 