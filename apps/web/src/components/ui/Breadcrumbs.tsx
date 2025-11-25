"use client";

import { styled } from "next-yak";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

// --- STYLES ---

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 0.875rem; /* 14px */
  color: var(--fg-muted);
  margin-bottom: 24px;
  overflow-x: auto; /* Scroll on tiny screens */
  white-space: nowrap;
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLink = styled(Link)`
  color: var(--fg-secondary);
  text-decoration: none;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: var(--action-primary);
  }
`;

const CurrentPage = styled.span`
  color: var(--fg-primary);
  font-weight: 600;
  /* Truncate long titles on mobile */
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Separator = styled.span`
  color: var(--fg-muted);
  opacity: 0.5;
  display: flex;
`;

// --- TYPES ---

export interface BreadcrumbItem {
  label: string;
  href?: string; // Optional: If missing, it's the current page (text only)
}

interface Props {
  items: BreadcrumbItem[];
}

// --- COMPONENT ---

export const Breadcrumbs = ({ items }: Props) => {
  // 1. Generate SEO Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://your-site.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      {/* SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual UI */}
      <Nav aria-label="Breadcrumb">
        <List>
          {/* Always start with Home */}
          <Item>
            <StyledLink href="/">
              <Home size={14} /> Home
            </StyledLink>
            <Separator>
              <ChevronRight size={14} />
            </Separator>
          </Item>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <Fragment key={index}>
                <Item>
                  {isLast || !item.href ? (
                    <CurrentPage aria-current="page">{item.label}</CurrentPage>
                  ) : (
                    <StyledLink href={item.href}>{item.label}</StyledLink>
                  )}
                </Item>
                {!isLast && (
                  <Separator>
                    <ChevronRight size={14} />
                  </Separator>
                )}
              </Fragment>
            );
          })}
        </List>
      </Nav>
    </>
  );
};
