//apps/web/src/components/features/Calculators/dota/MMRCalculator.tsx
"use client";
interface MMRCalculatorProps {
  defaultMode?: "solo" | "duo";
}
import { styled, css } from "next-yak";
import { useState, useEffect, useMemo } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Ensure you have this or your own slider styles
import { getRankImage } from "@/data/dota-mmr";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import {
  Zap,
  Eye,
  Mic,
  ShieldAlert,
  Clock,
  Lock,
  TrendingUp,
  Skull,
  Coins,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Tag,
  Receipt,
  HelpCircle,
  Ban,
  Sword,
} from "lucide-react";
import { MMRInput } from "./MMRInput";
import { HeroSelector } from "./HeroSelector";
import { motion, AnimatePresence } from "framer-motion";
import { queries } from "@/config/theme";
import {
  calculateBoostPrice,
  estimateCompletion,
  PRICING_CONSTANTS,
} from "@/config/dota-pricing";

// --- CONSTANTS ---
const DISCOUNT_TIERS = [
  { threshold: 50, percent: 5, label: "5%" },
  { threshold: 100, percent: 10, label: "10%" },
  { threshold: 200, percent: 15, label: "15%" },
];

// --- STYLES (Strictly using Design System Tokens) ---

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: var(--font-body);
  color: var(--fg-primary);
  padding-bottom: 100px; /* Space for mobile bar */
  ${queries.xl} {
    padding-bottom: 0;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  position: relative;

  ${queries.xl} {
    grid-template-columns: 1fr 400px;
    gap: var(--space-10);
    align-items: start;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`;

const Section = styled.section<{ $disabled?: boolean }>`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); // 12px or 20px depending on token
  padding: var(--space-6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: opacity 0.3s, filter 0.3s;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
      filter: grayscale(0.8);
    `}

  ${queries.md} {
    padding: var(--space-8);
  }
`;

const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  font-family: var(--font-heading);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--fg-primary);

  svg {
    color: var(--action-primary);
  }
`;

// --- TOOLTIP COMPONENT ---
const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: var(--space-2);
  cursor: help;
`;

const TooltipContent = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-inverse);
  color: var(--fg-inverse);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  width: 220px;
  text-align: center;
  z-index: 50;
  margin-bottom: var(--space-2);
  pointer-events: none;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--bg-inverse) transparent transparent transparent;
  }
`;

// --- RANK & INPUTS ---

const RankDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-10);

  ${queries.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 var(--space-5);
  }
`;

const RankCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const RankImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  margin-bottom: var(--space-4);

  ${queries.md} {
    width: 120px;
    height: 120px;
  }
`;

const ValueBadge = styled.span<{ $color?: string }>`
  background: var(--bg-canvas);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  color: ${({ $color }) => $color || "var(--fg-primary)"};
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  font-size: 0.85rem;
`;

const StyledSlider = styled(Slider)`
  &.rc-slider {
    height: 24px;
  }
  .rc-slider-rail {
    height: 8px;
    background-color: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
  }
  .rc-slider-track {
    height: 8px;
    background-color: var(--action-primary);
  }
  .rc-slider-handle {
    width: 24px;
    height: 24px;
    margin-top: -9px;
    background-color: var(--bg-surface);
    border: 2px solid var(--action-primary);
    opacity: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: grab;
    &:active {
      cursor: grabbing;
      transform: scale(1.1);
    }
  }
`;

// --- RECEIPT & SIDEBAR ---

const StickySidebar = styled.aside`
  position: sticky;
  top: var(--space-6);
  height: fit-content;
  z-index: 10;
`;

const SummaryCard = styled.div<{ $isExpress: boolean }>`
  background: var(--bg-surface);
  border: 1px solid
    ${({ $isExpress }) =>
      $isExpress ? "var(--color-warning)" : "var(--border-subtle)"};
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);

  ${queries.md} {
    padding: var(--space-8);
  }
`;

const ReceiptContainer = styled.div`
  background: var(--bg-canvas);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-5);
  font-size: 0.85rem;
