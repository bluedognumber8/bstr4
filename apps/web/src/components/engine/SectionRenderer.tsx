// src/components/engine/SectionRenderer.tsx
"use client";

import { styled } from "next-yak";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GameSection } from "./types";
import { ProductCard } from "./ProductCard";
import { queries } from "@/config/theme";

// --- STYLES ---

const Section = styled.section`
  margin-bottom: var(--space-12);
  scroll-margin-top: 100px; /* Offset for sticky header */
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-6);
  gap: var(--space-4);
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin: 0;
`;

const SectionDescription = styled.p`
  font-size: 0.9375rem;
  color: var(--fg-secondary);
  margin-top: var(--space-1);
  max-width: 600px;
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--action-primary);
  transition: gap 0.2s;

  &:hover {
    gap: var(--space-2);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Grid Layout
const ProductGrid = styled.div<{
  $colsMobile: number;
  $colsTablet: number;
  $colsDesktop: number;
}>`
  display: grid;
  gap: var(--space-5);
  grid-template-columns: repeat(${({ $colsMobile }) => $colsMobile}, 1fr);

  ${queries.md} {
    grid-template-columns: repeat(${({ $colsTablet }) => $colsTablet}, 1fr);
  }

  ${queries.lg} {
    grid-template-columns: repeat(${({ $colsDesktop }) => $colsDesktop}, 1fr);
  }
`;

// Table Layout
const TableWrapper = styled.div`
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  th {
    text-align: left;
    padding: var(--space-4);
    background-color: var(--bg-canvas);
    color: var(--fg-muted);
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid var(--border-subtle);
  }

  td {
    padding: var(--space-4);
    border-bottom: 1px solid var(--border-subtle);
    color: var(--fg-primary);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: var(--bg-surface-hover);
  }
`;

const TableTitle = styled.div`
  font-weight: 600;
  color: var(--fg-primary);
  margin-bottom: 2px;
`;

const TableSubtitle = styled.div`
  font-size: 0.8125rem;
  color: var(--fg-muted);
`;

const TablePrice = styled.span`
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--fg-primary);
`;

const TableAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  background-color: var(--action-primary);
  color: var(--fg-inverse);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--action-primary-hover);
  }
`;

// Carousel Layout
const CarouselWrapper = styled.div`
  display: flex;
  gap: var(--space-5);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: var(--space-4);
  margin-bottom: calc(var(--space-4) * -1);

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bg-surface);
    border-radius: var(--radius-full);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-strong);
    border-radius: var(--radius-full);
  }
`;

const CarouselItem = styled.div`
  flex-shrink: 0;
  width: 280px;
  scroll-snap-align: start;

  ${queries.md} {
    width: 320px;
  }
`;

// Featured Banner Layout
const FeaturedBanner = styled(Link)`
  display: block;
  position: relative;
  height: 280px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-size: cover;
  background-position: center;

  ${queries.md} {
    height: 320px;
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 60%);
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-6);
  color: var(--gray-0);
`;

const BannerTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--space-2);

  ${queries.md} {
    font-size: 2rem;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 0.9375rem;
  color: var(--gray-200);
  margin-bottom: var(--space-4);
`;

const BannerButton = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background-color: var(--gray-0);
  color: var(--gray-900);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
`;

// --- COMPONENT ---

interface Props {
  section: GameSection;
  gameSlug: string;
}

export const SectionRenderer = ({ section, gameSlug }: Props) => {
  const {
    id,
    anchor,
    title,
    description,
    layout,
    gridConfig,
    tableConfig,
    items,
    viewAllHref,
  } = section;

  // Render grid layout
  const renderGrid = () => {
    const cols = gridConfig?.columns || { mobile: 1, tablet: 2, desktop: 3 };

    return (
      <ProductGrid
        $colsMobile={cols.mobile}
        $colsTablet={cols.tablet}
        $colsDesktop={cols.desktop}
      >
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={{
              ...item,
              variant: gridConfig?.cardVariant || item.variant || "standard",
            }}
            gameSlug={gameSlug}
          />
        ))}
      </ProductGrid>
    );
  };

  // Render table layout
  const renderTable = () => {
    return (
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Details</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <TableTitle>{item.title}</TableTitle>
                  {item.subtitle && (
                    <TableSubtitle>{item.subtitle}</TableSubtitle>
                  )}
                </td>
                <td>
                  {item.meta?.duration && <span>{item.meta.duration}</span>}
                  {item.meta?.features && (
                    <span
                      style={{
                        marginLeft: "var(--space-2)",
                        color: "var(--fg-muted)",
                      }}
                    >
                      {item.meta.features.join(" • ")}
                    </span>
                  )}
                </td>
                <td>
                  <TablePrice>
                    {item.price.type === "from" && "From "}$
                    {item.price.value.toFixed(2)}
                  </TablePrice>
                </td>
                <td style={{ textAlign: "right" }}>
                  <TableAction href={`/games/${gameSlug}/${item.slug}`}>
                    View
                  </TableAction>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    );
  };

  // Render carousel layout
  const renderCarousel = () => {
    return (
      <CarouselWrapper>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <ProductCard product={item} gameSlug={gameSlug} />
          </CarouselItem>
        ))}
      </CarouselWrapper>
    );
  };

  // Render featured banner layout
  const renderFeaturedBanner = () => {
    const item = items[0];
    if (!item) return null;

    return (
      <FeaturedBanner
        href={`/games/${gameSlug}/${item.slug}`}
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <BannerOverlay />
        <BannerContent>
          <BannerTitle>{item.title}</BannerTitle>
          {item.subtitle && <BannerSubtitle>{item.subtitle}</BannerSubtitle>}
          <BannerButton>
            Learn More
            <ChevronRight size={16} />
          </BannerButton>
        </BannerContent>
      </FeaturedBanner>
    );
  };

  // Choose renderer based on layout
  const renderContent = () => {
    switch (layout) {
      case "table_list":
        return renderTable();
      case "carousel":
        return renderCarousel();
      case "featured_banner":
        return renderFeaturedBanner();
      case "grid_cards":
      default:
        return renderGrid();
    }
  };

  return (
    <Section id={anchor}>
      <SectionHeader>
        <div>
          <SectionTitle>{title}</SectionTitle>
          {description && (
            <SectionDescription>{description}</SectionDescription>
          )}
        </div>

        {viewAllHref && (
          <ViewAllLink href={viewAllHref}>
            View All
            <ChevronRight />
          </ViewAllLink>
        )}
      </SectionHeader>

      {renderContent()}
    </Section>
  );
};
