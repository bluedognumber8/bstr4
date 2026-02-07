// src/components/product/Calculator/inputs/RangeSlider.tsx
"use client";

import { styled } from "next-yak";
import { RangeSliderConfig } from "../../types";

// --- STYLES ---

const Container = styled.div`
  margin-bottom: var(--space-6);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-4);
`;

const Label = styled.div`
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--fg-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ValueDisplay = styled.div`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--fg-primary);

  .unit {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--fg-muted);
    margin-left: var(--space-1);
  }
`;

const SliderTrack = styled.div`
  position: relative;
  height: 8px;
  background: var(--bg-surface);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
`;

const SliderFill = styled.div<{ $percentage: number }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ $percentage }) => $percentage}%;
  background: var(--action-primary);
  border-radius: var(--radius-full);
`;

const SliderInput = styled.input`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 24px;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

const SliderThumb = styled.div<{ $percentage: number }>`
  position: absolute;
  left: ${({ $percentage }) => $percentage}%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: var(--bg-canvas);
  border: 3px solid var(--action-primary);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;
`;

const Markers = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-2);
  font-size: 0.75rem;
  color: var(--fg-muted);
`;

// --- COMPONENT ---

interface Props {
  config: RangeSliderConfig;
  value: number;
  onChange: (value: number) => void;
}

export const RangeSlider = ({ config, value, onChange }: Props) => {
  const percentage = ((value - config.min) / (config.max - config.min)) * 100;

  const formatValue = (val: number) => {
    if (config.displayFormat === "mmr") {
      return val.toLocaleString();
    }
    if (config.displayFormat === "percentage") {
      return `${val}%`;
    }
    return val.toLocaleString();
  };

  return (
    <Container>
      <Header>
        <Label>Select Amount</Label>
        <ValueDisplay>
          {formatValue(value)}
          <span className="unit">{config.unit}</span>
        </ValueDisplay>
      </Header>

      <SliderTrack>
        <SliderFill $percentage={percentage} />
        <SliderThumb $percentage={percentage} />
        <SliderInput
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </SliderTrack>

      <Markers>
        <span>{formatValue(config.min)}</span>
        <span>{formatValue(config.max)}</span>
      </Markers>
    </Container>
  );
};
