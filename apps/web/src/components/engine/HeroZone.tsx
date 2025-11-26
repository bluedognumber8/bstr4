// src/components/engine/HeroZone.tsx
"use client";

import { styled } from "next-yak";
import { useState } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { HeroConfig } from "./types";
import { queries } from "@/config/theme";

// --- STYLES ---

const HeroWrapper = styled.section`
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: center;
  color: var(--gray-0);
  overflow: hidden;

  ${queries.lg} {
    min-height: 560px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
`;

const HeroContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: var(--space-8) var(--space-5);

  ${queries.lg} {
    padding: var(--space-16) var(--space-5);
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: center;

  ${queries.lg} {
    grid-template-columns: 1fr 420px;
    gap: var(--space-16);
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const HeroTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  line-height: 1.1;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  ${queries.lg} {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--gray-200);
  max-width: 500px;
  line-height: 1.6;

  ${queries.lg} {
    font-size: 1.25rem;
  }
`;

const HeroCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background-color: var(--gray-0);
  color: var(--gray-900);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background-color: var(--gray-100);
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// --- WIDGET STYLES ---

const WidgetCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  ${queries.lg} {
    padding: var(--space-8);
  }
`;

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-6);

  h3 {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.125rem;
  }

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-success);
  }
`;

const WidgetDisplay = styled.div`
  margin-bottom: var(--space-6);

  .value {
    font-family: var(--font-heading);
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;

    ${queries.lg} {
      font-size: 3.5rem;
    }
  }

  .unit {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--gray-300);
    margin-left: var(--space-2);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const WidgetSlider = styled.input`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  outline: none;
  appearance: none;
  margin-bottom: var(--space-6);
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--gray-0);
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.15s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }
`;

const WidgetSelect = styled.select`
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  color: var(--gray-0);
  font-size: 0.875rem;
  margin-bottom: var(--space-6);
  cursor: pointer;

  option {
    background: var(--gray-900);
    color: var(--gray-0);
  }
`;

const WidgetFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  .label {
    font-size: 0.875rem;
    color: var(--gray-300);
  }

  .price {
    font-family: var(--font-heading);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-success);

    ${queries.lg} {
      font-size: 2rem;
    }
  }
`;

const WidgetButton = styled.button`
  width: 100%;
  padding: var(--space-4);
  background: var(--gray-0);
  color: var(--gray-900);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  margin-top: var(--space-4);
  transition: all 0.2s;

  &:hover {
    background: var(--gray-100);
    transform: translateY(-1px);
  }
`;

// --- QUICK BOOST STYLES ---

const RankSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
`;

const RankRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);

  .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--gray-400);
    width: 50px;
  }
`;

const RankSelect = styled.select`
  flex: 1;
  padding: var(--space-3) var(--space-4);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  color: var(--gray-0);
  font-size: 0.875rem;
  cursor: pointer;

  option {
    background: var(--gray-900);
    color: var(--gray-0);
  }
`;

const EstimateRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--gray-300);
  padding-top: var(--space-3);

  .time {
    display: flex;
    align-items: center;
    gap: var(--space-1);

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

// --- POPULAR SERVICES STYLES ---

const PopularGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);

  ${queries.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PopularCard = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  svg {
    width: 32px;
    height: 32px;
    margin-bottom: var(--space-2);
    color: var(--gray-0);
  }

  .name {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: var(--space-1);
  }

  .price {
    font-size: 0.75rem;
    color: var(--gray-300);
  }
`;

// --- HELPERS ---

const Icon = ({ name }: { name: string }) => {
  const LucideIcon =
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <LucideIcon />;
};

// --- SUB-COMPONENTS ---

