"use client";

import { styled, keyframes } from "next-yak";
import Link from "next/link";
import { MEGA_MENU_DATA } from "./menu-data";
import { FaChevronDown } from "react-icons/fa";
import { queries, zIndex } from "@/config/theme";
import { useState, useRef } from "react";

// --- COMPONENT ---
export const DesktopMegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150); // Small delay prevents flickering
  };

  return (
    <MenuContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MenuTrigger $isOpen={isOpen} aria-expanded={isOpen}>
        All Games
        <FaChevronDown />
      </MenuTrigger>

      {isOpen && (
        <MegaDropdown>
          <GridContainer>
            {MEGA_MENU_DATA.map((cat) => (
              <CategoryColumn key={cat.title}>
                <CategoryTitle>
                  <cat.icon size={16} />
                  {cat.title}
                </CategoryTitle>
                {cat.items.map((game) => (
                  <GameLinkItem key={game.href} href={game.href}>
                    {game.label}
                    {game.isHot && <Badge $variant="hot">HOT</Badge>}
                    {game.isNew && <Badge $variant="new">NEW</Badge>}
                  </GameLinkItem>
                ))}
              </CategoryColumn>
            ))}
          </GridContainer>
        </MegaDropdown>
      )}
    </MenuContainer>
  );
};

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- STYLES ---
const MenuContainer = styled.div`
  position: static; /* Important: Allows dropdown to position relative to Header */
  height: 100%;
  display: flex;
  align-items: center;
`;

const MenuTrigger = styled.button<{ $isOpen: boolean }>`
  background: transparent;
  border: none;
  font-family: var(--font-body);
  font-weight: 500;
  color: ${(props) =>
    props.$isOpen ? "var(--fg-primary)" : "var(--fg-secondary)"};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) 0;
  height: 100%;

  &:hover {
    color: var(--fg-primary);
  }

  svg {
    transition: transform 0.2s;
    transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
    font-size: 0.75rem;
  }
`;

const MegaDropdown = styled.div`
  position: absolute;
  top: 72px; /* Matches Header Height */
  left: 0;
  width: 100%;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  z-index: ${zIndex.modal}; /* High z-index */
  animation: ${fadeIn} 0.2s ease-out;
  padding: var(--space-8) 0;
`;

const GridContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-8);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
`;

const CategoryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--fg-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-subtle);

  svg {
    color: var(--action-primary);
  }
`;

const GameLinkItem = styled(Link)`
  font-size: 0.95rem;
  color: var(--fg-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.2s, transform 0.2s;

  &:hover {
    color: var(--action-primary);
    transform: translateX(4px);
  }
`;

const Badge = styled.span<{ $variant: "hot" | "new" }>`
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  background-color: ${(props) =>
    props.$variant === "hot" ? "var(--color-danger)" : "var(--color-info)"};
  color: white;
`;
