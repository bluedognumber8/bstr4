"use client";

import { styled } from "next-yak";
import { useState, useEffect } from "react";
import { useSettingsStore } from "@/store/store";
import { useTheme } from "next-themes";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { createNavigation } from "next-intl/navigation";
import { queries, zIndex } from "@/config/theme";
import LanguageSwitcher from "@/components/features/LanguageSwitcher";
import { LoginButton } from "@/components/features/Auth/LoginButton";

// Setup Link for next-intl
const { Link } = createNavigation();

// --- STYLED COMPONENTS ---

const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  z-index: ${zIndex.header};
  width: 100%;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  /* Glassmorphism */
  backdrop-filter: blur(12px);
`;

const InnerContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  height: 72px;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${queries.lg} {
    padding: 0 var(--space-8);
  }
`;

const Logo = styled(Link)`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--fg-primary);
  text-decoration: none;

  &:hover {
    color: var(--action-primary-hover);
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  padding: var(--space-4);

  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  /* Mobile Logic */
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-150%)"};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: -1;

  /* Desktop Overrides */
  ${queries.lg} {
    position: static;
    transform: none;
    opacity: 1;
    border: none;
    padding: 0;
    flex-direction: row;
    align-items: center;
    gap: var(--space-8);
    height: auto;
    background-color: transparent;
    z-index: auto;
  }
`;

const NavLink = styled(Link)`
  font-family: var(--font-body);
  font-weight: 500;
  color: var(--fg-secondary);
  transition: color 0.2s;

  &:hover {
    color: var(--fg-primary);
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);

  ${queries.lg} {
    gap: var(--space-4);
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  color: var(--fg-primary);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--border-strong);
  }

  &:focus-visible {
    outline: 2px solid var(--action-primary);
    border-color: var(--action-primary);
  }
`;

const IconButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  color: var(--fg-secondary);
  padding: var(--space-2);
  cursor: pointer;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background-color: var(--bg-surface-hover);
    color: var(--fg-primary);
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--color-danger);
    color: white;
    font-size: 0.6rem;
    font-weight: 700;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  color: var(--fg-primary);
  cursor: pointer;
  font-size: 1.5rem;
  display: block;

  ${queries.lg} {
    display: none;
  }
`;

const MobileNavGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  ${queries.lg} {
    flex-direction: row;
    align-items: center;
  }
`;

// --- MAIN COMPONENT ---

export default function Header() {
  const { region, setRegion, currency, setCurrency } = useSettingsStore();
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration fix: Wait for client load
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <HeaderRoot>
      <InnerContainer>
        {/* Left: Logo */}
        <Logo href="/">MyLogo</Logo>

        {/* Middle: Navigation */}
        <Nav $isOpen={menuOpen}>
          <MobileNavGroup>
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/about">About</NavLink>
          </MobileNavGroup>

          <MobileNavGroup>
            <StyledSelect
              value={region}
              onChange={(e) => setRegion(e.target.value as "US" | "EU")}
              aria-label="Select Region"
            >
              <option value="US">🇺🇸 US</option>
              <option value="EU">🇪🇺 EU</option>
            </StyledSelect>

            <StyledSelect
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "USD" | "EUR")}
              aria-label="Select Currency"
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </StyledSelect>

            {mounted ? (
              <StyledSelect
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                aria-label="Select Theme"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </StyledSelect>
            ) : (
              <StyledSelect disabled aria-label="Loading Theme">
                <option>...</option>
              </StyledSelect>
            )}

            <LanguageSwitcher />
          </MobileNavGroup>
        </Nav>

        {/* Right: Actions */}
        <ActionsGroup>
          <IconButton aria-label="Notifications">
            <FaBell size={20} />
            <span>3</span>
          </IconButton>

          <IconButton aria-label="Cart">
            <FaShoppingCart size={20} />
            <span>2</span>
          </IconButton>

          {/* CORRECT: LoginButton is standalone. No wrappers. */}
          <LoginButton />

          <Hamburger onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <HiX /> : <HiMenu />}
          </Hamburger>
        </ActionsGroup>
      </InnerContainer>
    </HeaderRoot>
  );
}
