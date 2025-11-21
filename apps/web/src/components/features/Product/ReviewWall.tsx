"use client";

import { styled } from "next-yak";
import { Star, CheckCircle } from "lucide-react";
import { queries } from "@/config/theme";

const Section = styled.section`
  margin-top: 64px;
  margin-bottom: 64px;

  /* Visual Break Style */
  background-color: var(
    --bg-surface-hover
  ); /* Slightly darker/lighter than main bg */
  border-radius: var(--radius-lg);
  padding: 40px;
  border: 1px solid var(--border-subtle);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 32px;
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--fg-primary);
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: var(--fg-secondary);
  margin-top: 8px;
`;

const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;

  ${queries.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ReviewCard = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--border-strong);
  }
`;

const ImageWrapper = styled.div`
  height: 160px;
  background-color: #000;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8; /* Slight dim to make text pop if needed */
    /* Blur sensitive info automatically */
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
`;

const Content = styled.div`
  padding: 20px;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: var(--fg-primary);
  font-size: 0.9rem;
`;

const Date = styled.span`
  font-size: 0.8rem;
  color: var(--fg-muted);
`;

const Comment = styled.p`
  font-size: 0.9rem;
  color: var(--fg-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
`;

const ServiceTag = styled.div`
  font-size: 0.75rem;
  color: var(--action-primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// Mock Data
const REVIEWS = [
  {
    id: 1,
    user: "Player_X",
    date: "2 hours ago",
    service: "Mythic+ 20",
    comment: "Insanely fast run. Tank knew every pull perfectly.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
  },
  {
    id: 2,
    user: "JettMain99",
    date: "5 hours ago",
    service: "Placement Matches",
    comment: "Won 5/5 games. Secured Ascendant rank. Recommended!",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
  },
  {
    id: 3,
    user: "AzerothHero",
    date: "1 day ago",
    service: "Mage Tower",
    comment: "Finally got my transmog. Booster streamed the whole thing.",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80",
  },
];

export const ReviewWall = () => {
  return (
    <Section>
      <Header>
        <div>
          <Title>Recent Completions</Title>
          <Subtitle>See what our boosters accomplished today.</Subtitle>
        </div>
      </Header>

      <Grid>
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id}>
            <ImageWrapper>
              <img src={review.image} alt="Proof of completion" />
              <Badge>
                <CheckCircle size={12} /> Verified Order
              </Badge>
            </ImageWrapper>
            <Content>
              <UserRow>
                <div style={{ display: "flex", gap: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#EAB308" stroke="none" />
                  ))}
                </div>
                <Date>{review.date}</Date>
              </UserRow>
              <Comment>"{review.comment}"</Comment>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <UserName>{review.user}</UserName>
                <ServiceTag>{review.service}</ServiceTag>
              </div>
            </Content>
          </ReviewCard>
        ))}
      </Grid>
    </Section>
  );
};
