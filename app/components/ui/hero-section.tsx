"use client";

import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string;
  secondaryLink?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryText,
  secondaryLink
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Achtergrond met kleurrijke gradient en patronen */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff] via-[#f8fbff] to-white z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 z-0"></div>
      
      {/* Decoratieve elementen - meerdere kleuren gebruikt uit het logo */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#3182ce] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#7e3af2] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-[#16bdca] opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-40 left-20 w-48 h-48 bg-[#ff9e2c] opacity-5 rounded-full blur-2xl"></div>
      
      {/* Animatie elementen - meer stippen met verschillende groottes en minder opvallende animaties */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Blauwe stippen */}
        <div 
          className="absolute w-2 h-2 bg-[#3182ce] opacity-20 rounded-full animate-float-1" 
          style={{ 
            top: '15%', 
            left: '22%'
          }}
        />
        
        <div 
          className="absolute w-1.5 h-1.5 bg-[#3182ce] opacity-15 rounded-full animate-float-2" 
          style={{ 
            top: '35%', 
            left: '12%'
          }}
        />
        
        {/* Paarse stippen */}
        <div 
          className="absolute w-3 h-3 bg-[#7e3af2] opacity-15 rounded-full animate-float-3" 
          style={{ 
            top: '28%', 
            right: '18%'
          }}
        />
        
        <div 
          className="absolute w-2 h-2 bg-[#7e3af2] opacity-10 rounded-full animate-float-4" 
          style={{ 
            top: '65%', 
            right: '30%'
          }}
        />
        
        {/* Teal stippen */}
        <div 
          className="absolute w-2.5 h-2.5 bg-[#16bdca] opacity-20 rounded-full animate-float-5" 
          style={{ 
            bottom: '32%', 
            right: '15%'
          }}
        />
        
        <div 
          className="absolute w-1.5 h-1.5 bg-[#16bdca] opacity-15 rounded-full animate-float-6" 
          style={{ 
            bottom: '22%', 
            right: '42%'
          }}
        />
        
        {/* Oranje/amber stippen */}
        <div 
          className="absolute w-2 h-2 bg-[#ff9e2c] opacity-15 rounded-full animate-float-7" 
          style={{ 
            bottom: '38%', 
            left: '25%'
          }}
        />
        
        <div 
          className="absolute w-1.5 h-1.5 bg-[#ff9e2c] opacity-10 rounded-full animate-float-8" 
          style={{ 
            top: '42%', 
            left: '38%'
          }}
        />
        
        {/* Rode stippen (minder) */}
        <div 
          className="absolute w-2 h-2 bg-[#e02424] opacity-10 rounded-full animate-float-9" 
          style={{ 
            top: '55%', 
            left: '15%'
          }}
        />
        
        {/* Donkerblauw stippen */}
        <div 
          className="absolute w-2 h-2 bg-[#2c5282] opacity-20 rounded-full animate-float-10" 
          style={{ 
            top: '18%', 
            right: '23%'
          }}
        />
        
        {/* Groene stippen */}
        <div 
          className="absolute w-2 h-2 bg-[#0d9488] opacity-15 rounded-full animate-float-11" 
          style={{ 
            bottom: '15%', 
            right: '18%'
          }}
        />
        
        {/* Extra stippen met andere posities */}
        <div 
          className="absolute w-1.5 h-1.5 bg-[#3182ce] opacity-10 rounded-full animate-float-12" 
          style={{ 
            top: '48%', 
            left: '78%'
          }}
        />
        
        <div 
          className="absolute w-1.5 h-1.5 bg-[#7e3af2] opacity-15 rounded-full animate-float-13" 
          style={{ 
            bottom: '60%', 
            left: '63%'
          }}
        />
      </div>
      
      <div className="relative z-10 pt-24 pb-20 md:pt-28 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2c5282] to-[#7e3af2]">
                {title}
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              {subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="gradient-mixed" className="sm:px-8 font-medium">
                <Link href={ctaLink} className="w-full h-full flex items-center justify-center">
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {secondaryText && secondaryLink && (
                <Button asChild size="lg" variant="outline" className="sm:px-8 font-medium border-[#7e3af2] text-[#7e3af2]">
                  <Link href={secondaryLink} className="w-full h-full flex items-center justify-center">
                    {secondaryText}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 bg-white border-t border-gray-50 border-opacity-50 py-10 shadow-[0_-1px_10px_-4px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[#7e3af2] font-medium mb-6">
            TRUSTED BY INNOVATIVE ORGANIZATIONS
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-1 flex justify-center md:col-span-1">
              <Image 
                className="h-12 opacity-70 hover:opacity-100 transition-opacity" 
                src="/images/logos/placeholder-logo-1.svg" 
                alt="Client logo"
                width={120}
                height={48}
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <Image 
                className="h-12 opacity-70 hover:opacity-100 transition-opacity" 
                src="/images/logos/placeholder-logo-2.svg" 
                alt="Client logo"
                width={120}
                height={48}
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <Image 
                className="h-12 opacity-70 hover:opacity-100 transition-opacity" 
                src="/images/logos/placeholder-logo-3.svg" 
                alt="Client logo"
                width={120}
                height={48}
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <Image 
                className="h-12 opacity-70 hover:opacity-100 transition-opacity" 
                src="/images/logos/placeholder-logo-4.svg" 
                alt="Client logo"
                width={120}
                height={48}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 