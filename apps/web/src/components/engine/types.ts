// src/components/engine/types.ts

// ============================================
// TRUST BAR TYPES
// ============================================

export interface TrustStat {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export type TrustBadge =
  | "vpn_protected"
  | "encrypted"
  | "ban_guarantee"
  | "money_back"
  | "instant_start"
  | "live_support";

export interface TrustBarConfig {
  stats: TrustStat[];
  badges: TrustBadge[];
}

// ============================================
// HERO TYPES
// ============================================

export type HeroVariant =
  | "currency_calculator"
  | "quick_boost"
  | "popular_services"
  | "minimal";

export interface CurrencyCalculatorConfig {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  pricePerUnit: number;
  serverOptions?: Array<{
    label: string;
    value: string;
    priceModifier?: number;
  }>;
}

export interface QuickBoostConfig {
  productSlug: string;
  title: string;
  rankOptions: Array<{
    label: string;
    value: string;
    icon?: string;
    tier: number;
  }>;
  basePrice: number;
  pricePerTier: number;
}

export interface FeaturedCategory {
  id: string;
  label: string;
  icon: string;
  priceFrom: number;
  href: string;
  productCount?: number;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  variant: HeroVariant;
  backgroundImage: string;
  currencyConfig?: CurrencyCalculatorConfig;
  quickBoostConfig?: QuickBoostConfig;
  featuredCategories?: FeaturedCategory[];
  ctaText?: string;
  ctaHref?: string;
}

// ============================================
// CATEGORY TABS TYPES
// ============================================

export interface CategoryTab {
  id: string;
  label: string;
  icon?: string;
  anchor: string;
  productCount?: number;
}

// ============================================
// PRODUCT CARD TYPES
// ============================================

export type CardVariant = "standard" | "variable" | "currency" | "compact";

export type BadgeType = "bestseller" | "new" | "sale" | "fast" | "limited";

export interface ProductBadge {
  type: BadgeType;
  label?: string;
}

export interface ProductUrgency {
  type: "stock" | "time" | "demand";
  value: string;
}

export interface ProductPriceDisplay {
  type: "fixed" | "from" | "range" | "rate";
  value: number;
  maxValue?: number;
  unit?: string;
  currency?: string;
  originalValue?: number; // For sale display
}

export interface ProductMeta {
  duration?: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
}

export interface ProductCardData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  image: string;
  price: ProductPriceDisplay;
  meta?: ProductMeta;
  badges?: ProductBadge[];
  urgency?: ProductUrgency;
  variant?: CardVariant;
}

// ============================================
// SECTION TYPES
// ============================================

export type SectionLayout =
  | "grid_cards"
  | "table_list"
  | "carousel"
  | "featured_banner";

export interface GridConfig {
  columns: {
    mobile: 1 | 2;
    tablet: 2 | 3;
    desktop: 3 | 4;
  };
  cardVariant: CardVariant;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  showQuickView?: boolean;
}

export interface GameSection {
  id: string;
  anchor: string;
  title: string;
  description?: string;
  layout: SectionLayout;
  gridConfig?: GridConfig;
  tableConfig?: TableConfig;
  items: ProductCardData[];
  viewAllHref?: string;
}

// ============================================
// FAQ TYPES
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  content?: string; // Rich text for expandable SEO block
  faq: FAQItem[];
}

// ============================================
// THEME TYPES
// ============================================

export interface GameTheme {
  primaryColor: string;
  secondaryColor?: string;
  backgroundImage: string;
}

// ============================================
// COMPLETE BLUEPRINT
// ============================================

export interface GamePageBlueprint {
  // Identifiers
  gameSlug: string;
  gameName: string;

  // Theme
  theme: GameTheme;

  // Zone 0
  trustBar: TrustBarConfig;

  // Zone 1
  hero: HeroConfig;

  // Zone 2
  tabs: CategoryTab[];

  // Zone 3
  sections: GameSection[];

  // Zone 4
  seo: SEOConfig;

  // Zone 5
  crossSell?: {
    title: string;
    items: ProductCardData[];
  };
}
