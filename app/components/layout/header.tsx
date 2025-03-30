"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { LanguageSelector } from "../ui/language-selector";
import { Button } from "../ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();

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
              About us
            </Link>
            <Link 
              href={`/${locale}/solutions`}
              className="text-sm font-medium text-gray-700 hover:text-[#7e3af2] transition-colors"
            >
              Solutions
            </Link>
            <Link 
              href={`/${locale}/benefits`}
              className="text-sm font-medium text-gray-700 hover:text-[#16bdca] transition-colors"
            >
              Benefits
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="text-sm font-medium text-gray-700 hover:text-[#ff9e2c] transition-colors"
            >
              Contact
            </Link>
            
            <LanguageSelector />
            
            <Button asChild variant="gradient-mixed" className="ml-4">
              <Link href={`/${locale}/demo`} className="w-full h-full flex items-center justify-center">Try demo</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="ml-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
            <Link
              href={`/${locale}/about`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3182ce] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </Link>
            <Link
              href={`/${locale}/solutions`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#7e3af2] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href={`/${locale}/benefits`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#16bdca] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff9e2c] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <Button asChild variant="gradient-mixed" className="w-full">
                <Link href={`/${locale}/demo`} onClick={() => setIsMenuOpen(false)} className="w-full h-full flex items-center justify-center">
                  Try demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 