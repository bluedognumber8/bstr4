"use client";

import { styled } from "next-yak";
import { MOCK_POSTS } from "@/data/mock-blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Section = styled.section`
  margin-top: 48px;
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GuideCard = styled(Link)`
  display: flex;
  gap: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 16px;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--action-primary);
  }
`;

const Thumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GuideTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--fg-primary);
  line-height: 1.4;
  margin-bottom: 8px;
`;

const ReadMore = styled.span`
  font-size: 0.8rem;
  color: var(--action-primary);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RelatedGuides = ({ gameSlug }: { gameSlug: string }) => {
  // Find posts that match the game name (Simple matching for MVP)
  // In real app, use Strapi relation ID
  const relatedPosts = MOCK_POSTS.filter(
    (p) => p.game.toLowerCase().replace(/ /g, "-") === gameSlug
  ).slice(0, 2); // Show max 2

  if (relatedPosts.length === 0) return null;

  return (
    <Section>
      <Title>Guides & Strategies</Title>
      <Grid>
        {relatedPosts.map((post) => (
          <GuideCard key={post.id} href={`/blog/${post.slug}`}>
            <Thumb src={post.coverImage} alt={post.title} />
            <Info>
              <GuideTitle>{post.title}</GuideTitle>
              <ReadMore>
                Read Guide <ArrowRight size={14} />
              </ReadMore>
            </Info>
          </GuideCard>
        ))}
      </Grid>
    </Section>
  );
};
