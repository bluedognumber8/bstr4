// src/components/engine/CategoryTabs.tsx
"use client";

import { styled } from "next-yak";
import { useEffect, useRef, useState, useCallback } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CategoryTab } from "./types";
import { layout } from "@/config/theme";

// --- STYLES ---

const StickyWrapper = styled.nav`
  position: sticky;
  top: ${layout.headerHeight}; /* Account for main site header */
  z-index: 30;
  background-color: var(--bg-canvas);
  border-bottom: 1px solid var(--border-subtle);

  /* Ensure sticky works */
  width: 100%;

  /* Add shadow when stuck */
  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 0;
    right: 0;
    height: 12px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), transparent);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-5);
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;

  /* Hide scrollbar */
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
  padding: var(--space-4) var(--space-4);
  border-bottom: 2px solid
    ${({ $isActive }) => ($isActive ? "var(--action-primary)" : "transparent")};
  color: ${({ $isActive }) =>
    $isActive ? "var(--fg-primary)" : "var(--fg-muted)"};
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  font-family: var(--font-heading);
  font-size: 0.875rem;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: var(--fg-primary);
    background-color: var(--bg-surface-hover);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  .count {
    font-size: 0.75rem;
    color: var(--fg-muted);
    font-weight: 400;
  }
`;

// --- HELPERS ---

const Icon = ({ name }: { name: string }) => {
  const LucideIcon =
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <LucideIcon />;
};

// --- COMPONENT ---

interface Props {
  tabs: CategoryTab[];
  defaultActive?: string;
}

export const CategoryTabs = ({ tabs, defaultActive }: Props) => {
  const [activeTab, setActiveTab] = useState(
    defaultActive || tabs[0]?.anchor || ""
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll to section when tab clicked
  const handleTabClick = useCallback((anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      // Account for sticky header height + tabs height
      const headerOffset = 72 + 56; // header + tabs
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without triggering scroll
      window.history.pushState(null, "", `#${anchor}`);
    }
    setActiveTab(anchor);
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const currentIndex = tabs.findIndex((tab) => tab.anchor === activeTab);
        if (currentIndex === -1) return;

        let newIndex;
        if (event.key === "ArrowLeft") {
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        } else {
          newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }

        const newTab = tabs[newIndex];
        if (newTab) {
          handleTabClick(newTab.anchor);
        }
      }
    },
    [activeTab, tabs, handleTabClick]
  );

  // Auto-center active tab in container
  useEffect(() => {
    if (!containerRef.current) return;

    const activeButton = containerRef.current.querySelector(
      `[data-anchor="${activeTab}"]`
    );
    if (
      activeButton &&
      !containerRef.current.contains(document.activeElement)
    ) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  // Intersection Observer to update active tab on scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Calculate offset for observer (header + tabs height)
    const topOffset = 72 + 56 + 20; // header + tabs + buffer

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${topOffset}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    // Observe all section elements
    tabs.forEach((tab) => {
      const element = document.getElementById(tab.anchor);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [tabs]);

  // Handle initial hash in URL
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tabs.some((t) => t.anchor === hash)) {
      setActiveTab(hash);
      setTimeout(() => {
        handleTabClick(hash);
      }, 100);
    }
  }, [tabs, handleTabClick]);

  if (tabs.length === 0) return null;

  return (
    <StickyWrapper role="tablist" aria-label="Category navigation">
      <Container ref={containerRef} onKeyDown={handleKeyDown} tabIndex={0}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.anchor}
            $isActive={activeTab === tab.anchor}
            onClick={() => handleTabClick(tab.anchor)}
            data-anchor={tab.anchor}
          >
            {tab.icon && <Icon name={tab.icon} />}
            {tab.label}
            {tab.productCount !== undefined && (
              <span className="count">({tab.productCount})</span>
            )}
          </TabButton>
        ))}
      </Container>
    </StickyWrapper>
  );
};
