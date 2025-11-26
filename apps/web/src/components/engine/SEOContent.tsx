// src/components/engine/SEOContent.tsx
"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

// --- STYLES ---

const Wrapper = styled.div`
  margin-top: var(--space-8);
  padding: var(--space-6);
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: var(--space-4);
`;

const ContentWrapper = styled.div<{ $isExpanded: boolean; $maxHeight: number }>`
  position: relative;
  max-height: ${({ $isExpanded, $maxHeight }) =>
    $isExpanded ? "none" : `${$maxHeight}px`};
  overflow: hidden;
  transition: max-height 0.3s ease;

  /* Fade out effect when collapsed */
  ${({ $isExpanded }) =>
    !$isExpanded &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(transparent, var(--bg-surface));
      pointer-events: none;
    }
  `}
`;

const Content = styled.div`
  font-size: 0.9375rem;
  color: var(--fg-secondary);
  line-height: 1.7;

  p {
    margin-bottom: var(--space-4);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--fg-primary);
    margin: var(--space-6) 0 var(--space-3);
  }

  ul,
  ol {
    margin: var(--space-4) 0;
    padding-left: var(--space-6);
  }

  li {
    margin-bottom: var(--space-2);
  }

  a {
    color: var(--action-primary);
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--action-primary);
  transition: gap 0.2s;

  &:hover {
    gap: var(--space-3);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

// --- COMPONENT ---

interface Props {
  title: string;
  content: string;
  initialMaxHeight?: number;
}

export const SEOContent = ({
  title,
  content,
  initialMaxHeight = 150,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if content is long enough to need expansion
  const needsExpansion = content.length > 500;

  return (
    <Wrapper>
      <Title>{title}</Title>

      <ContentWrapper
        $isExpanded={isExpanded || !needsExpansion}
        $maxHeight={initialMaxHeight}
      >
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </ContentWrapper>

      {needsExpansion && (
        <ExpandButton
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show less" : "Read more"}
          <ChevronDown />
        </ExpandButton>
      )}
    </Wrapper>
  );
};
