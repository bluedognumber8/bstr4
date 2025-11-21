"use client";

import dynamic from "next/dynamic";
import { Product } from "@/data/types"; // Import from new types file
import { LoadingContainer } from "@/components/ui/Loading";
import { QuantitySelector } from "./shared/QuantitySelector";
import { GenericSliderCalc } from "./shared/GenericSliderCalc";
import { GenericDropdownCalc } from "./shared/GenericDropdownCalc";

// Lazy load Tier 3 Calculators
const MMRCalculator = dynamic(
  () => import("./dota/MMRCalculator").then((mod) => mod.MMRCalculator),
  { loading: () => <LoadingContainer /> }
);

const CUSTOM_MAP: Record<string, React.ComponentType<any>> = {
  "dota-mmr-boost": MMRCalculator,
};

export const CalculatorRegistry = ({ product }: { product: Product }) => {
  const config = product.calculator;

  // 1. Custom Apps (Tier 3)
  if (config.type === "custom" && config.customComponentId) {
    const Component = CUSTOM_MAP[config.customComponentId];
    return Component ? <Component /> : <div>Missing Component</div>;
  }

  // 2. Generic Calculators (Tier 1)
  switch (config.type) {
    case "slider":
      return <GenericSliderCalc product={product} />;
    case "dropdown":
      return <GenericDropdownCalc product={product} />;
    case "quantity":
      return <QuantitySelector product={product} />;
    default:
      return <QuantitySelector product={product} />;
  }
};
