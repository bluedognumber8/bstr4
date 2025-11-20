// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter, Sora, Geist_Mono } from "next/font/google";

import "../globals.css";
import { hasLocale } from "next-intl";
import {
  setRequestLocale,
  getMessages,
  getTranslations,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import AppProviders from "@/providers";
import Header from "@/components/features/Header";
import Footer from "@/components/features/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // body/main text
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora", // headings
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono", // code
});

/* 1️⃣ locale-aware metadata */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  // ✔ recommended: pass locale for clarity + type safety
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${geistMono.variable}`}
    >
      <body>
        <AppProviders locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
