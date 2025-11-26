// src/data/catalogue.ts
// Unified data layer combining blueprints and products

import { GamePageBlueprint } from "@/components/engine/types";
import { Product, CalculatorConfig } from "./types";
import { DOTA_BLUEPRINT } from "./blueprints/dota-2";
import { WOW_RETAIL_BLUEPRINT } from "./blueprints/wow-retail";
import { WOW_CLASSIC_BLUEPRINT } from "./blueprints/wow-classic";

// --- TYPES ---

export interface CatalogueGame {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  coverImage: string;
  icon: string;
  primaryColor: string;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  hasBlueprint: boolean;
  // Blueprint for the game's catalogue page
  blueprint: GamePageBlueprint | null;
}

export interface CatalogueProduct {
  id: string;
  slug: string;
  title: string;
  gameSlug: string;
  image: string;
  description: string;
  basePrice: number;
  layout: "fixed" | "wide";
  calculator: CalculatorConfig;
  relatedProducts?: string[];
}

// --- CATALOGUE GAMES ---

export const CATALOGUE_GAMES: CatalogueGame[] = [
  {
    id: "1",
    slug: "world-of-warcraft",
    name: "World of Warcraft",
    shortName: "WoW",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&q=80",
    primaryColor: "#f8b700",
    isActive: true,
    isFeatured: true,
    displayOrder: 1,
    hasBlueprint: true,
    blueprint: WOW_RETAIL_BLUEPRINT,
  },
  {
    id: "2",
    slug: "valorant",
    name: "Valorant",
    shortName: "VAL",
    coverImage:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=100&q=80",
    primaryColor: "#ff4655",
    isActive: true,
    isFeatured: true,
    displayOrder: 2,
    hasBlueprint: false,
    blueprint: null, // No blueprint yet
  },
  {
    id: "3",
    slug: "dota-2",
    name: "Dota 2",
    shortName: "Dota",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&q=80",
    primaryColor: "#e33e2b",
    isActive: true,
    isFeatured: false,
    displayOrder: 5,
    hasBlueprint: true,
    blueprint: DOTA_BLUEPRINT,
  },
  {
    id: "4",
    slug: "diablo-4",
    name: "Diablo 4",
    shortName: "D4",
    coverImage:
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=100&q=80",
    primaryColor: "#991b1b",
    isActive: true,
    isFeatured: false,
    displayOrder: 4,
    hasBlueprint: false,
    blueprint: null, // No blueprint yet
  },
  {
    id: "5",
    slug: "league-of-legends",
    name: "League of Legends",
    shortName: "LoL",
    coverImage:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=100&q=80",
    primaryColor: "#0ea5e9",
    isActive: true,
    isFeatured: true,
    displayOrder: 3,
    hasBlueprint: false,
    blueprint: null, // No blueprint yet
  },
  {
    id: "6",
    slug: "wow-classic",
    name: "WoW Classic",
    shortName: "WoW Classic",
    coverImage:
      "https://images.unsplash.com/photo-1592439272693-c56a0d123811?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1592439272693-c56a0d123811?w=100&q=80",
    primaryColor: "#d97706",
    isActive: true,
    isFeatured: false,
    displayOrder: 6,
    hasBlueprint: true,
    blueprint: WOW_CLASSIC_BLUEPRINT,
  },
];

// --- CATALOGUE PRODUCTS ---
// Simplified: no categorySlug, direct gameSlug + slug linking

