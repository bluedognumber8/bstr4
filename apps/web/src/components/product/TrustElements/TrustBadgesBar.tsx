// src/components/product/TrustElements/TrustBadgesBar.tsx
"use client";

import { styled } from "next-yak";
import { Shield, RefreshCcw, Lock, Headphones } from "lucide-react";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-8);

  ${queries.lg} {
    gap: var(--space-8);
  }
`;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-2);
  min-width: 120px;

  ${queries.md} {
    flex-direction: row;
    text-align: left;
    gap: var(--space-3);
  }
`;

const IconWrapper = styled.div`
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
    color: var(--color-success);
  }
`;

const Content = styled.div`
  .title {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--fg-primary);
    margin-bottom: 2px;
  }

  .description {
    font-size: 0.75rem;
    color: var(--fg-muted);
    line-height: 1.4;
  }
`;

// --- COMPONENT ---

interface Props {
  guarantees?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const DEFAULT_BADGES = [
  {
    icon: "Shield",
    title: "Ban Guarantee",
    description: "100% safe or money back",
  },
  {
    icon: "RefreshCcw",
    title: "Money Back",
    description: "Full refund guaranteed",
  },
  {
    icon: "Lock",
    title: "VPN Protected",
    description: "Your location is hidden",
  },
  {
    icon: "Headphones",
    title: "24/7 Support",
    description: "Get help anytime",
  },
];

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Shield,
  RefreshCcw,
  Lock,
  Headphones,
};

export const TrustBadgesBar = ({ guarantees }: Props) => {
  const badges = guarantees || DEFAULT_BADGES;

  return (
    <Container>
      {badges.map((badge, index) => {
        const IconComponent = ICON_MAP[badge.icon] || Shield;

        return (
          <Badge key={index}>
            <IconWrapper>
              <IconComponent />
            </IconWrapper>
            <Content>
              <div className="title">{badge.title}</div>
              <div className="description">{badge.description}</div>
            </Content>
          </Badge>
        );
      })}
    </Container>
  );
};
