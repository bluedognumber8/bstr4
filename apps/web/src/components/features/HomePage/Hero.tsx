"use client";

import { styled } from "next-yak";
import { useTranslations } from "next-intl";
import { useState } from "react"; // 1. Import useState
import { Search } from "lucide-react";
import { queries } from "@/config/theme";
import { toast } from "sonner"; // Import toast

const Section = styled.section`
  position: relative;
  padding: var(--space-16) var(--space-4) var(--space-12);
  text-align: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* Adaptive glow: subtle in light mode, white-ish in dark mode */
    background: radial-gradient(
      circle at center,
      var(--bg-surface-hover) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  ${queries.md} {
    padding: var(--space-16) var(--space-8) var(--space-12);
  }
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 2.5rem;
  line-height: 1.1;
  color: var(--fg-primary);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;

  ${queries.md} {
    font-size: 4rem;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, var(--color-info), var(--color-success));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--fg-secondary);
  margin-bottom: var(--space-8);
  max-width: 600px;
  margin-inline: auto;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

// --- SEARCH AREA ---

const SearchWrapper = styled.div`
  position: relative;
  max-width: 560px;
  margin: 0 auto var(--space-6); /* Reduced margin to sit closer to tags */
  z-index: 2;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 var(--space-12);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
  background: var(--bg-canvas);
  color: var(--fg-primary);
  font-size: 1rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--action-primary);
    box-shadow: 0 0 0 4px var(--bg-surface-hover);
  }

  &::placeholder {
    color: var(--fg-muted);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--fg-muted);
  pointer-events: none;
`;

// --- POPULAR TAGS (Muted Style) ---

const PopularWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: var(--space-10);
  position: relative;
  z-index: 2;
`;

const PopularLabel = styled.span`
  font-size: 0.875rem;
  color: var(--fg-muted);
  font-weight: 500;
`;

const Tag = styled.button`
  /* Muted "Pill" Style */
  appearance: none;
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--fg-secondary);
  border-radius: var(--radius-full);
  padding: 6px 16px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Hover Logic: Subtle fill, darker text */
  &:hover {
    background: var(--bg-surface-hover);
    border-color: var(--border-strong);
    color: var(--fg-primary);
    transform: translateY(-1px);
  }

  /* Active/Click effect */
  &:active {
    transform: translateY(0);
    background: var(--bg-surface);
  }
`;

const CtaButton = styled.button`
  background-color: var(--action-primary);
  color: var(--bg-canvas);
  font-size: 1.125rem;
  font-weight: 600;
  padding: var(--space-4) var(--space-10);
  border-radius: var(--radius-lg);
  border: none;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

export const Hero = () => {
  const t = useTranslations("home.hero");
  const tags = t.raw("tags") as string[];

  // 1. State for functionality
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    // 1. UX Feedback (Toast)
    toast.info(`Searching for "${query}"...`);

    // 2. ANALYTICS: Collect data here!
    // TODO: Send this string to Strapi endpoint /api/search-analytics
    console.log("User is interested in:", query);

    // 3. Navigate
    // router.push(`/search?q=${encodeURIComponent(query)}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <Section>
      <Title>
        {t("title")} <Highlight>{t("titleHighlight")}</Highlight>
      </Title>
      <Subtitle>{t("description")}</Subtitle>

      <SearchWrapper>
        <IconWrapper>
          <Search size={20} />
        </IconWrapper>
        <SearchInput
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // <-- Add Listener
          aria-label="Search products"
        />
      </SearchWrapper>

      {/* 3. Muted Tags Logic */}
      <PopularWrapper>
        <PopularLabel>Popular:</PopularLabel>
        {tags.map((tag) => (
          <Tag
            key={tag}
            onClick={() => {
              setSearchQuery(tag);
              handleSearch(tag); // Trigger search immediately on click
            }}
          >
            {tag}
          </Tag>
        ))}
      </PopularWrapper>

      <CtaButton onClick={() => handleSearch(searchQuery)}>
        {t("cta")}
      </CtaButton>
    </Section>
  );
};
