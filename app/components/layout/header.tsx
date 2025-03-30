"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import { LanguageSelector } from '../ui/language-selector';
import { AuthStatus } from '../auth/auth-status';

// Definieer letterlijke vertalingen voor navigatie-items
// Dit is een eenvoudigere aanpak dan het gebruik van useTranslations voor deze specifieke items
const translations = {
  en: {
    about: "About us",
    solutions: "Solutions",
    benefits: "Benefits",
    contact: "Contact"
  },
  nl: {
    about: "Over ons",
    solutions: "Oplossingen",
    benefits: "Voordelen",
    contact: "Contact"
  }
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  
  // Selecteer de juiste vertalingen op basis van de huidige taal
  const t = translations[locale as 'en' | 'nl'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Sluit het menu als er een navigatie plaatsvindt
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navigationItems = [
    { text: t.about, href: `/${locale}/about` },
    { text: t.solutions, href: `/${locale}/#solutions` },
    { text: t.benefits, href: `/${locale}/#benefits` },
    { text: t.contact, href: `/${locale}/#contact` },
  ];

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center">
              <Image 
                src="/images/logos/logoTNW.svg" 
                alt="The Next Wilson" 
                width={120} 
                height={40} 
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-6 mr-8">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  {item.text}
                </Link>
              ))}
            </div>
            
            {/* Taal selector */}
            <LanguageSelector />
            
            {/* Auth status en login/uitlog knoppen - helemaal rechts */}
            <div className="ml-6">
              <AuthStatus />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <LanguageSelector />
            
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md font-medium"
              >
                {item.text}
              </Link>
            ))}
            
            {/* Mobiele Auth Status */}
            <div className="px-3 py-2">
              <AuthStatus />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}; 