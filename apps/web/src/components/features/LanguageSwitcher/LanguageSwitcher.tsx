"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation"; // Your custom navigation config
import { useTransition, ChangeEvent } from "react";
import { styled } from "next-yak";
import { Globe } from "lucide-react";
import { routing } from "@/i18n/routing"; // Your routing config

// Map codes to readable labels
const LABELS: Record<string, string> = {
  en: "English",
  fr: "Français",
  // Add future languages here
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: var(--space-3);
  pointer-events: none;
  display: flex;
  align-items: center;
  color: var(--fg-secondary);
  z-index: 1;
`;

const Select = styled.select<{ $isPending: boolean }>`
  appearance: none;
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  color: var(--fg-primary);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3) var(--space-2) var(--space-8); /* Extra left padding for icon */
  font-size: 0.875rem;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.2s;
  opacity: ${({ $isPending }) => ($isPending ? "0.5" : "1")};

  &:hover {
    border-color: var(--border-strong);
    background-color: var(--bg-surface-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--action-primary);
    border-color: var(--action-primary);
  }
`;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      // next-intl automatically handles the path replacement (e.g., /en/about -> /fr/about)
      router.replace(pathname as any, { locale: nextLocale });
    });
  };

  return (
    <Wrapper>
      <IconWrapper>
        <Globe size={14} />
      </IconWrapper>
      <Select
        defaultValue={locale}
        onChange={onSelectChange}
        disabled={isPending}
        $isPending={isPending}
        aria-label="Change language"
      >
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {LABELS[cur] || cur.toUpperCase()}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}
