import { MOCK_POSTS } from "@/data/mock-blog";
import { BlogCard } from "@/components/features/Blog/BlogCard";
import { styled } from "next-yak";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
//MOCK_POSTS with await fetchPostsFromStrapi()
// Styled Wrappers (Usually in a separate file, but inline for MVP)
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

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--fg-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
`;

export default function BlogPage() {
  // Mock Translations for now
  // const t = useTranslations("Blog");

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Blog", href: undefined }, // Current page
        ]}
      />
      <Header>
        <Title>Gaming Insights</Title>
        <Subtitle>
          Strategies, guides, and news from our team of professional gamers.
        </Subtitle>
      </Header>

      <Grid>
        {MOCK_POSTS.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Grid>
    </Container>
  );
}
