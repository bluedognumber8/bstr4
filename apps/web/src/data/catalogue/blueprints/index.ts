// src/data/catalogue/blueprints/index.ts

import { GamePageBlueprint } from "@/components/engine/types";
import { wowBlueprint } from "./world-of-warcraft";

const blueprints: Record<string, GamePageBlueprint> = {
  "world-of-warcraft": wowBlueprint,
};

export const getGameBlueprint = (
  slug: string
): GamePageBlueprint | undefined => {
  return blueprints[slug];
};

export const hasBlueprint = (slug: string): boolean => {
  return slug in blueprints;
};
