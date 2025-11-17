// app/[locale]/layout.tsx (Corrected)

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../globals.css";

// Define your supported locales centrally
const locales = ["en", "hi", "gu"];

export const metadata: Metadata = {
  title: "MVTY Dham",
  description: "Maa Vishvambhari TirthYatra Dham",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  // 🔑 THE CRITICAL FIX: Destructure the resolved object from the awaited params
  params,
}: {
  children: React.ReactNode;
  // 🔑 Correct the type to show params is a Promise of the object
  params: Promise<{ locale: string }>; 
}) {
  // 🔑 THE CRITICAL FIX: AWAIT the params Promise before accessing 'locale'
  const { locale } = await params; 

  // 1. Check if the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }

  // 2. Load the messages using the server function
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}