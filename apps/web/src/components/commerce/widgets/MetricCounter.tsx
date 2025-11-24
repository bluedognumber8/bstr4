"use client";

import { useState } from "react";
import { styled } from "next-yak";
import { WidgetConfig } from "@/types/service-models";
import { FaMinus, FaPlus } from "react-icons/fa";

const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-2);
`;

const ActionBtn = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  border: none;
  background: var(--bg-surface);
  color: var(--fg-primary);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: var(--bg-surface-hover);
  }
`;

const ValueDisplay = styled.div`
  text-align: center;

  .val {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: var(--font-heading);
  }
  .unit {
    font-size: 0.875rem;
    color: var(--fg-muted);
    margin-left: 4px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);

  .label {
    font-size: 0.875rem;
    color: var(--fg-secondary);
  }
  .total {
    font-size: 2rem;
    font-weight: 800;
    color: var(--fg-primary);
  }
`;

const AddToCartBtn = styled.button`
  background-color: var(--action-primary);
  color: var(--fg-inverse);
  width: 100%;
  padding: var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1rem;
  margin-top: var(--space-4);
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const MetricCounter = ({
  config,
  basePrice,
}: {
  config: WidgetConfig;
  basePrice: number;
}) => {
  const [val, setVal] = useState(config.min || 1);
  const total = basePrice + val * (config.pricePerUnit || 0);

  const handleInc = () => setVal(val + (config.step || 1));
  const handleDec = () =>
    setVal(Math.max(config.min || 0, val - (config.step || 1)));

  return (
    <CounterWrapper>
      <ControlRow>
        <ActionBtn onClick={handleDec}>
          <FaMinus size={12} />
        </ActionBtn>
        <ValueDisplay>
          <span className="val">{val}</span>
          <span className="unit">{config.unit}</span>
        </ValueDisplay>
        <ActionBtn onClick={handleInc}>
          <FaPlus size={12} />
        </ActionBtn>
      </ControlRow>

      <PriceRow>
        <div>
          <div className="label">Total Estimated</div>
          <div className="total">${total.toFixed(2)}</div>
        </div>
      </PriceRow>

      <AddToCartBtn>Add to Cart</AddToCartBtn>
    </CounterWrapper>
  );
};
