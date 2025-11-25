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
        href: "/games/world-of-warcraft",
        isHot: true,
      },
      { label: "Dota 2", href: "/games/dota-2", isHot: true },
      { label: "Valorant", href: "/games/valorant" },
      { label: "League of Legends", href: "/games/league-of-legends" },
    ],
  },
  {
    title: "MMORPG",
    icon: Crown,
    items: [
      { label: "WoW Classic", href: "/games/wow-classic" },
      { label: "Lost Ark", href: "/games/lost-ark" },
      {
        label: "Throne & Liberty",
        href: "/games/throne-liberty",
        isNew: true,
      },
      { label: "Final Fantasy XIV", href: "/games/ffxiv" },
    ],
  },
  {
    title: "Shooters",
    icon: Crosshair,
    items: [
      { label: "Call of Duty: MW3", href: "/games/cod-mw3" },
      { label: "Overwatch 2", href: "/games/overwatch-2" },
      { label: "Escape from Tarkov", href: "/games/tarkov" },
      { label: "Apex Legends", href: "/games/apex" },
    ],
  },
  {
    title: "Action & Strategy",
    icon: Sword,
    items: [
      { label: "Diablo 4", href: "/games/diablo-4" },
      { label: "Path of Exile", href: "/games/poe" },
      { label: "FC 24", href: "/games/fc-24" },
      { label: "Teamfight Tactics", href: "/games/tft" },
    ],
  },
];
