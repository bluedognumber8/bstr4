// src/data/catalogue/blueprints/world-of-warcraft.ts (continued)

import { GamePageBlueprint } from "@/components/engine/types";

export const wowBlueprint: GamePageBlueprint = {
  gameSlug: "world-of-warcraft",
  gameName: "World of Warcraft",

  theme: {
    primaryColor: "#f8b700",
    backgroundImage: "/images/games/wow/hero-bg.jpg",
  },

  trustBar: {
    stats: [
      {
        id: "orders",
        icon: "CheckCircle",
        value: "12,847",
        label: "Orders Completed",
      },
      { id: "time", icon: "Zap", value: "15 min", label: "Avg. Start Time" },
      { id: "boosters", icon: "Users", value: "24", label: "Boosters Online" },
      { id: "rating", icon: "Star", value: "4.9", label: "Customer Rating" },
    ],
    badges: ["vpn_protected", "ban_guarantee", "money_back"],
  },

  hero: {
    title: "World of Warcraft",
    subtitle:
      "Professional boosting services for retail and classic. Fast, safe, and guaranteed results.",
    variant: "currency_calculator",
    backgroundImage: "/images/games/wow/hero-bg.jpg",
    currencyConfig: {
      label: "Buy WoW Gold",
      unit: "Gold",
      min: 100000,
      max: 10000000,
      step: 100000,
      pricePerUnit: 0.000045,
      serverOptions: [
        { label: "Kazzak (EU)", value: "kazzak-eu", priceModifier: 1.0 },
        { label: "Draenor (EU)", value: "draenor-eu", priceModifier: 1.05 },
        { label: "Illidan (US)", value: "illidan-us", priceModifier: 0.95 },
        { label: "Area 52 (US)", value: "area52-us", priceModifier: 1.0 },
      ],
    },
  },

  tabs: [
    {
      id: "raids",
      label: "Raids",
      icon: "Swords",
      anchor: "raids",
      productCount: 8,
    },
    {
      id: "mythic",
      label: "Mythic+",
      icon: "Flame",
      anchor: "mythic-plus",
      productCount: 12,
    },
    { id: "pvp", label: "PvP", icon: "Shield", anchor: "pvp", productCount: 6 },
    {
      id: "leveling",
      label: "Leveling",
      icon: "TrendingUp",
      anchor: "leveling",
      productCount: 4,
    },
    {
      id: "accounts",
      label: "Accounts",
      icon: "User",
      anchor: "accounts",
      productCount: 15,
    },
    {
      id: "coaching",
      label: "Coaching",
      icon: "GraduationCap",
      anchor: "coaching",
      productCount: 3,
    },
  ],

  sections: [
    // ==========================================
    // RAIDS SECTION
    // ==========================================
    {
      id: "raids-section",
      anchor: "raids",
      title: "Raid Carries",
      description:
        "Complete any raid with our professional team. All difficulties available.",
      layout: "grid_cards",
      gridConfig: {
        columns: { mobile: 1, tablet: 2, desktop: 3 },
        cardVariant: "standard",
      },
      viewAllHref: "/games/world-of-warcraft/raids",
      items: [
        {
          id: "nerub-ar-palace-heroic",
          slug: "nerub-ar-palace-heroic",
          title: "Nerub-ar Palace Heroic",
          subtitle: "Full 8/8 boss clear with all loot",
          image: "/images/games/wow/raids/nerub-ar.jpg",
          price: { type: "from", value: 49.99 },
          meta: {
            duration: "2-3 hours",
            rating: 4.9,
            reviewCount: 342,
            features: ["Loot Included", "Self-Play Option"],
          },
          badges: [{ type: "bestseller" }],
          variant: "standard",
        },
        {
          id: "nerub-ar-palace-mythic",
          slug: "nerub-ar-palace-mythic",
          title: "Nerub-ar Palace Mythic",
          subtitle: "World-class raiders at your service",
          image: "/images/games/wow/raids/nerub-ar-mythic.jpg",
          price: { type: "from", value: 299.99 },
          meta: {
            duration: "4-6 hours",
            rating: 4.8,
            reviewCount: 89,
            features: ["Cutting Edge", "Guaranteed"],
          },
          badges: [{ type: "fast" }],
          variant: "variable",
        },
        {
          id: "vault-incarnates",
          slug: "vault-of-the-incarnates",
          title: "Vault of the Incarnates",
          subtitle: "Legacy raid with transmog & achievements",
          image: "/images/games/wow/raids/vault.jpg",
          price: { type: "from", value: 29.99 },
          meta: {
            duration: "1-2 hours",
            rating: 5.0,
            reviewCount: 567,
          },
          variant: "standard",
        },
        {
          id: "amirdrassil",
          slug: "amirdrassil-heroic",
          title: "Amirdrassil Heroic",
          subtitle: "Dream's Hope full clear",
          image: "/images/games/wow/raids/amirdrassil.jpg",
          price: { type: "from", value: 39.99 },
          meta: {
            duration: "2-3 hours",
            rating: 4.9,
            reviewCount: 234,
          },
          variant: "standard",
        },
        {
          id: "aberrus",
          slug: "aberrus-heroic",
          title: "Aberrus Heroic",
          subtitle: "Shadowed Crucible carry",
          image: "/images/games/wow/raids/aberrus.jpg",
          price: { type: "from", value: 34.99 },
          meta: {
            duration: "2 hours",
            rating: 4.8,
            reviewCount: 445,
          },
          variant: "standard",
        },
        {
          id: "raid-bundle",
          slug: "raid-bundle",
          title: "Raid Bundle Deal",
          subtitle: "All current tier raids at 20% off",
          image: "/images/games/wow/raids/bundle.jpg",
          price: { type: "from", value: 149.99, originalValue: 189.99 },
          meta: {
            features: ["Save 20%", "Priority Queue"],
          },
          badges: [{ type: "sale", label: "-20%" }],
          variant: "variable",
        },
      ],
    },

    // ==========================================
    // MYTHIC+ SECTION
    // ==========================================
    {
      id: "mythic-plus-section",
      anchor: "mythic-plus",
      title: "Mythic+ Dungeons",
      description:
        "Timed runs, weekly chest fills, and rating boosts from 3500+ IO players.",
      layout: "grid_cards",
      gridConfig: {
        columns: { mobile: 1, tablet: 2, desktop: 4 },
        cardVariant: "standard",
      },
      viewAllHref: "/games/world-of-warcraft/mythic-plus",
      items: [
        {
          id: "mythic-10",
          slug: "mythic-plus-10",
          title: "Mythic +10 Key",
          subtitle: "Single timed run, any dungeon",
          image: "/images/games/wow/mythic/m10.jpg",
          price: { type: "fixed", value: 12.99 },
          meta: {
            duration: "30-45 min",
            rating: 4.9,
            reviewCount: 1234,
          },
          badges: [{ type: "bestseller" }],
          variant: "standard",
        },
        {
          id: "mythic-15",
          slug: "mythic-plus-15",
          title: "Mythic +15 Key",
          subtitle: "Guaranteed +2 upgrade timing",
          image: "/images/games/wow/mythic/m15.jpg",
          price: { type: "fixed", value: 24.99 },
          meta: {
            duration: "35-50 min",
            rating: 4.9,
            reviewCount: 892,
          },
          badges: [{ type: "fast" }],
          variant: "standard",
        },
        {
          id: "mythic-20",
          slug: "mythic-plus-20",
          title: "Mythic +20 Key",
          subtitle: "High key for vault slot",
          image: "/images/games/wow/mythic/m20.jpg",
          price: { type: "fixed", value: 49.99 },
          meta: {
            duration: "40-60 min",
            rating: 4.8,
            reviewCount: 456,
          },
          variant: "standard",
        },
        {
          id: "weekly-chest",
          slug: "weekly-chest-fill",
          title: "Weekly Chest Fill",
          subtitle: "8 dungeons for max vault options",
          image: "/images/games/wow/mythic/weekly.jpg",
          price: { type: "from", value: 79.99 },
          meta: {
            duration: "1 day",
            rating: 4.9,
            reviewCount: 678,
            features: ["All Vault Slots"],
          },
          badges: [{ type: "bestseller" }],
          variant: "variable",
        },
        {
          id: "io-rating-boost",
          slug: "mythic-plus-rating",
          title: "M+ Rating Boost",
          subtitle: "Custom rating target from any start",
          image: "/images/games/wow/mythic/rating.jpg",
          price: { type: "range", value: 29.99, maxValue: 499.99 },
          meta: {
            rating: 4.8,
            reviewCount: 234,
            features: ["Any Rating", "Self-Play"],
          },
          variant: "variable",
        },
        {
          id: "keystone-master",
          slug: "keystone-master",
          title: "Keystone Master",
          subtitle: "Full season achievement + mount",
          image: "/images/games/wow/mythic/ksm.jpg",
          price: { type: "from", value: 199.99 },
          meta: {
            duration: "2-5 days",
            rating: 4.9,
            reviewCount: 189,
            features: ["Mount Guaranteed"],
          },
          badges: [{ type: "limited", label: "Season End Soon" }],
          variant: "variable",
        },
        {
          id: "mythic-bundle-10",
          slug: "mythic-bundle-10",
          title: "10x M+15 Bundle",
          subtitle: "Best value for serious players",
          image: "/images/games/wow/mythic/bundle.jpg",
          price: { type: "fixed", value: 199.99, originalValue: 249.9 },
          meta: {
            features: ["Save 20%", "Priority"],
          },
          badges: [{ type: "sale", label: "-20%" }],
          variant: "standard",
        },
        {
          id: "specific-dungeon",
          slug: "specific-dungeon-farm",
          title: "Specific Dungeon Farm",
          subtitle: "Target that one drop you need",
          image: "/images/games/wow/mythic/farm.jpg",
          price: { type: "from", value: 14.99 },
          meta: {
            duration: "30-40 min",
            features: ["Loot Traders"],
          },
          variant: "variable",
        },
      ],
    },

    // ==========================================
    // PVP SECTION
    // ==========================================
    {
      id: "pvp-section",
      anchor: "pvp",
      title: "PvP Services",
      description:
        "Arena rating, RBG wins, and honor farming from Gladiator-level players.",
      layout: "grid_cards",
      gridConfig: {
        columns: { mobile: 1, tablet: 2, desktop: 3 },
        cardVariant: "variable",
      },
      viewAllHref: "/games/world-of-warcraft/pvp",
      items: [
        {
          id: "arena-2v2",
          slug: "arena-2v2-rating",
          title: "2v2 Arena Rating",
          subtitle: "Climb the ladder with a Gladiator partner",
          image: "/images/games/wow/pvp/2v2.jpg",
          price: { type: "range", value: 19.99, maxValue: 299.99 },
          meta: {
            rating: 4.9,
            reviewCount: 567,
            features: ["Self-Play", "Any Rating"],
          },
          badges: [{ type: "bestseller" }],
          variant: "variable",
        },
        {
          id: "arena-3v3",
          slug: "arena-3v3-rating",
          title: "3v3 Arena Rating",
          subtitle: "The true competitive experience",
          image: "/images/games/wow/pvp/3v3.jpg",
          price: { type: "range", value: 29.99, maxValue: 499.99 },
          meta: {
            rating: 4.8,
            reviewCount: 345,
            features: ["Self-Play", "Voice Comms"],
          },
          variant: "variable",
        },
        {
          id: "rbg-rating",
          slug: "rbg-rating-boost",
          title: "RBG Rating Boost",
          subtitle: "Rated Battleground wins & rating",
          image: "/images/games/wow/pvp/rbg.jpg",
          price: { type: "range", value: 14.99, maxValue: 199.99 },
          meta: {
            rating: 4.7,
            reviewCount: 234,
            features: ["Group Runs"],
          },
          variant: "variable",
        },
        {
          id: "gladiator-title",
          slug: "gladiator-title",
          title: "Gladiator Title",
          subtitle: "Top 0.5% achievement + mount",
          image: "/images/games/wow/pvp/gladiator.jpg",
          price: { type: "from", value: 799.99 },
          meta: {
            duration: "Season Long",
            rating: 5.0,
            reviewCount: 45,
            features: ["R1 Players", "Guaranteed"],
          },
          badges: [{ type: "limited" }],
          variant: "variable",
        },
        {
          id: "honor-farming",
          slug: "honor-farming",
          title: "Honor Farming",
          subtitle: "Fast honor for gear upgrades",
          image: "/images/games/wow/pvp/honor.jpg",
          price: { type: "rate", value: 9.99, unit: "per 10,000" },
          meta: {
            duration: "2-4 hours",
            features: ["AFK Friendly"],
          },
          variant: "currency",
        },
        {
          id: "conquest-cap",
          slug: "conquest-cap",
          title: "Weekly Conquest Cap",
          subtitle: "Hit your conquest cap fast",
          image: "/images/games/wow/pvp/conquest.jpg",
          price: { type: "fixed", value: 24.99 },
          meta: {
            duration: "2-3 hours",
            rating: 4.8,
            reviewCount: 189,
          },
          variant: "standard",
        },
      ],
    },

    // ==========================================
    // LEVELING SECTION (Carousel)
    // ==========================================
    {
      id: "leveling-section",
      anchor: "leveling",
      title: "Leveling & Progression",
      description:
        "From fresh character to endgame ready. AFK-friendly piloted options available.",
      layout: "carousel",
      items: [
        {
          id: "level-70-80",
          slug: "leveling-70-80",
          title: "Level 70-80 Boost",
          subtitle: "War Within expansion ready",
          image: "/images/games/wow/leveling/70-80.jpg",
          price: { type: "from", value: 49.99 },
          meta: {
            duration: "8-12 hours",
            rating: 4.9,
            reviewCount: 892,
            features: ["Express Available"],
          },
          badges: [{ type: "bestseller" }],
          variant: "variable",
        },
        {
          id: "level-1-70",
          slug: "leveling-1-70",
          title: "Level 1-70 Boost",
          subtitle: "Complete journey, any race/class",
          image: "/images/games/wow/leveling/1-70.jpg",
          price: { type: "from", value: 79.99 },
          meta: {
            duration: "24-48 hours",
            rating: 4.8,
            reviewCount: 456,
          },
          variant: "variable",
        },
        {
          id: "level-1-80",
          slug: "leveling-1-80",
          title: "Level 1-80 Boost",
          subtitle: "Fresh to max, fully geared",
          image: "/images/games/wow/leveling/1-80.jpg",
          price: { type: "from", value: 119.99 },
          meta: {
            duration: "2-3 days",
            rating: 4.9,
            reviewCount: 234,
            features: ["Basic Gear Included"],
          },
          badges: [{ type: "new" }],
          variant: "variable",
        },
        {
          id: "profession-leveling",
          slug: "profession-leveling",
          title: "Profession Leveling",
          subtitle: "Max out any profession skill",
          image: "/images/games/wow/leveling/professions.jpg",
          price: { type: "from", value: 29.99 },
          meta: {
            duration: "4-8 hours",
            rating: 4.7,
            reviewCount: 167,
          },
          variant: "variable",
        },
        {
          id: "renown-grind",
          slug: "renown-grinding",
          title: "Renown Grinding",
          subtitle: "Unlock all faction rewards",
          image: "/images/games/wow/leveling/renown.jpg",
          price: { type: "from", value: 19.99 },
          meta: {
            duration: "6-12 hours",
            features: ["Any Faction"],
          },
          variant: "variable",
        },
      ],
    },

    // ==========================================
    // ACCOUNTS SECTION (Table)
    // ==========================================
    {
      id: "accounts-section",
      anchor: "accounts",
      title: "Ready Accounts",
      description:
        "Pre-leveled accounts with rare collectibles. All accounts come with full warranty.",
      layout: "table_list",
      tableConfig: {
        columns: [
          { key: "name", label: "Account", sortable: true },
          { key: "details", label: "Details", sortable: false },
          { key: "price", label: "Price", sortable: true },
        ],
        showQuickView: true,
      },
      viewAllHref: "/games/world-of-warcraft/accounts",
      items: [
        {
          id: "acc-001",
          slug: "account-paladin-80",
          title: "Level 80 Paladin - EU",
          subtitle: "485 ilvl, KSM achieved",
          image: "/images/games/wow/accounts/paladin.jpg",
          price: { type: "fixed", value: 249.99 },
          meta: {
            features: ["Invincible Mount", "485 iLvl", "KSM S1"],
          },
          badges: [{ type: "fast", label: "Instant Delivery" }],
          variant: "standard",
        },
        {
          id: "acc-002",
          slug: "account-mage-80",
          title: "Level 80 Mage - US",
          subtitle: "490 ilvl, AOTC all tiers",
          image: "/images/games/wow/accounts/mage.jpg",
          price: { type: "fixed", value: 299.99 },
          meta: {
            features: ["Ashes of Al'ar", "490 iLvl", "AOTC x3"],
          },
          variant: "standard",
        },
        {
          id: "acc-003",
          slug: "account-warrior-80",
          title: "Level 80 Warrior - EU",
          subtitle: "Gladiator S1, rare PvP mounts",
          image: "/images/games/wow/accounts/warrior.jpg",
          price: { type: "fixed", value: 449.99 },
          meta: {
            features: ["Gladiator S1", "Vicious Mounts", "2400 CR"],
          },
          badges: [{ type: "limited", label: "1 Available" }],
          variant: "standard",
        },
        {
          id: "acc-004",
          slug: "account-druid-80",
          title: "Level 80 Druid - US",
          subtitle: "200+ mounts, achievement hunter",
          image: "/images/games/wow/accounts/druid.jpg",
          price: { type: "fixed", value: 599.99 },
          meta: {
            features: ["200+ Mounts", "25k Achieve", "Rare Titles"],
          },
          badges: [{ type: "bestseller" }],
          variant: "standard",
        },
        {
          id: "acc-005",
          slug: "account-hunter-80",
          title: "Level 80 Hunter - EU",
          subtitle: "Fresh 80, basic gear, clean history",
          image: "/images/games/wow/accounts/hunter.jpg",
          price: { type: "fixed", value: 89.99 },
          meta: {
            features: ["Clean Account", "Basic Gear"],
          },
          variant: "standard",
        },
      ],
    },

    // ==========================================
    // COACHING SECTION (Featured Banner)
    // ==========================================
    {
      id: "coaching-section",
      anchor: "coaching",
      title: "Professional Coaching",
      description:
        "Learn from the best. 1-on-1 sessions with top-tier players.",
      layout: "featured_banner",
      items: [
        {
          id: "coaching-featured",
          slug: "coaching-sessions",
          title: "Master WoW with Pro Coaching",
          subtitle:
            "1-on-1 sessions with Mythic raiders and Gladiators. Improve your gameplay, learn advanced strategies, and reach your goals faster.",
          image: "/images/games/wow/coaching/hero.jpg",
          price: { type: "from", value: 29.99 },
          variant: "standard",
        },
      ],
    },
  ],

  // ==========================================
  // SEO CONFIGURATION
  // ==========================================
  seo: {
    title: "WoW Boosting Services | Buy WoW Carries & Gold | BSTR4",
    description:
      "Professional World of Warcraft boosting services. Raid carries, Mythic+ dungeons, PvP rating boosts, and gold. Fast delivery, VPN protection, and money-back guarantee.",
    content: `
      <p>Welcome to BSTR4's World of Warcraft boosting services. We provide the fastest and safest WoW carries available, backed by over 12,000 completed orders and a 99.2% satisfaction rate.</p>
      
      <h3>Why Choose Our WoW Services?</h3>
      <p>Our team consists of professional players with years of experience in both PvE and PvP content. Every booster on our roster has achieved Cutting Edge in current content and maintains a 3500+ Mythic+ rating.</p>
      
      <h3>Complete Safety</h3>
      <p>We take account security seriously. All piloted services use VPN protection matching your regular login location. Our boosters appear offline and never interact with other players on your account. We've maintained a 100% safety record since launch.</p>
      
      <h3>Services We Offer</h3>
      <ul>
        <li><strong>Raid Carries:</strong> From Normal to Mythic difficulty, including Cutting Edge achievements</li>
        <li><strong>Mythic+ Dungeons:</strong> Single keys, weekly fills, and rating boosts up to 4000+</li>
        <li><strong>PvP Rating:</strong> Arena 2v2/3v3, RBG rating, and Gladiator titles</li>
        <li><strong>Leveling:</strong> Fast power-leveling with optional gear packages</li>
        <li><strong>Gold:</strong> Safe gold delivery to any server</li>
      </ul>
      
      <h3>How It Works</h3>
      <p>Simply select your desired service, customize the options to match your needs, and complete checkout. Our team will contact you within 15 minutes to schedule your boost. Most services begin within 1 hour of purchase.</p>
    `,
    faq: [
      {
        question: "Is WoW boosting safe? Will I get banned?",
        answer:
          "<p>Yes, our services are completely safe. We've completed over 12,000 orders without a single ban. For piloted services, we use VPN protection that matches your regular login location, appear offline during play, and never interact with other players or engage in suspicious behavior.</p><p>For self-play services, you play on your own account alongside our boosters, which carries zero risk.</p>",
      },
      {
        question: "How long does a typical boost take?",
        answer:
          "<p>Delivery times vary by service:</p><ul><li><strong>Mythic+ dungeons:</strong> 30-60 minutes per key</li><li><strong>Raid carries:</strong> 2-4 hours depending on difficulty</li><li><strong>PvP rating:</strong> 1-7 days depending on rating gap</li><li><strong>Leveling 70-80:</strong> 8-12 hours</li><li><strong>Gold delivery:</strong> Usually within 15-30 minutes</li></ul>",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "<p>We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency (Bitcoin, Ethereum, USDT). Crypto payments receive an automatic 5% discount.</p>",
      },
      {
        question: "Can I choose my booster or play with a specific class?",
        answer:
          "<p>Yes! For services where it matters, you can request specific classes or roles. Premium options allow you to select from available boosters based on their ratings and reviews. For Mythic+ rating boosts, you can specify your preferred composition.</p>",
      },
      {
        question: "What happens if the boost isn't completed?",
        answer:
          "<p>We guarantee completion of all services. If for any reason we cannot complete your order, you'll receive a full refund. Our completion rate is 99.8% - the only failures are due to customer account issues (locked accounts, etc.).</p>",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "<p>Yes. If your order hasn't started, you can request a full refund at any time. For orders in progress, we offer partial refunds based on completion percentage. If we fail to deliver as promised, you receive a 100% refund plus compensation for your trouble.</p>",
      },
      {
        question: "Is self-play or piloted better?",
        answer:
          "<p><strong>Self-play</strong> means you play on your account alongside our boosters. It's 100% safe and lets you learn from pros, but requires your time and availability.</p><p><strong>Piloted</strong> means our boosters play on your account while you're away. It's more convenient but requires account sharing. Both options are safe - choose based on your preference.</p>",
      },
      {
        question: "What regions do you support?",
        answer:
          "<p>We support all WoW regions: US, EU, and Oceanic. Select your region during checkout, and we'll match you with boosters on the appropriate servers. Cross-region play is available for some services at no extra cost.</p>",
      },
    ],
  },

  // ==========================================
  // CROSS-SELL (Optional)
  // ==========================================
  crossSell: {
    title: "Players Also Purchased",
    items: [
      {
        id: "cross-1",
        slug: "diablo-4",
        title: "Diablo 4 Services",
        subtitle: "Leveling, Nightmare Dungeons & more",
        image: "/images/games/diablo4/thumb.jpg",
        price: { type: "from", value: 9.99 },
        variant: "compact",
      },
      {
        id: "cross-2",
        slug: "final-fantasy-xiv",
        title: "FFXIV Services",
        subtitle: "Raids, Leveling & Gil",
        image: "/images/games/ffxiv/thumb.jpg",
        price: { type: "from", value: 14.99 },
        variant: "compact",
      },
      {
        id: "cross-3",
        slug: "path-of-exile",
        title: "Path of Exile Services",
        subtitle: "Currency, Leveling & Boss Kills",
        image: "/images/games/poe/thumb.jpg",
        price: { type: "from", value: 4.99 },
        variant: "compact",
      },
    ],
  },
};
