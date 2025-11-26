// src/components/engine/TrustBar.tsx
"use client";

import { styled } from "next-yak";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TrustBarConfig, TrustBadge } from "./types";

// --- STYLES ---

const Wrapper = styled.div`
  background-color: var(--bg-inverse);
  color: var(--fg-inverse);
  border-bottom: 1px solid var(--border-subtle);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-2) var(--space-5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);

  /* Mobile: scroll */
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StatsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-shrink: 0;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8125rem;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
    color: var(--color-success);
    flex-shrink: 0;
  }

  .value {
    font-weight: 700;
    font-family: var(--font-heading);
  }

  .label {
    color: var(--fg-muted);
  }
`;

const BadgesGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-shrink: 0;
`;

const BadgeItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--fg-inverse);
  opacity: 0.9;
  white-space: nowrap;

  svg {
    width: 12px;
    height: 12px;
  }
`;

// --- HELPERS ---

const Icon = ({ name }: { name: string }) => {
  const LucideIcon =
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <LucideIcon />;
};

const BADGE_CONFIG: Record<TrustBadge, { icon: string; label: string }> = {
  vpn_protected: { icon: "Shield", label: "VPN Protected" },
  encrypted: { icon: "Lock", label: "Encrypted" },
  ban_guarantee: { icon: "ShieldCheck", label: "Ban Guarantee" },
  money_back: { icon: "BadgeDollarSign", label: "Money Back" },
  instant_start: { icon: "Zap", label: "Instant Start" },
  live_support: { icon: "Headphones", label: "24/7 Support" },
};

// --- COMPONENT ---

interface Props {
  config: TrustBarConfig;
}

export const TrustBar = ({ config }: Props) => {
  return (
    <Wrapper>
      <Container>
        <StatsGroup>
          {config.stats.map((stat) => (
            <StatItem key={stat.id}>
              <Icon name={stat.icon} />
              <span className="value">{stat.value}</span>
              <span className="label">{stat.label}</span>
            </StatItem>
          ))}
        </StatsGroup>

        <BadgesGroup>
          {config.badges.map((badge) => {
            const badgeInfo = BADGE_CONFIG[badge];
            return (
              <BadgeItem key={badge}>
                <Icon name={badgeInfo.icon} />
                {badgeInfo.label}
              </BadgeItem>
            );
          })}
        </BadgesGroup>
      </Container>
    </Wrapper>
  );
};
