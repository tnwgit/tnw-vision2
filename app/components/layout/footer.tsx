"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logos/logoTNW.svg" 
                alt="The next wilson logo" 
                width={180} 
                height={40} 
                className="h-10 w-auto" 
                priority
              />
            </Link>
            <p className="text-gray-600 max-w-xs">
              Bringing AI assistants to all organizations with a human touch.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#1da1f2] transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#4267B2] transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#0077b5] transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#e1306c] transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-[#3182ce] tracking-wider uppercase">
                Solutions
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/solutions/hotel" className="text-gray-600 hover:text-[#3182ce]">
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/municipality" className="text-gray-600 hover:text-[#16bdca]">
                    Municipalities
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/legal" className="text-gray-600 hover:text-[#ff9e2c]">
                    Law firms
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/custom" className="text-gray-600 hover:text-[#7e3af2]">
                    Custom AI solutions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#7e3af2] tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-[#3182ce]">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-[#7e3af2]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-[#16bdca]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-[#ff9e2c]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#16bdca] tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-[#3182ce]">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-[#7e3af2]">
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-gray-600 hover:text-[#16bdca]">
                    Cookie policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} The next wilson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 