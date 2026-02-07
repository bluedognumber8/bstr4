// src/components/product/CrossSell/RelatedProducts.tsx
"use client";

import { styled } from "next-yak";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  margin-bottom: var(--space-8);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-5);
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin: 0;
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--action-primary);

  &:hover {
    gap: var(--space-2);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);

  ${queries.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${queries.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductCard = styled(Link)`
  display: block;
  padding: var(--space-4);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  transition: all 0.2s;

  &:hover {
    border-color: var(--border-strong);
    transform: translateY(-2px);
  }
`;

const ProductImage = styled.div`
  aspect-ratio: 16/9;
  border-radius: var(--radius-md);
  background: var(--bg-canvas);
  overflow: hidden;
  margin-bottom: var(--space-3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductName = styled.div`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--fg-primary);
  margin-bottom: var(--space-1);
  line-height: 1.3;

  /* Clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductSubtitle = styled.div`
  font-size: 0.8125rem;
  color: var(--fg-muted);
  margin-bottom: var(--space-2);

  /* Clamp to 1 line */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.div`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  color: var(--fg-primary);

  .prefix {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--fg-muted);
  }
`;

// --- COMPONENT ---

interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  price: {
    type: string;
    value: number;
  };
}

interface Props {
  title?: string;
  products: Product[];
  gameSlug: string;
  viewAllHref?: string;
}

export const RelatedProducts = ({
  title = "You Might Also Like",
  products,
  gameSlug,
  viewAllHref,
}: Props) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {viewAllHref && (
          <ViewAllLink href={viewAllHref}>
            View All
            <ChevronRight />
          </ViewAllLink>
        )}
      </Header>

      <Grid>
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            href={`/games/${gameSlug}/${product.slug}`}
          >
            <ProductImage>
              <img src={product.image} alt={product.title} />
            </ProductImage>
            <ProductName>{product.title}</ProductName>
            <ProductSubtitle>{product.subtitle}</ProductSubtitle>
            <ProductPrice>
              {product.price.type === "from" && (
                <span className="prefix">From </span>
              )}
              ${product.price.value.toFixed(2)}
            </ProductPrice>
          </ProductCard>
        ))}
      </Grid>
    </Container>
  );
};
