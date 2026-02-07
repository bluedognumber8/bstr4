// src/data/blueprints/index.ts
import { GamePageBlueprint } from "@/components/engine/types";
import { DOTA_BLUEPRINT } from "./dota-2";
import { WOW_RETAIL_BLUEPRINT } from "./wow-retail";
import { WOW_CLASSIC_BLUEPRINT } from "./wow-classic";

const BLUEPRINTS: Record<string, GamePageBlueprint> = {
  "dota-2": DOTA_BLUEPRINT,
  "wow-retail": WOW_RETAIL_BLUEPRINT,
  "wow-classic": WOW_CLASSIC_BLUEPRINT,
  // Alias for navigation safety
  "world-of-warcraft": WOW_RETAIL_BLUEPRINT,
};

export const getGameConfig = (slug: string): GamePageBlueprint | null => {
  return BLUEPRINTS[slug] || null;
};