export const CATALOGUE_PRODUCTS: CatalogueProduct[] = [
  // Valorant
  {
    id: "val-placements",
    slug: "placement-matches",
    title: "Placement Matches",
    gameSlug: "valorant",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    description:
      "Secure a high starting rank. Our Radiants play your placements.",
    basePrice: 0,
    layout: "fixed",
    calculator: {
      type: "slider",
      min: 1,
      max: 5,
      stepPrice: 8,
      unitLabel: "Matches",
    },
  },

  // Diablo 4
  {
    id: "d4-leveling-boost",
    slug: "1-100-leveling",
    title: "Level 1-100 Power Leveling",
    gameSlug: "diablo-4",
    image:
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=400&q=80",
    description: "AFK at dungeon entrance while we blast monsters for you.",
    basePrice: 5,
    layout: "fixed",
    calculator: {
      type: "slider",
      min: 1,
      max: 100,
      stepPrice: 1.5,
      unitLabel: "Levels",
    },
  },
  {
    id: "d4-duriel",
    slug: "uber-duriel-runs",
    title: "Uber Duriel Runs",
    gameSlug: "diablo-4",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    description: "Chance to drop Uber Uniques like Shako and Grandfather.",
    basePrice: 5,
    layout: "fixed",
    calculator: {
      type: "dropdown",
      unitLabel: "Run",
      min: 1,
      max: 10,
      stepPrice: 3,
    },
  },

  // League of Legends
  {
    id: "lol-wins",
    slug: "ranked-wins",
    title: "Ranked Wins Boost",
    gameSlug: "league-of-legends",
    image:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&q=80",
    description: "We guarantee positive win-rate. Losses don't count.",
    basePrice: 5,
    layout: "fixed",
    calculator: {
      type: "slider",
      min: 1,
      max: 10,
      stepPrice: 4,
      unitLabel: "Net Wins",
    },
  },

  // World of Warcraft
  {
    id: "wow-mythic-key",
    slug: "mythic-plus-dungeon",
    title: "Mythic+ Selfplay Run",
    gameSlug: "world-of-warcraft",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80",
    description: "Get your weekly vault rewards. Specific keys available.",
    basePrice: 0,
    layout: "fixed",
    calculator: {
      type: "dropdown",
      dropdownOptions: [
        { label: "Mythic +10 (Wyrm Crests)", value: "10", priceMod: 12 },
        { label: "Mythic +15 (Hero Track)", value: "15", priceMod: 25 },
        { label: "Mythic +18 (Weekly Vault)", value: "18", priceMod: 35 },
        { label: "Mythic +20 (Portal)", value: "20", priceMod: 55 },
      ],
    },
  },
  {
    id: "wow-gold-eu",
    slug: "gold-kazzak-eu",
    title: "Gold - Kazzak EU",
    gameSlug: "world-of-warcraft",
    image:
      "https://images.unsplash.com/photo-1622630998477-20aa696fa4f5?w=400&q=80",
    description: "Fast delivery via Mail or Trade.",
    basePrice: 0,
    layout: "fixed",
    calculator: {
      type: "quantity",
      min: 100,
      stepPrice: 0.04,
      unitLabel: "x1000 Gold",
    },
  },

  // Dota 2
  {
    id: "dota-mmr",
    slug: "mmr-boost",
    title: "Dota 2 MMR Boosting",
    gameSlug: "dota-2",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    description: "Rank up with the best.",
    basePrice: 0,
    layout: "wide",
    calculator: {
      type: "custom",
      customComponentId: "dota-mmr-boost",
    },
  },
];

// --- HELPER FUNCTIONS ---

export const getGame = (slug: string): CatalogueGame | null => {
  return CATALOGUE_GAMES.find((g) => g.slug === slug) || null;
};

export const getProduct = (
  gameSlug: string,
  productSlug: string
): CatalogueProduct | null => {
  return (
    CATALOGUE_PRODUCTS.find(
      (p) => p.gameSlug === gameSlug && p.slug === productSlug
    ) || null
  );
};

export const getProductsForGame = (gameSlug: string): CatalogueProduct[] => {
  return CATALOGUE_PRODUCTS.filter((p) => p.gameSlug === gameSlug);
};

export const getGameBlueprint = (slug: string): GamePageBlueprint | null => {
  const game = getGame(slug);
  return game?.blueprint || null;
};

export const getActiveGames = (): CatalogueGame[] => {
  return CATALOGUE_GAMES.filter((g) => g.isActive);
};

export const getFeaturedGames = (): CatalogueGame[] => {
  return CATALOGUE_GAMES.filter((g) => g.isFeatured && g.isActive);
};
