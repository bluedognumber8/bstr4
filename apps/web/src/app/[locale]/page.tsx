import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import HomePage from "@/components/features/HomePage";
import { routing } from "@/i18n/routing";
import HomePageOld from "@/components/HomePageOld";

type Props = {
  params: Promise<{ locale: string }>;
};

// 1. Enable Static Rendering for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 2. SEO Metadata
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    // Open Graph is vital for sharing on Discord/Twitter/Slack
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // 3. Enable static rendering for this request
  setRequestLocale(locale);

  // 4. JSON-LD (Schema.org) for E-commerce/Brand
  // This helps Google understand your site is a Store.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Gaming Shop",
    description: "Your ultimate destination for gaming gear",
    url: `https://yourwebsite.com/${locale}`,
    openingHours: "Mo-Su 00:00-23:59", // 24/7
  };

  return (
    <>
      {/* Inject Schema.org data invisible to user, visible to Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HomePage />
    </>
  );
}
