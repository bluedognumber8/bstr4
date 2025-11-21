// apps/web/src/components/features/Calculators/shared/QuantitySelector.tsx
"use client";

import { useState } from "react";
import { styled } from "next-yak";
import { Product } from "@/data/types"; // <--- UPDATED IMPORT
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { ShoppingCart, Minus, Plus, ShieldCheck, Package } from "lucide-react";

// --- STYLES ---

const BuyBox = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 16px;
`;

const TitleLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--fg-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 4px;
`;

const BigPrice = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--fg-primary);
  line-height: 1;
`;

const ControlsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--fg-secondary);
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-canvas);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  padding: 6px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: var(--action-primary);
  }
`;

const QtyBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 6px;
  border: none;
  background: var(--bg-surface);
  color: var(--fg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover:not(:disabled) {
    background: var(--bg-surface-hover);
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const QtyInput = styled.input`
  flex: 1;
  text-align: center;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--fg-primary);
  outline: none;
  min-width: 0;

  /* Hide spinners */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const AddToCartBtn = styled.button`
  background: var(--action-primary);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const GuaranteeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--fg-muted);
  margin-top: -8px;
`;

// --- COMPONENT ---

interface Props {
  product: Product;
}

export const QuantitySelector = ({ product }: Props) => {
  // 1. Extract Config from New Schema
  const { basePrice } = product;
  const {
    min = 1,
    max = 999,
    stepPrice = 0,
    unitLabel = "Quantity",
  } = product.calculator;

  const [qty, setQty] = useState(min);
  const addItem = useCartStore((s) => s.addItem);

  // 2. Price Logic: Base + (Amount * UnitPrice)
  const total = basePrice + qty * stepPrice;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: total,
      quantity: qty,
      category: "service", // Generic fallback
      options: {
        unit: unitLabel,
      },
    });
    toast.success(`Added ${qty} ${unitLabel} to cart`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);

    if (isNaN(val)) {
      setQty(min);
      return;
    }

    // Clamp values
    if (val < min) {
      setQty(min);
    } else if (val > max) {
      setQty(max);
    } else {
      setQty(val);
    }
  };

  return (
    <BuyBox>
      <Header>
        <div>
          <TitleLabel>Total Price</TitleLabel>
          <BigPrice>${total.toFixed(2)}</BigPrice>
        </div>
        <Package size={24} color="var(--fg-muted)" />
      </Header>

      <ControlsArea>
        <Label>{unitLabel}</Label>
        <QuantityRow>
          <QtyBtn
            onClick={() => setQty(Math.max(min, qty - 1))}
            disabled={qty <= min}
          >
            <Minus size={18} />
          </QtyBtn>

          <QtyInput
            type="number"
            min={min}
            max={max}
            value={qty}
            onChange={handleInputChange}
            onFocus={(e) => e.target.select()}
          />

          <QtyBtn
            onClick={() => setQty(Math.min(max, qty + 1))}
            disabled={qty >= max}
          >
            <Plus size={18} />
          </QtyBtn>
        </QuantityRow>
      </ControlsArea>

      <AddToCartBtn onClick={handleAdd}>
        <ShoppingCart size={20} />
        Add to Cart
      </AddToCartBtn>

      <GuaranteeText>
        <ShieldCheck size={14} /> Instant Delivery Available
      </GuaranteeText>
    </BuyBox>
  );
};
