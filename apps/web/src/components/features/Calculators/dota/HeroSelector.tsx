//apps/web/src/components/features/Calculators/dota/HeroSelector.tsx
"use client";

import { styled, css } from "next-yak";
import { DOTA_HEROES } from "@/data/dota-heroes";
import { Search, X, Ban, CheckCircle, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { motion, AnimatePresence } from "framer-motion";

// --- CONSTANTS ---
const ATTR_COLORS = {
  str: "#ec3d06",
  agi: "#26e030",
  int: "#00d9ec",
  universal: "#c26ceb",
};

// --- STYLES ---

const TriggerBtn = styled.button<{ $isBan: boolean }>`
  background: var(--bg-canvas);
  border: 2px solid var(--border-subtle);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  color: var(--fg-secondary);
  font-weight: 600;
  transition: all 0.2s;
  margin-top: 8px;

  &:hover {
    border-color: ${({ $isBan }) =>
      $isBan ? "#ef4444" : "var(--action-primary)"};
    color: var(--fg-primary);
  }
`;

const SelectedRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 34px;
`;

const SelectedPortrait = styled(motion.div)<{ $color: string }>`
  position: relative;
  width: 60px;
  height: 34px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    border: 1px solid ${({ $color }) => $color};
  }
`;

const RemoveIcon = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ef4444;
  border: none;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

// --- DRAWER CONTENT ---

const SearchContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg-surface);
  padding-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  background: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  color: var(--fg-primary);

  &:focus {
    outline: none;
    border-color: var(--action-primary);
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding-bottom: 40px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AttrColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AttrHeader = styled.h4<{ $color: string }>`
  color: ${({ $color }) => $color};
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  border-bottom: 1px solid ${({ $color }) => $color};
  padding-bottom: 4px;
  margin-bottom: 8px;
`;

const HeroesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 8px;
`;

const HeroCard = styled.button<{
  $selected: boolean;
  $activeColor: string;
  $attr: "str" | "agi" | "int" | "universal";
  $dimmed: boolean;
}>`
  position: relative;
  background: #111;
  padding: 0;

  /* Dimming Logic */
  opacity: ${({ $dimmed, $selected }) => ($selected ? 1 : $dimmed ? 0.3 : 1)};
  cursor: ${({ $dimmed }) => ($dimmed ? "not-allowed" : "pointer")};
  filter: ${({ $dimmed }) => ($dimmed ? "grayscale(100%)" : "none")};

  border: ${({ $selected, $activeColor }) =>
    $selected ? `2px solid ${$activeColor}` : "1px solid #333"};

  transition: all 0.2s ease;
  overflow: hidden;
  aspect-ratio: 16/9;
  box-shadow: ${({ $selected, $activeColor }) =>
    $selected ? `0 0 10px ${$activeColor}` : "none"};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({ $selected }) => ($selected ? 1 : 0.8)};
    transition: opacity 0.2s;
  }

  /* Only enable hover if NOT dimmed */
  ${({ $dimmed }) =>
    !$dimmed &&
    css`
      &:hover {
        transform: scale(1.1);
        z-index: 2;
        border-color: white;
        img {
          opacity: 1;
        }
      }
    `}

  ${({ $attr, $dimmed }) =>
    !$dimmed &&
    $attr === "str" &&
    css`
      &:hover {
        box-shadow: 0 0 15px #ec3d06;
      }
    `}
  ${({ $attr, $dimmed }) =>
    !$dimmed &&
    $attr === "agi" &&
    css`
      &:hover {
        box-shadow: 0 0 15px #26e030;
      }
    `}
  ${({ $attr, $dimmed }) =>
    !$dimmed &&
    $attr === "int" &&
    css`
      &:hover {
        box-shadow: 0 0 15px #00d9ec;
      }
    `}
  ${({ $attr, $dimmed }) =>
    !$dimmed &&
    $attr === "universal" &&
    css`
      &:hover {
        box-shadow: 0 0 15px #c26ceb;
      }
    `}

  &::after {
    content: "";
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    display: ${({ $selected }) => ($selected ? "block" : "none")};
    background-color: ${({ $activeColor }) => $activeColor};
    border-radius: 50%;
    box-shadow: 0 0 4px black;
  }
`;

// --- COMPONENT ---

interface Props {
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  mode?: "select" | "ban";
}

