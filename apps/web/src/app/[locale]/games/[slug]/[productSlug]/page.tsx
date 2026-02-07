// apps/web/src/app/[locale]/games/[slug]/[productSlug]/page.tsx
// import { notFound } from "next/navigation";
// import { getGame, getProduct, CatalogueGame, CatalogueProduct } from "@/data/catalogue";
// import { FixedProductLayout } from "@/components/features/Product/Layouts/FixedProductLayout";
// import { CalculatorLayout } from "@/components/features/Product/Layouts/CalculatorLayout";

// interface Props {
//   params: Promise<{ slug: string; productSlug: string }>;
// }

// export default async function ProductPage({ params }: Props) {
//   const { slug, productSlug } = await params;

//   const game = getGame(slug);
//   const product = getProduct(slug, productSlug);

//   if (!game || !product) notFound();

//   // If layout is "wide", use the App Layout (e.g., Dota MMR)
//   if (product.layout === "wide") {
//     return <CalculatorLayout game={game} product={product} />;
//   }

//   // Default to Fixed Layout (E-commerce style)
//   return <FixedProductLayout game={game} product={product} />;
// }

//------------------------------- new
// apps/web/src/app/[locale]/games/[slug]/[productSlug]/page.tsx
// apps/web/src/app/[locale]/games/[slug]/[productSlug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProduct } from "@/data/products";
import { getGame } from "@/data/catalogue";
import { ProductPageLayout } from "@/components/product";
import { MMRBoostProductPage } from "@/components/features/Calculators/dota/MMRBoostProductPage";

// --- TYPES ---

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
    productSlug: string;
  }>;
};

// --- CUSTOM CALCULATOR MAPPING ---
// Products that use custom calculators instead of generic ProductPageLayout

const CUSTOM_CALCULATORS: Record<
  string,
  Record<string, React.ComponentType<any>>
> = {
  "dota-2": {
    "mmr-boost": () => <MMRBoostProductPage mode="solo" />,
    "mmr-boost-duo": () => <MMRBoostProductPage mode="duo" />,
    // Add more custom calculators as needed
    // "net-wins": NetWinsProductPage,
  },
};

// --- METADATA ---

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, productSlug } = await params;

  // Check for custom SEO first
  const customSEO = getCustomSEO(slug, productSlug);
  if (customSEO) return customSEO;

  // Fall back to generic product data
  const productData = getProduct(slug, productSlug);
  if (!productData) {
    return { title: "Product Not Found" };
  }

  return {
    title: productData.seo.title,
    description: productData.seo.description,
    openGraph: {
      title: productData.seo.title,
      description: productData.seo.description,
      images: [productData.heroImage],
      type: "website",
    },
  };
}

function getCustomSEO(gameSlug: string, productSlug: string): Metadata | null {
  const customSEOMap: Record<string, Record<string, Metadata>> = {
    "dota-2": {
      "mmr-boost": {
        title: "Dota 2 MMR Boost | Solo Queue Boosting | BSTR4",
        description:
          "Professional Dota 2 MMR boosting from 7K+ players. VPN protected, 80%+ winrate, fast delivery. Climb from any rank to Immortal.",
        openGraph: {
          title: "Dota 2 MMR Boost | Solo Queue Boosting | BSTR4",
          description: "Professional Dota 2 MMR boosting from 7K+ players.",
          images: ["/images/games/dota2/products/mmr-boost-og.jpg"],
          type: "website",
        },
      },
      "mmr-boost-duo": {
        title: "Dota 2 Duo MMR Boost | Play With Pro Booster | BSTR4",
        description:
          "Play alongside a 7K+ MMR professional. Learn while climbing, no account sharing required. Duo queue Dota 2 boosting.",
        openGraph: {
          title: "Dota 2 Duo MMR Boost | Play With Pro Booster | BSTR4",
          description: "Play alongside a 7K+ MMR professional booster.",
          images: ["/images/games/dota2/products/duo-boost-og.jpg"],
          type: "website",
        },
      },
    },
  };

  return customSEOMap[gameSlug]?.[productSlug] || null;
}

// --- STATIC PARAMS ---

export async function generateStaticParams() {
  return [
    // Custom calculator products
    { slug: "dota-2", productSlug: "mmr-boost" },
    { slug: "dota-2", productSlug: "mmr-boost-duo" },
    // Generic products
    { slug: "dota-2", productSlug: "calibration-matches" },
    { slug: "dota-2", productSlug: "behavior-score-boost" },
    { slug: "dota-2", productSlug: "low-priority-removal" },
  ];
}

// --- PAGE COMPONENT ---

export default async function ProductPage({ params }: Props) {
  const { slug, productSlug } = await params;

  // Check if game exists
  const gameData = getGame(slug);
  if (!gameData || !gameData.isActive) {
    return notFound();
  }

  // Check for custom calculator
  const CustomCalculator = CUSTOM_CALCULATORS[slug]?.[productSlug];
  if (CustomCalculator) {
    return (
      <>
        {generateJsonLdForCustom(slug, productSlug)}
        <CustomCalculator />
      </>
    );
  }

  // Fall back to generic product page
  const productData = getProduct(slug, productSlug);
  if (!productData) {
    return notFound();
  }

  return (
    <>
      {generateJsonLd(productData)}
      <ProductPageLayout data={productData} />
    </>
  );
}

// --- JSON-LD HELPERS ---

function generateJsonLdForCustom(gameSlug: string, productSlug: string) {
  // Custom JSON-LD for MMR boost products
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      productSlug === "mmr-boost-duo"
        ? "Dota 2 Duo MMR Boost"
        : "Dota 2 MMR Boost",
    description: "Professional Dota 2 MMR boosting service",
    provider: {
      "@type": "Organization",
      name: "BSTR4",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 2341,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function generateJsonLd(
  productData: NonNullable<ReturnType<typeof getProduct>>
) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: productData.title,
    description: productData.shortDescription,
    provider: {
      "@type": "Organization",
      name: "BSTR4",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: productData.trust.rating,
      reviewCount: productData.trust.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
