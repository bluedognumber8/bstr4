// Map MMR ranges to Medal Names
const MEDAL_TIERS = [
  { name: "herald", base: 0 },
  { name: "guardian", base: 770 },
  { name: "crusader", base: 1540 },
  { name: "archon", base: 2310 },
  { name: "legend", base: 3080 },
  { name: "ancient", base: 3850 },
  { name: "divine", base: 4620 },
  { name: "immortal", base: 5620 },
];

const STAR_MMR = 154; // Approximate MMR per star (770 / 5)

export const getRankImage = (mmr: number) => {
  // 1. Find the main tier (e.g. Legend)
  let tierIndex = MEDAL_TIERS.findIndex((t) => mmr < t.base + 770);
  if (tierIndex === -1) tierIndex = MEDAL_TIERS.length - 1; // Immortal cap

  const tier = MEDAL_TIERS[tierIndex];

  // 2. Calculate Stars (1 to 5)
  // Example: MMR 3200. Legend Base = 3080. Diff = 120.
  // 120 / 154 = 0.7 -> Star 1.
  const mmrInTier = mmr - tier.base;
  let star = Math.ceil(mmrInTier / STAR_MMR);
  star = Math.max(1, Math.min(5, star)); // Clamp between 1 and 5

  // Immortal doesn't have stars usually, just one image
  if (tier.name === "immortal") return "/ranks/dota/immortal.webp";

  // Return path to local file in public folder
  return `/ranks/dota/${tier.name}-${star}.webp`;
};

// Keep your price calculator...
// Simple linear pricing for MVP (You can replace with your complex JSON later)
export const calculatePrice = (start: number, end: number) => {
  if (start >= end) return 0;
  const mmrDiff = end - start;
  // Price per 100 MMR increases as you go higher
  const pricePer100 = start > 4000 ? 5 : 3;
  return (mmrDiff / 100) * pricePer100;
};
