"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { getFAQs, FAQItem } from "@/data/mock-faqs";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.section`
  margin-top: 60px;
  margin-bottom: 40px;
`;

const Header = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid var(--border-subtle);
  &:last-child {
    border-bottom: none;
  }
`;

const QuestionBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--fg-primary);
  font-weight: 600;
  font-size: 1.05rem;
  transition: color 0.2s;

  &:hover {
    color: var(--action-primary);
  }
`;

const AnswerWrapper = styled(motion.div)`
  overflow: hidden;
  color: var(--fg-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
`;

const AnswerContent = styled.div`
  padding-bottom: 24px;
  padding-right: 24px;
`;

interface Props {
  gameSlug: string;
  categorySlug: string;
}

export const ProductFAQ = ({ gameSlug, categorySlug }: Props) => {
  // 1. Fetch Data based on props
  const items = getFAQs(gameSlug, categorySlug);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Container>
      <Header>
        <HelpCircle size={24} color="var(--action-primary)" />
        Frequently Asked Questions
      </Header>

      <div
        style={{
          background: "var(--bg-surface)",
          borderRadius: 16,
          padding: "0 24px",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {items.map((item, idx) => (
          <AccordionItem key={idx}>
            <QuestionBtn onClick={() => toggle(idx)}>
              {item.question}
              {openIndex === idx ? (
                <Minus size={18} color="var(--action-primary)" />
              ) : (
                <Plus size={18} color="var(--fg-muted)" />
              )}
            </QuestionBtn>
            <AnimatePresence>
              {openIndex === idx && (
                <AnswerWrapper
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <AnswerContent>{item.answer}</AnswerContent>
                </AnswerWrapper>
              )}
            </AnimatePresence>
          </AccordionItem>
        ))}
      </div>
    </Container>
  );
};
