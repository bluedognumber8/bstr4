//apps/web/src/components/features/Product/Layouts/FixedProductLayout.tsx
"use client";
import Image from "next/image";
import { styled } from "next-yak";
import { Game, Product } from "@/data/mock-games";
import { CalculatorRegistry } from "../../Calculators/CalculatorRegistry";
import { ProductFAQ } from "../ProductFAQ";
import { ReviewWall } from "../ReviewWall";
import { ProductRating } from "../ProductRating";
import { TrustSignal } from "../TrustSignal";
import { CrossSell } from "../CrossSell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import { queries } from "@/config/theme";
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; // Prevent layout shift
  margin-bottom: 32px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Grid = styled.div`
  display: grid;
  gap: 40px;
  align-items: start;

  ${queries.lg} {
    grid-template-columns: 1.5fr 1fr;
  }
`;

const MainContent = styled.div``;

const StickySidebar = styled.div`
  position: sticky;
  top: 100px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProductTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: 16px;
  line-height: 1.1;
`;

const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--fg-secondary);
  margin-bottom: 40px;
`;

interface Props {
  game: Game;
  product: Product;
  categorySlug: string;
}

export const FixedProductLayout = ({ game, product, categorySlug }: Props) => {
  const categoryName =
    game.categories.find((c) => c.slug === categorySlug)?.name || categorySlug;

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Games", href: "/games" },
          { label: game.name, href: `/games/${game.slug}` },
          { label: categoryName, href: `/games/${game.slug}/${categorySlug}` },
          { label: product.title, href: undefined },
        ]}
      />

      <Grid>
        <MainContent>
          <Link
            href={`/games/${game.slug}/${categorySlug}`}
            style={{
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 12,
            }}
          >
            <Badge variant="primary">{categoryName}</Badge>
          </Link>

          <ProductTitle>{product.title}</ProductTitle>
          <ProductRating />
          <TrustSignal />

          <ImageWrapper>
            <Image
              src={product.image}
              alt={product.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </ImageWrapper>

          <Description>
            <p>{product.description || "Instant delivery via secure trade."}</p>
          </Description>

          <ProductFAQ
            gameSlug={product.gameSlug}
            categorySlug={product.categorySlug}
          />
          <ReviewWall />
        </MainContent>

        <StickySidebar>
          {/* Reuses the Simple Calculator/Add Button */}
          <CalculatorRegistry product={product} />
          <CrossSell relatedIds={product.relatedProducts} />
        </StickySidebar>
      </Grid>
    </Container>
  );
};
