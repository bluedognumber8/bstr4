// src/components/engine/ComingSoonView.tsx
"use client";

import { styled } from "next-yak";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import { CatalogueGame } from "@/data/catalogue";

// --- STYLES ---

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--bg-canvas);
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.div`
  position: relative;
  height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-size: cover;
  background-position: center;
  padding: var(--space-8);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg-canvas) 0%, transparent 100%);
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  text-align: center;
  margin-top: -60px;
  position: relative;
  z-index: 1;
`;

const GameIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: var(--radius-lg);
  background-color: var(--bg-surface);
  border: 4px solid var(--bg-canvas);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--space-6);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: var(--space-3);
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--fg-secondary);
  max-width: 480px;
  margin-bottom: var(--space-8);
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  background-color: var(--action-primary);
  color: var(--fg-inverse);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9375rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--action-primary-hover);
    transform: translateY(-1px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  background-color: var(--bg-surface);
  color: var(--fg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--bg-surface-hover);
    border-color: var(--border-strong);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-warning);
  color: #000;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-6);
`;

// --- COMPONENT ---

interface Props {
  game: CatalogueGame;
}

export const ComingSoonView = ({ game }: Props) => {
  const handleNotify = () => {
    // TODO: Implement notification signup
    alert(`We'll notify you when ${game.name} services are available!`);
  };

  return (
    <Wrapper>
      <HeroSection style={{ backgroundImage: `url(${game.coverImage})` }}>
        <HeroOverlay />
      </HeroSection>

      <ContentSection>
        <GameIcon>
          <img src={game.icon} alt={game.name} />
        </GameIcon>

        <StatusBadge>Coming Soon</StatusBadge>

        <Title>{game.name}</Title>

        <Subtitle>
          We're working hard to bring you professional {game.name} boosting
          services. Be the first to know when we launch!
        </Subtitle>

        <ButtonGroup>
          <PrimaryButton onClick={handleNotify}>
            <Bell />
            Notify Me
          </PrimaryButton>

          <SecondaryButton href="/games">
            <ArrowLeft />
            Browse Other Games
          </SecondaryButton>
        </ButtonGroup>
      </ContentSection>
    </Wrapper>
  );
};
