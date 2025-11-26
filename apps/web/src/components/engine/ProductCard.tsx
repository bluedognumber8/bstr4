// src/components/engine/ProductCard.tsx
"use client";

import { styled } from "next-yak";
import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ProductCardData, BadgeType } from "./types";

// --- STYLES ---

const Card = styled.article`
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    border-color: var(--border-strong);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 160px;
  background-color: var(--bg-surface-hover);
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  right: var(--space-2);
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
`;

const Badge = styled.span<{ $type: BadgeType }>`
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ $type }) => {
    switch ($type) {
      case "bestseller":
        return `
          background-color: #f59e0b;
          color: #000;
        `;
      case "new":
        return `
          background-color: var(--color-info);
          color: #fff;
        `;
      case "sale":
        return `
          background-color: var(--color-danger);
          color: #fff;
        `;
      case "fast":
        return `
          background-color: var(--color-success);
          color: #fff;
        `;
      case "limited":
        return `
          background-color: #f97316;
          color: #fff;
        `;
      default:
        return `
          background-color: var(--bg-inverse);
          color: var(--fg-inverse);
        `;
    }
  }}
`;

const UrgencyBadge = styled.div`
  position: absolute;
  bottom: var(--space-2);
  left: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.75);
  color: var(--gray-0);
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
  font-weight: 600;

  svg {
    width: 12px;
    height: 12px;
    color: var(--color-warning);
  }
`;

const Content = styled.div`
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  color: var(--fg-primary);
  line-height: 1.3;

  /* Clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Subtitle = styled.p`
  font-size: 0.8125rem;
  color: var(--fg-muted);
  line-height: 1.4;

  /* Clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.75rem;
  color: var(--fg-secondary);
  margin-top: auto;

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-1);

    svg {
      width: 14px;
      height: 14px;
    }
  }

  .rating {
    color: #f59e0b;
  }
`;

const Footer = styled.div`
  padding: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
`;

const PriceDisplay = styled.div`
  .prefix {
    font-size: 0.6875rem;
    color: var(--fg-muted);
    text-transform: uppercase;
    display: block;
    margin-bottom: 2px;
  }

  .price {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--fg-primary);
  }

  .original {
    font-size: 0.8125rem;
    color: var(--fg-muted);
    text-decoration: line-through;
    margin-left: var(--space-2);
  }

  .unit {
    font-size: 0.75rem;
    color: var(--fg-muted);
    font-weight: 400;
  }
`;

const ActionButton = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-4);
  background-color: var(--action-primary);
  color: var(--fg-inverse);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
  transition: all 0.2s;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
  }

  ${Card}:hover & {
    background-color: var(--action-primary-hover);
  }
`;

// --- HELPERS ---

const Icon = ({ name }: { name: string }) => {
  const LucideIcon =
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <LucideIcon />;
};

const BADGE_ICONS: Record<BadgeType, string> = {
  bestseller: "🔥",
  new: "✨",
  sale: "🏷️",
  fast: "⚡",
  limited: "⏰",
};

const URGENCY_ICONS: Record<string, string> = {
  stock: "Package",
  time: "Clock",
  demand: "Users",
};

// --- COMPONENT ---

interface Props {
  product: ProductCardData;
  gameSlug: string;
  className?: string;
}

export const ProductCard = ({ product, gameSlug, className }: Props) => {
  const {
    slug,
    title,
    subtitle,
    image,
    price,
    meta,
    badges,
    urgency,
    variant = "standard",
  } = product;

  const href = `/games/${gameSlug}/${slug}`;

  // Determine CTA text based on variant
  const ctaText = (() => {
    switch (variant) {
      case "variable":
        return "Configure";
      case "currency":
        return "Buy Now";
      case "compact":
        return "View";
      default:
        return "View";
    }
  })();

  // Format price display
  const renderPrice = () => {
    switch (price.type) {
      case "from":
        return (
          <>
            <span className="prefix">From</span>
            <span className="price">${price.value.toFixed(2)}</span>
          </>
        );
      case "range":
        return (
          <>
            <span className="price">
              ${price.value.toFixed(2)} - ${price.maxValue?.toFixed(2)}
            </span>
          </>
        );
      case "rate":
        return (
          <>
            <span className="price">${price.value.toFixed(2)}</span>
            <span className="unit"> {price.unit}</span>
          </>
        );
      case "fixed":
      default:
        return (
          <>
            <span className="price">${price.value.toFixed(2)}</span>
            {price.originalValue && (
              <span className="original">
                ${price.originalValue.toFixed(2)}
              </span>
            )}
          </>
        );
    }
  };

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card className={className}>
        <ImageWrapper style={{ backgroundImage: `url(${image})` }}>
          {/* Badges */}
          {badges && badges.length > 0 && (
            <BadgeContainer>
              {badges.map((badge, idx) => (
                <Badge key={idx} $type={badge.type}>
                  {BADGE_ICONS[badge.type]} {badge.label || badge.type}
                </Badge>
              ))}
            </BadgeContainer>
          )}

          {/* Urgency */}
          {urgency && (
            <UrgencyBadge>
              <Icon name={URGENCY_ICONS[urgency.type] || "AlertCircle"} />
              {urgency.value}
            </UrgencyBadge>
          )}
        </ImageWrapper>

        <Content>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}

          {/* Meta row */}
          {meta && (
            <MetaRow>
              {meta.duration && (
                <span className="meta-item">
                  <Icon name="Clock" />
                  {meta.duration}
                </span>
              )}
              {meta.rating && (
                <span className="meta-item rating">
                  <Icon name="Star" />
                  {meta.rating.toFixed(1)}
                  {meta.reviewCount && ` (${meta.reviewCount})`}
                </span>
              )}
              {meta.features && meta.features.length > 0 && (
                <span className="meta-item">{meta.features[0]}</span>
              )}
            </MetaRow>
          )}
        </Content>

        <Footer>
          <PriceDisplay>{renderPrice()}</PriceDisplay>

          <ActionButton>
            {ctaText}
            <Icon name="ChevronRight" />
          </ActionButton>
        </Footer>
      </Card>
    </Link>
  );
};
