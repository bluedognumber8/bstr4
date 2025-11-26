// src/components/catalogue/GamesIndexView.tsx
"use client";

import { styled } from "next-yak";
import { useState } from "react";
import Link from "next/link";
import { Search, Star, ArrowRight } from "lucide-react";
import { CatalogueGame } from "@/data/catalogue/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { queries } from "@/config/theme";

// --- STYLES ---

const PageContainer = styled.div`
  background-color: var(--bg-canvas);
  min-height: 100vh;
  padding-bottom: var(--space-16);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-5);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--space-10);
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: var(--space-4);

  ${queries.md} {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--fg-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-8);
`;

const SearchWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  color: var(--fg-primary);
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: var(--action-primary);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  }

  &::placeholder {
    color: var(--fg-muted);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--fg-muted);

  svg {
    width: 20px;
    height: 20px;
  }
`;

// Featured Section
const FeaturedSection = styled.section`
  margin-bottom: var(--space-12);
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  svg {
    width: 20px;
    height: 20px;
    color: #f59e0b;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);

  ${queries.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeaturedCard = styled(Link)`
  position: relative;
  height: 240px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  ${queries.md} {
    height: 280px;
  }
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 60%);
`;

const FeaturedContent = styled.div`
  position: relative;
  z-index: 1;
  padding: var(--space-5);
  color: var(--gray-0);
  width: 100%;
`;

const FeaturedName = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--space-1);
`;

const FeaturedCTA = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.875rem;
  color: var(--gray-200);

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }

  ${FeaturedCard}:hover & svg {
    transform: translateX(4px);
  }
`;

// All Games Grid
const AllGamesSection = styled.section``;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);

  ${queries.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${queries.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GameCard = styled(Link)`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--border-strong);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }
`;

const GameCover = styled.div`
  height: 140px;
  background-size: cover;
  background-position: center;
  position: relative;

  ${queries.md} {
    height: 160px;
  }
`;

const ComingSoonBadge = styled.span`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  padding: 2px 8px;
  background: rgba(0, 0, 0, 0.75);
  color: var(--gray-0);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: var(--radius-sm);
`;

const GameInfo = styled.div`
  padding: var(--space-4);
  text-align: center;
`;

const GameName = styled.h3`
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: var(--space-1);
`;

const GameStatus = styled.span`
  font-size: 0.8125rem;
  color: var(--fg-muted);
`;

const NoResults = styled.div`
  text-align: center;
  padding: var(--space-12);
  color: var(--fg-muted);

  h3 {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    color: var(--fg-secondary);
    margin-bottom: var(--space-2);
  }
`;

// --- COMPONENT ---

interface Props {
  allGames: CatalogueGame[];
  featuredGames: CatalogueGame[];
}

export const GamesIndexView = ({ allGames, featuredGames }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = allGames.filter(
    (game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nonFeaturedGames = filteredGames.filter(
    (game) => !featuredGames.some((f) => f.id === game.id)
  );

  return (
    <PageContainer>
      <Container>
        <Breadcrumbs items={[{ label: "Games" }]} />

        <Header>
          <Title>Select Your Game</Title>
          <Subtitle>
            Choose from our selection of supported games and start dominating
            today.
          </Subtitle>

          <SearchWrapper>
            <SearchIcon>
              <Search />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
        </Header>

        {/* Featured Games */}
        {!searchQuery && featuredGames.length > 0 && (
          <FeaturedSection>
            <SectionTitle>
              <Star />
              Featured Games
            </SectionTitle>

            <FeaturedGrid>
              {featuredGames.map((game) => (
                <FeaturedCard
                  key={game.id}
                  href={`/games/${game.slug}`}
                  style={{ backgroundImage: `url(${game.coverImage})` }}
                >
                  <FeaturedOverlay />
                  <FeaturedContent>
                    <FeaturedName>{game.name}</FeaturedName>
                    <FeaturedCTA>
                      {game.hasBlueprint ? "View Services" : "Coming Soon"}
                      <ArrowRight />
                    </FeaturedCTA>
                  </FeaturedContent>
                </FeaturedCard>
              ))}
            </FeaturedGrid>
          </FeaturedSection>
        )}

        {/* All Games */}
        <AllGamesSection>
          <SectionTitle>
            {searchQuery ? `Results for "${searchQuery}"` : "All Games"}
          </SectionTitle>

          {filteredGames.length === 0 ? (
            <NoResults>
              <h3>No games found</h3>
              <p>Try a different search term or browse all games.</p>
            </NoResults>
          ) : (
            <GamesGrid>
              {(searchQuery ? filteredGames : nonFeaturedGames).map((game) => (
                <GameCard key={game.id} href={`/games/${game.slug}`}>
                  <GameCover
                    style={{ backgroundImage: `url(${game.coverImage})` }}
                  >
                    {!game.hasBlueprint && (
                      <ComingSoonBadge>Soon</ComingSoonBadge>
                    )}
                  </GameCover>
                  <GameInfo>
                    <GameName>{game.name}</GameName>
                    <GameStatus>
                      {game.hasBlueprint ? "View Services" : "Coming Soon"}
                    </GameStatus>
                  </GameInfo>
                </GameCard>
              ))}
            </GamesGrid>
          )}
        </AllGamesSection>
      </Container>
    </PageContainer>
  );
};
