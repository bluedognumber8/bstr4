// src/components/engine/FAQAccordion.tsx
"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "./types";

// --- STYLES ---

const Wrapper = styled.div`
  margin-top: var(--space-12);
  padding-top: var(--space-12);
  border-top: 1px solid var(--border-subtle);
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: var(--space-6);
`;

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const AccordionItem = styled.div`
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const AccordionTrigger = styled.button<{ $isOpen: boolean }>`
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
    background-color: var(--bg-surface-hover);
  }

  svg {
    width: 20px;
    height: 20px;
    color: var(--fg-muted);
    transition: transform 0.2s;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
    flex-shrink: 0;
    margin-left: var(--space-4);
  }
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const AccordionBody = styled.div`
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
  title?: string;
  schemaMarkup?: boolean;
}

export const FAQAccordion = ({
  items,
  title = "Frequently Asked Questions",
  schemaMarkup = true,
}: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD schema
  const jsonLd = schemaMarkup
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.replace(/<[^>]*>/g, ""), // Strip HTML for schema
          },
        })),
      }
    : null;

  return (
    <Wrapper>
      {/* JSON-LD Schema */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Title>{title}</Title>

      <AccordionList>
        {items.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionTrigger
              $isOpen={openIndex === index}
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <ChevronDown />
            </AccordionTrigger>

            <AccordionContent $isOpen={openIndex === index}>
              <AccordionBody
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionList>
    </Wrapper>
  );
};
