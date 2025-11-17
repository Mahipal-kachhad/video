// src/i18n/routing.ts

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'fr'], // Your supported locales
  defaultLocale: 'en', // The fallback locale
  // localePrefix: 'as-needed', // Optional: for prefixing locales in the URL
});

// Create navigation wrappers for type-safe routing
import { createNavigation } from 'next-intl/navigation';
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);