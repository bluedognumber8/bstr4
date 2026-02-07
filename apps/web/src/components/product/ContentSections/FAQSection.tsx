// src/components/product/ContentSections/FAQSection.tsx
"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "../types";

// --- STYLES ---

const Container = styled.div`
  max-width: 800px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const Item = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const Trigger = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  text-align: left;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  color: var(--fg-primary);
  transition: background-color 0.2s;

  &:hover {
    background: var(--bg-surface-hover);
  }

  svg {
    width: 20px;
    height: 20px;
    color: var(--fg-muted);
    flex-shrink: 0;
    margin-left: var(--space-4);
    transition: transform 0.2s;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  }
`;

const Content = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const ContentInner = styled.div`
  padding: 0 var(--space-5) var(--space-5);
  font-size: 0.9375rem;
  color: var(--fg-secondary);
  line-height: 1.7;

  p {
    margin-bottom: var(--space-3);

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin: var(--space-3) 0;
    padding-left: var(--space-5);
  }

  li {
    margin-bottom: var(--space-2);
  }
`;

// --- COMPONENT ---

interface Props {
  items: FAQItem[];
}

export const FAQSection = ({ items }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <List>
        {items.map((item, index) => (
          <Item key={index}>
            <Trigger
              $isOpen={openIndex === index}
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <ChevronDown />
            </Trigger>
            <Content $isOpen={openIndex === index}>
              <ContentInner dangerouslySetInnerHTML={{ __html: item.answer }} />
            </Content>
          </Item>
        ))}
      </List>
    </Container>
  );
};
