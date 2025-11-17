// middleware.ts

import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing'; // Adjust path as necessary

export default createMiddleware(routing);

export const config = {
  // This matcher ensures the middleware runs on all page routes
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};