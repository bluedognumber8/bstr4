"use client";

import { styled } from "next-yak";
import { Twitter, Twitch } from "lucide-react";

const Box = styled.div`
  display: flex;
  gap: 24px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-top: 64px;
  align-items: center;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--action-primary);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.h4`
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin: 0;
`;

const Role = styled.p`
  color: var(--color-info);
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Bio = styled.p`
  color: var(--fg-secondary);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
`;

const Socials = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;

  a {
    color: var(--fg-muted);
    transition: color 0.2s;
    &:hover {
      color: var(--action-primary);
    }
  }
`;

export const AuthorBox = ({ author, role, image }: any) => {
  return (
    <Box>
      <Avatar src={image} alt={author} />
      <Info>
        <Name>{author}</Name>
        <Role>{role}</Role>
        <Bio>
          Professional gamer specializing in high-end content. Helping players
          achieve their goals since 2019.
        </Bio>
        <Socials>
          <a href="#" aria-label="Twitter">
            <Twitter size={18} />
          </a>
          <a href="#" aria-label="Twitch">
            <Twitch size={18} />
          </a>
        </Socials>
      </Info>
    </Box>
  );
};