const CurrencyCalculatorWidget = ({
  config,
}: {
  config: NonNullable<HeroConfig["currencyConfig"]>;
}) => {
  const [value, setValue] = useState(
    config.min + (config.max - config.min) / 2
  );
  const [server, setServer] = useState(config.serverOptions?.[0]?.value || "");

  const selectedServer = config.serverOptions?.find((s) => s.value === server);
  const priceModifier = selectedServer?.priceModifier || 1;
  const totalPrice = (value * config.pricePerUnit * priceModifier).toFixed(2);

  return (
    <WidgetCard>
      <WidgetHeader>
        <Icon name="Calculator" />
        <h3>{config.label}</h3>
      </WidgetHeader>

      <WidgetDisplay>
        <span className="value">{value.toLocaleString()}</span>
        <span className="unit">{config.unit}</span>
      </WidgetDisplay>

      <WidgetSlider
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      {config.serverOptions && config.serverOptions.length > 0 && (
        <WidgetSelect
          value={server}
          onChange={(e) => setServer(e.target.value)}
        >
          {config.serverOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </WidgetSelect>
      )}

      <WidgetFooter>
        <span className="label">Total Price</span>
        <span className="price">${totalPrice}</span>
      </WidgetFooter>

      <WidgetButton>Buy Now</WidgetButton>
    </WidgetCard>
  );
};

const QuickBoostWidget = ({
  config,
}: {
  config: NonNullable<HeroConfig["quickBoostConfig"]>;
}) => {
  const [fromRank, setFromRank] = useState(config.rankOptions[0]?.value || "");
  const [toRank, setToRank] = useState(config.rankOptions[2]?.value || "");

  const fromTier =
    config.rankOptions.find((r) => r.value === fromRank)?.tier || 0;
  const toTier = config.rankOptions.find((r) => r.value === toRank)?.tier || 0;
  const tierDiff = Math.max(0, toTier - fromTier);
  const estimatedPrice = config.basePrice + tierDiff * config.pricePerTier;

  return (
    <WidgetCard>
      <WidgetHeader>
        <Icon name="TrendingUp" />
        <h3>{config.title}</h3>
      </WidgetHeader>

      <RankSelector>
        <RankRow>
          <span className="label">From</span>
          <RankSelect
            value={fromRank}
            onChange={(e) => setFromRank(e.target.value)}
          >
            {config.rankOptions.map((rank) => (
              <option key={rank.value} value={rank.value}>
                {rank.label}
              </option>
            ))}
          </RankSelect>
        </RankRow>

        <RankRow>
          <span className="label">To</span>
          <RankSelect
            value={toRank}
            onChange={(e) => setToRank(e.target.value)}
          >
            {config.rankOptions.map((rank) => (
              <option key={rank.value} value={rank.value}>
                {rank.label}
              </option>
            ))}
          </RankSelect>
        </RankRow>
      </RankSelector>

      <WidgetFooter>
        <span className="label">Estimated Price</span>
        <span className="price">${estimatedPrice.toFixed(2)}</span>
      </WidgetFooter>

      <EstimateRow>
        <span className="time">
          <Icon name="Clock" />
          Est. 2-4 days
        </span>
        <span>🛡️ Ban Protected</span>
      </EstimateRow>

      <WidgetButton>Get Started</WidgetButton>
    </WidgetCard>
  );
};

const PopularServicesWidget = ({
  categories,
}: {
  categories: FeaturedCategory[];
}) => {
  return (
    <PopularGrid>
      {categories.map((cat) => (
        <PopularCard key={cat.id} href={cat.href}>
          <Icon name={cat.icon} />
          <div className="name">{cat.label}</div>
          <div className="price">From ${cat.priceFrom}</div>
        </PopularCard>
      ))}
    </PopularGrid>
  );
};

// --- MAIN COMPONENT ---

interface Props {
  config: HeroConfig;
}

export const HeroZone = ({ config }: Props) => {
  const renderWidget = () => {
    switch (config.variant) {
      case "currency_calculator":
        if (!config.currencyConfig) return null;
        return <CurrencyCalculatorWidget config={config.currencyConfig} />;

      case "quick_boost":
        if (!config.quickBoostConfig) return null;
        return <QuickBoostWidget config={config.quickBoostConfig} />;

      case "popular_services":
        if (!config.featuredCategories) return null;
        return <PopularServicesWidget categories={config.featuredCategories} />;

      case "minimal":
      default:
        return null;
    }
  };

  const widget = renderWidget();
  const hasWidget = widget !== null && config.variant !== "popular_services";

  return (
    <HeroWrapper>
      <HeroBackground
        style={{ backgroundImage: `url(${config.backgroundImage})` }}
      />
      <HeroOverlay />

      <HeroContainer>
        {config.variant === "popular_services" ? (
          // Popular services: Full width layout
          <div>
            <HeroContent
              style={{
                textAlign: "center",
                alignItems: "center",
                marginBottom: "var(--space-8)",
              }}
            >
              <HeroTitle>{config.title}</HeroTitle>
              <HeroSubtitle>{config.subtitle}</HeroSubtitle>
            </HeroContent>
            {widget}
          </div>
        ) : (
          // Other variants: Grid layout
          <HeroGrid
            style={{ gridTemplateColumns: hasWidget ? undefined : "1fr" }}
          >
            <HeroContent>
              <HeroTitle>{config.title}</HeroTitle>
              <HeroSubtitle>{config.subtitle}</HeroSubtitle>

              {config.variant === "minimal" && config.ctaHref && (
                <HeroCTA href={config.ctaHref}>
                  {config.ctaText || "Browse Services"}
                  <Icon name="ArrowRight" />
                </HeroCTA>
              )}
            </HeroContent>

            {widget}
          </HeroGrid>
        )}
      </HeroContainer>
    </HeroWrapper>
  );
};

// Need to import FeaturedCategory for PopularServicesWidget
import type { FeaturedCategory } from "./types";