export const HeroSelector = ({
  selectedIds,
  onChange,
  mode = "select",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isBan = mode === "ban";
  const limit = isBan ? 5 : 3;
  const activeColor = isBan ? "#ef4444" : "#fbbf24";
  const isMaxed = selectedIds.length >= limit;

  const toggleHero = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      if (isMaxed) return;
      onChange([...selectedIds, id]);
    }
  };

  const clearAll = () => onChange([]);

  const groupedHeroes = useMemo(() => {
    const filtered = DOTA_HEROES.filter((h) =>
      h.name.toLowerCase().includes(query.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));

    return {
      str: filtered.filter((h) => h.attr === "str"),
      agi: filtered.filter((h) => h.attr === "agi"),
      int: filtered.filter((h) => h.attr === "int" || h.attr === "universal"),
    };
  }, [query]);

  const selectedHeroes = DOTA_HEROES.filter((h) => selectedIds.includes(h.id));

  return (
    <>
      <div>
        <TriggerBtn onClick={() => setOpen(true)} $isBan={isBan}>
          {isBan ? <Ban size={16} /> : <CheckCircle size={16} />}
          {selectedIds.length > 0
            ? `${isBan ? "Banned" : "Selected"} (${
                selectedIds.length
              }/${limit})`
            : `${
                isBan ? "Ban Specific Heroes" : "Select Specific Heroes (+10%)"
              }`}
        </TriggerBtn>

        <SelectedRow>
          <AnimatePresence>
            {selectedHeroes.map((h) => (
              <SelectedPortrait
                key={h.id}
                $color={activeColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <img src={h.img} alt={h.name} />
                <RemoveIcon
                  onClick={() => toggleHero(h.id)}
                  aria-label="Remove"
                >
                  <X size={10} />
                </RemoveIcon>
              </SelectedPortrait>
            ))}
          </AnimatePresence>
        </SelectedRow>
      </div>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        title={
          isBan
            ? `Ban Heroes (${selectedIds.length}/${limit})`
            : `Select Heroes (${selectedIds.length}/${limit})`
        }
      >
        <SearchContainer>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: 12,
                  top: 14,
                  color: "var(--fg-muted)",
                }}
              />
              <SearchInput
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            {selectedIds.length > 0 && (
              <button
                onClick={clearAll}
                style={{
                  background: "var(--bg-surface-hover)",
                  border: "none",
                  borderRadius: 8,
                  padding: "0 12px",
                  cursor: "pointer",
                  color: "var(--color-danger)",
                }}
                aria-label="Clear All"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </SearchContainer>

        <HeroGrid>
          <AttrColumn>
            <AttrHeader $color={ATTR_COLORS.str}>Strength</AttrHeader>
            <HeroesList>
              {groupedHeroes.str.map((hero) => {
                const isSelected = selectedIds.includes(hero.id);
                const isDimmed = isMaxed && !isSelected;
                return (
                  <HeroCard
                    key={hero.id}
                    $selected={isSelected}
                    $dimmed={isDimmed}
                    $activeColor={activeColor}
                    $attr="str"
                    onClick={() => !isDimmed && toggleHero(hero.id)}
                    title={hero.name}
                  >
                    <img src={hero.img} alt={hero.name} loading="lazy" />
                  </HeroCard>
                );
              })}
            </HeroesList>
          </AttrColumn>

          <AttrColumn>
            <AttrHeader $color={ATTR_COLORS.agi}>Agility</AttrHeader>
            <HeroesList>
              {groupedHeroes.agi.map((hero) => {
                const isSelected = selectedIds.includes(hero.id);
                const isDimmed = isMaxed && !isSelected;
                return (
                  <HeroCard
                    key={hero.id}
                    $selected={isSelected}
                    $dimmed={isDimmed}
                    $activeColor={activeColor}
                    $attr="agi"
                    onClick={() => !isDimmed && toggleHero(hero.id)}
                    title={hero.name}
                  >
                    <img src={hero.img} alt={hero.name} loading="lazy" />
                  </HeroCard>
                );
              })}
            </HeroesList>
          </AttrColumn>

          <AttrColumn>
            <AttrHeader $color={ATTR_COLORS.int}>Intelligence</AttrHeader>
            <HeroesList>
              {groupedHeroes.int.map((hero) => {
                const isSelected = selectedIds.includes(hero.id);
                const isDimmed = isMaxed && !isSelected;
                return (
                  <HeroCard
                    key={hero.id}
                    $selected={isSelected}
                    $dimmed={isDimmed}
                    $activeColor={activeColor}
                    $attr={hero.attr === "universal" ? "universal" : "int"}
                    onClick={() => !isDimmed && toggleHero(hero.id)}
                    title={hero.name}
                  >
                    <img src={hero.img} alt={hero.name} loading="lazy" />
                  </HeroCard>
                );
              })}
            </HeroesList>
          </AttrColumn>
        </HeroGrid>
      </Drawer>
    </>
  );
};
