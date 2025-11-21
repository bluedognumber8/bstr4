"use client";

import { styled } from "next-yak";
import { Settings, MessageSquare, Eye, CheckCircle } from "lucide-react";
import { queries } from "@/config/theme";

const Section = styled.section`
  margin-top: 48px;
  margin-bottom: 48px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px;
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: 32px;
  text-align: center;
`;

const StepsGrid = styled.div`
  display: grid;
  gap: 32px;
  position: relative;

  /* Desktop: 4 Columns */
  ${queries.md} {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  /* The Connecting Line (Desktop Only) */
  &::before {
    content: "";
    position: absolute;
    top: 24px; /* Center with icons */
    left: 50px;
    right: 50px;
    height: 2px;
    background: var(--border-subtle);
    z-index: 0;
    display: none;

    ${queries.md} {
      display: block;
    }
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-surface); /* Mask the line behind it */
  border: 2px solid var(--action-primary);
  color: var(--action-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 0 0 8px var(--bg-surface); /* Extra mask for the line */
`;

const StepTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: 8px;
`;

const StepDesc = styled.p`
  font-size: 0.85rem;
  color: var(--fg-secondary);
  line-height: 1.4;
  max-width: 200px;
`;

const STEPS = [
  {
    icon: Settings,
    title: "1. Book",
    desc: "Customize your order options and checkout securely.",
  },
  {
    icon: MessageSquare,
    title: "2. Chat",
    desc: "Get instant access to a private chat with your booster.",
  },
  {
    icon: Eye,
    title: "3. Track",
    desc: "Watch your order progress in real-time on your dashboard.",
  },
  {
    icon: CheckCircle,
    title: "4. Done",
    desc: "Get notified instantly when your order is completed.",
  },
];

export const HowItWorks = () => {
  return (
    <Section>
      <Title>How It Works</Title>
      <StepsGrid>
        {STEPS.map((step, i) => (
          <Step key={i}>
            <IconCircle>
              <step.icon size={20} />
            </IconCircle>
            <StepTitle>{step.title}</StepTitle>
            <StepDesc>{step.desc}</StepDesc>
          </Step>
        ))}
      </StepsGrid>
    </Section>
  );
};
