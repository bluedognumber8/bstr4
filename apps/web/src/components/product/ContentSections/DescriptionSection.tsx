// src/components/product/ContentSections/DescriptionSection.tsx
"use client";

import { styled } from "next-yak";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Feature } from "../types";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div``;

const RichContent = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--fg-secondary);

  p {
    margin-bottom: var(--space-4);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: 1.125rem;
    font-weight: 700;
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

  strong {
    color: var(--fg-primary);
    font-weight: 600;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin-top: var(--space-8);

  ${queries.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${queries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-canvas);
  border-radius: var(--radius-md);
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
    color: var(--action-primary);
  }
`;

const FeatureContent = styled.div`
  h4 {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 700;
    color: var(--fg-primary);
    margin-bottom: var(--space-1);
  }

  p {
    font-size: 0.875rem;
    color: var(--fg-muted);
    line-height: 1.5;
    margin: 0;
  }
`;

// --- HELPERS ---

const Icon = ({ name }: { name: string }) => {
  const LucideIcon =
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.CheckCircle;
  return <LucideIcon />;
};

// --- COMPONENT ---

interface Props {
  content: string;
  features: Feature[];
}

export const DescriptionSection = ({ content, features }: Props) => {
  return (
    <Container>
      <RichContent dangerouslySetInnerHTML={{ __html: content }} />

      {features.length > 0 && (
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>
                <Icon name={feature.icon} />
              </FeatureIcon>
              <FeatureContent>
                <h4>{feature.title}</h4>
                {feature.description && <p>{feature.description}</p>}
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      )}
    </Container>
  );
};
