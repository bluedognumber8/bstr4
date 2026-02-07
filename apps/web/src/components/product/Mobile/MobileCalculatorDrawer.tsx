// src/components/product/Mobile/MobileCalculatorDrawer.tsx
"use client";

import { styled } from "next-yak";
import { Drawer } from "@/components/ui/Drawer";
import { CalculatorConfig, CalculatorState } from "../types";
import { useCalculator } from "../hooks/useCalculator";
import { VisualRankSelector } from "../Calculator/inputs/VisualRankSelector";
import { QuantitySelector } from "../Calculator/inputs/QuantitySelector";
import { RangeSlider } from "../Calculator/inputs/RangeSlider";
import { AddOnsCheckbox } from "../Calculator/inputs/AddOnsCheckbox";
import { DropdownSelect } from "../Calculator/inputs/DropdownSelect";
import { ShoppingCart, Zap } from "lucide-react";
import type {
  VisualRankConfig,
  RangeSliderConfig,
  QuantityConfig,
} from "../types";

// --- STYLES ---

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: var(--space-4);
`;

const Section = styled.div`
  margin-bottom: var(--space-4);
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-4) 0;
`;

const Footer = styled.div`
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-surface);
`;

const PriceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);

  .label {
    font-size: 0.9375rem;
    color: var(--fg-secondary);
  }

  .price {
    font-family: var(--font-heading);
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--fg-primary);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const Button = styled.button<{ $variant: "primary" | "secondary" }>`
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
  `
      : `
    background: var(--bg-canvas);
    color: var(--fg-primary);
    border: 1px solid var(--border-subtle);
  `}

  svg {
    width: 20px;
    height: 20px;
  }
`;

// --- COMPONENT ---

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: CalculatorConfig;
  productTitle: string;
  onAddToCart?: (state: CalculatorState) => void;
  onBuyNow?: (state: CalculatorState) => void;
}

export const MobileCalculatorDrawer = ({
  open,
  onOpenChange,
  config,
  productTitle,
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

      default:
        return null;
    }
  };

  const handleAddToCart = () => {
    onAddToCart?.(state);
    onOpenChange(false);
  };

  const handleBuyNow = () => {
    onBuyNow?.(state);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} title={productTitle}>
      <DrawerContent>
        <ScrollArea>
          {/* Primary Input */}
          <Section>{renderPrimaryInput()}</Section>

          {/* Modifiers */}
          {config.modifiers && config.modifiers.length > 0 && (
            <>
              <Divider />
              <Section>
                {config.modifiers.map((modifier) => (
                  <DropdownSelect
                    key={modifier.id}
                    config={modifier}
                    value={state.modifiers[modifier.id] || ""}
                    onChange={(value) => setModifier(modifier.id, value)}
                  />
                ))}
              </Section>
            </>
          )}

          {/* Add-ons */}
          {config.addOns && config.addOns.length > 0 && (
            <>
              <Divider />
              <Section>
                <AddOnsCheckbox
                  label="Options"
                  options={config.addOns}
                  selected={state.addOns}
                  onChange={setAddOn}
                />
              </Section>
            </>
          )}
        </ScrollArea>

        <Footer>
          <PriceSummary>
            <span className="label">Total</span>
            <span className="price">${state.totalPrice.toFixed(2)}</span>
          </PriceSummary>

          <ButtonGroup>
            <Button $variant="primary" onClick={handleBuyNow}>
              <Zap />
              Buy Now
            </Button>
            <Button $variant="secondary" onClick={handleAddToCart}>
              <ShoppingCart />
              Add to Cart
            </Button>
          </ButtonGroup>
        </Footer>
      </DrawerContent>
    </Drawer>
  );
};
