// src/components/product/Calculator/inputs/QuantitySelector.tsx
"use client";

import { styled } from "next-yak";
import { Minus, Plus } from "lucide-react";
import { QuantityConfig } from "../../types";

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

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
`;

const CounterButton = styled.button<{ $disabled?: boolean }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--fg-primary);
  transition: all 0.2s;

  ${({ $disabled }) =>
    $disabled
      ? `
    opacity: 0.5;
    cursor: not-allowed;
  `
      : `
    &:hover {
      background: var(--bg-surface-hover);
      border-color: var(--action-primary);
    }
  `}

  svg {
    width: 20px;
    height: 20px;
  }
`;

const CounterValue = styled.div`
  min-width: 100px;
  text-align: center;

  .value {
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--fg-primary);
    line-height: 1;
  }

  .unit {
    font-size: 0.875rem;
    color: var(--fg-muted);
    margin-top: var(--space-1);
  }
`;

const PresetsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  flex-wrap: wrap;
`;

const PresetButton = styled.button<{ $isActive: boolean }>`
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;

  ${({ $isActive }) =>
    $isActive
      ? `
    background: var(--action-primary);
    color: var(--fg-inverse);
  `
      : `
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    color: var(--fg-secondary);
    
    &:hover {
      border-color: var(--action-primary);
      color: var(--fg-primary);
    }
  `}
`;

const PricePerUnit = styled.div`
  text-align: center;
  margin-top: var(--space-4);
  font-size: 0.875rem;
  color: var(--fg-muted);

  span {
    color: var(--fg-primary);
    font-weight: 600;
  }
`;

// --- COMPONENT ---

interface Props {
  config: QuantityConfig;
  value: number;
  onChange: (value: number) => void;
}

export const QuantitySelector = ({ config, value, onChange }: Props) => {
  const handleDecrement = () => {
    if (value > config.min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < config.max) {
      onChange(value + 1);
    }
  };

  const unitLabel = value === 1 ? config.unit : config.unitPlural;

  return (
    <Container>
      <Label>Select Quantity</Label>

      <CounterWrapper>
        <CounterButton
          onClick={handleDecrement}
          $disabled={value <= config.min}
          disabled={value <= config.min}
        >
          <Minus />
        </CounterButton>

        <CounterValue>
          <div className="value">{value}</div>
          <div className="unit">{unitLabel}</div>
        </CounterValue>

        <CounterButton
          onClick={handleIncrement}
          $disabled={value >= config.max}
          disabled={value >= config.max}
        >
          <Plus />
        </CounterButton>
      </CounterWrapper>

      {config.presets && config.presets.length > 0 && (
        <PresetsRow>
          {config.presets.map((preset) => (
            <PresetButton
              key={preset}
              $isActive={value === preset}
              onClick={() => onChange(preset)}
            >
              {preset}
            </PresetButton>
          ))}
        </PresetsRow>
      )}

      <PricePerUnit>
        <span>${config.pricePerUnit.toFixed(2)}</span> per {config.unit}
      </PricePerUnit>
    </Container>
  );
};
