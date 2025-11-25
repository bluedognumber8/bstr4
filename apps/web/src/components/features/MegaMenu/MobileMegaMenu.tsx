"use client";

import { styled } from "next-yak";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MEGA_MENU_DATA } from "./menu-data";

export const MobileMegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        Games Catalog
        {isOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
      </AccordionHeader>

      <SubMenu $isOpen={isOpen}>
        {MEGA_MENU_DATA.map((cat) => (
          <div key={cat.title}>
            <CategoryLabel>{cat.title}</CategoryLabel>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {cat.items.map((game) => (
                <MobileLink key={game.href} href={game.href}>
                  {game.label}
                </MobileLink>
              ))}
            </div>
          </div>
        ))}
        <MobileLink
          href="/games"
          style={{
            fontWeight: 700,
            marginTop: "8px",
            color: "var(--action-primary)",
          }}
        >
          View All Games &rarr;
        </MobileLink>
      </SubMenu>
    </div>
  );
};

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: var(--space-2) 0;

  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  color: var(--fg-secondary);
  cursor: pointer;
`;

const SubMenu = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  flex-direction: column;
  padding-left: var(--space-4);
  gap: var(--space-3);
  margin-top: var(--space-2);
  border-left: 2px solid var(--border-subtle);
`;

const CategoryLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--fg-muted);
  text-transform: uppercase;
  margin-top: var(--space-2);
`;

const MobileLink = styled(Link)`
  text-decoration: none;
  color: var(--fg-primary);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
