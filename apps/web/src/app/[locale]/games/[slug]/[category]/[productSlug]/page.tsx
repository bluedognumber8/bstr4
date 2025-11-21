//apps/web/src/app/[locale]/games/[slug]/[category]/[productSlug]/page.tsx
import { notFound } from "next/navigation";
import { MOCK_GAMES, MOCK_PRODUCTS } from "@/data/mock-games";
import { FixedProductLayout } from "@/components/features/Product/Layouts/FixedProductLayout";
import { CalculatorLayout } from "@/components/features/Product/Layouts/CalculatorLayout";

export default async function ProductPage({ params }: Props) {
  const { slug, productSlug } = await params;

  const game = MOCK_GAMES.find((g) => g.slug === slug);
  const product = MOCK_PRODUCTS.find((p) => p.slug === productSlug);

  if (!game || !product) notFound();

  // THE NEW LOGIC:
  // If layout is "wide", use the App Layout (Dota)
  if (product.layout === "wide") {
    return (
      <CalculatorLayout
        game={game}
        product={product}
        categorySlug={product.categorySlug}
      />
    );
  }

  // Default to Fixed Layout (E-commerce style)
  return (
    <FixedProductLayout
      game={game}
      product={product}
      categorySlug={product.categorySlug}
    />
  );
}
