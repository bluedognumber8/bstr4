// src/components/product/Calculator/inputs/VisualRankSelector.tsx
"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { RankOption, VisualRankConfig } from "../../types";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  margin-bottom: var(--space-6);
`;

const Label = styled.div`
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--fg-secondary);
  margin-bottom: var(--space-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RanksRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  overflow-x: auto;
  padding-bottom: var(--space-2);

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-subtle);
    border-radius: var(--radius-full);
  }
`;

const RankButton = styled.button<{
  $isSelected: boolean;
  $isInRange: boolean;
  $selectionType?: "from" | "to";
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border: 2px solid
    ${({ $isSelected, $isInRange }) =>
      $isSelected
        ? "var(--action-primary)"
        : $isInRange
        ? "var(--color-success)"
        : "var(--border-subtle)"};
  background: ${({ $isSelected, $isInRange }) =>
    $isSelected
      ? "var(--bg-surface-hover)"
      : $isInRange
      ? "rgba(var(--color-success-rgb), 0.1)"
      : "var(--bg-surface)"};
  transition: all 0.2s;
  flex-shrink: 0;
  min-width: 70px;
  position: relative;

  &:hover {
    border-color: var(--action-primary);
    background: var(--bg-surface-hover);
  }

  ${({ $selectionType }) =>
    $selectionType &&
    `
    &::after {
      content: '${$selectionType === "from" ? "FROM" : "TO"}';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      background: ${
        $selectionType === "from" ? "var(--color-info)" : "var(--color-success)"
      };
      color: white;
      font-size: 0.625rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
    }
  `}
`;

const RankIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;

  ${queries.md} {
    width: 48px;
    height: 48px;
  }
`;

const RankLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--fg-primary);
  text-align: center;

  ${queries.md} {
    font-size: 0.75rem;
  }
`;

const SelectionSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);

  .label {
    font-size: 0.6875rem;
    color: var(--fg-muted);
    text-transform: uppercase;
  }

  .value {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1rem;
    color: var(--fg-primary);
  }
`;

const Arrow = styled.div`
  font-size: 1.5rem;
  color: var(--fg-muted);
`;

// --- COMPONENT ---

interface Props {
  config: VisualRankConfig;
  fromRank: string;
  toRank: string;
  onFromChange: (rankId: string) => void;
  onToChange: (rankId: string) => void;
}

export const VisualRankSelector = ({
  config,
  fromRank,
  toRank,
  onFromChange,
  onToChange,
}: Props) => {
  const [selecting, setSelecting] = useState<"from" | "to">("from");

  const fromRankData = config.ranks.find((r) => r.id === fromRank);
  const toRankData = config.ranks.find((r) => r.id === toRank);

  const handleRankClick = (rank: RankOption) => {
    if (selecting === "from") {
      onFromChange(rank.id);
      setSelecting("to");
    } else {
      // Ensure "to" rank is higher than "from"
      const fromIndex = config.ranks.findIndex((r) => r.id === fromRank);
      const clickedIndex = config.ranks.findIndex((r) => r.id === rank.id);

      if (clickedIndex > fromIndex) {
        onToChange(rank.id);
        setSelecting("from");
      } else {
        // If user clicks lower rank, swap to "from" selection
        onFromChange(rank.id);
        setSelecting("to");
      }
    }
  };

  const isInRange = (rank: RankOption) => {
    const fromIndex = config.ranks.findIndex((r) => r.id === fromRank);
    const toIndex = config.ranks.findIndex((r) => r.id === toRank);
    const rankIndex = config.ranks.findIndex((r) => r.id === rank.id);
    return rankIndex > fromIndex && rankIndex < toIndex;
  };

  const getSelectionType = (rank: RankOption): "from" | "to" | undefined => {
    if (rank.id === fromRank) return "from";
    if (rank.id === toRank) return "to";
    return undefined;
  };

  return (
    <Container>
      <Label>Select Your Rank Boost</Label>

      <RanksRow>
        {config.ranks.map((rank) => (
          <RankButton
            key={rank.id}
            $isSelected={rank.id === fromRank || rank.id === toRank}
            $isInRange={isInRange(rank)}
            $selectionType={getSelectionType(rank)}
            onClick={() => handleRankClick(rank)}
            title={rank.label}
          >
            <RankIcon src={rank.icon} alt={rank.label} />
            <RankLabel>{rank.shortLabel || rank.label}</RankLabel>
          </RankButton>
        ))}
      </RanksRow>

      <SelectionSummary>
        <SummaryItem>
          <span className="label">From</span>
          <span className="value">{fromRankData?.label || "Select"}</span>
        </SummaryItem>
        <Arrow>→</Arrow>
        <SummaryItem>
          <span className="label">To</span>
          <span className="value">{toRankData?.label || "Select"}</span>
        </SummaryItem>
      </SelectionSummary>
    </Container>
  );
};
