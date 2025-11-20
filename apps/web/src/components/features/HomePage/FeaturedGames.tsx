"use client";

import { styled } from "next-yak";
import { useTranslations } from "next-intl";
import { queries } from "@/config/theme";

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto 6rem;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  text-align: center;
  color: var(--fg-primary);
  margin-bottom: 3rem;
  font-size: 2rem;
  font-weight: 700;

  ${queries.md} {
    font-size: 2.5rem;
  }
`;

// UPDATED GRID LOGIC
const ProductGrid = styled.div`
  display: grid;
  gap: 2rem;

  /* 1. Mobile: 1 Column */
  grid-template-columns: 1fr;

  /* 2. Tablet (768px+): 2 Columns */
  ${queries.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 3. Desktop (1024px+): 3 Columns */
  ${queries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  /* 4. Wide (1280px+): 4 Columns (Fits all 4 mock items perfectly) */
  /* If you strictly want only 3 max, delete this block */
  ${queries.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductCard = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* Ensures content stretches */

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    border-color: var(--action-primary);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  flex: 1; /* Pushes content to fill height if grid rows vary */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--fg-primary);
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--action-primary);
  margin-top: auto; /* Ensures price stays at bottom */
`;

// Mock Images
const IMAGES = [
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
  "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80",
];

export const FeaturedGames = () => {
  const t = useTranslations("home.games");
  const list = t.raw("list") as { name: string }[];

  return (
    <Section>
      <SectionTitle>{t("title")}</SectionTitle>
      <ProductGrid>
        {list.map((game, index) => (
          <ProductCard key={index}>
            <ImageWrapper>
              <img src={IMAGES[index]} alt={game.name} />
            </ImageWrapper>
            <ProductInfo>
              <ProductName>{game.name}</ProductName>
              <ProductPrice>{t("action")}</ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Section>
  );
};
