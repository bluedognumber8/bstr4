"use client";

import { styled, keyframes } from "next-yak";

// Updated Pulse: Uses current text color instead of hardcoded blue
// (opacity allows it to fade out correctly)
const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 var(--action-primary); opacity: 0.7; }
  70% { transform: scale(1); box-shadow: 0 0 0 6px transparent; opacity: 1; }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 transparent; opacity: 0.7; }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -8px; /* Moved slightly more right to not overlap text */

  background-color: var(--action-primary);

  /* FIX: Use canvas color (White on Light / Black on Dark) for high contrast */
  color: var(--bg-canvas);

  font-size: 9px; /* Slightly smaller for cleaner look */
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 99px; /* Perfect pill shape */
  z-index: 10;
  pointer-events: none;
  line-height: 1;
  letter-spacing: 0.05em;

  /* Animation */
  animation: ${pulse} 2s infinite;
`;

export const FeatureBadge = ({ text = "NEW" }: { text?: string }) => {
  return <Badge>{text}</Badge>;
};
