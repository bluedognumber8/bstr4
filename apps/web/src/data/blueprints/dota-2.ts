import { GamePageConfig } from "@/components/engine/types";

export const DOTA_BLUEPRINT: GamePageConfig = {
  gameSlug: "dota-2",
  theme: {
    primaryColor: "#e33e2b", // Dota Red
    // A darker, more epic background image (Roshan/Teamfight)
    backgroundImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2835&auto=format&fit=crop",
  },

  // --- 1. THE HERO ZONE (The "Hook") ---
  hero: {
    title: "Ascend the Ancients",
    subtitle:
      "The world's largest ecosystem for Dota 2 services. From Immortal boosting to Tier 8 Battle Cup victories.",
    widgetConfig: {
      label: "Calculate MMR Boost",
      min: 0,
      max: 12000,
      unit: "MMR",
      pricePerUnit: 0.012, // ~$12 per 1000 MMR (avg base)
    },
  },

  // --- 2. THE PULSE BAR (The "Liveness") ---
  pulse: [
    {
      id: "p1",
      label: "Battle Cup",
      value: "Registration Open",
      icon: "Trophy",
      trend: "up",
    },
    { id: "p2", label: "Online Boosters", value: "142 Immortals", icon: "Zap" },
    {
      id: "p3",
      label: "Recent Order",
      value: "Tier 8 Victory",
      icon: "ShoppingBag",
    },
    { id: "p4", label: "Patch", value: "7.37c", icon: "FileCode" },
  ],

  // --- 3. THE CONTENT TABS (The "Smart" IA) ---
  tabs: [
    {
      id: "competitive",
      label: "Competitive",
      icon: "Swords",
      sections: [
        // A. RANKED SERVICES
        {
          id: "ranked-services",
          title: "Ranked Supremacy",
          description:
            "Push your rank to Immortal with verified pros (8000+ MMR).",
          type: "grid_cards",
          items: [
             {
               id: "mmr-boost",
               title: "Solo MMR Boost",
               subtitle: "Up to 12,000 MMR",
               priceStart: 15,
               image:
                 "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?w=500",
               tags: ["Best Seller"],
               slug: "mmr-boost",
             },
             {
               id: "calibration",
               title: "Seasonal Calibration",
               subtitle: "10 Games | Guaranteed Winrate",
               priceStart: 35,
               image:
                 "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500",
               tags: ["High Priority"],
               slug: "placement-matches",
             },
             {
               id: "duo-queue",
               title: "Duo with Pro",
               subtitle: "No Account Sharing",
               priceStart: 25,
               image:
                 "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500",
               tags: ["Safe"],
               slug: "mmr-boost", // Using existing product as placeholder
             },
             {
               id: "net-wins",
               title: "Net Wins Boost",
               subtitle: "Pay for +MMR only",
               priceStart: 4,
               image:
                 "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500",
               slug: "mmr-boost", // Using existing product as placeholder
             },
          ],
        },
        // B. BATTLE CUP (FunPay Special)
        {
          id: "battle-cup",
          title: "Battle Cup Victories",
          description: "Guaranteed trophies this Saturday. Choose your Tier.",
          type: "grid_cards",
          items: [
             {
               id: "bc-tier8",
               title: "Tier 8 Champion",
               subtitle: "10k+ MMR Team | 100% Win",
               priceStart: 20,
               image:
                 "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=500",
               tags: ["Hardcore"],
               slug: "mmr-boost", // Using existing product as placeholder
             },
             {
               id: "bc-tier7",
               title: "Tier 7 Victory",
               subtitle: "Ancient/Divine Bracket",
               priceStart: 15,
               image:
                 "https://images.unsplash.com/photo-1635321349667-c653e11c1631?w=500",
               slug: "mmr-boost", // Using existing product as placeholder
             },
             {
               id: "bc-stack",
               title: "Play with your Stack",
               subtitle: "We provide the Smurf Carry",
               priceStart: 30,
               image:
                 "https://images.unsplash.com/photo-1533236897111-512022dd1c0c?w=500",
               tags: ["Co-op"],
               slug: "mmr-boost", // Using existing product as placeholder
             },
          ],
        },
      ],
    },
    {
      id: "progression",
      label: "Progression & Plus",
      icon: "Crown",
      sections: [
        // C. DOTA PLUS & SUBSCRIPTIONS
        {
          id: "subscriptions",
          title: "Dota Plus & Analytics",
          description: "Regional pricing tricks to get you cheaper subs.",
          type: "grid_cards",
          items: [
            {
              id: "dota-plus-1m",
              title: "Dota+ (1 Month)",
              subtitle: "Region: TR/ARG/RU",
              priceStart: 4.5,
              image:
                "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500",
              tags: ["Instant"],
            },
            {
              id: "dota-plus-12m",
              title: "Dota+ (12 Months)",
              subtitle: "Save 30% via Gifting",
              priceStart: 45.0,
              image:
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500",
              tags: ["Best Value"],
            },
            {
              id: "dotabuff",
              title: "Dotabuff Plus",
              subtitle: "Advanced Analytics Key",
              priceStart: 6.0,
              image:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
            },
          ],
        },
        // D. HERO LEVELING
        {
          id: "hero-leveling",
          title: "Hero Mastery Grinding",
          description: "Unlock chat wheels and Grandmaster Tier.",
          type: "grid_cards",
          items: [
            {
              id: "lvl-0-5",
              title: "Bronze Tier (0-5)",
              subtitle: "Unlock Voice Lines",
              priceStart: 5,
              image:
                "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500",
            },
            {
              id: "lvl-25-30",
              title: "Grandmaster (25-30)",
              subtitle: "The Ultimate Grind",
              priceStart: 50,
              image:
                "https://images.unsplash.com/photo-1637822742076-82c736cebc51?w=500",
              tags: ["Elite"],
            },
            {
              id: "cavern-crawl",
              title: "Cavern Crawl / Quests",
              subtitle: "3-Star Completion",
              priceStart: 2,
              image:
                "https://images.unsplash.com/photo-1616511224723-064009700935?w=500",
            },
          ],
        },
      ],
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: "ShoppingBag",
      sections: [
        // E. ACCOUNTS TABLE
        {
          id: "accounts",
          title: "Verified Steam Accounts",
          description:
            "Instant delivery accounts with high MMR or rare inventories.",
          type: "table_list",
          items: [
            {
              id: "acc-immo-1",
              title: "Immortal (Rank 1500)",
              priceStart: 250,
              image: "",
              meta: { MMR: "7500", Behavior: "10,000", Hours: "4500" },
            },
            {
              id: "acc-divine",
              title: "Divine 5 Smurf",
              priceStart: 85,
              image: "",
              meta: { MMR: "5400", Behavior: "9,800", Hours: "800" },
            },
            {
              id: "acc-vhs",
              title: "VHS Ready Account",
              priceStart: 15,
              image: "",
              meta: { MMR: "TBD", Behavior: "Normal", Hours: "100" },
            },
            {
              id: "acc-old",
              title: "2013 Vintage Acc",
              priceStart: 45,
              image: "",
              meta: { MMR: "3000", Inv: "Dragonclaw", Hours: "8000" },
            },
          ],
        },
        // F. ITEMS
        {
          id: "items",
          title: "Skins & Arcanas",
          type: "grid_cards",
          items: [
            {
              id: "item-dc",
              title: "Dragonclaw Hook",
              priceStart: 150,
              image:
                "https://images.unsplash.com/photo-1607982758645-c229b23c74db?w=500",
              tags: ["Rare"],
            },
            {
              id: "item-arcana",
              title: "Random Arcana",
              priceStart: 25,
              image:
                "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=500",
            },
          ],
        },
      ],
    },
    {
      id: "utility",
      label: "Utility & Security",
      icon: "Shield",
      sections: [
        // G. LOW PRIO & VHS
        {
          id: "lpq-vhs",
          title: "Account Recovery",
          description:
            "Get out of the shadow pool or clean your behavior score.",
          type: "grid_cards",
          items: [
            {
              id: "lpq-remove",
              title: "Low Priority Removal",
              subtitle: "Per 1 Game (Turbo)",
              priceStart: 3,
              image:
                "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500",
              tags: ["Fast"],
            },
            {
              id: "behavior",
              title: "Behavior Score Boost",
              subtitle: "Fix <3000 Score",
              priceStart: 20,
              image:
                "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=500",
            },
            {
              id: "vhs-bind",
              title: "VHS Binding",
              subtitle: "High Skill Bracket Fix",
              priceStart: 10,
              image:
                "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500",
            },
          ],
        },
      ],
    },
    {
      id: "academy",
      label: "Academy",
      icon: "GraduationCap",
      sections: [
        {
          id: "coaching",
          title: "Learn from Pros",
          description: "1-on-1 sessions with top 500 players.",
          type: "profile_carousel",
          items: [
            {
              id: "coach-1",
              title: "AttackerClone",
              subtitle: "Kunkka Specialist",
              priceStart: 25,
              image:
                "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400",
              tags: ["Rank 100"],
            },
            {
              id: "coach-2",
              title: "SupportTeacher",
              subtitle: "Pos 5 / Drafter",
              priceStart: 15,
              image:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
              tags: ["TI Player"],
            },
            {
              id: "coach-3",
              title: "MidLaneGod",
              subtitle: "Lane Mechanics",
              priceStart: 30,
              image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            },
          ],
        },
      ],
    },
  ],
};
