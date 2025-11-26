// src/data/catalogue/games.ts

import { CatalogueGame } from "./types";

export const CATALOGUE_GAMES: CatalogueGame[] = [
  {
    id: "wow",
    name: "World of Warcraft",
    slug: "world-of-warcraft",
    shortName: "WoW",
    icon: "/images/games/wow/icon.png",
    coverImage: "/images/games/wow/cover.jpg",
    primaryColor: "#f8b700",
    isActive: true,
    isFeatured: true,
    displayOrder: 1,
    hasBlueprint: true,
  },
  {
    id: "valorant",
    name: "Valorant",
    slug: "valorant",
    shortName: "VAL",
    icon: "/images/games/valorant/icon.png",
    coverImage: "/images/games/valorant/cover.jpg",
    primaryColor: "#ff4655",
    isActive: true,
    isFeatured: true,
    displayOrder: 2,
    hasBlueprint: false,
  },
  {
    id: "lol",
    name: "League of Legends",
    slug: "league-of-legends",
    shortName: "LoL",
    icon: "/images/games/lol/icon.png",
    coverImage: "/images/games/lol/cover.jpg",
    primaryColor: "#c89b3c",
    isActive: true,
    isFeatured: true,
    displayOrder: 3,
    hasBlueprint: false,
  },
  {
    id: "diablo4",
    name: "Diablo 4",
    slug: "diablo-4",
    shortName: "D4",
    icon: "/images/games/diablo4/icon.png",
    coverImage: "/images/games/diablo4/cover.jpg",
    primaryColor: "#c41230",
    isActive: true,
    isFeatured: false,
    displayOrder: 4,
    hasBlueprint: false,
  },
  {
    id: "dota2",
    name: "Dota 2",
    slug: "dota-2",
    shortName: "Dota",
    icon: "/images/games/dota2/icon.png",
    coverImage: "/images/games/dota2/cover.jpg",
    primaryColor: "#c23c2a",
    isActive: true,
    isFeatured: false,
    displayOrder: 5,
    hasBlueprint: false,
  },
  {
    id: "ffxiv",
    name: "Final Fantasy XIV",
    slug: "final-fantasy-xiv",
    shortName: "FFXIV",
    icon: "/images/games/ffxiv/icon.png",
    coverImage: "/images/games/ffxiv/cover.jpg",
    primaryColor: "#2b4b8c",
    isActive: true,
    isFeatured: false,
    displayOrder: 6,
    hasBlueprint: false,
  },
  {
    id: "poe",
    name: "Path of Exile",
    slug: "path-of-exile",
    shortName: "PoE",
    icon: "/images/games/poe/icon.png",
    coverImage: "/images/games/poe/cover.jpg",
    primaryColor: "#af6025",
    isActive: true,
    isFeatured: false,
    displayOrder: 7,
    hasBlueprint: false,
  },
  {
    id: "destiny2",
    name: "Destiny 2",
    slug: "destiny-2",
    shortName: "D2",
    icon: "/images/games/destiny2/icon.png",
    coverImage: "/images/games/destiny2/cover.jpg",
    primaryColor: "#f5f5f5",
    isActive: true,
    isFeatured: false,
    displayOrder: 8,
    hasBlueprint: false,
  },
];

// Helper functions
export const getGame = (slug: string): CatalogueGame | undefined => {
  return CATALOGUE_GAMES.find((g) => g.slug === slug);
};

export const getFeaturedGames = (): CatalogueGame[] => {
  return CATALOGUE_GAMES.filter((g) => g.isFeatured && g.isActive);
};

export const getActiveGames = (): CatalogueGame[] => {
  return CATALOGUE_GAMES.filter((g) => g.isActive).sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
};
