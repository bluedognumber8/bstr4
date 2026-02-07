// src/components/product/TrustElements/SecurityExplainer.tsx
"use client";

import { styled } from "next-yak";
import {
  Shield,
  Wifi,
  EyeOff,
  MessageSquareOff,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  padding: var(--space-6);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-8);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);

  svg {
    width: 28px;
    height: 28px;
    color: var(--color-success);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--fg-primary);
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);

  ${queries.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${queries.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.div`
  padding: var(--space-4);
  background: var(--bg-canvas);
  border-radius: var(--radius-md);
  text-align: center;
`;

const CardIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  margin: 0 auto var(--space-3);

  svg {
    width: 28px;
    height: 28px;
    color: var(--action-primary);
  }
`;

const CardTitle = styled.div`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--fg-primary);
  margin-bottom: var(--space-2);
`;

const CardDescription = styled.div`
  font-size: 0.8125rem;
  color: var(--fg-muted);
  line-height: 1.5;
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);

  svg {
    width: 18px;
    height: 18px;
    color: var(--color-success);
  }

  span {
    font-size: 0.9375rem;
    color: var(--fg-secondary);

    strong {
      color: var(--fg-primary);
    }
  }
`;

// --- COMPONENT ---

interface Props {
  completedOrders?: number;
}

export const SecurityExplainer = ({ completedOrders = 8432 }: Props) => {
  const features = [
    {
      icon: Wifi,
      title: "VPN Protection",
      description: "We match your regular login location",
    },
    {
      icon: EyeOff,
      title: "Offline Mode",
      description: "Appear invisible to your friends",
    },
    {
      icon: MessageSquareOff,
      title: "No Chat Policy",
      description: "Zero interaction with other players",
    },
    {
      icon: Smartphone,
      title: "2FA Ready",
      description: "Works with Steam Guard",
    },
  ];

  return (
    <Container>
      <Header>
        <Shield />
        <h3>How We Keep Your Account Safe</h3>
      </Header>

      <Grid>
        {features.map((feature, index) => (
          <Card key={index}>
            <CardIcon>
              <feature.icon />
            </CardIcon>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </Card>
        ))}
      </Grid>

      <StatsBar>
        <CheckCircle />
        <span>
          <strong>{completedOrders.toLocaleString()}</strong> orders completed
          with <strong>ZERO</strong> bans
        </span>
      </StatsBar>
    </Container>
  );
};
