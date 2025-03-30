'use client';

import { useLocale } from 'next-intl';
import { locales } from '@/app/i18n/config';
import { useTransition, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Globe } from 'lucide-react';

export function LanguageSelector({ isMobile = false }: { isMobile?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Functie om van taal te wisselen
  function switchLocale(newLocale: string) {
    if (newLocale === locale || isPending) return;
    
    startTransition(() => {
      router.push(`/${newLocale}`);
      setIsOpen(false);
    });
  }
  
  // Sluit dropdown wanneer er ergens anders wordt geklikt
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center transition-all ${
          isMobile 
            ? "w-full px-3 py-3 justify-between text-gray-700 hover:bg-gray-50 rounded-md gap-2" 
            : "p-1.5 rounded-full bg-gray-50 hover:bg-gray-100"
        }`}
        aria-label="Taal wijzigen"
        title="Taal wijzigen"
      >
        {isMobile ? (
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5 overflow-hidden rounded-full">
              <Image
                src={`/images/flags/${locale}.svg`}
                alt={locale === 'nl' ? 'Nederlandse vlag' : 'UK flag'}
                width={20}
                height={20}
                className="object-cover"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <span className="text-sm font-medium">
              {locale === 'nl' ? 'Nederlands' : 'English'}
            </span>
            <Globe className="h-4 w-4 text-gray-500 ml-auto" />
          </div>
        ) : (
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Image
              src={`/images/flags/${locale}.svg`}
              alt={locale === 'nl' ? 'Nederlandse vlag' : 'UK flag'}
              width={24}
              height={24}
              className="object-cover"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        )}
      </button>
      
      {isOpen && (
        <div className={`${
          isMobile 
            ? "relative w-full mt-1 bg-white rounded-md overflow-hidden"
            : "absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50"
        } divide-y divide-gray-100 ring-1 ring-gray-200`}>
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              disabled={isPending || loc === locale}
              className={`flex items-center gap-2 px-3 py-2.5 w-full transition-colors ${
                loc === locale 
                  ? 'bg-blue-50 text-blue-700 cursor-default' 
                  : 'hover:bg-gray-50'
              }`}
              aria-label={loc === 'nl' ? 'Nederlands' : 'English'}
            >
              <div className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image
                  src={`/images/flags/${loc}.svg`}
                  alt={loc === 'nl' ? 'Nederlandse vlag' : 'UK flag'}
                  width={20}
                  height={20}
                  className="object-cover"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <span className="text-sm font-medium">{loc === 'nl' ? 'Nederlands' : 'English'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 