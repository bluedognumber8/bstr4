"use client";

import { styled } from "next-yak";
import { useTranslations } from "next-intl";
import { Users, Star, Truck, Headset } from "lucide-react"; // Modern icons
import { queries } from "@/config/theme";

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-4);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);

  ${queries.md} {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-8);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-6);
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--border-strong);
  }
`;

const IconBox = styled.div`
  color: var(--action-primary);
  margin-bottom: var(--space-3);
  /* Create a soft circle background behind icon */
  background: var(--bg-surface-hover);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Number = styled.div`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: var(--space-1);
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: var(--fg-secondary);
`;

export const Stats = () => {
  const t = useTranslations("home.stats");

  const data = [
    { icon: Users, val: "10M+", label: t("gamers") },
    { icon: Star, val: "4.9/5", label: t("rating") },
    { icon: Truck, val: "Free", label: t("shipping") },
    { icon: Headset, val: "24/7", label: t("support") },
  ];

  return (
    <Section>
      {data.map((item, i) => (
        <Card key={i}>
          <IconBox>
            <item.icon size={24} />
          </IconBox>
          <Number>{item.val}</Number>
          <Label>{item.label}</Label>
        </Card>
      ))}
    </Section>
  );
};
