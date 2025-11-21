export type CalculatorType =
  | "quantity" // Default (+ / - buttons)
  | "slider" // Range slider
  | "dropdown" // Select menu
  | "custom"; // Complex Apps (Dota MMR)

export interface CalculatorConfig {
  type: CalculatorType;

  // Used for 'custom' only
  customComponentId?: string;

  // Generic Configs
  min?: number;
  max?: number;
  stepPrice?: number; // Price per unit
  unitLabel?: string; // e.g. "Wins", "Levels"

  // Dropdown specific
  dropdownOptions?: Array<{
    label: string;
    value: string | number;
    priceMod?: number; // Optional override price
  }>;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  gameSlug: string;
  categorySlug: string;

  image: string;
  description: string;
  basePrice: number;

  // 1. Visual Layout Strategy
  layout: "fixed" | "wide";

  // 2. Calculator Logic Strategy
  calculator: CalculatorConfig;

  // 3. Relations
  relatedProducts?: string[];
}
