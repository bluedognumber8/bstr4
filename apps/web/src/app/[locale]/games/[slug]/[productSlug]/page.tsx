// apps/web/src/app/[locale]/games/[slug]/[productSlug]/page.tsx
import { notFound } from "next/navigation";
import { getGame, getProduct, CatalogueGame, CatalogueProduct } from "@/data/catalogue";
import { FixedProductLayout } from "@/components/features/Product/Layouts/FixedProductLayout";
import { CalculatorLayout } from "@/components/features/Product/Layouts/CalculatorLayout";

interface Props {
  params: Promise<{ slug: string; productSlug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug, productSlug } = await params;

  const game = getGame(slug);
  const product = getProduct(slug, productSlug);

  if (!game || !product) notFound();

  // If layout is "wide", use the App Layout (e.g., Dota MMR)
  if (product.layout === "wide") {
    return <CalculatorLayout game={game} product={product} />;
  }

  // Default to Fixed Layout (E-commerce style)
  return <FixedProductLayout game={game} product={product} />;
}
