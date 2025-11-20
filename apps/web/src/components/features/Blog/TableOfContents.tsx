"use client";

import { styled } from "next-yak";
import { useEffect, useState } from "react";

const Nav = styled.nav`
  position: sticky;
  top: 100px; /* Below header */
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
  border-left: 2px solid var(--border-subtle);
`;

const HeadingLink = styled.a<{ $active: boolean }>`
  font-size: 0.875rem;
  color: ${({ $active }) =>
    $active ? "var(--action-primary)" : "var(--fg-muted)"};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  text-decoration: none;
  transition: color 0.2s;
  line-height: 1.4;

  &:hover {
    color: var(--fg-primary);
  }
`;

const Label = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--fg-secondary);
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

// Simple parser for MVP
export const TableOfContents = ({ content }: { content: string }) => {
  const [activeId, setActiveId] = useState("");

  // Extract headings (## Title)
  const headings =
    content.match(/^## (.*)/gm)?.map((h) => {
      const title = h.replace(/^## /, "");
      const id = title.toLowerCase().replace(/[^\w]+/g, "-");
      return { title, id };
    }) || [];

  // Active state observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <Nav>
      <Label>On this page</Label>
      {headings.map(({ title, id }) => (
        <HeadingLink
          key={id}
          href={`#${id}`}
          $active={activeId === id}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {title}
        </HeadingLink>
      ))}
    </Nav>
  );
};
