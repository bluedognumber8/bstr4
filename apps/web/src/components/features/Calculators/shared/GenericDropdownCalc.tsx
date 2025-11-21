// apps/web/src/components/features/Calculators/shared/GenericDropdownCalc.tsx
"use client";

import { useState, useMemo } from "react";
import { styled } from "next-yak";
import { Product } from "@/data/types"; // <--- UPDATED IMPORT
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import {
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import * as Select from "@radix-ui/react-select";

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
  position: relative;
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

// --- RADIX SELECT STYLES ---

const Trigger = styled(Select.Trigger)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--bg-canvas);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-primary);
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  &:hover {
    border-color: var(--fg-muted);
    background: var(--bg-surface-hover);
  }
  &[data-state="open"] {
    border-color: var(--action-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Content = styled(Select.Content)`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 50;
  min-width: var(--radix-select-trigger-width);
`;

const Viewport = styled(Select.Viewport)`
  padding: 6px;
`;

const Item = styled(Select.Item)`
  font-size: 0.95rem;
  color: var(--fg-primary);
  padding: 10px 8px 10px 36px; /* Space for indicator */
  position: relative;
  user-select: none;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  transition: background 0.1s;

  &[data-highlighted] {
    background: var(--bg-surface-hover);
  }

  &[data-state="checked"] {
    background: rgba(59, 130, 246, 0.08);
    color: var(--action-primary);
    font-weight: 600;
  }
`;

const ItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  color: var(--action-primary);
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

interface Props {
  product: Product;
}

export const GenericDropdownCalc = ({ product }: Props) => {
  // 1. Extract Config
  const { basePrice } = product;
  const {
    min = 1,
    max = 10,
    stepPrice = 0,
    dropdownOptions = [],
    unitLabel = "Level", // Default label if not generating options
  } = product.calculator;

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // 2. Normalize Options
  // This handles both "Generated Range" and "Specific Options"
  const options = useMemo(() => {
    // Case A: Explicit Options provided in DB (e.g. "Dungeon Keys")
    if (dropdownOptions.length > 0) {
      return dropdownOptions.map((opt) => ({
        label: opt.label,
        value: String(opt.value),
        addPrice: opt.priceMod || 0,
      }));
    }

    // Case B: Generate Numbers (e.g. "Levels 1-10")
    const list = [];
    for (let i = min; i <= max; i++) {
      list.push({
        label: `${unitLabel} ${i}`,
        value: String(i),
        addPrice: (i - min) * stepPrice, // e.g. (5 - 1) * $5 = $20 add-on
      });
    }
    return list;
  }, [min, max, stepPrice, dropdownOptions, unitLabel]);

  // Default select the first option
  const [selected, setSelected] = useState(options[0]?.value || "");

  // 3. Calculate Price
  const activeOption = options.find((o) => o.value === selected);
  const totalPrice = basePrice + (activeOption?.addPrice || 0);

  const handleAddToCart = () => {
    if (!activeOption) return;

    addItem({
      productId: product.id,
      title: `${product.title} - ${activeOption.label}`,
      price: totalPrice,
      quantity: 1,
      category: "service",
      options: { selection: activeOption.value, label: activeOption.label },
    });
    toast.success("Added to cart");
    openCart();
  };

  return (
    <BuyBox>
      <Header>
        <div>
          <TitleLabel>Total Price</TitleLabel>
          <BigPrice>${totalPrice.toFixed(2)}</BigPrice>
        </div>
        <BarChart3 color="var(--fg-muted)" size={24} />
      </Header>

      <ControlsArea>
        <label
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--fg-secondary)",
          }}
        >
          Select Option
        </label>

        <Select.Root value={selected} onValueChange={setSelected}>
          <Trigger>
            <Select.Value placeholder="Select option..." />
            <Select.Icon>
              <ChevronDown size={16} color="var(--fg-muted)" />
            </Select.Icon>
          </Trigger>

          <Select.Portal>
            <Content position="popper" sideOffset={5}>
              <Viewport>
                {options.map((opt) => (
                  <Item key={opt.value} value={opt.value}>
                    <ItemIndicator>
                      <CheckCircle2 size={14} />
                    </ItemIndicator>
                    <Select.ItemText>{opt.label}</Select.ItemText>
                  </Item>
                ))}
              </Viewport>
            </Content>
          </Select.Portal>
        </Select.Root>
      </ControlsArea>

      <AddToCartBtn onClick={handleAddToCart}>Secure Checkout</AddToCartBtn>

      <GuaranteeText>
        <ShieldCheck size={14} /> 100% Money Back Guarantee
      </GuaranteeText>
    </BuyBox>
  );
};
