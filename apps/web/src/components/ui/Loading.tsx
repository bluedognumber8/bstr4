// apps/web/src/components/ui/Loading.tsx
"use client";

import { styled, keyframes, css } from "next-yak";

// --- Animation ---
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// --- Styles ---
const SpinnerBase = styled.div<{
  $size?: "sm" | "md" | "lg";
  $variant?: "primary" | "white";
}>`
  display: inline-block;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  /* Dynamic Size */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          width: 16px;
          height: 16px;
          border-width: 2px;
        `;
      case "lg":
        return css`
          width: 48px;
          height: 48px;
          border-width: 4px;
        `;
      default: // md
        return css`
          width: 32px;
          height: 32px;
          border-width: 3px;
        `;
    }
  }}

  /* Dynamic Colors */
  ${(props) =>
    props.$variant === "white"
      ? css`
          border: solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
        `
      : css`
          /* Default to Primary Theme Color */
          border: solid var(--bg-element-hover, #e2e8f0);
          border-top-color: var(--primary, #000000);
        `}
`;

const CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px; /* Ensures it takes up space while loading */
  padding: 20px;
`;

// --- Components ---

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white";
  className?: string;
}

export const LoadingSpinner = ({
  size = "md",
  variant = "primary",
  className,
}: SpinnerProps) => {
  return (
    <SpinnerBase
      $size={size}
      $variant={variant}
      className={className}
      role="status"
      aria-label="Loading"
    >
      <span style={{ display: "none" }}>Loading...</span>
    </SpinnerBase>
  );
};

// A convenience wrapper for section-level loading (like your calculator)
export const LoadingContainer = () => {
  return (
    <CenterWrapper>
      <LoadingSpinner size="lg" />
    </CenterWrapper>
  );
};
