"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaSearch, FaUsers, FaStar, FaTruck, FaHeadset } from "react-icons/fa";

// ----- Styled Components -----

const PageWrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%);
  font-family: var(--font-inter);
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 5rem 1rem 3rem;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (min-width: 768px) {
    padding: 8rem 1.5rem 4rem;
  }
`;

const HeroTitle = styled.h1`
  font-family: var(--font-sora);
  font-weight: 800;
  font-size: 2.5rem;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    font-size: 4rem;
  }

  span {
    background: linear-gradient(45deg, var(--action-primary), var(--action-primary-hover));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 2rem;
  opacity: 0.9;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 640px;
  margin: 0 auto 3rem;
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

const SearchContainer = styled.div`
  max-width: 768px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 1;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.25rem 1.5rem 1.25rem 3rem;
  font-size: 1rem;
  background: var(--surface-primary);
  border: 2px solid var(--border-default);
  border-radius: 1rem;
  color: var(--text-primary);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--action-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const Tag = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: var(--action-primary);
    color: var(--text-inverse);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

const PopularTags = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, var(--action-primary), var(--action-primary-hover));
  color: var(--text-inverse);
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1.25rem 2.5rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (min-width: 768px) {
    font-size: 1.25rem;
    padding: 1.5rem 3rem;
  }
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1024px;
  margin: 5rem auto;
  padding: 0 1rem;
  text-align: center;
`;

const StatItem = styled.div`
  background: var(--surface-primary);
  border-radius: 1rem;
  padding: 2rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--action-primary);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const StatText = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const BrowseSection = styled.section`
  max-width: 1280px;
  margin: 0 auto 6rem;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-sora);
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 3rem;
  font-size: 2rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`;

const ProductCard = styled.div`
  background: var(--surface-primary);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--action-primary);
`;

// ----- Component -----

export default function HomePage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");

  const popularTags = t.raw("home.popularTags") as string[];
  const stats = (t.raw("home.stats") as string[]).map(
    (text: string, index: number) => ({
      icon: [<FaUsers />, <FaStar />, <FaTruck />, <FaHeadset />][index],
      number: text.split(' ')[0],
      text: text.split(' ').slice(1).join(' '),
    })
  );
  const games = (t.raw("home.games") as string[]).map(
    (name: string, index: number) => ({
      name,
      image: [
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=200&fit=crop", // Apex
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop", // WoW
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&h=200&fit=crop", // Valorant
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // Dota
      ][index],
    })
  );

  const handleTagClick = (tag: string) => setSearchQuery(tag);

  const statItems = stats.map((stat, index) => (
    <StatItem key={index}>
      <StatIcon>{stat.icon}</StatIcon>
      <StatNumber>{stat.number}</StatNumber>
      <StatText>{stat.text}</StatText>
    </StatItem>
  ));

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>
          {t("home.title")} <span>{t("home.titleHighlight")}</span>
        </HeroTitle>
        <HeroSubtitle>{t("home.subtitle")}</HeroSubtitle>
        <HeroDescription>{t("home.description")}</HeroDescription>

        <SearchContainer>
          <SearchWrapper>
            <SearchIcon />
            <SearchInput
              placeholder={t("home.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
          </SearchWrapper>
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
        {statItems}
      </StatsSection>

      <BrowseSection>
        <SectionTitle>{t("home.browseByGame")}</SectionTitle>
        <ProductGrid>
          {games.map((game, index) => (
            <ProductCard key={index}>
              <ProductImage src={game.image} alt={game.name} />
              <ProductInfo>
                <ProductName>{game.name}</ProductName>
                <ProductPrice>Shop Now</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </BrowseSection>
    </PageWrapper>
  );
}
