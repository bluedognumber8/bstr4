"use client";

import { styled } from "next-yak";
import { useState } from "react";
import { useSettingsStore } from "@/store/store";
import { useTheme } from "next-themes";
import { FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { createNavigation } from "next-intl/navigation";

const { Link } = createNavigation();

const HeaderContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%);
  border-bottom: 1px solid var(--border-default);
  font-family: var(--font-geist-sans);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 50;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const Logo = styled.div`
  font-weight: var(--font-weight-bold);
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-primary);
  transition: color 0.3s;
  &:hover {
    color: var(--action-primary);
  }
`;

const Nav = styled.nav<{ open?: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    position: static;
    transform: none;
    flex-direction: column;
    width: 100%;
    background: var(--surface-primary);
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: ${(p) => (p.open ? "flex" : "none")};
  }
`;

const NavLink = styled.a`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  cursor: pointer;
  &:hover {
    color: var(--action-primary);
  }
`;

const SettingsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 2px solid var(--border-default);
  background: var(--surface-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
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
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background: var(--action-primary);
    color: var(--text-inverse);
    border-color: var(--action-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  position: relative;
  font-size: 1.25rem;
  color: var(--text-primary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  transition: all 0.3s;
  &:hover {
    background: var(--surface-secondary);
    transform: scale(1.1);
  }

  & > span {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--action-primary);
    color: var(--text-inverse);
    font-size: 0.625rem;
    font-weight: bold;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Hamburger = styled.button`
  display: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Header() {
  const { region, setRegion, currency, setCurrency } = useSettingsStore();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>MyLogo</Logo>

        <Hamburger onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? <HiX /> : <HiMenu />}
        </Hamburger>

        <Nav open={menuOpen}>
          <NavLink>Home</NavLink>
          <NavLink>Products</NavLink>
          <NavLink>About</NavLink>

          <SettingsGroup>
            <Select
              value={region}
              onChange={(e) => setRegion(e.target.value as "US" | "EU")}
            >
              <option value="US">🇺🇸 US</option>
              <option value="EU">🇪🇺 EU</option>
            </Select>

            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "USD" | "EUR")}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </Select>

            <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="system">💻 System</option>
            </Select>

            <LocaleButton href="/" locale="en">EN</LocaleButton>
            <LocaleButton href="/" locale="fr">FR</LocaleButton>
          </SettingsGroup>
        </Nav>

        <Controls>
          <IconButton>
            <FaBell />
            <span>3</span>
          </IconButton>
          <IconButton>
            <FaShoppingCart />
            <span>2</span>
          </IconButton>
          <IconButton>
            <FaUserCircle />
          </IconButton>
        </Controls>
      </HeaderWrapper>
    </HeaderContainer>
  );
}