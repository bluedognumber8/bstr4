// src/components/product/ContentSections/HowItWorksSection.tsx
"use client";

import { styled } from "next-yak";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Step } from "../types";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div``;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);

  ${queries.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${queries.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StepCard = styled.div`
  position: relative;
  text-align: center;
  padding: var(--space-6);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);

  /* Connector line for desktop */
  ${queries.lg} {
    &:not(:last-child)::after {
      content: "→";
      position: absolute;
      right: -24px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.5rem;
      color: var(--fg-muted);
      z-index: 1;
    }
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--action-primary);
  color: var(--fg-inverse);
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.125rem;
  border-radius: 50%;
  margin: 0 auto var(--space-4);
`;

const StepIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-canvas);
  border-radius: var(--radius-md);
  margin: 0 auto var(--space-4);

  svg {
    width: 32px;
    height: 32px;
    color: var(--action-primary);
  }
`;

const StepTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: var(--space-2);
`;

const StepDescription = styled.p`
  font-size: 0.9375rem;
  color: var(--fg-muted);
  line-height: 1.5;
  margin: 0;
`;

// --- HELPERS ---

const Icon = ({ name }: { name: string }) => {
  const LucideIcon =
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <LucideIcon />;
};

// --- COMPONENT ---

interface Props {
  steps: Step[];
}

export const HowItWorksSection = ({ steps }: Props) => {
  return (
    <Container>
      <StepsGrid>
        {steps.map((step) => (
          <StepCard key={step.number}>
            <StepNumber>{step.number}</StepNumber>
            {step.icon && (
              <StepIcon>
                <Icon name={step.icon} />
              </StepIcon>
            )}
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </StepCard>
        ))}
      </StepsGrid>
    </Container>
  );
};
