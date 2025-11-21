"use client";

import { styled, css } from "next-yak";

const StyledBadge = styled.span<{
  $variant: "default" | "primary" | "outline" | "success" | "warning";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 99px;
  white-space: nowrap;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1;

  /* DEFAULT */
  ${({ $variant }) =>
    $variant === "default" &&
    css`
      background-color: var(--bg-surface-hover);
      color: var(--fg-primary);
      border: 1px solid var(--border-subtle);
    `}

  /* PRIMARY */
  ${({ $variant }) =>
    $variant === "primary" &&
    css`
      background-color: var(--action-primary);
      color: var(--bg-canvas);
      border: 1px solid transparent;
    `}

  /* OUTLINE */
  ${({ $variant }) =>
    $variant === "outline" &&
    css`
      background-color: transparent;
      color: var(--fg-secondary);
      border: 1px solid var(--border-strong);
    `}

  /* SUCCESS */
  ${({ $variant }) =>
    $variant === "success" &&
    css`
      background-color: rgba(16, 185, 129, 0.1);
      color: var(--color-success);
      border: 1px solid rgba(16, 185, 129, 0.2);
    `}

  /* WARNING */
  ${({ $variant }) =>
    $variant === "warning" &&
    css`
      background-color: rgba(245, 158, 11, 0.1);
      color: var(--color-warning);
      border: 1px solid rgba(245, 158, 11, 0.2);
    `}
`;

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "outline" | "success" | "warning";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className,
}: BadgeProps) => {
  return (
    <StyledBadge $variant={variant} className={className}>
      {children}
    </StyledBadge>
  );
};
