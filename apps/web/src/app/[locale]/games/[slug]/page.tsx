// src/app/[locale]/games/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGame, getActiveGames } from "@/data/catalogue";
import { getGameBlueprint } from "@/data/catalogue/blueprints";
import { GameHubLayout } from "@/components/engine/GameHubLayout";
import { ComingSoonView } from "@/components/engine/ComingSoonView";

// --- TYPES ---

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

// --- METADATA ---

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  const blueprint = getGameBlueprint(slug);

  if (!game) {
    return { title: "Game Not Found" };
  }

  if (blueprint) {
    return {
      title: blueprint.seo.title,
      description: blueprint.seo.description,
      openGraph: {
        title: blueprint.seo.title,
        description: blueprint.seo.description,
        images: [blueprint.theme.backgroundImage],
      },
    };
  }

  return {
    title: `${game.name} Services | BSTR4`,
    description: `Professional ${game.name} boosting services. Coming soon.`,
  };
}

// --- STATIC PARAMS ---

export async function generateStaticParams() {
  const games = getActiveGames();
  return games.map((game) => ({ slug: game.slug }));
}

// --- PAGE ---

export default async function GamePage({ params }: Props) {
  const { slug } = await params;

  const game = getGame(slug);

  if (!game || !game.isActive) {
    return notFound();
  }

  const blueprint = getGameBlueprint(slug);

  // If no blueprint, show coming soon
  if (!blueprint) {
    return <ComingSoonView game={game} />;
  }

  return <GameHubLayout blueprint={blueprint} />;
}
