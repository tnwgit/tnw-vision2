"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

export function AuthStatus() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('header');

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

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(`/${locale}`);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></span>
        <span className="sr-only">Laden...</span>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Gebruikersmenu"
        >
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200">
            <div className="p-3 border-b border-gray-100">
              <div className="font-medium text-gray-900">
                {session.user.name || session.user.email}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {session.user.email}
              </div>
              {session.user.role && (
                <span className="inline-block mt-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                  {session.user.role === "admin" ? "Administrator" : 
                   session.user.role === "contentManager" ? "Content Manager" : "Gebruiker"}
                </span>
              )}
            </div>
            
            <div className="p-2">
              <Link 
                href={`/${locale}/profile`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('profile')}
              </Link>
              
              {session.user.role === "admin" && (
                <Link 
                  href={`/${locale}/admin`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <span className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Link href={`/${locale}/auth/login`} passHref>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-blue-600 hover:bg-transparent border-none shadow-none"
        >
          <LogIn className="h-4 w-4 mr-1.5" />
          <span className="text-sm">{t('login')}</span>
        </Button>
      </Link>
    </div>
  );
} 