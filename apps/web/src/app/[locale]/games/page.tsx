import { CATALOGUE_GAMES } from "@/data/catalogue";
import { styled } from "next-yak";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Search } from "lucide-react";

// --- STYLES ---

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: 16px;
`;

const SearchBar = styled.div`
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border-radius: 99px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  color: var(--fg-primary);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--action-primary);
    box-shadow: 0 0 0 4px var(--bg-surface-hover);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--fg-muted);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
`;

const GameCard = styled(Link)`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s;
  border: 1px solid var(--border-subtle);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--action-primary);
  }
`;

const Cover = styled.div`
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Info = styled.div`
  padding: 20px;
  text-align: center;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: 4px;
`;

const ServiceCount = styled.span`
  font-size: 0.85rem;
  color: var(--fg-secondary);
`;

export default function GamesIndexPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Games", href: undefined }]} />

      <Header>
        <Title>Select Your Game</Title>
        <SearchBar>
          <IconWrapper>
            <Search size={20} />
          </IconWrapper>
          <Input placeholder="Search games..." />
        </SearchBar>
      </Header>

      <Grid>
        {CATALOGUE_GAMES.map((game) => (
          <GameCard key={game.id} href={`/games/${game.slug}`}>
            <Cover style={{ backgroundImage: `url(${game.coverImage})` }} />
            <Info>
              <Name>{game.name}</Name>
              <ServiceCount>
                {game.blueprint ? "View Services" : "Coming Soon"}
              </ServiceCount>
            </Info>
          </GameCard>
        ))}
      </Grid>
    </Container>
  );
}
