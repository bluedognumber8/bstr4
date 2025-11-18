"use client";

import * as React from "react";
import { useSettingsStore } from "@/store/store";
import { styled } from "next-yak";
import { useTheme } from "next-themes";
import { createNavigation } from "next-intl/navigation";

// For locale switching using next-intl navigation
const { Link } = createNavigation({
  /* your routing config */
});

// --- Styled Components ---
const SwitcherContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Select = styled.select`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: white;
`;

// --- Component ---
function Switcher() {
  const { region, currency, setRegion, setCurrency } = useSettingsStore();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid hydration mismatch

  return (
    <SwitcherContainer>
      {/* Region */}
      <Select
        value={region}
        onChange={(e) => setRegion(e.target.value as "US" | "EU")}
      >
        <option value="US">USA</option>
        <option value="EU">Europe</option>
      </Select>

      {/* Currency */}
      <Select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as "USD" | "EUR")}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </Select>

      {/* Theme */}
      <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </Select>

      {/* Locale */}
      <Link href="/" locale="en">
        <Button>EN</Button>
      </Link>
      <Link href="/" locale="fr">
        <Button>FR</Button>
      </Link>
    </SwitcherContainer>
  );
}

export default Switcher;
