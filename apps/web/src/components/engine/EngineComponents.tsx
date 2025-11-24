"use client";

import { styled } from "next-yak";
import { useState } from "react";
import * as Icons from "lucide-react";
import { GamePageConfig, GameSection, ProductCard, PulseItem } from "./types";

// --- UTILS ---
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
  return <LucideIcon className={className} />;
};

// =========================================
// 1. HERO ZONE
// =========================================

const HeroWrapper = styled.section`
  position: relative;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-0);
  overflow: hidden;
`;

// FIX: Removed the prop interpolation for background-image
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
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.8)
  );
  z-index: 1;
`;

const HeroContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-5);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 400px;
    gap: var(--space-16);
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  h1 {
    font-family: var(--font-heading);
    font-size: 3.5rem;
    line-height: 1.1;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  p {
    font-family: var(--font-body);
    font-size: 1.25rem;
    color: var(--gray-200);
    max-width: 500px;
    line-height: 1.6;
  }
`;

const CalculatorWidget = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const WidgetTitle = styled.div`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const CalcDisplay = styled.div`
  margin-bottom: var(--space-8);

  span.value {
    font-family: var(--font-heading);
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
  }

  span.unit {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--gray-300);
    margin-left: var(--space-2);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const StyledRange = styled.input`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  outline: none;
  appearance: none;
  margin-bottom: var(--space-8);
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--gray-0);
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
`;

const CalcFooter = styled.div`
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
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-success);
  }
`;

export const HeroZone = ({ config }: { config: GamePageConfig }) => {
  const [val, setVal] = useState(5000);

  return (
    <HeroWrapper>
      {/* FIX: Pass background image via inline style to avoid parser error */}
      <HeroBackground
        style={{ backgroundImage: `url(${config.theme.backgroundImage})` }}
      />
      <HeroOverlay />
      <HeroContainer>
        <HeroText>
          <h1>{config.hero.title}</h1>
          <p>{config.hero.subtitle}</p>
        </HeroText>

        <CalculatorWidget>
          <WidgetTitle>
            <Icon name="Calculator" className="w-5 h-5" />
            {config.hero.widgetConfig.label}
          </WidgetTitle>

          <CalcDisplay>
            <span className="value">{val}</span>
            <span className="unit">{config.hero.widgetConfig.unit}</span>
          </CalcDisplay>

          <StyledRange
            type="range"
            min={config.hero.widgetConfig.min}
            max={config.hero.widgetConfig.max}
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
          />

          <CalcFooter>
            <span className="label">Estimated Price</span>
            <span className="price">
              ${(val * config.hero.widgetConfig.pricePerUnit).toFixed(2)}
            </span>
          </CalcFooter>
        </CalculatorWidget>
      </HeroContainer>
    </HeroWrapper>
  );
};

// =========================================
// 2. PULSE BAR
// =========================================

const PulseWrapper = styled.div`
  background-color: var(--bg-inverse);
  color: var(--fg-inverse);
  border-bottom: 1px solid var(--gray-800);
  /* Ensure it doesn't cause page scroll */
  max-width: 100vw;
  overflow: hidden;
`;

const PulseContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-3) var(--space-5);
  display: flex;
  align-items: center;
  gap: var(--space-8);
  font-size: 0.875rem;
  font-family: var(--font-code);

  /* MOBILE MAGIC: Make it scrollable instead of breaking */
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  /* Hide Scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Smaller gaps on mobile */
  @media (max-width: 768px) {
    gap: var(--space-6);
    padding: var(--space-3) var(--space-4);
  }
`;

const PulseItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0; /* CRITICAL: Prevents items from getting squashed */

  .label {
    color: var(--fg-muted);
  }

  .value {
    font-weight: 600;
    color: var(--fg-inverse);
  }

  svg {
    width: 16px;
    height: 16px;
    color: var(--gray-500);
    flex-shrink: 0;
  }
`;

export const PulseBar = ({ items }: { items: PulseItem[] }) => (
  <PulseWrapper>
    <PulseContainer>
      {items.map((item) => (
        <PulseItem key={item.id}>
          <Icon name={item.icon} />
          <span className="value">{item.value}</span>
          <span className="label">{item.label}</span>
        </PulseItem>
      ))}
    </PulseContainer>
  </PulseWrapper>
);

