import { GamePageBlueprint } from "@/components/engine/types";

export const WOW_CLASSIC_BLUEPRINT: GamePageBlueprint = {
  gameSlug: "wow-classic",
  gameName: "World of Warcraft Classic",
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
      anchor: "leveling",
    },
    // TAB 2: RAIDS (Classic Raiding)
    {
      id: "raids",
      label: "Raids & Loot",
      icon: "Shield",
      anchor: "raids",
    },
    // TAB 3: PVP (The Grind)
    {
      id: "pvp",
      label: "PvP Rank",
      icon: "Swords",
      anchor: "pvp",
    },
    // TAB 4: MARKETPLACE
    {
      id: "market",
      label: "Marketplace",
      icon: "ShoppingBag",
      anchor: "market",
    },
  ],

  sections: [
    // LEVELING SECTION
    {
      id: "boost-types",
      anchor: "boost-types",
      title: "Character Power Leveling",
      description: "Available for SoD, Hardcore, and Era.",
      layout: "grid_cards",
      items: [
        {
          id: "lvl-1-80",
          title: "1-80 WotLK",
          subtitle: "24-72 Hours",
          price: { type: "from", value: 30 },
          image:
            "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=500",
          slug: "wow-lvl-1-80",
        },
        {
          id: "lvl-sod",
          title: "1-60 SoD",
          subtitle: "Manual / Hand-done",
          price: { type: "from", value: 60 },
          image:
            "https://images.unsplash.com/photo-1642470015600-28323317564a?w=500",
          tags: ["SoD"],
          slug: "wow-lvl-sod",
        },
        {
          id: "lvl-hc",
          title: "Hardcore Safe Boost",
          subtitle: "No Deaths Guarantee",
          price: { type: "from", value: 150 },
          image:
            "https://images.unsplash.com/photo-1635321349667-c653e11c1631?w=500",
          tags: ["Premium"],
          slug: "wow-lvl-hc",
        },
        {
          id: "dungeon-spam",
          title: "Dungeon Cleave",
          subtitle: "AFK XP Farm",
          price: { type: "from", value: 10 },
          image:
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
          slug: "dungeon-spam",
        },
      ],
    },
    {
      id: "quests",
      anchor: "quests",
      title: "Attunements & Rep",
      layout: "grid_cards",
      items: [
        {
          id: "attune-mc",
          title: "Molten Core Attune",
          subtitle: "Quest Chain",
          price: { type: "from", value: 15 },
          image:
            "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=500",
          slug: "attune-mc",
        },
        {
          id: "attune-ony",
          title: "Onyxia Chain",
          subtitle: "Full Completion",
          price: { type: "from", value: 25 },
          image:
            "https://images.unsplash.com/photo-1626263017299-89a42c849383?w=500",
          slug: "attune-ony",
        },
      ],
    },
    // RAID SECTION
    {
      id: "classic-raids",
      anchor: "classic-raids",
      title: "GDKP & Loot Runs",
      description: "Naxxramas, Ulduar, and ICC Clears.",
      layout: "grid_cards",
      items: [
        {
          id: "icc-25",
          title: "ICC 25 Heroic",
          subtitle: "Light of Dawn",
          price: { type: "from", value: 50 },
          image:
            "https://images.unsplash.com/photo-1535581652167-3d6b9add9b32?w=500",
          tags: ["WotLK"],
          slug: "icc-25",
        },
        {
          id: "naxx",
          title: "Naxxramas Clear",
          subtitle: "Full T3 / T7",
          price: { type: "from", value: 25 },
          image:
            "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=500",
          slug: "naxx",
        },
        {
          id: "gdkp",
          title: "GDKP Pot Run",
          subtitle: "Bring Gold",
          price: { type: "from", value: 5 },
          image:
            "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?w=500",
          slug: "gdkp",
        },
      ],
    },
    {
      id: "gear",
      anchor: "gear",
      title: "Specific Gear",
      layout: "grid_cards",
      items: [
        {
          id: "bis-pre-raid",
          title: "Pre-Raid BiS",
          subtitle: "Full Dungeon Set",
          price: { type: "from", value: 80 },
          image:
            "https://images.unsplash.com/photo-1596496312467-0c098559882c?w=500",
          slug: "bis-pre-raid",
        },
        {
          id: "legendary",
          title: "Sulfuras / Thunderfury",
          subtitle: "Mat Farming",
          price: { type: "from", value: 500 },
          image:
            "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?w=500",
          tags: ["Legendary"],
          slug: "legendary",
        },
      ],
    },
    // PVP SECTION
    {
      id: "honor",
      anchor: "honor",
      title: "Honor System",
      layout: "grid_cards",
      items: [
        {
          id: "r14",
          title: "Rank 14 (Grand Marshal)",
          subtitle: "Multi-week Grind",
          price: { type: "from", value: 1000 },
          image:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
          tags: ["Hard"],
          slug: "r14",
        },
        {
          id: "honor-cap",
          title: "Weekly Honor Cap",
          subtitle: "Maintain Rank",
          price: { type: "from", value: 50 },
          image:
            "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=500",
          slug: "honor-cap",
        },
        {
          id: "bg-wins",
          title: "WSG/AB Wins",
          subtitle: "Reputation Farm",
          price: { type: "from", value: 5 },
          image:
            "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=500",
          slug: "bg-wins",
        },
      ],
    },
    // MARKETPLACE SECTION
    {
      id: "classic-accounts",
      anchor: "classic-accounts",
      title: "Ready-to-Play Characters",
      layout: "table_list",
      items: [
        {
          id: "acc-t3",
          title: "60 Warrior (Full T3)",
          price: { type: "from", value: 800 },
          image: "",
          meta: { Gear: "T3", Server: "Era", Class: "Warrior" },
          slug: "acc-t3",
        },
        {
          id: "acc-sod",
          title: "50 Mage (SoD)",
          price: { type: "from", value: 120 },
          image: "",
          meta: { Gear: "BiS P2", Server: "Living Flame", Gold: "500g" },
          slug: "acc-sod",
        },
        {
          id: "acc-fresh",
          title: "Fresh 80 Paladin",
          price: { type: "from", value: 60 },
          image: "",
          meta: { Gear: "Blue", Server: "Gehennas", Fly: "280%" },
          slug: "acc-fresh",
        },
      ],
    },
    {
      id: "classic-gold",
      anchor: "classic-gold",
      title: "Gold & Time",
      layout: "grid_cards",
      items: [
        {
          id: "gold-era",
          title: "Era Gold (1000g)",
          subtitle: "Whitemane Cluster",
          price: { type: "from", value: 20 },
          image:
            "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?w=500",
          slug: "gold-era",
        },
        {
          id: "gold-sod",
          title: "SoD Gold (100g)",
          subtitle: "All Servers",
          price: { type: "from", value: 5 },
          image:
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
          slug: "gold-sod",
        },
        {
          id: "gametime",
          title: "60 Day Card",
          subtitle: "Global",
          price: { type: "from", value: 28 },
          image:
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500",
          slug: "gametime",
        },
      ],
    },
  ],

  // --- 5. THE TRUST BAR (The "Credibility") ---
  trustBar: {
    stats: [
      { id: "rating", icon: "Star", value: "4.9/5", label: "Rating" },
      { id: "orders", icon: "ShoppingBag", value: "8.4K+", label: "Orders" },
      { id: "boosters", icon: "Users", value: "18", label: "Active Boosters" },
      { id: "uptime", icon: "Zap", value: "99.9%", label: "Uptime" },
    ],
    badges: ["vpn_protected", "encrypted", "ban_guarantee", "money_back"],
  },

  // --- 6. THE SEO BLOCK (The "Authority") ---
  seo: {
    title: "WoW Classic Services | Leveling, Raids, PvP",
    description:
      "Professional World of Warcraft Classic services including leveling, raids, PvP, and more. Safe, fast, and reliable.",
    content: `<p>Our WoW Classic services platform connects players with verified professionals who can help achieve their gaming goals.</p>`,
    faq: [
      {
        question: "Is character boosting safe?",
        answer: "<p>Yes, our boosters use advanced techniques to ensure your character remains safe.</p>",
      },
    ],
  },

  // --- 7. CROSS-SELL (The "Upsell") ---
  crossSell: {
    title: "Related Services",
    items: [
      {
        id: "cs-wow",
        slug: "cs-wow",
        title: "Retail WoW Boost",
        subtitle: "From $10",
        image: "/images/games/wow/boost.jpg",
        price: { type: "from", value: 10 },
      },
    ],
  },
};