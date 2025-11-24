// src/components/engine/types.ts

export type PulseItem = {
  id: string;
  label: string;
  value: string;
  icon: string; // Lucide icon name
  trend?: "up" | "down" | "neutral";
};

export type ProductCard = {
  id: string;
  title: string;
  subtitle?: string;
  priceStart: number;
  image: string; // URL
  tags?: string[];
  meta?: Record<string, string>;
};

export type SectionType =
  | "grid_cards"
  | "table_list"
  | "profile_carousel"
  | "banner_cta";

export type GameSection = {
  id: string;
  title: string;
  description?: string;
  type: SectionType;
  items: ProductCard[];
};

export type GameTab = {
  id: string;
  label: string;
  icon?: string;
  sections: GameSection[];
};

export type GamePageConfig = {
  gameSlug: string;
  theme: {
    primaryColor: string; // Hex for specific accents
    backgroundImage: string;
  };
  hero: {
    title: string;
    subtitle: string;
    widgetConfig: {
      label: string;
      min: number;
      max: number;
      unit: string;
      pricePerUnit: number;
    };
  };
  pulse: PulseItem[];
  tabs: GameTab[];
};