// =========================================
// 3. GRID & CARD COMPONENTS
// =========================================

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
`;

const Card = styled.div`
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    background-color: var(--bg-surface-hover);
  }
`;

// FIX: Removed the prop interpolation for background-image
const CardImage = styled.div`
  height: 160px;
  background-color: var(--gray-200);
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Tag = styled.span`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  background-color: rgba(0, 0, 0, 0.75);
  color: var(--gray-0);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  text-transform: uppercase;
`;

const CardContent = styled.div`
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  h4 {
    font-family: var(--font-heading);
    font-weight: 700;
    color: var(--fg-primary);
    font-size: 1.1rem;
  }

  p.sub {
    font-size: 0.875rem;
    color: var(--fg-muted);
  }
`;

const CardFooter = styled.div`
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--fg-primary);
  }

  .from {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--fg-muted);
    margin-right: var(--space-2);
  }
`;

// =========================================
// 4. TABLE COMPONENTS
// =========================================

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
    font-weight: 500;
    border-bottom: 1px solid var(--border-subtle);
  }

  td {
    padding: var(--space-4);
    border-bottom: 1px solid var(--border-subtle);
    color: var(--fg-primary);
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: var(--bg-surface-hover);
  }
`;

const MetaTag = styled.span`
  display: inline-block;
  padding: 2px 6px;
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  color: var(--fg-secondary);
  margin-right: var(--space-2);
`;

const ActionButton = styled.button`
  background-color: var(--action-primary);
  color: var(--fg-inverse);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.75rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--action-primary-hover);
  }
`;

// =========================================
// 5. RENDER LOGIC
// =========================================

export const SectionRenderer = ({ section }: { section: GameSection }) => {
  const Header = styled.div`
    margin-bottom: var(--space-6);
    h3 {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--fg-primary);
      margin-bottom: var(--space-2);
    }
    p {
      color: var(--fg-secondary);
    }
  `;

  return (
    <div style={{ marginBottom: "var(--space-12)" }}>
      <Header>
        <h3>{section.title}</h3>
        {section.description && <p>{section.description}</p>}
      </Header>

      {/* GRID TYPE */}
      {(section.type === "grid_cards" ||
        section.type === "profile_carousel") && (
        <GridWrapper>
          {section.items.map((item) => (
            <Card key={item.id}>
              {/* FIX: Pass image via inline style */}
              <CardImage style={{ backgroundImage: `url(${item.image})` }}>
                {item.tags?.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </CardImage>
              <CardContent>
                <h4>{item.title}</h4>
                {item.subtitle && <p className="sub">{item.subtitle}</p>}
                <CardFooter>
                  <div>
                    <span className="from">From</span>
                    <span className="price">${item.priceStart}</span>
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </GridWrapper>
      )}

      {/* TABLE TYPE */}
      {section.type === "table_list" && (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th className="hidden md:table-cell">Attributes</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.title}</td>
                  <td className="hidden md:table-cell">
                    {item.meta &&
                      Object.entries(item.meta).map(([k, v]) => (
                        <MetaTag key={k}>
                          {k}: {v}
                        </MetaTag>
                      ))}
                  </td>
                  <td
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                    }}
                  >
                    ${item.priceStart}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <ActionButton>VIEW</ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}

      {/* BANNER TYPE */}
      {section.type === "banner_cta" && (
        <div
          style={{
            height: "300px",
            borderRadius: "var(--radius-lg)",
            backgroundImage: `url(${section.items[0].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            padding: "var(--space-8)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
            }}
          />
          <div
            style={{ position: "relative", zIndex: 10, color: "var(--gray-0)" }}
          >
            <span
              style={{
                backgroundColor: "var(--color-info)",
                padding: "4px 8px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              News
            </span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2rem",
                fontWeight: 800,
                margin: "var(--space-2) 0",
              }}
            >
              {section.items[0].title}
            </h3>
            <ActionButton
              style={{
                backgroundColor: "var(--gray-0)",
                color: "var(--gray-900)",
              }}
            >
              {section.items[0].subtitle}
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
};
