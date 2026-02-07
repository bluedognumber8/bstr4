// src/data/catalogue/blueprints/index.ts

import { GamePageBlueprint } from "@/components/engine/types";
import { wowBlueprint } from "./world-of-warcraft";
import { dota2Blueprint } from "./dota-2";

const blueprints: Record<string, GamePageBlueprint> = {
  "world-of-warcraft": wowBlueprint,
  "dota-2": dota2Blueprint,
};

export const getGameBlueprint = (
  slug: string
): GamePageBlueprint | undefined => {
  return blueprints[slug];
};

export const hasBlueprint = (slug: string): boolean => {
  return slug in blueprints;
};

export { wowBlueprint, dota2Blueprint };
