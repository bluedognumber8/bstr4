"use client";

import { useState, use } from "react";
import { styled } from "next-yak";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";

// -------------------------------------------------------
// CHANGE 1: Import the REAL registry, not specific blueprints
// -------------------------------------------------------
import { getGameConfig } from "@/data/blueprints";

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

// --- HELPER FOR ICONS ---
const Icon = ({ name }: { name: string }) => {
  const LucideIcon = (Icons as any)[name] || Icons.Circle;
  return <LucideIcon />;
};

// -------------------------------------------------------
// CHANGE 2: The local mock function was DELETED here.
// We now use the imported one from line 11.
// -------------------------------------------------------

// --- PAGE COMPONENT ---

type Props = {
  params: Promise<{ slug: string }>;
};

export default function EnginePage({ params }: Props) {
  const { slug } = use(params);

  // This calls the function from @/data/blueprints/index.ts
  const config = getGameConfig(slug);

  if (!config) {
    return notFound();
  }

  const [activeTabId, setActiveTabId] = useState(config.tabs[0].id);
  const activeTab =
    config.tabs.find((t) => t.id === activeTabId) || config.tabs[0];

  return (
    <PageContainer>
      <HeroZone config={config} />
      <PulseBar items={config.pulse} />

      <StickyNav>
        <NavContainer>
          {config.tabs.map((tab) => (
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
