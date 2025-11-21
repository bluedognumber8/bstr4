// src/data/mock-games.ts
import { Product } from "./types";

// --- LOCAL TYPES (For Games/Categories only) ---

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string; // e.g. "boosting"
  icon: string; // Lucide icon name
  description: string;
}

export interface Game {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  icon: string;
  primaryColor: string;
  categories: ServiceCategory[];
}

// --- MOCK GAMES ---

export const MOCK_GAMES: Game[] = [
  {
    id: "1",
    slug: "world-of-warcraft",
    name: "World of Warcraft",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&q=80",
    primaryColor: "#f8b700",
    categories: [
      {
        id: "c1",
        name: "Gold",
        slug: "gold",
        icon: "Coins",
        description: "Cheap gold on all servers",
      },
      {
        id: "c2",
        name: "Boosting",
        slug: "boosting",
        icon: "Zap",
        description: "Mythic+, Raids, and Leveling",
      },
      {
        id: "c3",
        name: "Dungeons",
        slug: "dungeons",
        icon: "Sword",
        description: "Keystone Master & Specific Keys",
      },
    ],
  },
  {
    id: "2",
    slug: "valorant",
    name: "Valorant",
    coverImage:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=100&q=80",
    primaryColor: "#ff4655",
    categories: [
      {
        id: "c4",
        name: "Rank Boost",
        slug: "boosting",
        icon: "TrendingUp",
        description: "Reach Radiant fast",
      },
    ],
  },
  {
    id: "3",
    slug: "dota-2",
    name: "Dota 2",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&q=80",
    primaryColor: "#e33e2b",
    categories: [
      {
        id: "c6",
        name: "MMR Boost",
        slug: "boosting",
        icon: "TrendingUp",
        description: "Reach Immortal Rank",
      },
    ],
  },
  {
    id: "4",
    slug: "diablo-4",
    name: "Diablo 4",
    coverImage:
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=100&q=80",
    primaryColor: "#991b1b", // Blood Red
    categories: [
      {
        id: "c8",
        name: "Leveling",
        slug: "leveling",
        icon: "ChevronsUp",
        description: "1-100 Power Leveling",
      },
      {
        id: "c9",
        name: "Boss Carry",
        slug: "bosses",
        icon: "Skull",
        description: "Uber Duriel & Lilith kills",
      },
    ],
  },
  {
    id: "5",
    slug: "league-of-legends",
    name: "League of Legends",
    coverImage:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&q=80",
    icon: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=100&q=80",
    primaryColor: "#0ea5e9", // Blue
    categories: [
      {
        id: "c10",
        name: "Ranked Wins",
        slug: "boosting",
        icon: "Trophy",
        description: "Net wins guaranteed",
      },
    ],
  },
];

// --- MOCK PRODUCTS ---

export const MOCK_PRODUCTS: Product[] = [
  // =====================================================
  // TIER 1: SLIDER EXAMPLES (Linear Pricing)
  // =====================================================

  // 1. Valorant Placements
  {
    id: "val-placements",
    slug: "placement-matches",
    title: "Placement Matches",
    gameSlug: "valorant",
    categorySlug: "boosting",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    description:
      "Secure a high starting rank. Our Radiants play your placements.",
    basePrice: 0,

    layout: "fixed", // Sidebar Layout

    calculator: {
      type: "slider",
      min: 1,
      max: 5,
      stepPrice: 8, // $8 per match
      unitLabel: "Matches",
    },
  },

  // 2. Diablo 4 Leveling (High range slider)
  {
    id: "d4-leveling-boost",
    slug: "1-100-leveling",
    title: "Level 1-100 Power Leveling",
    gameSlug: "diablo-4",
    categorySlug: "leveling",
    image:
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=400&q=80",
    description: "AFK at dungeon entrance while we blast monsters for you.",
    basePrice: 5,

    layout: "fixed",

    calculator: {
      type: "slider",
      min: 1,
      max: 100,
      stepPrice: 1.5, // $1.50 per level
      unitLabel: "Levels",
    },
  },

  // 3. LoL Net Wins (Medium range slider)
  {
    id: "lol-wins",
    slug: "ranked-wins",
    title: "Ranked Wins Boost",
    gameSlug: "league-of-legends",
    categorySlug: "boosting",
    image:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&q=80",
    description: "We guarantee positive win-rate. Losses don't count.",
    basePrice: 5,

    layout: "fixed",

    calculator: {
      type: "slider",
      min: 1,
      max: 10,
      stepPrice: 4, // $4 per win
      unitLabel: "Net Wins",
    },
  },

  // =====================================================
  // TIER 1: DROPDOWN EXAMPLES (Option Pricing)
  // =====================================================

  // 4. WoW Mythic+ (Explicit Options)
  {
    id: "wow-mythic-key",
    slug: "mythic-plus-dungeon",
    title: "Mythic+ Selfplay Run",
    gameSlug: "world-of-warcraft",
    categorySlug: "dungeons",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80",
    description: "Get your weekly vault rewards. Specific keys available.",
    basePrice: 0,

    layout: "fixed",

    calculator: {
      type: "dropdown",
      // We explicitely define options instead of generating them
      dropdownOptions: [
        { label: "Mythic +10 (Wyrm Crests)", value: "10", priceMod: 12 },
        { label: "Mythic +15 (Hero Track)", value: "15", priceMod: 25 },
        { label: "Mythic +18 (Weekly Vault)", value: "18", priceMod: 35 },
        { label: "Mythic +20 (Portal)", value: "20", priceMod: 55 },
      ],
    },
  },

  // 5. Diablo 4 Boss Kills (Generated Options)
  {
    id: "d4-duriel",
    slug: "uber-duriel-runs",
    title: "Uber Duriel Runs",
    gameSlug: "diablo-4",
    categorySlug: "bosses",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    description: "Chance to drop Uber Uniques like Shako and Grandfather.",
    basePrice: 5, // Entry price

    layout: "fixed",

    calculator: {
      type: "dropdown",
      unitLabel: "Run",
      min: 1,
      max: 10,
      stepPrice: 3, // Generates: Run 1 ($8), Run 2 ($11)...
    },
  },

  // =====================================================
  // TIER 1: QUANTITY EXAMPLES (Bulk Pricing)
  // =====================================================

  // 6. WoW Gold
  {
    id: "wow-gold-eu",
    slug: "gold-kazzak-eu",
    title: "Gold - Kazzak EU",
    gameSlug: "world-of-warcraft",
    categorySlug: "gold",
    image:
      "https://images.unsplash.com/photo-1622630998477-20aa696fa4f5?w=400&q=80",
    description: "Fast delivery via Mail or Trade.",
    basePrice: 0,

    layout: "fixed",

    calculator: {
      type: "quantity",
      min: 100, // Min 100k
      stepPrice: 0.04, // $0.04 per unit
      unitLabel: "x1000 Gold",
    },
  },

  // =====================================================
  // TIER 3: CUSTOM APPS (Full Width)
  // =====================================================

  // 7. Dota MMR (Complex Logic)
  {
    id: "dota-mmr",
    slug: "mmr-boost",
    title: "Dota 2 MMR Boosting",
    gameSlug: "dota-2",
    categorySlug: "boosting",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    description: "Rank up with the best.",
    basePrice: 0,

    layout: "wide", // <--- Uses the full-width CalculatorLayout

    calculator: {
      type: "custom",
      customComponentId: "dota-mmr-boost", // Maps to Registry
    },
  },
];
