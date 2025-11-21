import { notFound } from "next/navigation";
import { MOCK_GAMES, MOCK_PRODUCTS } from "@/data/mock-games";
import { styled } from "next-yak";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShoppingCart } from "lucide-react";
import { queries } from "@/config/theme";
import { Link } from "@/i18n/navigation"; // Import Link
// --- STYLES ---

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.header`
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 24px;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: var(--fg-secondary);
  max-width: 800px;
`;

const Layout = styled.div`
  display: grid;
  gap: 40px;

  ${queries.lg} {
    grid-template-columns: 250px 1fr; /* Sidebar | Grid */
  }
`;

const Sidebar = styled.aside`
  display: none; /* Hide filters on mobile for MVP */
  ${queries.lg} {
    display: block;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 32px;
`;

const FilterTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 16px;
  color: var(--fg-primary);
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: var(--fg-secondary);
  cursor: pointer;
  font-size: 0.95rem;

  input {
    accent-color: var(--action-primary);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const ProductCard = styled(Link)`
  display: block; /* Make link behave like div */
  text-decoration: none;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--action-primary);
  }
`;

const ImageWrapper = styled.div`
  height: 180px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 16px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--fg-primary);
`;

const AddButton = styled.button`
  background: var(--action-primary);
  color: var(--bg-canvas);
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

interface Props {
  params: Promise<{ slug: string; category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug, category } = await params;

  const game = MOCK_GAMES.find((g) => g.slug === slug);
  if (!game) notFound();

  const catData = game.categories.find((c) => c.slug === category);
  if (!catData) notFound();

  // 3. Filter Products
  const products = MOCK_PRODUCTS.filter(
    (p) => p.gameSlug === slug && p.categorySlug === category
  );

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Games", href: "/games" },
          { label: game.name, href: `/games/${game.slug}` },
          { label: catData.name, href: undefined }, // Use catData.name (Capitalized)
        ]}
      />

      <Header>
        <Title>
          {game.name} - {catData.name}
        </Title>
        <Description>{catData.description}</Description>
      </Header>

      <Layout>
        <Sidebar>
          <FilterGroup>
            <FilterTitle>Sort By</FilterTitle>
            <FilterLabel>
              <input type="radio" name="sort" /> Recommended
            </FilterLabel>
            <FilterLabel>
              <input type="radio" name="sort" /> Price: Low to High
            </FilterLabel>
            <FilterLabel>
              <input type="radio" name="sort" /> Price: High to Low
            </FilterLabel>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Availability</FilterTitle>
            <FilterLabel>
              <input type="checkbox" defaultChecked /> Instant Delivery
            </FilterLabel>
            <FilterLabel>
              <input type="checkbox" /> Online Boosters
            </FilterLabel>
          </FilterGroup>
        </Sidebar>

        <ProductGrid>
          {products.length > 0 ? (
            products.map((p) => (
              /* FIX 2: Wrap in Link to PDP */
              <ProductCard
                key={p.id}
                href={`/games/${slug}/${category}/${p.slug}`}
              >
                <ImageWrapper>
                  <img src={p.image} alt={p.title} />
                </ImageWrapper>
                <Content>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)" }}>
                    {p.type === "variable" ? "Starting at" : "Fixed Price"}
                  </p>
                  <PriceRow>
                    <Price>${p.price}</Price>
                    <AddButton>
                      <ShoppingCart size={14} /> Add
                    </AddButton>
                  </PriceRow>
                </Content>
              </ProductCard>
            ))
          ) : (
            <p>No products found in this category yet.</p>
          )}
        </ProductGrid>
      </Layout>
    </Container>
  );
}
