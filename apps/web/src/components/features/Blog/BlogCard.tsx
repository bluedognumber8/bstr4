"use client";

import { styled } from "next-yak";
import { BlogPost } from "@/data/mock-blog";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--border-strong);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const GameTag = styled.span`
  font-size: 0.75rem;
  color: var(--color-info);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: 8px;
  line-height: 1.4;
`;

const Excerpt = styled.p`
  font-size: 0.9rem;
  color: var(--fg-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
  flex: 1;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8rem;
  color: var(--fg-muted);
  border-top: 1px solid var(--border-subtle);
  padding-top: 16px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card href={`/blog/${post.slug}`}>
      <ImageWrapper>
        <img src={post.coverImage} alt={post.title} />
        <Badge>{post.category}</Badge>
      </ImageWrapper>
      <Content>
        <GameTag>{post.game}</GameTag>
        <Title>{post.title}</Title>
        <Excerpt>{post.excerpt}</Excerpt>
        <Meta>
          <MetaItem>
            <Calendar size={14} /> {post.date}
          </MetaItem>
          <MetaItem>
            <Clock size={14} /> {post.readTime}
          </MetaItem>
        </Meta>
      </Content>
    </Card>
  );
};
