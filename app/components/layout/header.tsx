"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center"
            >
              <Image 
                src="/images/logos/logoTNW.svg" 
                alt="The next wilson logo" 
                width={180} 
                height={40} 
                className="h-10 w-auto" 
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/about" 
              className="text-sm font-medium text-gray-700 hover:text-[#3182ce] transition-colors"
            >
              About us
            </Link>
            <Link 
              href="/solutions" 
              className="text-sm font-medium text-gray-700 hover:text-[#7e3af2] transition-colors"
            >
              Solutions
            </Link>
            <Link 
              href="/benefits" 
              className="text-sm font-medium text-gray-700 hover:text-[#16bdca] transition-colors"
            >
              Benefits
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-gray-700 hover:text-[#ff9e2c] transition-colors"
            >
              Contact
            </Link>
            <Button asChild variant="gradient-mixed" className="ml-4">
              <Link href="/demo" className="w-full h-full flex items-center justify-center">Try demo</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3182ce] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </Link>
            <Link
              href="/solutions"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#7e3af2] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/benefits"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#16bdca] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff9e2c] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <Button asChild variant="gradient-mixed" className="w-full">
                <Link href="/demo" onClick={() => setIsMenuOpen(false)} className="w-full h-full flex items-center justify-center">
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