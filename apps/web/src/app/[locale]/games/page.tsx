// src/app/[locale]/games/page.tsx

import { Metadata } from "next";
import { getActiveGames, getFeaturedGames } from "@/data/catalogue";
import { GamesIndexView } from "@/components/catalogue/GamesIndexView";

export const metadata: Metadata = {
  title: "All Games | BSTR4 Boosting Services",
  description:
    "Browse all available game boosting services. World of Warcraft, Valorant, League of Legends, Diablo 4, and more.",
};

export default function GamesPage() {
  const allGames = getActiveGames();
  const featuredGames = getFeaturedGames();

  return <GamesIndexView allGames={allGames} featuredGames={featuredGames} />;
}
