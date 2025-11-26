import { GamePageBlueprint } from "@/components/engine/types";

export const WOW_CLASSIC_BLUEPRINT: GamePageBlueprint = {
  gameSlug: "wow-classic",
  theme: {
    primaryColor: "#c69b6d", // Classic Brown/Tan
    backgroundImage:
      "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2500&auto=format&fit=crop",
  },

  // --- HERO: LEVELING (The Core of Classic) ---
  hero: {
    title: "Return to Azeroth",
    subtitle: "Services for Season of Discovery, Hardcore, and Era Realms.",
    variant: "currency_calculator",
    backgroundImage: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2500&auto=format&fit=crop",
    currencyConfig: {
      label: "Level Boost (1-60)",
      min: 1,
      max: 60,
      unit: "Levels",
      step: 1,
      pricePerUnit: 3.5, // More expensive per level in Classic
    },
  },

  pulse: [
    { id: "p1", label: "Mode", value: "Season of Discovery P3", icon: "Map" },
    {
      id: "p2",
      label: "Hardcore",
      value: "Deaths: 142 Today",
      icon: "Skull",
      trend: "down",
    },
    { id: "p3", label: "Gold (SoD)", value: "$0.45 / 100g", icon: "Coins" },
  ],

  tabs: [
    // TAB 1: LEVELING & GRIND (Largest Category: 2,036 listings)
    {
      id: "leveling",
      label: "Leveling & Questing",
      icon: "Compass",
      sections: [
        {
          id: "boost-types",
          title: "Character Power Leveling",
          description: "Available for SoD, Hardcore, and Era.",
          type: "grid_cards",
          items: [
            {
              id: "lvl-1-80",
              title: "1-80 WotLK",
              subtitle: "24-72 Hours",
              priceStart: 30,
              image:
                "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=500",
            },
            {
              id: "lvl-sod",
              title: "1-60 SoD",
              subtitle: "Manual / Hand-done",
              priceStart: 60,
              image:
                "https://images.unsplash.com/photo-1642470015600-28323317564a?w=500",
              tags: ["SoD"],
            },
            {
              id: "lvl-hc",
              title: "Hardcore Safe Boost",
              subtitle: "No Deaths Guarantee",
              priceStart: 150,
              image:
                "https://images.unsplash.com/photo-1635321349667-c653e11c1631?w=500",
              tags: ["Premium"],
            },
            {
              id: "dungeon-spam",
              title: "Dungeon Cleave",
              subtitle: "AFK XP Farm",
              priceStart: 10,
              image:
                "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
            },
          ],
        },
        {
          id: "quests",
          title: "Attunements & Rep",
          type: "grid_cards",
          items: [
            {
              id: "attune-mc",
              title: "Molten Core Attune",
              subtitle: "Quest Chain",
              priceStart: 15,
              image:
                "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=500",
            },
            {
              id: "attune-ony",
              title: "Onyxia Chain",
              subtitle: "Full Completion",
              priceStart: 25,
              image:
                "https://images.unsplash.com/photo-1626263017299-89a42c849383?w=500",
            },
          ],
        },
      ],
    },
    // TAB 2: RAIDS (Classic Raiding)
    {
      id: "raids",
      label: "Raids & Loot",
      icon: "Shield",
      sections: [
        {
          id: "classic-raids",
          title: "GDKP & Loot Runs",
          description: "Naxxramas, Ulduar, and ICC Clears.",
          type: "grid_cards",
          items: [
            {
              id: "icc-25",
              title: "ICC 25 Heroic",
              subtitle: "Light of Dawn",
              priceStart: 50,
              image:
                "https://images.unsplash.com/photo-1535581652167-3d6b9add9b32?w=500",
              tags: ["WotLK"],
            },
            {
              id: "naxx",
              title: "Naxxramas Clear",
              subtitle: "Full T3 / T7",
              priceStart: 25,
              image:
                "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=500",
            },
            {
              id: "gdkp",
              title: "GDKP Pot Run",
              subtitle: "Bring Gold",
              priceStart: 5,
              image:
                "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?w=500",
            },
          ],
        },
        {
          id: "gear",
          title: "Specific Gear",
          type: "grid_cards",
          items: [
            {
              id: "bis-pre-raid",
              title: "Pre-Raid BiS",
              subtitle: "Full Dungeon Set",
              priceStart: 80,
              image:
                "https://images.unsplash.com/photo-1596496312467-0c098559882c?w=500",
            },
            {
              id: "legendary",
              title: "Sulfuras / Thunderfury",
              subtitle: "Mat Farming",
              priceStart: 500,
              image:
                "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?w=500",
              tags: ["Legendary"],
            },
          ],
        },
      ],
    },
    // TAB 3: PVP (The Grind)
    {
      id: "pvp",
      label: "PvP Rank",
      icon: "Swords",
      sections: [
        {
          id: "honor",
          title: "Honor System",
          type: "grid_cards",
          items: [
            {
              id: "r14",
              title: "Rank 14 (Grand Marshal)",
              subtitle: "Multi-week Grind",
              priceStart: 1000,
              image:
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
              tags: ["Hard"],
            },
            {
              id: "honor-cap",
              title: "Weekly Honor Cap",
              subtitle: "Maintain Rank",
              priceStart: 50,
              image:
                "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=500",
            },
            {
              id: "bg-wins",
              title: "WSG/AB Wins",
              subtitle: "Reputation Farm",
              priceStart: 5,
              image:
                "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=500",
            },
          ],
        },
      ],
    },
    // TAB 4: MARKETPLACE
    {
      id: "market",
      label: "Marketplace",
      icon: "ShoppingBag",
      sections: [
        {
          id: "classic-accounts",
          title: "Ready-to-Play Characters",
          type: "table_list",
          items: [
            {
              id: "acc-t3",
              title: "60 Warrior (Full T3)",
              priceStart: 800,
              image: "",
              meta: { Gear: "T3", Server: "Era", Class: "Warrior" },
            },
            {
              id: "acc-sod",
              title: "50 Mage (SoD)",
              priceStart: 120,
              image: "",
              meta: { Gear: "BiS P2", Server: "Living Flame", Gold: "500g" },
            },
            {
              id: "acc-fresh",
              title: "Fresh 80 Paladin",
              priceStart: 60,
              image: "",
              meta: { Gear: "Blue", Server: "Gehennas", Fly: "280%" },
            },
          ],
        },
        {
          id: "classic-gold",
          title: "Gold & Time",
          type: "grid_cards",
          items: [
            {
              id: "gold-era",
              title: "Era Gold (1000g)",
              subtitle: "Whitemane Cluster",
              priceStart: 20,
              image:
                "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?w=500",
            },
            {
              id: "gold-sod",
              title: "SoD Gold (100g)",
              subtitle: "All Servers",
              priceStart: 5,
              image:
                "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
            },
            {
              id: "gametime",
              title: "60 Day Card",
              subtitle: "Global",
              priceStart: 28,
              image:
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500",
            },
          ],
        },
      ],
    },
  ],
};
