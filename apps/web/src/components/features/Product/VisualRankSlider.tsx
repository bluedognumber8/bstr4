"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

// Mock Ranks (Valorant style)
const RANKS = [
  {
    id: 1,
    name: "Iron",
    img: "https://img.icons8.com/color/96/iron-ore.png",
    color: "#78716c",
  },
  {
    id: 2,
    name: "Bronze",
    img: "https://img.icons8.com/color/96/bronze-ore.png",
    color: "#b45309",
  },
  {
    id: 3,
    name: "Silver",
    img: "https://img.icons8.com/color/96/silver-bars.png",
    color: "#94a3b8",
  },
  {
    id: 4,
    name: "Gold",
    img: "https://img.icons8.com/color/96/gold-bars.png",
    color: "#eab308",
  },
  {
    id: 5,
    name: "Platinum",
    img: "https://img.icons8.com/fluency/96/platinum.png",
    color: "#38bdf8",
  },
  {
    id: 6,
    name: "Diamond",
    img: "https://img.icons8.com/fluency/96/diamond.png",
    color: "#818cf8",
  },
];

const Container = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Visualization = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: var(--bg-canvas);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
`;

const RankBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100px;
`;

const RankImg = styled.img`
  width: 64px;
  height: 64px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
  transition: transform 0.2s;
`;

const RankName = styled.span<{ $color: string }>`
  font-weight: 800;
  font-family: var(--font-heading);
  color: ${({ $color }) => $color};
  text-transform: uppercase;
`;

const SliderContainer = styled.div`
  position: relative;
  padding: 0 10px;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 6px;
  background: var(--border-subtle);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background: var(--action-primary);
    border: 2px solid var(--bg-surface);
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: -9px; /* Centers thumb */
  }

  &::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 4px;
  }
`;

const PriceTag = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-top: 8px;
`;

export const VisualRankSlider = () => {
  const [current, setCurrent] = useState(2); // Silver
  const [desired, setDesired] = useState(4); // Platinum

  const currentRank = RANKS[current];
  const desiredRank = RANKS[desired];

  // Simple math: $10 per rank diff
  const price = (desired - current) * 15;

  return (
    <Container>
      <Visualization>
        <RankBox>
          <RankName $color={currentRank.color}>Current</RankName>
          <RankImg src={currentRank.img} />
          <strong>{currentRank.name}</strong>
        </RankBox>

        <ArrowRight size={32} color="var(--fg-muted)" />

        <RankBox>
          <RankName $color={desiredRank.color}>Desired</RankName>
          <RankImg src={desiredRank.img} style={{ transform: "scale(1.1)" }} />
          <strong>{desiredRank.name}</strong>
        </RankBox>
      </Visualization>

      <SliderContainer>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
          Select Current Rank
        </label>
        <RangeInput
          type="range"
          min="0"
          max={RANKS.length - 1}
          value={current}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val < desired) setCurrent(val);
          }}
        />
      </SliderContainer>

      <SliderContainer>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
          Select Desired Rank
        </label>
        <RangeInput
          type="range"
          min="0"
          max={RANKS.length - 1}
          value={desired}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val > current) setDesired(val);
          }}
        />
      </SliderContainer>

      <PriceTag>Total: ${price > 0 ? price : 0}</PriceTag>
    </Container>
  );
};