`;

const LineItem = styled.div<{
  $variant?: "base" | "addon" | "fee" | "discount";
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
  color: var(--fg-secondary);

  &:last-child {
    margin-bottom: 0;
  }

  ${({ $variant }) =>
    $variant === "base" &&
    css`
      font-weight: 600;
      color: var(--fg-primary);
    `}
  ${({ $variant }) =>
    $variant === "addon" &&
    css`
      color: var(--color-info);
    `}
  ${({ $variant }) =>
    $variant === "fee" &&
    css`
      color: var(--color-danger);
    `}
  ${({ $variant }) =>
    $variant === "discount" &&
    css`
      color: var(--color-success);
      font-weight: 600;
    `}
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-3) 0;
`;

// --- DISCOUNT WIDGET ---
const DiscountWidget = styled.div<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "rgba(34, 197, 94, 0.1)" : "var(--bg-canvas)"};
  border: 1px dashed
    ${({ $active }) =>
      $active ? "var(--color-success)" : "var(--border-strong)"};
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-5);
`;

const ProgressBarTrack = styled.div`
  height: 6px;
  background: var(--border-subtle);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
  margin-top: var(--space-3);
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: var(--color-success);
`;

// --- ADDONS ---
const AddonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  margin-bottom: var(--space-6);
`;

const AddonCard = styled.button<{
  $active: boolean;
  $variant?: "express";
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: ${({ $active }) =>
    $active ? "var(--bg-surface)" : "var(--bg-canvas)"};
  border: 2px solid
    ${({ $active, $variant }) =>
      $active
        ? $variant === "express"
          ? "var(--color-warning)"
          : "var(--action-primary)"
        : "var(--border-subtle)"};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
  h4 {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--fg-primary);
  }
`;

// --- PREFERENCES ---
const PreferenceRow = styled.label<{ $disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) 0;
  cursor: pointer;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  span {
    font-size: 0.9rem;
    color: var(--fg-primary);
  }
  input {
    width: 16px;
    height: 16px;
    accent-color: var(--action-primary);
  }
`;

// --- PRICE ---
const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-top: 1px solid var(--border-subtle);
  padding-top: var(--space-5);
  margin-top: auto;
`;

const TotalPrice = styled.span`
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--fg-primary);
  font-family: var(--font-heading);
  letter-spacing: -1px;
`;

const CheckoutBtn = styled.button`
  background: var(--action-primary);
  color: var(--bg-canvas);
  border: none;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  &:hover {
    background: var(--action-primary-hover);
  }
`;

// --- MOBILE BAR ---
const MobileBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-4) var(--space-6);
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
  ${queries.xl} {
    display: none;
  }
`;

// --- MAIN COMPONENT ---

