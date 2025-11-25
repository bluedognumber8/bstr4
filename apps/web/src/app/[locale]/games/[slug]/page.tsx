"use client";

import { useState, use } from "react";
import { styled } from "next-yak";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { getGame, getGameBlueprint, CatalogueGame } from "@/data/catalogue";
import { GamePageConfig } from "@/components/engine/types";
import {
  HeroZone,
  PulseBar,
  SectionRenderer,
} from "@/components/engine/EngineComponents";

// --- STYLED COMPONENTS ---

const PageContainer = styled.div`
  background-color: var(--bg-canvas);
  min-height: 100vh;
  padding-bottom: var(--space-16);
`;

const StickyNav = styled.div`
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: var(--bg-canvas);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-5);
  display: flex;
  gap: var(--space-8);
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-5) 0;
  border-bottom: 2px solid
    ${(props) => (props.$isActive ? "var(--fg-primary)" : "transparent")};
  color: ${(props) =>
    props.$isActive ? "var(--fg-primary)" : "var(--fg-muted)"};
  font-weight: ${(props) => (props.$isActive ? "700" : "500")};
  font-family: var(--font-heading);
  font-size: 0.875rem;
  transition: all 0.2s;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: var(--fg-primary);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-10) var(--space-5);
`;

const ComingSoonContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-10);
`;

const ComingSoonTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: var(--space-4);
`;

const ComingSoonText = styled.p`
  font-size: 1.1rem;
  color: var(--fg-secondary);
`;

// --- HELPER FOR ICONS ---
const Icon = ({ name }: { name: string }) => {
  const LucideIcon = (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <LucideIcon />;
};

// --- BLUEPRINT VIEW COMPONENT (extracted to avoid conditional hooks) ---
function BlueprintView({ blueprint }: { blueprint: GamePageConfig }) {
  const [activeTabId, setActiveTabId] = useState(blueprint.tabs[0].id);
  const activeTab =
    blueprint.tabs.find((t) => t.id === activeTabId) || blueprint.tabs[0];

  return (
    <PageContainer>
      <HeroZone config={blueprint} />
      <PulseBar items={blueprint.pulse} />

      <StickyNav>
        <NavContainer>
          {blueprint.tabs.map((tab) => (
            <TabButton
              key={tab.id}
              $isActive={tab.id === activeTabId}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.icon && <Icon name={tab.icon} />}
              {tab.label}
            </TabButton>
          ))}
        </NavContainer>
      </StickyNav>

      <MainContent>
        {activeTab.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </MainContent>
    </PageContainer>
  );
}

// --- COMING SOON VIEW ---
function ComingSoonView({ game }: { game: CatalogueGame }) {
  return (
    <PageContainer>
      <ComingSoonContainer>
        <ComingSoonTitle>{game.name}</ComingSoonTitle>
        <ComingSoonText>
          Services for this game are coming soon. Check back later!
        </ComingSoonText>
      </ComingSoonContainer>
    </PageContainer>
  );
}

// --- PAGE COMPONENT ---

type Props = {
  params: Promise<{ slug: string }>;
};

export default function GamePage({ params }: Props) {
  const { slug } = use(params);

  const game = getGame(slug);
  const blueprint = getGameBlueprint(slug);

  if (!game) {
    return notFound();
  }

  // If no blueprint, show coming soon page
  if (!blueprint) {
    return <ComingSoonView game={game} />;
  }

  return <BlueprintView blueprint={blueprint} />;
}
