"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export function Footer() {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* First Column - Logo and About */}
          <div>
            <div className="mb-6">
              <Link href={`/${locale}`} className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
                The Next Wilson
              </Link>
            </div>
            <p className="text-gray-400 mb-6">
              {locale === "nl" 
                ? "Gespecialiseerde AI-assistenten voor verschillende sectoren, gebouwd met een menselijke touch."
                : "Specialized AI assistants for various sectors, built with a human touch."}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Second Column - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {locale === "nl" ? "Snelle Links" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === "nl" ? "Over ons" : "About us"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/benefits`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === "nl" ? "Voordelen" : "Benefits"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/solutions`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === "nl" ? "Oplossingen" : "Solutions"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === "nl" ? "Contact" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Third Column - Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {locale === "nl" ? "Diensten" : "Services"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/wizard`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === "nl" ? "Configuratiewizard" : "Configuration Wizard"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/organization/healthcare`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === "nl" ? "Gezondheidszorg" : "Healthcare"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/organization/education`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === "nl" ? "Onderwijs" : "Education"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/organization/government`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === "nl" ? "Overheid" : "Government"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth Column - Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {locale === "nl" ? "Contact Informatie" : "Contact Information"}
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Amsterdam, Nederland</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@thenextwilson.com</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+31 (0)20 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} The Next Wilson. {locale === "nl" ? "Alle rechten voorbehouden." : "All rights reserved."}
          </p>
          <div className="flex space-x-6">
            <Link href={`/${locale}/privacy`} className="text-gray-500 hover:text-white text-sm transition-colors">
              {locale === "nl" ? "Privacybeleid" : "Privacy Policy"}
            </Link>
            <Link href={`/${locale}/terms`} className="text-gray-500 hover:text-white text-sm transition-colors">
              {locale === "nl" ? "Gebruiksvoorwaarden" : "Terms of Service"}
            </Link>
            <Link href={`/${locale}/cookies`} className="text-gray-500 hover:text-white text-sm transition-colors">
              {locale === "nl" ? "Cookiebeleid" : "Cookie Policy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 