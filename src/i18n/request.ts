// src/i18n/request.ts (Confirmed clean)

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing'; // Import your routing config

export default getRequestConfig(async ({ requestLocale }) => {
  // Ensure requestLocale is resolved if it's a Promise (as per the previous fix)
  const locale = (await requestLocale) || routing.defaultLocale; 
  
  return {
    locale: locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});