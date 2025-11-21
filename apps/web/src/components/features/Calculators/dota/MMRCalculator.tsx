//apps/web/src/components/features/Calculators/dota/MMRCalculator.tsx
"use client";

import { styled, keyframes, css } from "next-yak";
import { useState, useEffect, useMemo } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { getRankImage } from "@/data/dota-mmr"; // Assuming this still exists for images
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

// --- STYLES (Kept mostly same, added specific tweaks) ---

const lightningPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
  50% { box-shadow: 0 0 20px 2px rgba(234, 179, 8, 0.2); border-color: #eab308; }
  100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
`;

const Wrapper = styled.div<{ $isExpress: boolean }>`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
  position: relative;
  padding-bottom: 80px;

  ${queries.md} {
    padding: 32px;
    padding-bottom: 32px;
  }

  ${({ $isExpress }) =>
    $isExpress &&
    css`
      border-color: #eab308;
      animation: ${lightningPulse} 2s infinite;
    `}
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  font-family: var(--font-heading);
`;

const ExpressBadge = styled.span`
  color: #eab308;
  font-weight: 700;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CalcGrid = styled.div`
  display: grid;
  gap: 40px;

  ${queries.lg} {
    grid-template-columns: 1.5fr 1fr;
    align-items: start;
  }
`;

// --- RANK INPUTS ---
const RankRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: flex-end;
  gap: 12px;
`;

const RankBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: center;
  min-width: 0;
`;

const RankIcon = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
  transition: transform 0.2s;
  margin-bottom: 12px;

  ${queries.md} {
    width: 90px;
    height: 90px;
  }
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: var(--fg-secondary);
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 8px;
`;

// --- SLIDERS & INPUTS SECTION ---
const SectionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--fg-primary);
`;

const StyledSliderContainer = styled.div`
  margin-bottom: 32px;
  padding: 0 8px;
`;

const TrackInput = styled.input<{ $variant?: "toxic" | "confidence" }>`
  width: 100%;
  height: 8px;
  border-radius: 6px;
  appearance: none;
  background: ${({ $variant }) =>
    $variant === "confidence"
      ? "linear-gradient(90deg, #22c55e 0%, #eab308 100%)"
      : "linear-gradient(90deg, #ef4444 0%, #eab308 50%, #22c55e 100%)"};
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    border: 2px solid var(--fg-primary);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.1s;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.1);
  }
`;

// --- INFO BADGES ---
const InfoBadge = styled(motion.div)<{
  $variant?: "danger" | "success" | "info";
}>`
  background: ${({ $variant }) =>
    $variant === "danger"
      ? "rgba(239, 68, 68, 0.1)"
      : $variant === "success"
      ? "rgba(34, 197, 94, 0.1)"
      : "var(--bg-surface-hover)"};
  color: ${({ $variant }) =>
    $variant === "danger"
      ? "#ef4444"
      : $variant === "success"
      ? "#22c55e"
      : "var(--fg-secondary)"};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "danger"
        ? "#ef4444"
        : $variant === "success"
        ? "#22c55e"
        : "var(--border-subtle)"};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 10px 12px;
  border-radius: 8px;
  margin-top: 12px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.4;
`;

// --- LPQ COUNTER ---
const LPQContainer = styled(motion.div)`
  background: var(--bg-canvas);
  border: 1px dashed var(--border-strong);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 32px;
`;

const CounterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const CounterBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border-strong);
  background: var(--bg-surface);
  color: var(--fg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: var(--bg-surface-hover);
  }
`;

// --- ADDONS & SUMMARY ---
const AddonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 24px;
`;

const AddonCard = styled.button<{ $active: boolean; disabled?: boolean }>`
  background: ${({ $active }) =>
    $active ? "rgba(59, 130, 246, 0.1)" : "var(--bg-canvas)"};
  border: 2px solid
    ${({ $active }) =>
      $active ? "var(--action-primary)" : "var(--border-subtle)"};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  height: 70px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      filter: grayscale(1);
    `}

  span {
    font-size: 0.7rem;
    font-weight: 600;
    margin-top: 6px;
    color: var(--fg-primary);
  }
`;

const ExpressCard = styled(AddonCard)<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "rgba(234, 179, 8, 0.1)" : "var(--bg-canvas)"};
  border-color: ${({ $active }) =>
    $active ? "#eab308" : "var(--border-subtle)"};
  grid-column: span 2;
`;

