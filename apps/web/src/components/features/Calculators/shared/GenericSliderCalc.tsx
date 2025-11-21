// apps/web/src/components/features/Calculators/shared/GenericSliderCalc.tsx
"use client";

import { styled } from "next-yak";
import { useState, useMemo, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Product } from "@/data/types"; // <--- UPDATED IMPORT
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Zap, Eye, ShieldCheck } from "lucide-react";

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

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NumberInputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-canvas);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  padding: 8px 16px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: var(--action-primary);
  }
`;

const ManualInput = styled.input`
  background: transparent;
  border: none;
  color: var(--fg-primary);
  font-size: 1.2rem;
  font-weight: 700;
  width: 80px;
  text-align: right;
  outline: none;

  /* Hide spinners */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const AddonRow = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--action-primary)" : "var(--border-subtle)"};
  background: ${({ $active }) =>
    $active ? "rgba(59, 130, 246, 0.05)" : "transparent"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--action-primary);
  }
`;

const Checkbox = styled.div<{ $active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid
    ${({ $active }) => ($active ? "var(--action-primary)" : "var(--fg-muted)")};
  background: ${({ $active }) =>
    $active ? "var(--action-primary)" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "✓";
    color: white;
    font-size: 12px;
    display: ${({ $active }) => ($active ? "block" : "none")};
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

export const GenericSliderCalc = ({ product }: { product: Product }) => {
  // 1. Destructure from new Types
  const { basePrice } = product;
  const {
    min = 1,
    max = 10,
    stepPrice = 1,
    unitLabel = "Units",
  } = product.calculator;

  const [val, setVal] = useState(min);
  const [express, setExpress] = useState(false);
  const [stream, setStream] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // 2. Calculation Logic
  // Assumes Base Price covers the 'min' amount.
  // e.g. Base $10 (1 Match). 2 Matches = $10 + (1 * $5).
  const price = useMemo(() => {
    let total = basePrice + (val - min) * stepPrice;

    // Addons
    if (express) total *= 1.3;
    if (stream) total *= 1.15;

    return total;
  }, [val, express, stream, basePrice, min, stepPrice]);

  // 3. Safety: Handle manual typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseInt(e.target.value);
    if (isNaN(inputVal)) {
      setVal(min);
      return;
    }
    // Clamp
    if (inputVal < min) setVal(min);
    else if (inputVal > max) setVal(max);
    else setVal(inputVal);
  };

  return (
    <BuyBox>
      <Header>
        <div>
          <TitleLabel>Total Price</TitleLabel>
          <BigPrice>${price.toFixed(2)}</BigPrice>
        </div>
      </Header>

      <InputArea>
        <NumberInputRow>
          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
            {unitLabel}
          </span>
          <ManualInput
            type="number"
            min={min}
            max={max}
            value={val}
            onChange={handleInputChange}
            onFocus={(e) => e.target.select()} // UX: Select all on click
          />
        </NumberInputRow>

        <div style={{ padding: "0 4px" }}>
          <Slider
            min={min}
            max={max}
            value={val}
            onChange={(v) => setVal(v as number)}
            trackStyle={{ backgroundColor: "var(--action-primary)" }}
            handleStyle={{
              borderColor: "var(--action-primary)",
              backgroundColor: "var(--bg-surface)",
              opacity: 1,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
              marginTop: 8,
            }}
          >
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </InputArea>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <AddonRow $active={express} onClick={() => setExpress(!express)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Zap
              size={18}
              fill={express ? "#eab308" : "none"}
              color={express ? "#eab308" : "var(--fg-muted)"}
            />
            <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              Express (+30%)
            </span>
          </div>
          <Checkbox $active={express} />
        </AddonRow>

        <AddonRow $active={stream} onClick={() => setStream(!stream)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Eye
              size={18}
              color={stream ? "var(--action-primary)" : "var(--fg-muted)"}
            />
            <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              Live Stream (+15%)
            </span>
          </div>
          <Checkbox $active={stream} />
        </AddonRow>
      </div>

      <AddToCartBtn
        onClick={() => {
          addItem({
            productId: product.id,
            title: `${product.title} (x${val})`,
            price,
            quantity: 1,
            category: "service",
            options: {
              amount: val,
              unit: unitLabel,
              express,
              stream,
            },
          });
          toast.success("Added to cart");
          openCart();
        }}
      >
        Add to Cart
      </AddToCartBtn>

      <GuaranteeText>
        <ShieldCheck size={14} /> 100% Money Back Guarantee
      </GuaranteeText>
    </BuyBox>
  );
};
