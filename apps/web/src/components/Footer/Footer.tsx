"use client";

import * as React from "react";
import { styled } from "next-yak";
import { useSettingsStore } from "@/store/store";
import { useTheme } from "next-themes";
import { FaGlobe, FaDollarSign, FaMoon, FaSun } from "react-icons/fa";
import { createNavigation } from "next-intl/navigation";

const { Link } = createNavigation();

const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%);
  border-top: 1px solid var(--border-default);
  font-family: var(--font-geist-sans);
  gap: 3rem;
  flex-wrap: wrap;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
  }
`;

const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
`;

const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 2px solid var(--border-default);
  background: var(--surface-primary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: var(--action-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:focus {
    outline: none;
    border-color: var(--action-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const LocaleButton = styled(Link)`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 2px solid var(--border-default);
  background: var(--surface-primary);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: var(--action-primary);
    color: var(--text-inverse);
    border-color: var(--action-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

export default function Footer() {
  const { region, setRegion, currency, setCurrency } = useSettingsStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <FooterContainer>
      <FooterWrapper>
      <SwitchGroup>
        <FaGlobe />
        <Label>Region:</Label>
        <Select
          value={region}
          onChange={(e) => setRegion(e.target.value as "US" | "EU")}
        >
          <option value="US">USA</option>
          <option value="EU">Europe</option>
        </Select>
      </SwitchGroup>

      <SwitchGroup>
        <FaDollarSign />
        <Label>Currency:</Label>
        <Select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as "USD" | "EUR")}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </Select>
      </SwitchGroup>

      <SwitchGroup>
        {theme === "dark" ? <FaMoon /> : <FaSun />}
        <Label>Theme:</Label>
        <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </Select>
      </SwitchGroup>

      <SwitchGroup>
        <Label>Locale:</Label>
        <LocaleButton href="/" locale="en">
          EN
        </LocaleButton>
        <LocaleButton href="/" locale="fr">
          FR
        </LocaleButton>
      </SwitchGroup>
      </FooterWrapper>
    </FooterContainer>
  );
}
