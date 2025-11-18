"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Inter, Sora, Geist_Mono } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ----- Styled Components -----

const PageWrapper = styled.main`
  min-height: 100vh;
  background: var(--surface-primary);
  font-family: var(--font-inter);
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 1rem 2rem;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 6rem 1.5rem 3rem;
  }
`;

const HeroTitle = styled.h1`
  font-family: var(--font-sora);
  font-weight: 800;
  font-size: 2.25rem;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }

  span {
    color: var(--text-muted);
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 1.5rem;
  opacity: 0.85;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 640px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const SearchContainer = styled.div`
  max-width: 768px;
  margin: 0 auto 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  background: var(--surface-secondary);
  border: 1px solid var(--border-default);
  border-radius: 0.5rem;
  color: var(--text-primary);
  transition: all 0.2s ease;

  &:focus {
    outline: 2px solid var(--action-primary);
    outline-offset: 2px;
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const Tag = styled.button`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  background: var(--surface-tertiary);
  border: 1px solid var(--border-default);
  border-radius: 9999px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface-secondary);
    color: var(--text-primary);
    border-color: var(--border-hover);
  }
`;

const CTAButton = styled.button`
  background: var(--action-primary);
  color: var(--text-inverse);
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-out;
  min-width: 160px;

  &:hover {
    background: var(--action-primary-hover);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
`;

const PopularTags = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  max-width: 1024px;
  margin: 3rem auto;
  padding: 0 1rem;
  text-align: center;
`;

const StatItem = styled.div``;
const StatIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;
const StatText = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const BrowseSection = styled.section`
  max-width: 1280px;
  margin: 0 auto 4rem;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-sora);
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 2rem;
`;

const GameGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
`;

const GameCard = styled.button`
  background: var(--surface-secondary);
  border: 1px solid var(--border-default);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--border-hover);
    box-shadow: 0 4px 6px oklch(0% 0 0 / 0.1);
  }
`;

const GameIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 0.375rem;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const GameName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
`;

// ----- Component -----

export default function HomePage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");

  const popularTags = t.raw("home.popularTags") as string[];
  const stats = (t.raw("home.stats") as string[]).map(
    (text: string, index: number) => ({
      icon: ["🔒", "⭐", "📦", "🛡️"][index],
      text,
    })
  );
  const games = (t.raw("home.games") as string[]).map(
    (name: string, index: number) => ({
      name,
      icon: [
        "https://mockimage.tw/photo/48x48/ffffff/000000/Apex",
        "https://mockimage.tw/photo/48x48/ffffff/000000/WoW",
        "https://mockimage.tw/photo/48x48/ffffff/000000/Valorant",
        "https://mockimage.tw/photo/48x48/ffffff/000000/Dota2",
      ][index],
    })
  );

  const handleTagClick = (tag: string) => setSearchQuery(tag);

  return (
    <PageWrapper
      className={`${inter.variable} ${sora.variable} ${geistMono.variable}`}
    >
      <HeroSection>
        <HeroTitle>
          {t("home.title")} <span>{t("home.titleHighlight")}</span>
        </HeroTitle>
        <HeroSubtitle>{t("home.subtitle")}</HeroSubtitle>
        <HeroDescription>{t("home.description")}</HeroDescription>

        <SearchContainer>
          <SearchInput
            placeholder={t("home.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
        </SearchContainer>

        <PopularTags>
          {popularTags.map((tag) => (
            <Tag key={tag} onClick={() => handleTagClick(tag)}>
              {tag}
            </Tag>
          ))}
        </PopularTags>

        <CTAButton>{t("home.shopNow")}</CTAButton>
      </HeroSection>

      <StatsSection>
        {stats.map((stat) => (
          <StatItem key={stat.text}>
            <StatIcon aria-hidden="true">{stat.icon}</StatIcon>
            <StatText>{stat.text}</StatText>
          </StatItem>
        ))}
      </StatsSection>

      <BrowseSection>
        <SectionTitle>{t("home.browseByGame")}</SectionTitle>
        <GameGrid>
          {games.map((game) => (
            <GameCard key={game.name}>
              <GameIcon src={game.icon} alt={`${game.name} icon`} />
              <GameName>{game.name}</GameName>
            </GameCard>
          ))}
        </GameGrid>
      </BrowseSection>
    </PageWrapper>
  );
}
