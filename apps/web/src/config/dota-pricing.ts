// src/config/dota-pricing.ts

export const PRICING_CONSTANTS = {
  // Base MMR Rules
  MMR_MIN_GAP: 100,
  MMR_MAX: 8000, // Increased to current standards
  MMR_PER_GAME_STANDARD: 25,
  MMR_PER_GAME_LOW_CONFIDENCE: 40, // Average gain when confidence is low

  // Pricing Base (Tiered pricing example - adjust values as needed)
  PRICE_PER_100_MMR: 4.5, // $4.50 per 100 MMR base

  // Multipliers (Percentage adds)
  MULTIPLIER: {
    STREAMING: 0.15, // +15%
    EXPRESS: 0.2, // +20%
    DUO: 0.4, // +40%
    SPECIFIC_HEROES: 0.1, // +10%
    LOW_BEHAVIOR: 0.2, // +20% (Harder games, not LPQ)
  },

  // Flat Fees
  FEE_PER_LP_GAME: 3.0, // $3.00 per Low Priority game removal

  // Thresholds
  BEHAVIOR_TOXIC_THRESHOLD: 6000,
  RANK_CONFIDENCE_THRESHOLD: 50, // Below this % is considered "Low Confidence" (Faster MMR)
};

// --- Calculation Logic ---

export interface PriceParams {
  startMmr: number;
  endMmr: number;
  behaviorScore: number;
  lpGames: number; // Number of Low Priority games to remove
  rankConfidence: number; // 0-100
  addons: {
    stream: boolean;
    express: boolean;
    duo: boolean;
    specificHeroes: boolean; // true if hero array length > 0
  };
}

export const calculateBoostPrice = (params: PriceParams) => {
  const { startMmr, endMmr, behaviorScore, lpGames, addons } = params;

  const mmrDiff = Math.max(0, endMmr - startMmr);

  // 1. Base Price Calculation (Linear for simplicity, can be tiered)
  // Logic: (Diff / 100) * PricePer100
  let basePrice = (mmrDiff / 100) * PRICING_CONSTANTS.PRICE_PER_100_MMR;

  // 2. Calculate Multipliers
  let multiplier = 1;

  if (addons.stream) multiplier += PRICING_CONSTANTS.MULTIPLIER.STREAMING;
  if (addons.express) multiplier += PRICING_CONSTANTS.MULTIPLIER.EXPRESS;
  if (addons.duo) multiplier += PRICING_CONSTANTS.MULTIPLIER.DUO;
  if (addons.specificHeroes)
    multiplier += PRICING_CONSTANTS.MULTIPLIER.SPECIFIC_HEROES;

  // Behavior Score Multiplier (Not LPQ, just toxic account difficulty)
  if (behaviorScore < PRICING_CONSTANTS.BEHAVIOR_TOXIC_THRESHOLD) {
    multiplier += PRICING_CONSTANTS.MULTIPLIER.LOW_BEHAVIOR;
  }

  // 3. Apply Multiplier to Base
  let subTotal = basePrice * multiplier;

  // 4. Add Flat Fees (LPQ Removal is a separate service added on top)
  const lpCost = lpGames * PRICING_CONSTANTS.FEE_PER_LP_GAME;

  const total = subTotal + lpCost;

  return {
    total: Math.ceil(total), // Round up
    basePrice,
    lpCost,
    isToxic: behaviorScore < PRICING_CONSTANTS.BEHAVIOR_TOXIC_THRESHOLD,
  };
};

export const estimateCompletion = (
  startMmr: number,
  endMmr: number,
  isExpress: boolean,
  rankConfidence: number,
  lpGames: number
) => {
  const mmrDiff = endMmr - startMmr;

  // Determine MMR gained per game based on confidence
  const mmrPerGame =
    rankConfidence < PRICING_CONSTANTS.RANK_CONFIDENCE_THRESHOLD
      ? PRICING_CONSTANTS.MMR_PER_GAME_LOW_CONFIDENCE
      : PRICING_CONSTANTS.MMR_PER_GAME_STANDARD;

  // Raw games needed
  const gamesNeeded = Math.ceil(mmrDiff / mmrPerGame);

  // Add LP games to time calculation
  const totalGames = gamesNeeded + lpGames;

  // Games per day logic
  const gamesPerDayNormal = 8;
  const gamesPerDayExpress = 12;

  const speed = isExpress ? gamesPerDayExpress : gamesPerDayNormal;

  const days = Math.ceil(totalGames / speed);

  return {
    days: Math.max(1, days),
    games: totalGames,
  };
};
