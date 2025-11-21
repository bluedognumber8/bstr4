//apps/web/src/components/features/Calculators/dota/MMRInput.tsx
"use client";

import { styled } from "next-yak";
import { useState, useEffect } from "react";

const StyledInput = styled.input`
  background: var(--bg-canvas);
  border: 2px solid var(--border-strong);
  border-radius: 8px;
  color: var(--fg-primary);
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  padding: 8px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--action-primary);
    box-shadow: 0 0 0 3px var(--bg-surface-hover);
  }
`;

interface Props {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
}

export const MMRInput = ({ value, onChange, min, max }: Props) => {
  // Local state lets user type invalid numbers temporarily (e.g. empty string)
  const [localVal, setLocalVal] = useState(value.toString());

  // Sync local state if external value changes (e.g. Slider drag)
  useEffect(() => {
    setLocalVal(value.toString());
  }, [value]);

  const commitValue = () => {
    let num = Number(localVal);

    // 1. Handle NaN
    if (isNaN(num)) num = min;

    // 2. Clamp Logic
    if (num < min) num = min;
    if (num > max) num = max;

    // 3. Snap to nearest 10 (Dota MMR usually steps)
    num = Math.round(num / 10) * 10;

    setLocalVal(num.toString());
    onChange(num);
  };

  return (
    <StyledInput
      type="number" // Adds mobile numpad
      value={localVal}
      onChange={(e) => setLocalVal(e.target.value)}
      // UX: Select all text on click
      onClick={(e) => (e.target as HTMLInputElement).select()}
      // UX: Commit on Blur (Click away)
      onBlur={commitValue}
      // UX: Commit on Enter key
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commitValue();
          (e.target as HTMLInputElement).blur(); // Remove focus
        }
      }}
    />
  );
};
