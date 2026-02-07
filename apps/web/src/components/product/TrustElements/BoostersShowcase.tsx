// src/components/product/TrustElements/BoostersShowcase.tsx
"use client";

import { styled } from "next-yak";
import { Star, Users } from "lucide-react";
import { Booster } from "../types";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  margin-bottom: var(--space-8);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
  gap: var(--space-3);
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.9375rem;
  color: var(--fg-muted);
  margin: var(--space-1) 0 0;
`;

const OnlineCount = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--fg-secondary);

  svg {
    width: 18px;
    height: 18px;
    color: var(--color-success);
  }

  strong {
    color: var(--color-success);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);

  ${queries.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${queries.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const BoosterCard = styled.div`
  padding: var(--space-5);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: all 0.2s;

  &:hover {
    border-color: var(--border-strong);
    transform: translateY(-2px);
  }
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto var(--space-3);
  border-radius: 50%;
  background: var(--bg-canvas);
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OnlineDot = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  background: var(--color-success);
  border: 2px solid var(--bg-surface);
  border-radius: 50%;
`;

const BoosterName = styled.div`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  color: var(--fg-primary);
  margin-bottom: var(--space-2);
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: 0.8125rem;
  color: var(--fg-muted);
  margin-bottom: var(--space-3);

  .stat {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
  }

  .highlight {
    color: var(--fg-primary);
    font-weight: 600;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);

  svg {
    width: 14px;
    height: 14px;
    color: #f59e0b;
    fill: #f59e0b;
  }

  span {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--fg-primary);
  }
`;

const RolesRow = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-1);
  margin-top: var(--space-3);
`;

const RoleTag = styled.span`
  padding: 2px 8px;
  background: var(--bg-canvas);
  border-radius: var(--radius-full);
  font-size: 0.6875rem;
  color: var(--fg-muted);
`;

const CountryFlag = styled.span`
  font-size: 1rem;
  margin-left: var(--space-1);
`;

// --- COMPONENT ---

interface Props {
  boosters: Booster[];
  onlineCount?: number;
}

export const BoostersShowcase = ({ boosters, onlineCount }: Props) => {
  const displayBoosters = boosters.slice(0, 4);
  const actualOnlineCount =
    onlineCount || boosters.filter((b) => b.online).length;

  return (
    <Container>
      <Header>
        <div>
          <Title>Meet Our Boosters</Title>
          <Subtitle>Handpicked professionals with 7000+ MMR</Subtitle>
        </div>
        <OnlineCount>
          <Users />
          <strong>{actualOnlineCount}</strong> boosters online now
        </OnlineCount>
      </Header>

      <Grid>
        {displayBoosters.map((booster) => (
          <BoosterCard key={booster.id}>
            <Avatar>
              <img src={booster.avatar} alt={booster.name} />
              {booster.online && <OnlineDot />}
            </Avatar>

            <BoosterName>
              {booster.name}
              <CountryFlag>{booster.countryFlag}</CountryFlag>
            </BoosterName>

            <StatsList>
              <div className="stat">
                🏆{" "}
                <span className="highlight">
                  {booster.mmr.toLocaleString()}
                </span>{" "}
                MMR
              </div>
              <div className="stat">
                📦{" "}
                <span className="highlight">
                  {booster.completedOrders.toLocaleString()}
                </span>{" "}
                orders
              </div>
            </StatsList>

            <Rating>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={i < Math.floor(booster.rating) ? "" : "empty"}
                />
              ))}
              <span>{booster.rating.toFixed(1)}</span>
            </Rating>

            {booster.roles && booster.roles.length > 0 && (
              <RolesRow>
                {booster.roles.map((role, i) => (
                  <RoleTag key={i}>{role}</RoleTag>
                ))}
              </RolesRow>
            )}
          </BoosterCard>
        ))}
      </Grid>
    </Container>
  );
};
