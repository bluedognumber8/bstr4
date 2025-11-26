// src/components/engine/CategoryTabs.tsx
"use client";

import { styled } from "next-yak";
import { useEffect, useRef, useState, useCallback } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CategoryTab } from "./types";

// --- STYLES ---

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: var(--bg-canvas);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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
      // Account for sticky header height
      const headerOffset = 80;
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
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const currentIndex = tabs.findIndex(tab => tab.anchor === activeTab);
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
  }, [activeTab, tabs, handleTabClick]);

  // Auto-center active tab in container (only when not focused for keyboard nav)
  useEffect(() => {
    if (!containerRef.current) return;

    const activeButton = containerRef.current.querySelector(
      `[data-anchor="${activeTab}"]`
    );
    if (activeButton && !containerRef.current.contains(document.activeElement)) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  // Intersection Observer to update active tab on scroll
  useEffect(() => {
    // Disconnect existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -70% 0px",
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
      // Slight delay to ensure DOM is ready
      setTimeout(() => {
        handleTabClick(hash);
      }, 100);
    }
  }, [tabs, handleTabClick]);

  return (
    <StickyWrapper>
      <Container ref={containerRef} onKeyDown={handleKeyDown} tabIndex={0}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
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
