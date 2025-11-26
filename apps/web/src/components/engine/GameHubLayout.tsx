// src/components/engine/GameHubLayout.tsx
"use client";

import { styled } from "next-yak";
import { GamePageBlueprint } from "./types";
import { TrustBar } from "./TrustBar";
import { HeroZone } from "./HeroZone";
import { CategoryTabs } from "./CategoryTabs";
import { SectionRenderer } from "./SectionRenderer";
import { FAQAccordion } from "./FAQAccordion";
import { SEOContent } from "./SEOContent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

// --- STYLES ---

const PageContainer = styled.div`
  background-color: var(--bg-canvas);
  min-height: 100vh;
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-5) var(--space-16);
`;

const BreadcrumbWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-5) 0;
`;

// --- COMPONENT ---

interface Props {
  blueprint: GamePageBlueprint;
}

export const GameHubLayout = ({ blueprint }: Props) => {
  const { gameSlug, gameName, trustBar, hero, tabs: blueprintTabs, sections: blueprintSections, seo } = blueprint;

  // Flatten sections from blueprint tabs if sections is not provided separately
  const sections = blueprintSections || blueprintTabs.flatMap(tab => (tab as any).sections || []);

  // Transform blueprint tabs to CategoryTabs format
  const tabs = blueprintTabs.map(tab => ({
    id: tab.id,
    label: tab.label,
    icon: tab.icon,
    anchor: (tab as any).sections?.[0]?.id || tab.id,
  }));

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Games", href: "/games" },
    { label: gameName },
  ];

  return (
    <PageContainer>
      {/* Zone 0: Trust Bar */}
      <TrustBar config={trustBar} />

      {/* Zone 1: Hero */}
      <HeroZone config={hero} />

      {/* Zone 2: Sticky Category Tabs */}
      <CategoryTabs tabs={tabs} />

      {/* Breadcrumbs */}
      <BreadcrumbWrapper>
        <Breadcrumbs items={breadcrumbItems} />
      </BreadcrumbWrapper>

      {/* Zone 3: Content Sections */}
      <MainContent>
        {sections.map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            gameSlug={gameSlug}
          />
        ))}

        {/* Zone 4: SEO Content & FAQ */}
        {seo.content && (
          <SEOContent
            title={`About ${gameName} Services`}
            content={seo.content}
          />
        )}

        {seo.faq && seo.faq.length > 0 && <FAQAccordion items={seo.faq} />}
      </MainContent>
    </PageContainer>
  );
};
