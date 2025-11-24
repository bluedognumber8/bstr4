import { GamePageConfig } from "@/components/engine/types";

export const WOW_RETAIL_BLUEPRINT: GamePageConfig = {
  gameSlug: "wow-retail", // Distinct slug
  theme: {
    primaryColor: "#0074e0", // Alliance Blue / Retail Polish
    backgroundImage:
      "https://images.unsplash.com/photo-1592439272693-c56a0d123811?q=80&w=2500&auto=format&fit=crop",
  },

  // --- HERO: GOLD (1,561 Listings) ---
  hero: {
    title: "The War Within",
    subtitle: "Retail Gold, Nerub-ar Palace Carries & Mythic+ IO Boosting.",
    widgetConfig: {
      label: "Buy Gold (100k)",
      min: 1,
      max: 500,
      unit: "x 100k",
      pricePerUnit: 4.5, // ~$4.50 based on your ~400-600 RUB
    },
  },

  pulse: [
    {
      id: "p1",
      label: "Affixes",
      value: "Fortified / Storming",
      icon: "Skull",
    },
    { id: "p2", label: "Raid", value: "Nerub-ar (Fated)", icon: "Crown" },
    { id: "p3", label: "Delves", value: "Tier 11 Unlocked", icon: "Map" },
    {
      id: "p4",
      label: "Legion Remix",
      value: "Active",
      icon: "Clock",
      trend: "up",
    },
  ],

  tabs: [
    // TAB 1: END GAME PVE (Raids & Dungeons)
    {
      id: "pve",
      label: "Raids & Mythic+",
      icon: "Sword",
      sections: [
        {
          id: "mythic-plus",
          title: "Dungeons & Keystones",
          description: "4,276 Active Listings for M+ Boosts.",
          type: "grid_cards",
          items: [
            {
              id: "m-low",
              title: "Weekly Vault (+8)",
              subtitle: "Guaranteed Gear",
              priceStart: 8,
              image:
                "https://images.unsplash.com/photo-1627856014759-2a57d83be60c?w=500",
            },
            {
              id: "m-ksm",
              title: "Keystone Master (2000 IO)",
              subtitle: "Mount Reward",
              priceStart: 120,
              image:
                "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=500",
              tags: ["Mount"],
            },
            {
              id: "m-push",
              title: "High Keys (+15-20)",
              subtitle: "For IO Score",
              priceStart: 25,
              image:
                "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
              tags: ["Pro"],
            },
          ],
        },
        {
          id: "raids",
          title: "Nerub-ar Palace",
          description: "Full clears, VIP Loot Funnels, and Glory Runs.",
          type: "grid_cards",
          items: [
            {
              id: "raid-heroic",
              title: "Heroic Full Clear",
              subtitle: "AOTC Achievement",
              priceStart: 25,
              image:
                "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=500",
            },
            {
              id: "raid-mythic",
              title: "Mythic Bosses",
              subtitle: "BiS Item Funnel",
              priceStart: 40,
              image:
                "https://images.unsplash.com/photo-1626263017299-89a42c849383?w=500",
              tags: ["Elite"],
            },
            {
              id: "raid-mount",
              title: "Mount Guarantee",
              subtitle: "Rare Drop",
              priceStart: 150,
              image:
                "https://images.unsplash.com/photo-1535581652167-3d6b9add9b32?w=500",
            },
          ],
        },
        {
          id: "delves",
          title: "Delves & World Content",
          description: "New TWW Content Runs.",
          type: "grid_cards",
          items: [
            {
              id: "delve-t8",
              title: "Tier 8 Delve",
              subtitle: "Great Vault Reward",
              priceStart: 6,
              image:
                "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=500",
            },
            {
              id: "delve-full",
              title: "Full Tier Unlock",
              subtitle: "Tiers 1-11",
              priceStart: 60,
              image:
                "https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=500",
            },
          ],
        },
      ],
    },
    // TAB 2: PROGRESSION (Leveling, Profs, Remix)
    {
      id: "progression",
      label: "Progression",
      icon: "ChevronsUp",
      sections: [
        {
          id: "leveling",
          title: "Power Leveling (1-80)",
          type: "grid_cards",
          items: [
            {
              id: "lvl-70-80",
              title: "70-80 TWW",
              subtitle: "12-24 Hours",
              priceStart: 15,
              image:
                "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=500",
              tags: ["Hot"],
            },
            {
              id: "lvl-full",
              title: "Fresh 1-80",
              subtitle: "Full Campaign",
              priceStart: 35,
              image:
                "https://images.unsplash.com/photo-1642470015600-28323317564a?w=500",
            },
            {
              id: "remix-lvl",
              title: "Legion Remix Leveling",
              subtitle: "Time-Limited Event",
              priceStart: 18,
              image:
                "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=500",
              tags: ["Event"],
            },
          ],
        },
        {
          id: "professions",
          title: "Professions & Reputation",
          type: "grid_cards",
          items: [
            {
              id: "prof-blacksmith",
              title: "Blacksmithing 1-100",
              subtitle: "Khaz Algar",
              priceStart: 12,
              image:
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500",
            },
            {
              id: "prof-all",
              title: "All Professions Max",
              subtitle: "Bundle",
              priceStart: 120,
              image:
                "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500",
            },
            {
              id: "rep-farm",
              title: "Renown 25",
              subtitle: "Any Faction",
              priceStart: 50,
              image:
                "https://images.unsplash.com/photo-1596496312467-0c098559882c?w=500",
            },
          ],
        },
      ],
    },
    // TAB 3: PVP (Arena, Shuffle)
    {
      id: "pvp",
      label: "PvP Arena",
      icon: "Swords",
      sections: [
        {
          id: "arena-services",
          title: "Gladiator & Rating",
          type: "grid_cards",
          items: [
            {
              id: "shuffle",
              title: "Solo Shuffle 1800",
              subtitle: "Elite Set",
              priceStart: 30,
              image:
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
            },
            {
              id: "arena-3v3",
              title: "3v3 Gladiator",
              subtitle: "Mount + Title",
              priceStart: 400,
              image:
                "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=500",
              tags: ["Hardcore"],
            },
            {
              id: "honor",
              title: "Honor Farming",
              subtitle: "Full Gear Set",
              priceStart: 10,
              image:
                "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=500",
            },
          ],
        },
      ],
    },
    // TAB 4: MARKETPLACE (Accounts, Keys, Time)
    {
      id: "market",
      label: "Marketplace",
      icon: "ShoppingBag",
      sections: [
        {
          id: "accounts",
          title: "High-End Accounts",
          description: "Glad mounts, T3 sets, and High IO Characters.",
          type: "table_list",
          items: [
            {
              id: "acc-glad",
              title: "S1 Gladiator Paladin",
              priceStart: 550,
              image: "",
              meta: {
                Ilvl: "626",
                Mounts: "Highland Drake",
                Title: "Gladiator",
              },
            },
            {
              id: "acc-shell",
              title: "Spectral Tiger Shell",
              priceStart: 1500,
              image: "",
              meta: { Rare: "Spectral Tiger", Gold: "10M", Chars: "Lvl 1" },
            },
            {
              id: "acc-mid",
              title: "Mythic Raider Priest",
              priceStart: 200,
              image: "",
              meta: { Ilvl: "620", IO: "2800", Raid: "8/8 M" },
            },
          ],
        },
        {
          id: "keys-items",
          title: "Keys & Game Time",
          type: "grid_cards",
          items: [
            {
              id: "key-15",
              title: "Mythic +15 Key",
              subtitle: "Inventory Item",
              priceStart: 4,
              image:
                "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=500",
            },
            {
              id: "gametime-60",
              title: "60 Days Time Card",
              subtitle: "RU/EU/US",
              priceStart: 25,
              image:
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500",
            },
            {
              id: "gold-cap",
              title: "Gold Cap (10M)",
              subtitle: "Safe Transfer",
              priceStart: 450,
              image:
                "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?w=500",
            },
          ],
        },
      ],
    },
    // TAB 5: COACHING (Academy)
    {
      id: "coaching",
      label: "Coaching",
      icon: "GraduationCap",
      sections: [
        {
          id: "coaches",
          title: "Learn from BlizzCon Winners",
          type: "profile_carousel",
          items: [
            {
              id: "coach-1",
              title: "R1 Rogue",
              subtitle: "AWC Competitor",
              priceStart: 50,
              image:
                "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400",
              tags: ["Pro"],
            },
            {
              id: "coach-2",
              title: "MDI Tank",
              subtitle: "Route Planning",
              priceStart: 35,
              image:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
            },
          ],
        },
      ],
    },
  ],
};
