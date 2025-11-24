import { LucideIcon, Sword, Crosshair, Crown, Trophy } from "lucide-react";

export interface GameLink {
  label: string;
  href: string;
  isNew?: boolean;
  isHot?: boolean;
}

export interface MenuCategory {
  title: string;
  icon: any; // Lucide Icon
  items: GameLink[];
}

export const MEGA_MENU_DATA: MenuCategory[] = [
  {
    title: "Popular",
    icon: Trophy,
    items: [
      {
        label: "World of Warcraft",
        href: "/playground/world-of-warcraft",
        isHot: true,
      },
      { label: "Dota 2", href: "/playground/dota-2", isHot: true },
      { label: "Valorant", href: "/playground/valorant" },
      { label: "League of Legends", href: "/playground/league-of-legends" },
    ],
  },
  {
    title: "MMORPG",
    icon: Crown,
    items: [
      { label: "WoW Classic", href: "/playground/wow-classic" },
      { label: "Lost Ark", href: "/playground/lost-ark" },
      {
        label: "Throne & Liberty",
        href: "/playground/throne-liberty",
        isNew: true,
      },
      { label: "Final Fantasy XIV", href: "/playground/ffxiv" },
    ],
  },
  {
    title: "Shooters",
    icon: Crosshair,
    items: [
      { label: "Call of Duty: MW3", href: "/playground/cod-mw3" },
      { label: "Overwatch 2", href: "/playground/overwatch-2" },
      { label: "Escape from Tarkov", href: "/playground/tarkov" },
      { label: "Apex Legends", href: "/playground/apex" },
    ],
  },
  {
    title: "Action & Strategy",
    icon: Sword,
    items: [
      { label: "Diablo 4", href: "/playground/diablo-4" },
      { label: "Path of Exile", href: "/playground/poe" },
      { label: "FC 24", href: "/playground/fc-24" },
      { label: "Teamfight Tactics", href: "/playground/tft" },
    ],
  },
];
