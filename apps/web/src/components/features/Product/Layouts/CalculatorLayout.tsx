//apps/web/src/components/features/Product/Layouts/CalculatorLayout.tsx
"use client";

import { styled } from "next-yak";
import { Game, Product } from "@/data/mock-games";
import { CalculatorRegistry } from "../../Calculators/CalculatorRegistry";
import { HowItWorks } from "../HowItWorks";
import { ProductFAQ } from "../ProductFAQ";
import { ReviewWall } from "../ReviewWall";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import { queries } from "@/config/theme";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: 16px;
  line-height: 1.1;

  ${queries.md} {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--fg-secondary);
  line-height: 1.6;
`;

const CalculatorWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto 80px;
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 60px;

  ${queries.lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

interface Props {
  game: Game;
  product: Product;
  categorySlug: string;
}

export const CalculatorLayout = ({ game, product, categorySlug }: Props) => {
  // Find category name for breadcrumbs
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

      <Header>
        <Link
          href={`/games/${game.slug}/${categorySlug}`}
          style={{ textDecoration: "none" }}
        >
          <Badge variant="primary" className="mb-4">
            {categoryName}
          </Badge>
        </Link>
        <Title>{product.title}</Title>
        <Subtitle>{product.description}</Subtitle>
      </Header>

      <CalculatorWrapper>
        <CalculatorRegistry product={product} />
      </CalculatorWrapper>

      <HowItWorks />

      <ContentGrid>
        <div>
          <h3
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              marginBottom: 24,
              color: "var(--fg-primary)",
            }}
          >
            Why choose us?
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "var(--fg-secondary)",
              marginBottom: 24,
            }}
          >
            We are the only service that offers a live dashboard with real-time
            chat. Stop guessing where your booster is. Watch them play via our
            exclusive streaming integration.
          </p>
          <ProductFAQ
            gameSlug={product.gameSlug}
            categorySlug={product.categorySlug}
          />
        </div>
        <div>
          <ReviewWall />
        </div>
      </ContentGrid>
    </Container>
  );
};
