// src/components/product/Calculator/EnhancedCalculator.tsx
"use client";

import { styled } from "next-yak";
import { useMemo, useState, useCallback } from "react";
import {
  ShoppingCart,
  Zap,
  Clock,
  Users,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  CalculatorConfig,
  DropdownConfig,
  AddOnOption,
  FixedConfig,
  QuantityConfig,
  RangeSliderConfig,
} from "../types";
import { useCalculator } from "../hooks/useCalculator";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 100px;

  ${queries.lg} {
    padding-bottom: 0;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);

  ${queries.lg} {
    grid-template-columns: 1fr 380px;
    gap: var(--space-8);
    align-items: start;
  }
`;

// --- MAIN CONTENT ---

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`;

const Section = styled.section`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-5);

  ${queries.md} {
    padding: var(--space-6);
  }
`;

const SectionHeader = styled.div`
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
`;

const SectionTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// --- HERO CARD ---

const HeroCard = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;

  ${queries.md} {
    padding: var(--space-8);
  }
`;

const HeroIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-5);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-canvas);
  border-radius: var(--radius-lg);
  font-size: 2.5rem;
`;

const HeroTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: var(--space-2);

  ${queries.md} {
    font-size: 1.75rem;
  }
`;

const HeroSubtitle = styled.div`
  font-size: 1rem;
  color: var(--fg-secondary);
  margin-bottom: var(--space-6);
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
`;

const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fg-primary);

  svg {
    width: 14px;
    height: 14px;
    color: var(--color-success);
  }
`;

// --- MODIFIERS ---

const ModifiersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);

  ${queries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const SelectLabel = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fg-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: var(--space-3) var(--space-4);
  padding-right: var(--space-10);
  background: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--fg-primary);
  font-size: 0.9375rem;
  font-weight: 500;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--border-strong);
  }

  &:focus {
    outline: none;
    border-color: var(--action-primary);
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--fg-muted);

  svg {
    width: 18px;
    height: 18px;
  }
`;

// --- ADD-ONS ---

const AddOnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);

  ${queries.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${queries.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const AddOnCard = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: ${({ $active }) =>
    $active ? "var(--bg-surface)" : "var(--bg-canvas)"};
  border: 2px solid
    ${({ $active }) =>
      $active ? "var(--action-primary)" : "var(--border-subtle)"};
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: ${({ $active }) =>
      $active ? "var(--action-primary)" : "var(--border-strong)"};
  }
`;

const AddOnIcon = styled.div`
  font-size: 1.5rem;
`;

const AddOnName = styled.div`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fg-primary);
  text-align: center;
`;

const AddOnPrice = styled.div`
  font-size: 0.75rem;
  color: var(--fg-muted);
`;

const AddOnCheck = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--action-primary);
  border-radius: 50%;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "scale(1)" : "scale(0.5)")};
  transition: all 0.2s;

  svg {
    width: 12px;
    height: 12px;
    color: var(--bg-canvas);
  }
`;

// --- QUANTITY SELECTOR ---

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-canvas);
  border-radius: var(--radius-md);
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const QuantityButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--fg-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: var(--action-primary);
    background: var(--bg-surface-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.div`
  min-width: 80px;
  text-align: center;

  .number {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 800;
    color: var(--fg-primary);
    line-height: 1;
  }

  .unit {
    font-size: 0.8125rem;
    color: var(--fg-muted);
    margin-top: var(--space-1);
  }
`;

const QuantityPresets = styled.div`
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  justify-content: center;
`;

const PresetButton = styled.button<{ $active: boolean }>`
  padding: var(--space-2) var(--space-4);
  background: ${({ $active }) =>
    $active ? "var(--action-primary)" : "var(--bg-surface)"};
  color: ${({ $active }) =>
    $active ? "var(--bg-canvas)" : "var(--fg-secondary)"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--action-primary)" : "var(--border-subtle)"};
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--action-primary);
  }
