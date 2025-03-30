'use client';

import { useLocale } from 'next-intl';
import { locales } from '@/app/i18n/config';
import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  
  // Functie om van taal te wisselen
  function switchLocale(newLocale: string) {
    if (newLocale === locale || isPending) return;
    
    startTransition(() => {
      router.push(`/${newLocale}`);
      setIsOpen(false);
    });
  }
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-6 w-6 overflow-hidden rounded-full transition-all hover:opacity-90"
        aria-label="Taal wijzigen"
        title="Taal wijzigen"
      >
        <Image
          src={`/images/flags/${locale}.svg`}
          alt={locale === 'nl' ? 'Nederlandse vlag' : 'UK flag'}
          width={24}
          height={24}
          className="object-cover"
          style={{ width: 'auto', height: 'auto' }}
        />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-auto rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              disabled={isPending || loc === locale}
              className={`flex items-center gap-2 px-3 py-2 rounded-md w-full ${
                loc === locale 
                  ? 'bg-gray-100 cursor-default' 
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
              <span className="text-sm">{loc === 'nl' ? 'Nederlands' : 'English'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 