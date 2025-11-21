"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { styled, keyframes } from "next-yak";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

// --- ANIMATIONS ---
// Radix calculates the height automatically and stores it in a CSS variable.
const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

// --- STYLED COMPONENTS ---

const Root = styled(AccordionPrimitive.Root)`
  border-radius: var(--radius-lg);
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
`;

const Item = styled(AccordionPrimitive.Item)`
  border-bottom: 1px solid var(--border-subtle);

  &:last-child {
    border-bottom: none;
  }
`;

const Header = styled(AccordionPrimitive.Header)`
  all: unset;
  display: flex;
`;

const Trigger = styled(AccordionPrimitive.Trigger)`
  all: unset;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--fg-primary);
  background-color: transparent;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: var(--bg-surface-hover);
  }

  /* When open, slightly highlight and rotate icon */
  &[data-state="open"] {
    background-color: var(--bg-surface-hover);
    color: var(--action-primary);
  }

  svg {
    transition: transform 0.3s cubic-bezier(0.87, 0, 0.13, 1);
    color: var(--fg-muted);
  }

  &[data-state="open"] svg {
    transform: rotate(180deg);
    color: var(--action-primary);
  }
`;

const Content = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  background-color: var(--bg-canvas);
  color: var(--fg-secondary);
  font-size: 0.95rem;
  line-height: 1.6;

  /* Animation triggers based on data-state */
  &[data-state="open"] {
    animation: ${slideDown} 0.3s cubic-bezier(0.87, 0, 0.13, 1);
  }
  &[data-state="closed"] {
    animation: ${slideUp} 0.3s cubic-bezier(0.87, 0, 0.13, 1);
  }
`;

const ContentText = styled.div`
  padding: 16px 20px;
`;

// --- EXPORTS ---

export const Accordion = Root;
export const AccordionItem = Item;

export const AccordionTrigger = ({ children, ...props }: any) => (
  <Header>
    <Trigger {...props}>
      {children}
      <ChevronDown size={16} aria-hidden />
    </Trigger>
  </Header>
);

export const AccordionContent = ({ children, ...props }: any) => (
  <Content {...props}>
    <ContentText>{children}</ContentText>
  </Content>
);
