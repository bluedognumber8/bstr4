"use client";

import { styled, keyframes } from "next-yak";

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--action-primary);
  color: var(--bg-inverse);
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  z-index: 10;
  pointer-events: none;
  animation: ${pulse} 2s infinite;
`;

export const FeatureBadge = ({ text = "NEW" }: { text?: string }) => {
  return <Badge>{text}</Badge>;
};