const SummaryPanel = styled.div`
  background: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
  ${queries.lg} {
    position: sticky;
    top: 24px;
  }
`;

// --- PREFERENCES ---
const PreferenceRow = styled.div<{ $disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
`;

const Toggle = styled.button<{ $active: boolean }>`
  width: 40px;
  height: 22px;
  border-radius: 99px;
  background: ${({ $active }) =>
    $active ? "var(--action-primary)" : "var(--border-strong)"};
  position: relative;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? "20px" : "2px")};
    width: 18px;
    height: 18px;
    background: var(--bg-surface);
    border-radius: 50%;
    transition: left 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const MobileStickyPrice = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom, 20px);
  ${queries.lg} {
    display: none;
  }
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--fg-primary);
`;

const BookBtn = styled.button`
  background: var(--action-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  ${queries.lg} {
    width: 100%;
    padding: 16px;
    font-size: 1.1rem;
    margin-top: 16px;
  }
`;

// --- COMPONENT ---

export const MMRCalculator = () => {
  const [mmr, setMmr] = useState([2000, 4000]);
  const [behavior, setBehavior] = useState(10000);
  const [rankConfidence, setRankConfidence] = useState(100); // 0 - 100%
  const [hasLP, setHasLP] = useState(false);
  const [lpGames, setLpGames] = useState(1);

  const [addons, setAddons] = useState({
    stream: false,
    express: false,
    duo: false,
  });

  const [selectedHeroes, setSelectedHeroes] = useState<number[]>([]);
  const [bannedHeroes, setBannedHeroes] = useState<number[]>([]);

  const [prefs, setPrefs] = useState({
    offline: true,
    roles: false,
    vpn: true,
    doubleDown: true,
  });

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const {
    MMR_MIN_GAP,
    MMR_MAX,
    BEHAVIOR_TOXIC_THRESHOLD,
    RANK_CONFIDENCE_THRESHOLD,
  } = PRICING_CONSTANTS;

  // Derived States
  const isToxic = behavior < BEHAVIOR_TOXIC_THRESHOLD;
  const isLowConfidence = rankConfidence < RANK_CONFIDENCE_THRESHOLD;

  // Image Handlers
  const startImage = getRankImage(mmr[0]);
  const endImage = getRankImage(mmr[1]);

  // Handlers
  const handleCurrentChange = (newVal: number) =>
    setMmr([Math.min(newVal, mmr[1] - MMR_MIN_GAP), mmr[1]]);

  const handleDesiredChange = (newVal: number) =>
    setMmr([mmr[0], Math.max(newVal, mmr[0] + MMR_MIN_GAP)]);

  // Auto-Disable logic for Duo
  useEffect(() => {
    if (addons.duo) {
      if (addons.stream) setAddons((p) => ({ ...p, stream: false }));
      if (selectedHeroes.length > 0) setSelectedHeroes([]);
    }
  }, [addons.duo]);

  // --- PRICING & ESTIMATION CALC ---
  const priceData = useMemo(() => {
    return calculateBoostPrice({
      startMmr: mmr[0],
      endMmr: mmr[1],
      behaviorScore: behavior,
      lpGames: hasLP ? lpGames : 0,
      rankConfidence,
      addons: {
        ...addons,
        specificHeroes: selectedHeroes.length > 0,
      },
    });
  }, [mmr, behavior, hasLP, lpGames, rankConfidence, addons, selectedHeroes]);

  const estimation = useMemo(() => {
    return estimateCompletion(
      mmr[0],
      mmr[1],
      addons.express,
      rankConfidence,
      hasLP ? lpGames : 0
    );
  }, [mmr, addons.express, rankConfidence, hasLP, lpGames]);

  const handleAddToCart = () => {
    addItem({
      productId: "dota-mmr-boost",
      title: `Dota 2 Boost (${mmr[0]} -> ${mmr[1]})`,
      price: priceData.total,
      quantity: 1,
      category: "service",
      options: {
        start: mmr[0],
        end: mmr[1],
        behavior,
        rankConfidence,
        lpGames: hasLP ? lpGames : 0,
        heroes: selectedHeroes,
        banned: bannedHeroes,
        preferences: prefs,
        ...addons,
      },
    });
    toast.success("Added to Cart!");
    openCart();
  };

  return (
    <Wrapper $isExpress={addons.express}>
      <HeaderRow>
        <Title>Configure Boost</Title>
        {addons.express && (
          <ExpressBadge>
            <Zap size={14} fill="#eab308" /> EXPRESS ACTIVE
          </ExpressBadge>
        )}
      </HeaderRow>

      <CalcGrid>
        {/* LEFT COLUMN: CONFIGURATOR */}
        <div>
          <RankRow>
            <RankBox>
              <RankIcon src={startImage} alt="Current" />
              <MMRInput
                value={mmr[0]}
                min={0}
                max={mmr[1] - MMR_MIN_GAP}
                onChange={handleCurrentChange}
              />
              <Label>Current MMR</Label>
            </RankBox>
            <RankBox>
              <RankIcon src={endImage} alt="Desired" />
              <MMRInput
                value={mmr[1]}
                min={mmr[0] + MMR_MIN_GAP}
                max={MMR_MAX}
                onChange={handleDesiredChange}
              />
              <Label>Desired MMR</Label>
            </RankBox>
          </RankRow>

          <StyledSliderContainer>
            <Slider
              range
              min={0}
              max={MMR_MAX}
              step={20}
              value={mmr}
              onChange={(val) => setMmr(val as number[])}
              allowCross={false}
              pushable={MMR_MIN_GAP}
              trackStyle={{
                backgroundColor: "var(--action-primary)",
                height: 8,
              }}
              railStyle={{ backgroundColor: "var(--border-subtle)", height: 8 }}
              handleStyle={{
                backgroundColor: "var(--bg-surface)",
                border: "3px solid var(--action-primary)",
                height: 24,
                width: 24,
                marginTop: -8,
                opacity: 1,
              }}
            />
          </StyledSliderContainer>

          {/* BEHAVIOR SCORE */}
          <StyledSliderContainer>
            <SectionLabel>
              <span>Behavior Score</span>
              <span style={{ color: isToxic ? "#ef4444" : "#22c55e" }}>
                {behavior}
              </span>
            </SectionLabel>
            <TrackInput
              type="range"
              min="0"
              max="10000"
              step="100"
              value={behavior}
              onChange={(e) => setBehavior(Number(e.target.value))}
            />
            <AnimatePresence>
              {isToxic && (
                <InfoBadge
                  $variant="danger"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Skull size={18} style={{ minWidth: 18 }} />
                  <div>
                    <strong>Toxic Matchmaking Environment</strong>
                    <br />
                    Low behavior score results in harder games. A small fee
                    (+20%) is applied to compensate boosters.
                  </div>
                </InfoBadge>
              )}
            </AnimatePresence>
          </StyledSliderContainer>

          {/* RANK CONFIDENCE */}
          <StyledSliderContainer>
            <SectionLabel>
              <span>Rank Confidence</span>
              <span
                style={{
                  color: isLowConfidence ? "#22c55e" : "var(--fg-muted)",
                }}
              >
                {rankConfidence}%{" "}
                {isLowConfidence ? "(Fast Gains)" : "(Standard)"}
              </span>
            </SectionLabel>
            <TrackInput
              $variant="confidence"
              type="range"
              min="0"
              max="100"
              step="5"
              value={rankConfidence}
              onChange={(e) => setRankConfidence(Number(e.target.value))}
            />
            <AnimatePresence>
              {isLowConfidence && (
                <InfoBadge
                  $variant="success"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <TrendingUp size={18} />
                  Low Confidence detected. We estimate gaining 40+ MMR per win,
                  resulting in a faster boost!
                </InfoBadge>
              )}
            </AnimatePresence>
          </StyledSliderContainer>

          {/* LOW PRIORITY TOGGLE */}
          <PreferenceRow style={{ marginBottom: hasLP ? 16 : 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldAlert
                size={18}
                color={hasLP ? "#ef4444" : "var(--fg-muted)"}
              />
              <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                I currently have Low Priority
              </span>
            </div>
            <Toggle $active={hasLP} onClick={() => setHasLP(!hasLP)} />
          </PreferenceRow>

          <AnimatePresence>
            {hasLP && (
              <LPQContainer
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <SectionLabel>
                  <span>Games to Remove</span>
                  <span>+${priceData.lpCost}</span>
                </SectionLabel>
                <CounterRow>
                  <CounterBtn
                    onClick={() => setLpGames(Math.max(1, lpGames - 1))}
                  >
                    -
                  </CounterBtn>
                  <span style={{ fontWeight: 700 }}>{lpGames} Games</span>
                  <CounterBtn
                    onClick={() => setLpGames(Math.min(5, lpGames + 1))}
                  >
                    +
                  </CounterBtn>
                </CounterRow>
              </LPQContainer>
            )}
          </AnimatePresence>

          {/* HEROES */}
          <div
            style={{
              opacity: addons.duo ? 0.5 : 1,
              pointerEvents: addons.duo ? "none" : "auto",
              transition: "opacity 0.3s",
            }}
          >
            {addons.duo && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#eab308",
                  marginBottom: 8,
                }}
              >
                Hero selection disabled in Duo mode
              </div>
            )}
            <HeroSelector
              selectedIds={selectedHeroes}
              onChange={setSelectedHeroes}
            />
            <HeroSelector
              selectedIds={bannedHeroes}
              onChange={setBannedHeroes}
              mode="ban"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY SUMMARY */}
        <SummaryPanel>
          <h4 style={{ marginBottom: 16, fontSize: "0.9rem", fontWeight: 700 }}>
            Extras
          </h4>

          <AddonsGrid>
            <AddonCard
              $active={addons.duo}
              onClick={() => setAddons((p) => ({ ...p, duo: !p.duo }))}
            >
              <Mic
                size={24}
                color={addons.duo ? "var(--action-primary)" : "var(--fg-muted)"}
              />
              <span>Duo Queue</span>
            </AddonCard>

            <AddonCard
              $active={addons.stream}
              onClick={() => setAddons((p) => ({ ...p, stream: !p.stream }))}
              disabled={addons.duo}
            >
              {addons.duo ? (
                <Lock size={24} />
              ) : (
                <Eye
                  size={24}
                  color={
                    addons.stream ? "var(--action-primary)" : "var(--fg-muted)"
                  }
                />
              )}
              <span>Stream</span>
            </AddonCard>

            <ExpressCard
              $active={addons.express}
              onClick={() => setAddons((p) => ({ ...p, express: !p.express }))}
            >
              <Zap
                size={24}
                fill={addons.express ? "#eab308" : "none"}
                color={addons.express ? "#eab308" : "var(--fg-muted)"}
              />
              <span
                style={{
                  color: addons.express ? "#eab308" : "var(--fg-primary)",
                }}
              >
                Express
              </span>
            </ExpressCard>
          </AddonsGrid>

          <div style={{ marginBottom: 24 }}>
            <h4
              style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 8 }}
            >
              Preferences
            </h4>
            <PreferenceRow>
              <span>Appear Offline</span>
              <Toggle
                $active={prefs.offline}
                onClick={() => setPrefs((p) => ({ ...p, offline: !p.offline }))}
              />
            </PreferenceRow>

            <PreferenceRow $disabled={addons.duo}>
              <span>Specific Roles</span>
              <Toggle
                $active={prefs.roles}
                onClick={() => setPrefs((p) => ({ ...p, roles: !p.roles }))}
              />
            </PreferenceRow>

            <PreferenceRow>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span>Use Double Down Tokens</span>
                <Coins size={14} color="#eab308" />
              </div>
              <Toggle
                $active={prefs.doubleDown}
                onClick={() =>
                  setPrefs((p) => ({ ...p, doubleDown: !p.doubleDown }))
                }
              />
            </PreferenceRow>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border-subtle)",
              paddingTop: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 16,
                color: addons.express ? "#eab308" : "var(--fg-muted)",
                fontSize: "0.9rem",
              }}
            >
              {addons.express ? <Zap size={16} /> : <Clock size={16} />}
              <strong>
                Est. Completion: {estimation.days}{" "}
                {estimation.days === 1 ? "Day" : "Days"}
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 700 }}>Total</span>
              <Price>${priceData.total}</Price>
            </div>

            <BookBtn onClick={handleAddToCart}>Secure Checkout</BookBtn>
          </div>
        </SummaryPanel>
      </CalcGrid>

      {/* MOBILE STICKY PRICE */}
      <MobileStickyPrice>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--fg-muted)" }}>
            {estimation.days} Days
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            ${priceData.total}
          </span>
        </div>
        <BookBtn
          onClick={handleAddToCart}
          style={{
            padding: "12px 24px",
            fontSize: "1rem",
            margin: 0,
            width: "auto",
          }}
        >
          Book Now
        </BookBtn>
      </MobileStickyPrice>
    </Wrapper>
  );
};
