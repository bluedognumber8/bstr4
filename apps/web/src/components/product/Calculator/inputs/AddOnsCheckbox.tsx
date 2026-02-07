// src/components/product/Calculator/inputs/AddOnsCheckbox.tsx
"use client";

import { styled } from "next-yak";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { AddOnOption } from "../../types";

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

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const OptionItem = styled.label<{ $isChecked: boolean; $isPopular?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid
    ${({ $isChecked }) =>
      $isChecked ? "var(--action-primary)" : "var(--border-subtle)"};
  background: ${({ $isChecked }) =>
    $isChecked ? "var(--bg-surface-hover)" : "var(--bg-surface)"};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: var(--action-primary);
  }

  ${({ $isPopular }) =>
    $isPopular &&
    `
    &::before {
      content: 'POPULAR';
      position: absolute;
      top: -8px;
      right: var(--space-3);
      background: var(--color-warning);
      color: #000;
      font-size: 0.5625rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
    }
  `}
`;

const Checkbox = styled.div<{ $isChecked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  border: 2px solid
    ${({ $isChecked }) =>
      $isChecked ? "var(--action-primary)" : "var(--border-strong)"};
  background: ${({ $isChecked }) =>
    $isChecked ? "var(--action-primary)" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;

  svg {
    width: 14px;
    height: 14px;
    color: var(--fg-inverse);
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-canvas);
  border-radius: var(--radius-sm);
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
    color: var(--fg-secondary);
  }
`;

const OptionContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const OptionTitle = styled.div`
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--fg-primary);
`;

const OptionDescription = styled.div`
  font-size: 0.8125rem;
  color: var(--fg-muted);
  margin-top: 2px;
`;

const OptionPrice = styled.div`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--fg-primary);
  flex-shrink: 0;
`;

// --- HELPERS ---

const Icon = ({ name }: { name: string }) => {
  const LucideIcon =
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <LucideIcon />;
};

// --- COMPONENT ---

interface Props {
  label?: string;
  options: AddOnOption[];
  selected: Record<string, boolean>;
  onChange: (id: string, checked: boolean) => void;
}

export const AddOnsCheckbox = ({
  label = "Add-ons",
  options,
  selected,
  onChange,
}: Props) => {
  const formatPrice = (option: AddOnOption) => {
    if (option.price === 0) return "Free";
    if (option.priceType === "percentage") return `+${option.price}%`;
    return `+$${option.price.toFixed(2)}`;
  };

  return (
    <Container>
      <Label>{label}</Label>

      <OptionsList>
        {options.map((option) => (
          <OptionItem
            key={option.id}
            $isChecked={selected[option.id] || false}
            $isPopular={option.popular}
          >
            <HiddenInput
              type="checkbox"
              checked={selected[option.id] || false}
              onChange={(e) => onChange(option.id, e.target.checked)}
            />

            <Checkbox $isChecked={selected[option.id] || false}>
              {selected[option.id] && <Check />}
            </Checkbox>

            {option.icon && (
              <IconWrapper>
                <Icon name={option.icon} />
              </IconWrapper>
            )}

            <OptionContent>
              <OptionTitle>{option.label}</OptionTitle>
              {option.description && (
                <OptionDescription>{option.description}</OptionDescription>
              )}
            </OptionContent>

            <OptionPrice>{formatPrice(option)}</OptionPrice>
          </OptionItem>
        ))}
      </OptionsList>
    </Container>
  );
};
