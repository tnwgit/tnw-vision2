import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";
import * as LucideIcons from "lucide-react";

/**
 * Combines multiple class names into a single string, merging Tailwind classes properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format number with locale
export function formatNumber(number: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Gets the icon component from string name
 */
export function getIcon(iconName: string) {
  // Try to get icon from Lucide icons
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return Icon;
}

// Format currency
export function formatCurrency(amount: number, currency = 'EUR', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Calculate percent change with sign
export function formatPercentChange(change: number): string {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change}%`;
}

// Generates a UUID
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Simple slugify function
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Formats a date to a readable string based on the current locale
 */
export function formatDate(date: Date, locale: string = 'nl'): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
} 