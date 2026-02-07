// src/components/product/types.ts

// ============================================
// CALCULATOR TYPES
// ============================================

export type CalculatorLayout = "full_width" | "sidebar" | "account_details";

export type InputType =
  | "visual_rank"
  | "range_slider"
  | "quantity"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "fixed";

// Rank Selector
export interface RankOption {
  id: string;
  label: string;
  shortLabel?: string;
  icon: string;
  divisions?: number;
  tier: number;
  mmrRange?: { min: number; max: number };
}

export interface VisualRankConfig {
  type: "visual_rank";
  ranks: RankOption[];
  defaultFrom?: string;
  defaultTo?: string;
  pricePerTier: number;
  basePrice: number;
}

// Range Slider
export interface RangeSliderConfig {
  type: "range_slider";
  min: number;
  max: number;
  step: number;
  defaultValue?: number;
  unit: string;
  pricePerUnit: number;
  displayFormat?: "number" | "mmr" | "percentage";
}

// Quantity Selector
export interface QuantityConfig {
  type: "quantity";
  min: number;
  max: number;
  default: number;
  presets?: number[];
  unit: string;
  unitPlural: string;
  pricePerUnit: number;
}

// Fixed Price
export interface FixedConfig {
  type: "fixed";
  price: number;
  description?: string;
}

// Dropdown
export interface DropdownOption {
  value: string;
  label: string;
  priceModifier: number;
  priceType: "percentage" | "flat";
  description?: string;
}

export interface DropdownConfig {
  id: string;
  label: string;
  options: DropdownOption[];
  defaultValue?: string;
  required?: boolean;
}

// Checkbox Add-ons
export interface AddOnOption {
  id: string;
  label: string;
  description?: string;
  price: number;
  priceType: "percentage" | "flat";
  icon?: string;
  popular?: boolean;
  defaultChecked?: boolean;
}

// Radio Options
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  priceModifier: number;
  priceType: "percentage" | "flat";
}

export interface RadioConfig {
  id: string;
  label: string;
  options: RadioOption[];
  defaultValue?: string;
  required?: boolean;
}

// Complete Calculator Config
export interface CalculatorConfig {
  layout: CalculatorLayout;

  primaryInput:
    | VisualRankConfig
    | RangeSliderConfig
    | QuantityConfig
    | FixedConfig;

  modifiers?: DropdownConfig[];
  addOns?: AddOnOption[];
  radioGroups?: RadioConfig[];

  display: {
    showEstimatedTime: boolean;
    showOnlineBoosters: boolean;
    showTodayOrders: boolean;
    showTrustBadges: boolean;
  };
}

// ============================================
// CALCULATOR STATE
// ============================================

export interface CalculatorState {
  // Primary input value
  primaryValue: {
    from?: string;
    to?: string;
    value?: number;
  };

  // Selected modifiers
  modifiers: Record<string, string>;

  // Selected add-ons
  addOns: Record<string, boolean>;

  // Radio selections
  radioSelections: Record<string, string>;

  // Calculated values
  basePrice: number;
  modifierTotal: number;
  addOnTotal: number;
  totalPrice: number;
  estimatedTime?: string;
}

// ============================================
// CONTENT TYPES
// ============================================

export interface Feature {
  icon: string;
  title: string;
  description?: string;
}

export interface Step {
  number: number;
  icon: string;
  title: string;
  description: string;
}

export interface Requirement {
  text: string;
  required: boolean;
  helpText?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
  productOptions?: string;
  images?: string[];
  helpful?: number;
}

export interface ReviewsSummary {
  average: number;
  total: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface Booster {
  id: string;
  name: string;
  avatar: string;
  mmr: number;
  completedOrders: number;
  rating: number;
  roles?: string[];
  country: string;
  countryFlag: string;
  online?: boolean;
}

export interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  readTime: string;
  views: number;
}

// ============================================
// PRODUCT PAGE DATA
// ============================================

export interface ProductPageData {
  // Identity
  id: string;
  slug: string;
  gameSlug: string;
  gameName: string;

  // Basic Info
  title: string;
  shortDescription: string;

  // Media
  heroImage: string;
  galleryImages?: string[];
  icon?: string;

  // Calculator
  calculator: CalculatorConfig;

  // Trust Indicators
  trust: {
    rating: number;
    reviewCount: number;
    completedOrders: number;
    onlineBoosters: number;
    todayOrders: number;
    avgStartTime: string;
  };

  features: string[];
  guarantees: Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  // Content Sections
  content: {
    description: string;
    features: Feature[];
    howItWorks: Step[];
    requirements: Requirement[];
    faq: FAQItem[];
    securityInfo?: string;
  };

  // Reviews
  reviews: {
    summary: ReviewsSummary;
    items: Review[];
    filterOptions?: string[];
  };

  // Boosters
  showBoosters: boolean;
  boosters?: Booster[];

  // Cross-sell
  frequentlyBoughtWith?: Array<{
    id: string;
    slug: string;
    title: string;
    image: string;
    price: number;
  }>;

  relatedProducts?: Array<{
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    price: { type: string; value: number };
  }>;

  relatedArticles?: RelatedArticle[];

  // SEO
  seo: {
    title: string;
    description: string;
  };
}

// ============================================
// COMPONENT PROPS
// ============================================

export interface CalculatorProps {
  config: CalculatorConfig;
  productTitle: string;
  trust: ProductPageData["trust"];
  onStateChange?: (state: CalculatorState) => void;
  onAddToCart?: (state: CalculatorState) => void;
  onBuyNow?: (state: CalculatorState) => void;
}

export interface ProductContentProps {
  content: ProductPageData["content"];
  reviews: ProductPageData["reviews"];
  gameSlug: string;
}