`;

// --- STICKY SIDEBAR ---

const StickySidebar = styled.aside`
  display: none;

  ${queries.lg} {
    display: block;
    position: sticky;
    top: var(--space-6);
    height: fit-content;
  }
`;

const SummaryCard = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
`;

const SummaryTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin: 0 0 var(--space-5);
`;

// --- RECEIPT ---

const ReceiptContainer = styled.div`
  background: var(--bg-canvas);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-5);
`;

const ReceiptHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  color: var(--fg-muted);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LineItem = styled.div<{
  $variant?: "base" | "addon" | "fee" | "discount";
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-1) 0;
  font-size: 0.875rem;
  color: ${({ $variant }) => {
    switch ($variant) {
      case "base":
        return "var(--fg-primary)";
      case "addon":
        return "var(--color-info)";
      case "fee":
        return "var(--color-danger)";
      case "discount":
        return "var(--color-success)";
      default:
        return "var(--fg-secondary)";
    }
  }};
  font-weight: ${({ $variant }) =>
    $variant === "base" || $variant === "discount" ? "600" : "400"};
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-3) 0;
`;

// --- TRUST & META ---

const TrustRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  font-size: 0.8125rem;
  color: var(--fg-muted);

  svg {
    width: 14px;
    height: 14px;
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-1);

  svg {
    color: var(--color-success);
  }

  strong {
    color: var(--fg-primary);
  }
`;

// --- PRICE & CTA ---

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
  margin-bottom: var(--space-4);
`;

const PriceLabel = styled.div`
  font-size: 0.875rem;
  color: var(--fg-muted);
`;

const PriceValue = styled.div`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--fg-primary);
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: var(--action-primary);
  color: var(--bg-canvas);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--action-primary-hover);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background: var(--bg-canvas);
  color: var(--fg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--border-strong);
    background: var(--bg-surface);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
  font-size: 0.75rem;
  color: var(--fg-muted);
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-1);

  svg {
    width: 12px;
    height: 12px;
    color: var(--color-success);
  }
`;

// --- MOBILE BOTTOM BAR ---

const MobileBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-4) var(--space-5);
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;

  ${queries.lg} {
    display: none;
  }
`;

const MobilePrice = styled.div`
  .label {
    font-size: 0.75rem;
    color: var(--fg-muted);
  }

  .value {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--fg-primary);
  }
`;

const MobileButton = styled.button`
  padding: var(--space-3) var(--space-6);
  background: var(--action-primary);
  color: var(--bg-canvas);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

// --- TYPES ---

interface EnhancedCalculatorProps {
  config: CalculatorConfig;
  product: {
    id: string;
    title: string;
    icon: string;
    tagline: string;
    stats: Array<{ icon: string; label: string }>;
  };
  trust: {
    estimatedTime: string;
    onlineBoosters: number;
  };
}

// --- ICON MAP ---

const ADDON_ICONS: Record<string, string> = {
  stream: "📺",
  priority: "⚡",
  express: "⚡",
  specific_heroes: "🎯",
  screenshot_updates: "📸",
  role_preference: "👥",
  duo: "👥",
  offline: "👻",
};

// --- COMPONENT ---

