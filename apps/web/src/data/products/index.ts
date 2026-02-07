// src/data/products/index.ts

import { ProductPageData } from "@/components/product/types";
import { dota2CalibrationProduct } from "./dota2-calibration";

// Product registry by game
const productsByGame: Record<string, Record<string, ProductPageData>> = {
  "dota-2": {
    "calibration-matches": dota2CalibrationProduct,
  },
};

// Get product by game and slug
export const getProduct = (
  gameSlug: string,
  productSlug: string
): ProductPageData | undefined => {
  return productsByGame[gameSlug]?.[productSlug];
};

// Get all products for a game
export const getGameProducts = (gameSlug: string): ProductPageData[] => {
  const gameProducts = productsByGame[gameSlug];
  if (!gameProducts) return [];
  return Object.values(gameProducts);
};

// Check if product exists
export const hasProduct = (gameSlug: string, productSlug: string): boolean => {
  return !!productsByGame[gameSlug]?.[productSlug];
};

// Export individual products
export { dota2CalibrationProduct };
