import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing'; 

export default getRequestConfig(async (params) => {
  const { locale } = params;
  const finalLocale = locale || routing.defaultLocale;
  
  return {
    locale: finalLocale,
    messages: (await import(`../../messages/${finalLocale}.json`)).default,
  };
});