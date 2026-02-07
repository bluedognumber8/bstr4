// src/components/product/Calculator/CalculatorContainer.tsx
"use client";

import { styled } from "next-yak";
import { ShoppingCart, Zap, Shield, Clock, Users, Package } from "lucide-react";
import {
  CalculatorConfig,
  CalculatorState,
  VisualRankConfig,
  RangeSliderConfig,
  QuantityConfig,
} from "../types";
import { useCalculator } from "../hooks/useCalculator";
import { VisualRankSelector } from "./inputs/VisualRankSelector";
import { QuantitySelector } from "./inputs/QuantitySelector";
import { RangeSlider } from "./inputs/RangeSlider";
import { AddOnsCheckbox } from "./inputs/AddOnsCheckbox";
import { DropdownSelect } from "./inputs/DropdownSelect";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

const Header = styled.div`
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin: 0;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;

  .stars {
    color: #f59e0b;
  }

  .count {
    color: var(--fg-muted);
  }
`;

const Body = styled.div`
  padding: var(--space-6);
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-4) 0;
`;

const ModifiersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);

  ${queries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TrustIndicators = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-canvas);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8125rem;
  color: var(--fg-secondary);

  svg {
    width: 16px;
    height: 16px;
    color: var(--color-success);
  }

  strong {
    color: var(--fg-primary);
  }
`;

const Footer = styled.div`
  padding: var(--space-5) var(--space-6);
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-canvas);
`;

const PriceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
`;

const PriceLabel = styled.div`
  font-size: 0.9375rem;
  color: var(--fg-secondary);
`;

const PriceValue = styled.div`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--fg-primary);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-3);

  ${queries.md} {
    flex-direction: row;
  }
`;

const Button = styled.button<{ $variant: "primary" | "secondary" }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.2s;

  ${({ $variant }) =>
    $variant === "primary"
      ? `
    background: var(--action-primary);
    color: var(--fg-inverse);
    
    &:hover {
      background: var(--action-primary-hover);
      transform: translateY(-1px);
    }
  `
      : `
    background: var(--bg-surface);
    color: var(--fg-primary);
    border: 1px solid var(--border-subtle);
    
    &:hover {
      background: var(--bg-surface-hover);
      border-color: var(--border-strong);
    }
  `}

  svg {
    width: 18px;
    height: 18px;
  }
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
  flex-wrap: wrap;
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.75rem;
  color: var(--fg-muted);

  svg {
    width: 14px;
    height: 14px;
    color: var(--color-success);
  }
`;

// --- COMPONENT ---

interface Props {
  config: CalculatorConfig;
  productTitle: string;
  trust: {
    rating: number;
    reviewCount: number;
    completedOrders: number;
    onlineBoosters: number;
    todayOrders: number;
    avgStartTime: string;
  };
  onAddToCart?: (state: CalculatorState) => void;
  onBuyNow?: (state: CalculatorState) => void;
}

export const CalculatorContainer = ({
  config,
  productTitle,
  trust,
  onAddToCart,
  onBuyNow,
}: Props) => {
  const { state, setPrimaryValue, setModifier, setAddOn } =
    useCalculator(config);

  const renderPrimaryInput = () => {
    const { primaryInput } = config;

    switch (primaryInput.type) {
      case "visual_rank":
        const rankConfig = primaryInput as VisualRankConfig;
        return (
          <VisualRankSelector
            config={rankConfig}
            fromRank={state.primaryValue.from || ""}
            toRank={state.primaryValue.to || ""}
            onFromChange={(id) => setPrimaryValue({ from: id })}
            onToChange={(id) => setPrimaryValue({ to: id })}
          />
        );

      case "quantity":
        const quantityConfig = primaryInput as QuantityConfig;
        return (
          <QuantitySelector
            config={quantityConfig}
            value={state.primaryValue.value || quantityConfig.default}
            onChange={(value) => setPrimaryValue({ value })}
          />
        );

      case "range_slider":
        const sliderConfig = primaryInput as RangeSliderConfig;
        return (
          <RangeSlider
            config={sliderConfig}
            value={state.primaryValue.value || sliderConfig.min}
            onChange={(value) => setPrimaryValue({ value })}
          />
        );

      case "fixed":
        return null; // No input needed for fixed price

      default:
        return null;
    }
  };

  const handleAddToCart = () => {
    onAddToCart?.(state);
  };

  const handleBuyNow = () => {
    onBuyNow?.(state);
  };

  return (
    <Container>
      <Header>
        <Title>{productTitle}</Title>
        <Rating>
          <span className="stars">★★★★★</span>
          <span>{trust.rating.toFixed(1)}</span>
          <span className="count">
            ({trust.reviewCount.toLocaleString()} reviews)
          </span>
        </Rating>
      </Header>

      <Body>
        {/* Primary Input */}
        {renderPrimaryInput()}

        {/* Modifiers */}
        {config.modifiers && config.modifiers.length > 0 && (
          <>
            <Divider />
            <ModifiersGrid>
              {config.modifiers.map((modifier) => (
                <DropdownSelect
                  key={modifier.id}
                  config={modifier}
                  value={state.modifiers[modifier.id] || ""}
                  onChange={(value) => setModifier(modifier.id, value)}
                />
              ))}
            </ModifiersGrid>
          </>
        )}

        {/* Add-ons */}
        {config.addOns && config.addOns.length > 0 && (
          <>
            <Divider />
            <AddOnsCheckbox
              label="Options & Add-ons"
              options={config.addOns}
              selected={state.addOns}
              onChange={setAddOn}
            />
          </>
        )}

        {/* Trust Indicators */}
        {config.display.showEstimatedTime ||
        config.display.showOnlineBoosters ||
        config.display.showTodayOrders ? (
          <>
            <Divider />
            <TrustIndicators>
              {config.display.showEstimatedTime && (
                <TrustItem>
                  <Clock />
                  <span>
                    Est. <strong>{trust.avgStartTime}</strong> start
                  </span>
                </TrustItem>
              )}
              {config.display.showOnlineBoosters && (
                <TrustItem>
                  <Users />
                  <span>
                    <strong>{trust.onlineBoosters}</strong> boosters online
                  </span>
                </TrustItem>
              )}
              {config.display.showTodayOrders && (
                <TrustItem>
                  <Package />
                  <span>
                    <strong>{trust.todayOrders}</strong> orders today
                  </span>
                </TrustItem>
              )}
            </TrustIndicators>
          </>
        ) : null}
      </Body>

      <Footer>
        <PriceSummary>
          <PriceLabel>Total Price</PriceLabel>
          <PriceValue>${state.totalPrice.toFixed(2)}</PriceValue>
        </PriceSummary>

        <ButtonGroup>
          <Button $variant="secondary" onClick={handleAddToCart}>
            <ShoppingCart />
            Add to Cart
          </Button>
          <Button $variant="primary" onClick={handleBuyNow}>
            <Zap />
            Buy Now
          </Button>
        </ButtonGroup>

        {config.display.showTrustBadges && (
          <TrustBadges>
            <TrustBadge>
              <Shield />
              Ban Guarantee
            </TrustBadge>
            <TrustBadge>
              <Shield />
              Money Back
            </TrustBadge>
            <TrustBadge>
              <Shield />
              VPN Protected
            </TrustBadge>
          </TrustBadges>
        )}
      </Footer>
    </Container>
  );
};
