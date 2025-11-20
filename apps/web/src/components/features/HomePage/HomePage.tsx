"use client";

import { styled } from "next-yak";
import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { FeaturedGames } from "./FeaturedGames";
import { LatestNews } from "./LatestNews";

const Main = styled.main`
  min-height: 100vh;
  width: 100%;

  /* The Gradient */
  background: linear-gradient(
    135deg,
    var(--bg-canvas) 0%,
    var(--bg-surface) 100%
  );

  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export default function HomePage() {
  return (
    <Main>
      <Hero />
      <Stats />
      <FeaturedGames />
      <LatestNews />
    </Main>
  );
}
