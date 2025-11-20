"use client";

import { styled } from "next-yak";
import { MOCK_POSTS } from "@/data/mock-blog";
import { BlogCard } from "@/components/features/Blog/BlogCard";
import { queries } from "@/config/theme";
import { Link } from "@/i18n/navigation";

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto 6rem;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--fg-primary);

  ${queries.md} {
    font-size: 2.5rem;
  }
`;

const ViewAll = styled(Link)`
  color: var(--action-primary);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  ${queries.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const LatestNews = () => {
  // Take only the first 3 posts
  const latestPosts = MOCK_POSTS.slice(0, 3);

  return (
    <Section>
      <Header>
        <Title>Latest Updates</Title>
        <ViewAll href="/blog">View All Articles →</ViewAll>
      </Header>
      <Grid>
        {latestPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Grid>
    </Section>
  );
};