export const MMRCalculator = ({ defaultMode = "solo" }: MMRCalculatorProps) => {
  // 1. STATE
  //
  const [addons, setAddons] = useState({
    stream: false,
    express: false,
    duo: defaultMode === "duo",
  });
  const [mmr, setMmr] = useState([2000, 4000]);
  const [behavior, setBehavior] = useState(10000);
  const [rankConfidence, setRankConfidence] = useState(100);
  const [hasLP, setHasLP] = useState(false);
  const [lpGames, setLpGames] = useState(1);

  // Heroes State
  const [selectedHeroes, setSelectedHeroes] = useState<number[]>([]);
  const [bannedHeroes, setBannedHeroes] = useState<number[]>([]);

  const [prefs, setPrefs] = useState({
    offline: true,
    roles: false,
    doubleDown: true,
  });
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const {
    MMR_MIN_GAP,
    MMR_MAX,
    BEHAVIOR_TOXIC_THRESHOLD,
    RANK_CONFIDENCE_THRESHOLD,
  } = PRICING_CONSTANTS;

  // 2. EFFECTS
  useEffect(() => {
    if (addons.duo) {
      setAddons((p) => ({ ...p, stream: false }));
      setSelectedHeroes([]);
      setPrefs((p) => ({ ...p, roles: false }));
    }
  }, [addons.duo]);

  // 3. CALCULATIONS (PRICE BREAKDOWN)
  const priceBreakdown = useMemo(() => {
    // Simulate calculation logic (replace with your real utility function logic)
    const mmrDiff = mmr[1] - mmr[0];
    const basePrice = (mmrDiff / 100) * 5; // $5 per 100 MMR base

    let runningTotal = basePrice;

    const expressCost = addons.express ? runningTotal * 0.25 : 0;
    const duoCost = addons.duo ? runningTotal * 0.4 : 0;
    const streamCost = addons.stream ? runningTotal * 0.15 : 0;

    // Fees
    const toxicFee =
      behavior < BEHAVIOR_TOXIC_THRESHOLD ? runningTotal * 0.2 : 0;
    const lpqCost = hasLP ? lpGames * 5 : 0;
    const specificHeroFee = selectedHeroes.length > 0 ? runningTotal * 0.1 : 0;
    // Banned heroes are usually free unless > 3, assuming free here

    const totalBeforeDiscount =
      basePrice +
      expressCost +
      duoCost +
      streamCost +
      toxicFee +
      lpqCost +
      specificHeroFee;

    // Discounts
    const maxThreshold = DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1].threshold;
    const activeTier = [...DISCOUNT_TIERS]
      .reverse()
      .find((t) => totalBeforeDiscount >= t.threshold);
    const nextTier = DISCOUNT_TIERS.find(
      (t) => totalBeforeDiscount < t.threshold
    );

    const discountAmount = activeTier
      ? (totalBeforeDiscount * activeTier.percent) / 100
      : 0;
    const finalPrice = totalBeforeDiscount - discountAmount;

    const progressPercent =
      totalBeforeDiscount >= maxThreshold
        ? 100
        : (totalBeforeDiscount / maxThreshold) * 100;

    return {
      base: basePrice,
      components: {
        express: expressCost,
        duo: duoCost,
        stream: streamCost,
        toxic: toxicFee,
        lpq: lpqCost,
        heroes: specificHeroFee,
      },
      totalBeforeDiscount,
      discountAmount,
      finalPrice,
      activeTier,
      nextTier,
      progressPercent,
    };
  }, [mmr, behavior, hasLP, lpGames, addons, selectedHeroes]);

  const estimation = useMemo(
    () =>
      estimateCompletion(
        mmr[0],
        mmr[1],
        addons.express,
        rankConfidence,
        hasLP ? lpGames : 0
      ),
    [mmr, addons.express, rankConfidence, hasLP, lpGames]
  );

  const handleAddToCart = () => {
    addItem({
      productId: "dota-mmr-boost",
      title: `Dota 2 Boost (${mmr[0]} -> ${mmr[1]})`,
      price: priceBreakdown.finalPrice,
      quantity: 1,
      category: "service",
      options: {
        start: mmr[0],
        end: mmr[1],
        behavior,
        ...addons,
        discount: priceBreakdown.activeTier?.label,
      },
    });
    toast.success("Added to Cart!");
    openCart();
  };

  return (
    <Container>
      <LayoutGrid>
        {/* --- LEFT COLUMN --- */}
        <MainContent>
          {/* SECTION 1: RANK */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <TrendingUp size={20} /> Matchmaking Rating
              </SectionTitle>
              <ValueBadge>{mmr[1] - mmr[0]} MMR Gain</ValueBadge>
            </SectionHeader>

            <RankDisplayContainer>
              <RankCard>
                <RankImage src={getRankImage(mmr[0])} />
                <MMRInput
                  value={mmr[0]}
                  min={0}
                  max={mmr[1] - MMR_MIN_GAP}
                  onChange={(v) =>
                    setMmr([Math.min(v, mmr[1] - MMR_MIN_GAP), mmr[1]])
                  }
                />
              </RankCard>
              <div
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--border-strong)",
                }}
              >
                <ArrowRight />
              </div>
              <RankCard>
                <RankImage src={getRankImage(mmr[1])} />
                <MMRInput
                  value={mmr[1]}
                  min={mmr[0] + MMR_MIN_GAP}
                  max={MMR_MAX}
                  onChange={(v) =>
                    setMmr([mmr[0], Math.max(v, mmr[0] + MMR_MIN_GAP)])
                  }
                />
              </RankCard>
            </RankDisplayContainer>

            <div style={{ padding: "0 var(--space-3)" }}>
              <StyledSlider
                range
                min={0}
                max={MMR_MAX}
                step={20}
                value={mmr}
                onChange={(val) => setMmr(val as number[])}
                allowCross={false}
                pushable={MMR_MIN_GAP}
              />
            </div>
          </Section>

          {/* SECTION 2: ACCOUNT DETAILS */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <ShieldAlert size={20} /> Account Details
              </SectionTitle>
            </SectionHeader>

            <div
              style={{
                display: "grid",
                gap: "var(--space-8)",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {/* Behavior Score with Tooltip */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      Behavior Score
                    </span>
                    <TooltipWrapper
                      onMouseEnter={() => setIsTooltipOpen(true)}
                      onMouseLeave={() => setIsTooltipOpen(false)}
                      onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                    >
                      <HelpCircle size={16} color="var(--fg-muted)" />
                      <AnimatePresence>
                        {isTooltipOpen && (
                          <TooltipContent
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                          >
                            Behavior scores below {BEHAVIOR_TOXIC_THRESHOLD}{" "}
                            indicate a "toxic" matchmaking pool. Games are
                            significantly harder to carry, requiring a small fee
                            (+20%) for the booster's extra effort.
                          </TooltipContent>
                        )}
                      </AnimatePresence>
                    </TooltipWrapper>
                  </div>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color:
                        behavior < BEHAVIOR_TOXIC_THRESHOLD
                          ? "var(--color-danger)"
                          : "var(--color-success)",
                    }}
                  >
                    {behavior}
                  </span>
                </div>
                <StyledSlider
                  min={0}
                  max={10000}
                  step={100}
                  value={behavior}
                  onChange={(v) => setBehavior(v as number)}
                  trackStyle={{
                    backgroundColor:
                      behavior < BEHAVIOR_TOXIC_THRESHOLD
                        ? "var(--color-danger)"
                        : "var(--color-success)",
                  }}
                />
              </div>

              {/* Rank Confidence */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    Rank Confidence
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color:
                        rankConfidence < RANK_CONFIDENCE_THRESHOLD
                          ? "var(--color-success)"
                          : "var(--fg-primary)",
                    }}
                  >
                    {rankConfidence}%
                  </span>
                </div>
                <StyledSlider
                  min={0}
                  max={100}
                  step={5}
                  value={rankConfidence}
                  onChange={(v) => setRankConfidence(v as number)}
                />
              </div>
            </div>

            {/* Low Priority */}
            <div
              style={{
                marginTop: "var(--space-6)",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "var(--space-6)",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={hasLP}
                  onChange={(e) => setHasLP(e.target.checked)}
                  style={{
                    width: 16,
                    height: 16,
                    accentColor: "var(--action-primary)",
                  }}
                />
                <span style={{ fontWeight: 600 }}>
                  I currently have Low Priority
                </span>
              </label>

              <AnimatePresence>
                {hasLP && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        background: "var(--bg-canvas)",
                        padding: "var(--space-4)",
                        borderRadius: "var(--radius-md)",
                        marginTop: "var(--space-3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontSize: "0.9rem" }}>Games to win:</span>
                      <div
                        style={{
                          display: "flex",
                          gap: "var(--space-3)",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{ width: 28, height: 28 }}
                          onClick={() => setLpGames(Math.max(1, lpGames - 1))}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 700 }}>{lpGames}</span>
                        <button
                          style={{ width: 28, height: 28 }}
                          onClick={() => setLpGames(Math.min(5, lpGames + 1))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Section>

          {/* SECTION 3: HEROES (Selection & Bans) */}
          <Section $disabled={addons.duo}>
            <SectionHeader>
              <SectionTitle>
                <Sword size={20} /> Hero Configuration
              </SectionTitle>
              {addons.duo && (
                <ValueBadge $color="var(--color-warning)">
                  Disabled in Duo
                </ValueBadge>
              )}
            </SectionHeader>

            <div style={{ marginBottom: "var(--space-6)" }}>
              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  marginBottom: "var(--space-3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Specific Heroes{" "}
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--color-danger)",
                    fontWeight: 400,
                  }}
                >
                  (+10% Fee)
                </span>
              </h4>
              <HeroSelector
                selectedIds={selectedHeroes}
                onChange={setSelectedHeroes}
              />
            </div>

            <div>
              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  marginBottom: "var(--space-3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Ban size={14} /> Ban Heroes{" "}
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--fg-muted)",
                    fontWeight: 400,
                  }}
                >
                  (Free)
                </span>
              </h4>
              <HeroSelector
                selectedIds={bannedHeroes}
                onChange={setBannedHeroes}
                mode="ban"
              />
            </div>
          </Section>
        </MainContent>

        {/* --- RIGHT COLUMN: SUMMARY --- */}
        <StickySidebar>
          <SummaryCard $isExpress={addons.express}>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.25rem",
                marginBottom: "var(--space-4)",
              }}
            >
              Order Summary
            </h3>

            {/* SMART PRICING WIDGET */}
            <DiscountWidget $active={!!priceBreakdown.activeTier}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                {priceBreakdown.nextTier ? (
                  <span style={{ color: "var(--fg-secondary)" }}>
                    Spend{" "}
                    <b style={{ color: "var(--fg-primary)" }}>
                      $
                      {(
                        priceBreakdown.nextTier.threshold -
                        priceBreakdown.totalBeforeDiscount
                      ).toFixed(2)}
                    </b>{" "}
                    more for {priceBreakdown.nextTier.label} OFF
                  </span>
                ) : (
                  <span
                    style={{
                      color: "var(--color-success)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Sparkles size={14} /> Max Discount Applied
                  </span>
                )}
              </div>
              <ProgressBarTrack>
                <ProgressBarFill
                  animate={{ width: `${priceBreakdown.progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              </ProgressBarTrack>
            </DiscountWidget>

            {/* ADDONS */}
            <AddonGrid>
              <AddonCard
                $active={addons.duo}
                onClick={() => setAddons((p) => ({ ...p, duo: !p.duo }))}
              >
                <Mic size={18} /> <h4>Duo Queue</h4>
              </AddonCard>
              <AddonCard
                $active={addons.stream}
                onClick={() => setAddons((p) => ({ ...p, stream: !p.stream }))}
                disabled={addons.duo}
              >
                <Eye size={18} /> <h4>Stream</h4>
              </AddonCard>
              <AddonCard
                $active={addons.express}
                $variant="express"
                onClick={() =>
                  setAddons((p) => ({ ...p, express: !p.express }))
                }
              >
                <Zap size={18} /> <h4>Express</h4>
              </AddonCard>
            </AddonGrid>

            {/* PREFERENCES */}
            <div style={{ marginBottom: "var(--space-5)" }}>
              <PreferenceRow>
                <span>Appear Offline</span>
                <input
                  type="checkbox"
                  checked={prefs.offline}
                  onChange={() =>
                    setPrefs((p) => ({ ...p, offline: !p.offline }))
                  }
                />
              </PreferenceRow>
              <PreferenceRow $disabled={addons.duo}>
                <span>Specific Roles</span>
                <input
                  type="checkbox"
                  disabled={addons.duo}
                  checked={prefs.roles}
                  onChange={() => setPrefs((p) => ({ ...p, roles: !p.roles }))}
                />
              </PreferenceRow>
              <PreferenceRow>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span>Double Down Tokens</span>
                  <Coins size={14} color="var(--color-warning)" />
                </div>
                <input
                  type="checkbox"
                  checked={prefs.doubleDown}
                  onChange={() =>
                    setPrefs((p) => ({ ...p, doubleDown: !p.doubleDown }))
                  }
                />
              </PreferenceRow>
            </div>

            {/* PRICE RECEIPT */}
            <ReceiptContainer>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: "var(--space-3)",
                  color: "var(--fg-muted)",
                }}
              >
                <Receipt size={14} />{" "}
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Price Formation
                </span>
              </div>

              <LineItem $variant="base">
                <span>MMR Boost</span>
                <span>${priceBreakdown.base.toFixed(2)}</span>
              </LineItem>

              <AnimatePresence>
                {priceBreakdown.components.express > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <LineItem $variant="addon">
                      <span>Express Priority</span>
                      <span>
                        +${priceBreakdown.components.express.toFixed(2)}
                      </span>
                    </LineItem>
                  </motion.div>
                )}
                {priceBreakdown.components.duo > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <LineItem $variant="addon">
                      <span>Duo Queue</span>
                      <span>+${priceBreakdown.components.duo.toFixed(2)}</span>
                    </LineItem>
                  </motion.div>
                )}
                {priceBreakdown.components.stream > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <LineItem $variant="addon">
                      <span>Stream On</span>
                      <span>
                        +${priceBreakdown.components.stream.toFixed(2)}
                      </span>
                    </LineItem>
                  </motion.div>
                )}
                {priceBreakdown.components.toxic > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <LineItem $variant="fee">
                      <span>Low Behavior Fee</span>
                      <span>
                        +${priceBreakdown.components.toxic.toFixed(2)}
                      </span>
                    </LineItem>
                  </motion.div>
                )}
                {priceBreakdown.components.lpq > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <LineItem $variant="fee">
                      <span>Low Priority Removal</span>
                      <span>+${priceBreakdown.components.lpq.toFixed(2)}</span>
                    </LineItem>
                  </motion.div>
                )}
                {priceBreakdown.components.heroes > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <LineItem $variant="fee">
                      <span>Specific Heroes</span>
                      <span>
                        +${priceBreakdown.components.heroes.toFixed(2)}
                      </span>
                    </LineItem>
                  </motion.div>
                )}
              </AnimatePresence>

              <Divider />

              <LineItem>
                <span>Subtotal</span>
                <span>${priceBreakdown.totalBeforeDiscount.toFixed(2)}</span>
              </LineItem>

              {priceBreakdown.activeTier && (
                <LineItem $variant="discount">
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Tag size={12} /> Discount (
                    {priceBreakdown.activeTier.label})
                  </span>
                  <span>-${priceBreakdown.discountAmount.toFixed(2)}</span>
                </LineItem>
              )}
            </ReceiptContainer>

            {/* FINAL TOTAL */}
            <PriceSection>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--fg-muted)",
                  marginBottom: 4,
                  display: "flex",
                  gap: 6,
                }}
              >
                <Clock size={14} /> Est. Completion: {estimation.days} Days
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "var(--space-3)",
                }}
              >
                {priceBreakdown.activeTier && (
                  <span
                    style={{
                      fontSize: "1rem",
                      textDecoration: "line-through",
                      color: "var(--fg-muted)",
                    }}
                  >
                    ${priceBreakdown.totalBeforeDiscount.toFixed(2)}
                  </span>
                )}
                <TotalPrice>${priceBreakdown.finalPrice.toFixed(2)}</TotalPrice>
              </div>
            </PriceSection>

            <CheckoutBtn onClick={handleAddToCart}>
              Secure Checkout <ArrowRight size={20} />
            </CheckoutBtn>

            <div
              style={{
                textAlign: "center",
                marginTop: "var(--space-4)",
                fontSize: "0.75rem",
                color: "var(--fg-muted)",
                display: "flex",
                justifyContent: "center",
                gap: "var(--space-4)",
              }}
            >
              <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <CheckCircle2 size={12} /> Verified
              </span>
              <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <Lock size={12} /> Encrypted
              </span>
            </div>
          </SummaryCard>
        </StickySidebar>
      </LayoutGrid>

      {/* MOBILE FIXED BAR */}
      <MobileBottomBar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--fg-muted)" }}>
            {estimation.days} Days
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800 }}>
            ${priceBreakdown.finalPrice.toFixed(2)}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            background: "var(--action-primary)",
            color: "var(--bg-canvas)",
            border: "none",
            padding: "12px 24px",
            borderRadius: 12,
            fontWeight: 700,
          }}
        >
          Book Now
        </button>
      </MobileBottomBar>
    </Container>
  );
};
