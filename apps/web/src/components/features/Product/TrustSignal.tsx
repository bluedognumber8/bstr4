"use client";

import { styled } from "next-yak";
import { Zap, ShieldCheck, Users } from "lucide-react";

const Grid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--fg-primary);

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

const IconBox = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
`;

const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  background-color: var(--color-success);
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }
`;

export const TrustSignal = () => {
  return (
    <Grid>
      <Item>
        <IconBox $color="#EAB308">
          <Zap size={18} />
        </IconBox>
        <span>Instant Start</span>
      </Item>

      <Item>
        <IconBox $color="#3B82F6">
          <ShieldCheck size={18} />
        </IconBox>
        <span>VPN Protected</span>
      </Item>

      <Item>
        <IconBox $color="#10B981">
          <Users size={18} />
        </IconBox>
        <span style={{ display: "flex", alignItems: "center" }}>
          <LiveDot /> 12 Boosters Online
        </span>
      </Item>
    </Grid>
  );
};
