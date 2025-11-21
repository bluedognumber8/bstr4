import { notFound } from "next/navigation";
import { MOCK_GAMES } from "@/data/mock-games";
import { styled } from "next-yak";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { queries } from "@/config/theme";
import * as Icons from "lucide-react"; // Dynamic Icons

// --- STYLES ---

interface Props {
  params: Promise<{ slug: string }>;
}
const Hero = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;

  /* Gradient overlay for text readability */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--bg-canvas) 100%
    );
    z-index: 1;
  }
`;

// 2. New Component for the Background Image
// We render this as a separate div so we can style it easily
const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.4);
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  margin-top: 40px;
`;

const GameTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px 80px;
  position: relative;
  z-index: 3;
  margin-top: -60px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const CategoryCard = styled(Link)`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--action-primary);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const IconBox = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-surface-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--action-primary);
`;

const CatName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: 8px;
`;

const CatDesc = styled.p`
  font-size: 0.9rem;
  color: var(--fg-secondary);
`;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GameHubPage({ params }: Props) {
  const { slug } = await params;
  const game = MOCK_GAMES.find((g) => g.slug === slug);

  if (!game) notFound();

  return (
    <main>
      {/* 1. Immersive Hero */}
      <Hero>
        {/* Pass URL via inline style (Safe & Performant) */}
        <HeroBackground
          style={{ backgroundImage: `url(${game.coverImage})` }}
        />

        <HeroContent>
          <GameTitle style={{ color: game.primaryColor }}>
            {game.name}
          </GameTitle>
          <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
            Select a service category below
          </p>
        </HeroContent>
      </Hero>

      {/* 2. Categories */}
      <Container>
        <Breadcrumbs
          items={[
            { label: "Games", href: "/games" },
            { label: game.name, href: undefined },
          ]}
        />

        <CategoryGrid>
          {game.categories.map((cat) => {
            const IconComponent = (Icons as any)[cat.icon] || Icons.HelpCircle;

            return (
              <CategoryCard
                key={cat.id}
                href={`/games/${game.slug}/${cat.slug}`}
              >
                <IconBox>
                  <IconComponent size={32} />
                </IconBox>
                <CatName>{cat.name}</CatName>
                <CatDesc>{cat.description}</CatDesc>
              </CategoryCard>
            );
          })}
        </CategoryGrid>
      </Container>
    </main>
  );
}
