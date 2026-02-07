// src/components/product/Calculator/inputs/DropdownSelect.tsx
"use client";

import { styled } from "next-yak";
import { ChevronDown } from "lucide-react";
import { DropdownConfig } from "../../types";

// --- STYLES ---

const Container = styled.div`
  margin-bottom: var(--space-4);
`;

const Label = styled.label`
  display: block;
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fg-secondary);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: var(--space-3) var(--space-4);
  padding-right: var(--space-10);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  color: var(--fg-primary);
  font-size: 0.9375rem;
  font-weight: 500;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--border-strong);
  }

  &:focus {
    outline: none;
    border-color: var(--action-primary);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  }
`;

const IconWrapper = styled.div`
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

const PriceIndicator = styled.span`
  font-size: 0.8125rem;
  color: var(--fg-muted);
  margin-left: var(--space-2);
`;

// --- COMPONENT ---

interface Props {
  config: DropdownConfig;
  value: string;
  onChange: (value: string) => void;
}

export const DropdownSelect = ({ config, value, onChange }: Props) => {
  const formatPriceIndicator = (priceModifier: number, priceType: string) => {
    if (priceModifier === 0) return "";
    if (priceType === "percentage") return ` (+${priceModifier}%)`;
    return ` (+$${priceModifier.toFixed(2)})`;
  };

  return (
    <Container>
      <Label htmlFor={config.id}>{config.label}</Label>

      <SelectWrapper>
        <Select
          id={config.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
              {formatPriceIndicator(option.priceModifier, option.priceType)}
            </option>
          ))}
        </Select>

        <IconWrapper>
          <ChevronDown />
        </IconWrapper>
      </SelectWrapper>
    </Container>
  );
};
