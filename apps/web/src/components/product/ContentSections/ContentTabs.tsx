// src/components/product/ContentSections/ContentTabs.tsx
"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { ProductPageData } from "../types";
import { DescriptionSection } from "./DescriptionSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { RequirementsSection } from "./RequirementsSection";
import { FAQSection } from "./FAQSection";
import { ReviewsSection } from "./ReviewsSection";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  margin-top: var(--space-8);
`;

const TabsNav = styled.div`
  display: flex;
  gap: var(--space-1);
  border-bottom: 1px solid var(--border-subtle);
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-heading);
  font-size: 0.9375rem;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  color: ${({ $isActive }) =>
    $isActive ? "var(--fg-primary)" : "var(--fg-muted)"};
  border-bottom: 2px solid
    ${({ $isActive }) => ($isActive ? "var(--action-primary)" : "transparent")};
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: var(--fg-primary);
  }

  .count {
    font-size: 0.8125rem;
    font-weight: 400;
    color: var(--fg-muted);
    margin-left: var(--space-1);
  }
`;

const TabContent = styled.div`
  padding: var(--space-6) 0;
`;

// --- COMPONENT ---

interface Props {
  content: ProductPageData["content"];
  reviews: ProductPageData["reviews"];
  gameSlug: string;
}

type TabId =
  | "description"
  | "how-it-works"
  | "requirements"
  | "faq"
  | "reviews";

export const ContentTabs = ({ content, reviews, gameSlug }: Props) => {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const tabs: Array<{ id: TabId; label: string; count?: number }> = [
    { id: "description", label: "Description" },
    { id: "how-it-works", label: "How It Works" },
    { id: "requirements", label: "Requirements" },
    { id: "faq", label: "FAQ", count: content.faq.length },
    { id: "reviews", label: "Reviews", count: reviews.summary.total },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <DescriptionSection
            content={content.description}
            features={content.features}
          />
        );
      case "how-it-works":
        return <HowItWorksSection steps={content.howItWorks} />;
      case "requirements":
        return <RequirementsSection requirements={content.requirements} />;
      case "faq":
        return <FAQSection items={content.faq} />;
      case "reviews":
        return <ReviewsSection reviews={reviews} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <TabsNav role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            $isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="count">({tab.count.toLocaleString()})</span>
            )}
          </TabButton>
        ))}
      </TabsNav>

      <TabContent role="tabpanel">{renderContent()}</TabContent>
    </Container>
  );
};
