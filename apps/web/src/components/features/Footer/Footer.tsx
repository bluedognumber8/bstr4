"use client";

import { styled } from "next-yak";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { queries } from "@/config/theme";
import { Facebook, Twitter, Instagram, Github, Send } from "lucide-react";
import LanguageSwitcher from "@/components/features/LanguageSwitcher";

// --- STYLED COMPONENTS ---

const FooterRoot = styled.footer`
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-12) 0 var(--space-8);
  margin-top: auto;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);

  ${queries.lg} {
    padding: 0 var(--space-8);
  }
`;

// Grid: 1 col (mobile) -> 2 cols (tablet) -> 4 cols (desktop)
const Grid = styled.div`
  display: grid;
  gap: var(--space-10);
  grid-template-columns: 1fr;

  ${queries.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${queries.lg} {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: var(--space-12);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const BrandColumn = styled(Column)`
  max-width: 100%;
  ${queries.lg} {
    max-width: 360px;
  }
`;

const ColumnTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--fg-primary);
  margin-bottom: var(--space-2);
`;

const FooterLink = styled(Link)`
  font-family: var(--font-body);
  color: var(--fg-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
  width: fit-content;

  &:hover {
    color: var(--action-primary);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const Description = styled.p`
  color: var(--fg-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: var(--space-4);
`;

// --- NEWSLETTER & SOCIAL ---

const NewsletterForm = styled.form`
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
`;

const Input = styled.input`
  flex: 1;
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  color: var(--fg-primary);
  font-size: 0.875rem;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--fg-muted);
  }

  &:focus {
    outline: none;
    border-color: var(--action-primary);
  }
`;

const SubscribeButton = styled.button`
  background-color: var(--action-primary);
  color: var(--bg-inverse); /* Text on button */
  border: none;
  border-radius: var(--radius-md);
  padding: 0 var(--space-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-4);
`;

const SocialIcon = styled.a`
  color: var(--fg-secondary);
  transition: color 0.2s, transform 0.2s;

  &:hover {
    color: var(--fg-primary);
    transform: translateY(-2px);
  }
`;

// --- BOTTOM BAR & SWITCHES ---

const FooterBottomBar = styled.div`
  border-top: 1px solid var(--border-subtle);
  margin-top: var(--space-12);
  padding-top: var(--space-8);

  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: center;
  text-align: center;

  ${queries.md} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    gap: 0;
  }
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);

  ${queries.md} {
    gap: var(--space-4);
  }
`;

// A simple select that matches the LanguageSwitcher aesthetic
const CurrencySelect = styled.select`
  appearance: none;
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  color: var(--fg-primary);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--border-strong);
    background-color: var(--bg-surface-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--action-primary);
  }
`;

const Copyright = styled.p`
  color: var(--fg-muted);
  font-size: 0.875rem;
`;

// --- MAIN COMPONENT ---

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <FooterRoot>
      <Container>
        <Grid>
          {/* 1. Brand & Newsletter */}
          <BrandColumn>
            <ColumnTitle>Gaming Shop</ColumnTitle>
            <Description>{t("brand.description")}</Description>

            <ColumnTitle>{t("newsletter.title")}</ColumnTitle>
            <NewsletterForm onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                aria-label="Email address"
              />
              <SubscribeButton aria-label={t("newsletter.button")}>
                <Send size={16} />
              </SubscribeButton>
            </NewsletterForm>

            <SocialRow>
              <SocialIcon href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="GitHub">
                <Github size={20} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialIcon>
            </SocialRow>
          </BrandColumn>

          {/* 2. Shop Links */}
          <Column>
            <ColumnTitle>{t("columns.shop")}</ColumnTitle>
            <FooterLink href="/games">{t("links.games")}</FooterLink>
            <FooterLink href="/hardware">{t("links.hardware")}</FooterLink>
            <FooterLink href="/merch">{t("links.merch")}</FooterLink>
            <FooterLink href="/gift-cards">{t("links.gift_cards")}</FooterLink>
          </Column>

          {/* 3. Support Links */}
          <Column>
            <ColumnTitle>{t("columns.support")}</ColumnTitle>
            <FooterLink href="/help">{t("links.help_center")}</FooterLink>
            <FooterLink href="/returns">{t("links.returns")}</FooterLink>
            <FooterLink href="/shipping">{t("links.shipping")}</FooterLink>
          </Column>

          {/* 4. Legal Links */}
          <Column>
            <ColumnTitle>{t("columns.legal")}</ColumnTitle>
            <FooterLink href="/privacy">{t("links.privacy")}</FooterLink>
            <FooterLink href="/terms">{t("links.terms")}</FooterLink>
          </Column>
        </Grid>

        <FooterBottomBar>
          <Copyright>{t("copyright", { year: currentYear })}</Copyright>

          <SettingsRow>
            {/* The Reuseable Language Switcher */}
            <LanguageSwitcher />

            {/* Simple Currency Selector */}
            <CurrencySelect aria-label="Select Currency">
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="JPY">¥ JPY</option>
            </CurrencySelect>
          </SettingsRow>
        </FooterBottomBar>
      </Container>
    </FooterRoot>
  );
}
