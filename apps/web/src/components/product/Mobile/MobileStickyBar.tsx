// src/components/product/Mobile/MobileStickyBar.tsx
"use client";

import { styled } from "next-yak";
import { ShoppingCart } from "lucide-react";

// --- STYLES ---

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: var(--space-4);
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);

  /* Only show on mobile */
  @media (min-width: 1024px) {
    display: none;
  }
`;

const PriceSection = styled.div`
  .label {
    font-size: 0.75rem;
    color: var(--fg-muted);
  }

  .price {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--fg-primary);
  }
`;

const ConfigureButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: var(--action-primary);
  color: var(--fg-inverse);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  max-width: 200px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

// --- COMPONENT ---

interface Props {
  price: number;
  onConfigureClick: () => void;
  buttonText?: string;
}

export const MobileStickyBar = ({
  price,
  onConfigureClick,
  buttonText = "Configure",
}: Props) => {
  return (
    <Container>
      <PriceSection>
        <div className="label">Total</div>
        <div className="price">${price.toFixed(2)}</div>
      </PriceSection>

      <ConfigureButton onClick={onConfigureClick}>
        <ShoppingCart />
        {buttonText}
      </ConfigureButton>
    </Container>
  );
};