export const EnhancedCalculator = ({
  config,
  product,
  trust,
}: EnhancedCalculatorProps) => {
  const { state, setPrimaryValue, setModifier, setAddOn } =
    useCalculator(config);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // Build receipt line items
  const receiptItems = useMemo(() => {
    const items: Array<{
      label: string;
      value: number;
      variant: "base" | "addon" | "fee";
    }> = [];

    // Base price
    items.push({
      label: product.title,
      value: state.basePrice,
      variant: "base",
    });

    // Add-ons
    config.addOns?.forEach((addon) => {
      if (state.addOns[addon.id]) {
        const addonPrice =
          addon.priceType === "percentage"
            ? state.basePrice * (addon.price / 100)
            : addon.price;
        items.push({
          label: addon.label,
          value: addonPrice,
          variant: "addon",
        });
      }
    });

    // Modifier fees (if any add cost)
    config.modifiers?.forEach((mod) => {
      const selected = mod.options.find(
        (o) => o.value === state.modifiers[mod.id]
      );
      if (selected && selected.priceModifier > 0) {
        const feeAmount =
          selected.priceType === "percentage"
            ? state.basePrice * (selected.priceModifier / 100)
            : selected.priceModifier;
        items.push({
          label: `${mod.label}: ${selected.label}`,
          value: feeAmount,
          variant: "fee",
        });
      }
    });

    return items;
  }, [state, config, product.title]);

  const handleAddToCart = useCallback(() => {
    addItem({
      productId: product.id,
      title: product.title,
      price: state.totalPrice,
      quantity: 1,
      category: "service",
      options: {
        ...state.modifiers,
        ...state.addOns,
        primaryValue: state.primaryValue,
      },
    });
    toast.success("Added to Cart!");
    openCart();
  }, [addItem, openCart, product, state]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    // TODO: Navigate to checkout
  }, [handleAddToCart]);

  // Render quantity input if applicable
  const renderQuantityInput = () => {
    if (config.primaryInput.type !== "quantity") return null;

    const qtyConfig = config.primaryInput as QuantityConfig;
    const currentValue = state.primaryValue.value || qtyConfig.default;

    return (
      <Section>
        <SectionHeader>
          <SectionTitle>Quantity</SectionTitle>
        </SectionHeader>

        <QuantityWrapper>
          <QuantityControls>
            <QuantityButton
              onClick={() =>
                setPrimaryValue({
                  value: Math.max(qtyConfig.min, currentValue - 1),
                })
              }
              disabled={currentValue <= qtyConfig.min}
            >
              −
            </QuantityButton>

            <QuantityValue>
              <div className="number">{currentValue}</div>
              <div className="unit">
                {currentValue === 1 ? qtyConfig.unit : qtyConfig.unitPlural}
              </div>
            </QuantityValue>

            <QuantityButton
              onClick={() =>
                setPrimaryValue({
                  value: Math.min(qtyConfig.max, currentValue + 1),
                })
              }
              disabled={currentValue >= qtyConfig.max}
            >
              +
            </QuantityButton>
          </QuantityControls>

          {qtyConfig.presets && qtyConfig.presets.length > 0 && (
            <QuantityPresets>
              {qtyConfig.presets.map((preset) => (
                <PresetButton
                  key={preset}
                  $active={currentValue === preset}
                  onClick={() => setPrimaryValue({ value: preset })}
                >
                  {preset}
                </PresetButton>
              ))}
            </QuantityPresets>
          )}
        </QuantityWrapper>
      </Section>
    );
  };

  return (
    <Container>
      <LayoutGrid>
        {/* --- MAIN CONTENT --- */}
        <MainContent>
          {/* Hero Card */}

          {/* Quantity (if applicable) */}
          {renderQuantityInput()}

          {/* Modifiers */}
          {config.modifiers && config.modifiers.length > 0 && (
            <Section>
              <SectionHeader>
                <SectionTitle>Configuration</SectionTitle>
              </SectionHeader>

              <ModifiersGrid>
                {config.modifiers.map((modifier) => (
                  <SelectWrapper key={modifier.id}>
                    <SelectLabel htmlFor={modifier.id}>
                      {modifier.label}
                    </SelectLabel>
                    <SelectContainer>
                      <StyledSelect
                        id={modifier.id}
                        value={state.modifiers[modifier.id] || ""}
                        onChange={(e) =>
                          setModifier(modifier.id, e.target.value)
                        }
                      >
                        {modifier.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                            {opt.priceModifier > 0 &&
                              ` (+${opt.priceModifier}%)`}
                          </option>
                        ))}
                      </StyledSelect>
                      <SelectIcon>
                        <ChevronDown />
                      </SelectIcon>
                    </SelectContainer>
                  </SelectWrapper>
                ))}
              </ModifiersGrid>
            </Section>
          )}

          {/* Add-ons */}
          {config.addOns && config.addOns.length > 0 && (
            <Section>
              <SectionHeader>
                <SectionTitle>Enhance Your Order</SectionTitle>
              </SectionHeader>

              <AddOnsGrid>
                {config.addOns.map((addon) => {
                  const isActive = state.addOns[addon.id] || false;
                  const icon = ADDON_ICONS[addon.id] || "✨";
                  const priceLabel =
                    addon.price === 0
                      ? "FREE"
                      : addon.priceType === "percentage"
                      ? `+${addon.price}%`
                      : `+$${addon.price}`;

                  return (
                    <AddOnCard
                      key={addon.id}
                      $active={isActive}
                      onClick={() => setAddOn(addon.id, !isActive)}
                    >
                      <AddOnCheck $visible={isActive}>
                        <Check />
                      </AddOnCheck>
                      <AddOnIcon>{icon}</AddOnIcon>
                      <AddOnName>{addon.label}</AddOnName>
                      <AddOnPrice>{priceLabel}</AddOnPrice>
                    </AddOnCard>
                  );
                })}
              </AddOnsGrid>
            </Section>
          )}
        </MainContent>

        {/* --- STICKY SIDEBAR --- */}
        <StickySidebar>
          <SummaryCard>
            <SummaryTitle>Order Summary</SummaryTitle>

            {/* Receipt */}
            <ReceiptContainer>
              <ReceiptHeader>
                <ShoppingCart size={12} />
                Price Breakdown
              </ReceiptHeader>

              {receiptItems.map((item, i) => (
                <LineItem key={i} $variant={item.variant}>
                  <span>{item.label}</span>
                  <span>
                    {item.variant === "base" ? "" : "+"}${item.value.toFixed(2)}
                  </span>
                </LineItem>
              ))}

              <Divider />

              <LineItem $variant="base">
                <span>Total</span>
                <span>${state.totalPrice.toFixed(2)}</span>
              </LineItem>
            </ReceiptContainer>

            {/* Trust indicators */}
            <TrustRow>
              <TrustItem>
                <Clock size={14} />
                <span>{trust.estimatedTime}</span>
              </TrustItem>
              <TrustItem>
                <Users size={14} />
                <strong>{trust.onlineBoosters}</strong>
                <span>online</span>
              </TrustItem>
            </TrustRow>

            {/* Price */}
            <PriceSection>
              <PriceLabel>Total Price</PriceLabel>
              <PriceValue>${state.totalPrice.toFixed(2)}</PriceValue>
            </PriceSection>

            {/* Buttons */}
            <ButtonGroup>
              <PrimaryButton onClick={handleAddToCart}>
                <ShoppingCart />
                Add to Cart
              </PrimaryButton>
              <SecondaryButton onClick={handleBuyNow}>
                <Zap />
                Buy Now
              </SecondaryButton>
            </ButtonGroup>

            {/* Trust badges */}
            <TrustBadges>
              <TrustBadge>
                <Check />
                Secure
              </TrustBadge>
              <TrustBadge>
                <Check />
                Money Back
              </TrustBadge>
              <TrustBadge>
                <Check />
                VPN Protected
              </TrustBadge>
            </TrustBadges>
          </SummaryCard>
        </StickySidebar>
      </LayoutGrid>

      {/* --- MOBILE BOTTOM BAR --- */}
      <MobileBottomBar>
        <MobilePrice>
          <div className="label">{trust.estimatedTime}</div>
          <div className="value">${state.totalPrice.toFixed(2)}</div>
        </MobilePrice>
        <MobileButton onClick={handleAddToCart}>Add to Cart</MobileButton>
      </MobileBottomBar>
    </Container>
  );
};
