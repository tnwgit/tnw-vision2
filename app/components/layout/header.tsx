"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSelector } from "../ui/language-selector";
import { Button } from "../ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();
  const t = useTranslations('navigation');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image 
              src="/images/logos/logoTNW.svg"
              alt="The Next Wilson logo"
              width={150}
              height={40}
              className="h-12 w-auto"
            />
          </Link>

          {/* Navigation items - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href={`/${locale}/about`}
              className="text-sm font-medium text-gray-700 hover:text-[#3182ce] transition-colors whitespace-nowrap"
            >
              {t('about')}
            </Link>
            <Link 
              href={`/${locale}/solutions`}
              className="text-sm font-medium text-gray-700 hover:text-[#7e3af2] transition-colors"
            >
              {t('solutions')}
            </Link>
            <Link 
              href={`/${locale}/benefits`}
              className="text-sm font-medium text-gray-700 hover:text-[#16bdca] transition-colors"
            >
              {t('benefits')}
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="text-sm font-medium text-gray-700 hover:text-[#ff9e2c] transition-colors"
            >
              {t('contact')}
            </Link>
            
            <LanguageSelector />
            
            <Button asChild variant="gradient-mixed" className="ml-4">
              <Link href={`/${locale}/demo`} className="w-full h-full flex items-center justify-center">{t('tryDemo')}</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
              className="ml-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
            <Link
              href={`/${locale}/about`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3182ce] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/solutions`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#7e3af2] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('solutions')}
            </Link>
            <Link
              href={`/${locale}/benefits`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#16bdca] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('benefits')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff9e2c] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            
            {/* Language selector in mobiel menu */}
            <div className="py-1">
              <div className="px-3 py-2">
                <LanguageSelector isMobile={true} />
              </div>
            </div>
            
            <div className="pt-2">
              <Button asChild variant="gradient-mixed" className="w-full">
                <Link href={`/${locale}/demo`} onClick={() => setIsMenuOpen(false)} className="w-full h-full flex items-center justify-center">
                  {t('tryDemo')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 