// src/data/catalogue/blueprints/dota-2.ts

import { GamePageBlueprint } from "@/components/engine/types";

export const dota2Blueprint: GamePageBlueprint = {
  gameSlug: "dota-2",
  gameName: "Dota 2",

  theme: {
    primaryColor: "#c23c2a",
    secondaryColor: "#1a1a1a",
    backgroundImage: "/images/games/dota2/hero-bg.jpg",
  },

  // ==========================================
  // ZONE 0: TRUST BAR
  // ==========================================
  trustBar: {
    stats: [
      {
        id: "orders",
        icon: "CheckCircle",
        value: "8,432",
        label: "Orders Completed",
      },
      { id: "time", icon: "Zap", value: "12 min", label: "Avg. Start Time" },
      { id: "boosters", icon: "Users", value: "18", label: "Boosters Online" },
      { id: "rating", icon: "Star", value: "4.9", label: "Customer Rating" },
    ],
    badges: ["vpn_protected", "ban_guarantee", "live_support"],
  },

  // ==========================================
  // ZONE 1: HERO
  // ==========================================
  hero: {
    title: "Dota 2",
    subtitle:
      "Professional MMR boosting, coaching, and account services. Reach your dream rank with 7K+ MMR boosters.",
    variant: "quick_boost",
    backgroundImage: "/images/games/dota2/hero-bg.jpg",
    quickBoostConfig: {
      productSlug: "mmr-boost",
      title: "Quick MMR Boost",
      rankOptions: [
        {
          label: "Herald",
          value: "herald",
          icon: "/images/games/dota2/ranks/herald.png",
          tier: 1,
        },
        {
          label: "Guardian",
          value: "guardian",
          icon: "/images/games/dota2/ranks/guardian.png",
          tier: 2,
        },
        {
          label: "Crusader",
          value: "crusader",
          icon: "/images/games/dota2/ranks/crusader.png",
          tier: 3,
        },
        {
          label: "Archon",
          value: "archon",
          icon: "/images/games/dota2/ranks/archon.png",
          tier: 4,
        },
        {
          label: "Legend",
          value: "legend",
          icon: "/images/games/dota2/ranks/legend.png",
          tier: 5,
        },
        {
          label: "Ancient",
          value: "ancient",
          icon: "/images/games/dota2/ranks/ancient.png",
          tier: 6,
        },
        {
          label: "Divine",
          value: "divine",
          icon: "/images/games/dota2/ranks/divine.png",
          tier: 7,
        },
        {
          label: "Immortal",
          value: "immortal",
          icon: "/images/games/dota2/ranks/immortal.png",
          tier: 8,
        },
      ],
      basePrice: 9.99,
      pricePerTier: 29.99,
    },
  },

  // ==========================================
  // ZONE 2: CATEGORY TABS
  // ==========================================
  tabs: [
    {
      id: "boosting",
      label: "Boosting",
      icon: "TrendingUp",
      anchor: "boosting",
      productCount: 8,
    },
    {
      id: "coaching",
      label: "Coaching",
      icon: "GraduationCap",
      anchor: "coaching",
      productCount: 5,
    },
    {
      id: "battle-pass",
      label: "Battle Pass",
      icon: "Award",
      anchor: "battle-pass",
      productCount: 4,
    },
    {
      id: "dota-plus",
      label: "Dota Plus",
      icon: "Plus",
      anchor: "dota-plus",
      productCount: 3,
    },
    {
      id: "accounts",
      label: "Accounts",
      icon: "User",
      anchor: "accounts",
      productCount: 10,
    },
    {
      id: "items",
      label: "Items & Sets",
      icon: "Package",
      anchor: "items",
      productCount: 6,
    },
  ],

  // ==========================================
  // ZONE 3: CONTENT SECTIONS
  // ==========================================
  sections: [
    // ==========================================
    // BOOSTING SECTION
    // ==========================================
    {
      id: "boosting",
      anchor: "boosting",
      title: "MMR & Rank Boosting",
      description:
        "Climb the ranks with our professional 7K+ MMR boosters. VPN protection and offline mode included.",
      layout: "grid_cards",
      gridConfig: {
        columns: { mobile: 1, tablet: 2, desktop: 4 },
        cardVariant: "variable",
      },
      viewAllHref: "/games/dota-2/boosting",
      items: [
        {
          id: "mmr-boost-solo",
          slug: "mmr-boost",
          title: "Solo MMR Boost",
          subtitle: "Our booster plays on your account to desired rank",
          image: "/images/games/dota2/services/mmr-boost.jpg",
          price: { type: "range", value: 9.99, maxValue: 499.99 },
          meta: {
            rating: 4.9,
            reviewCount: 2341,
            features: ["VPN Protected", "Offline Mode"],
          },
          badges: [{ type: "bestseller" }],
          variant: "variable",
        },
        {
          id: "mmr-boost-duo",
          slug: "mmr-boost-duo",
          title: "Duo MMR Boost",
          subtitle: "Play alongside our booster and rank up together",
          image: "/images/games/dota2/services/duo-boost.jpg",
          price: { type: "range", value: 14.99, maxValue: 699.99 },
          meta: {
            rating: 4.9,
            reviewCount: 892,
            features: ["Play Together", "Learn While Climbing"],
          },
          badges: [{ type: "fast", label: "Popular" }],
          variant: "variable",
        },
        {
          id: "calibration",
          slug: "calibration-matches",
          title: "Calibration Matches",
          subtitle: "Get the best possible starting rank on new/reset account",
          image: "/images/games/dota2/services/calibration.jpg",
          price: { type: "fixed", value: 49.99 },
          meta: {
            duration: "10 games",
            rating: 4.8,
            reviewCount: 567,
            features: ["80%+ Winrate", "Fast Completion"],
          },
          variant: "standard",
        },
        {
          id: "net-wins",
          slug: "net-wins",
          title: "Net Wins",
          subtitle: "Pay per guaranteed win, flexible and simple",
          image: "/images/games/dota2/services/net-wins.jpg",
          price: { type: "rate", value: 4.99, unit: "per win" },
          meta: {
            rating: 4.8,
            reviewCount: 1234,
            features: ["Guaranteed Wins", "Flexible"],
          },
          variant: "variable",
        },
        {
          id: "behavior-score",
          slug: "behavior-score-boost",
          title: "Behavior Score Boost",
          subtitle: "Raise your behavior score for better matchmaking",
          image: "/images/games/dota2/services/behavior-score.jpg",
          price: { type: "range", value: 19.99, maxValue: 99.99 },
          meta: {
            duration: "1-5 days",
            rating: 4.7,
            reviewCount: 456,
            features: ["Turbo Games", "Fast Recovery"],
          },
          variant: "variable",
        },
        {
          id: "low-priority",
          slug: "low-priority-removal",
          title: "Low Priority Removal",
          subtitle: "Get out of LP queue fast with guaranteed wins",
          image: "/images/games/dota2/services/low-priority.jpg",
          price: { type: "rate", value: 3.99, unit: "per game" },
          meta: {
            duration: "1-3 hours",
            rating: 4.9,
            reviewCount: 789,
            features: ["Fast Removal", "Same Day"],
          },
          badges: [{ type: "fast" }],
          variant: "variable",
        },
        {
          id: "normal-games",
          slug: "normal-games-boost",
          title: "Normal Games",
          subtitle: "Unranked wins for behavior score or warming up",
          image: "/images/games/dota2/services/normal-games.jpg",
          price: { type: "rate", value: 2.99, unit: "per game" },
          meta: {
            rating: 4.8,
            reviewCount: 234,
          },
          variant: "variable",
        },
        {
          id: "turbo-games",
          slug: "turbo-games-boost",
          title: "Turbo Games",
          subtitle: "Fast games for challenges, behavior score, or fun",
          image: "/images/games/dota2/services/turbo.jpg",
          price: { type: "rate", value: 1.99, unit: "per game" },
          meta: {
            duration: "15-25 min/game",
            rating: 4.8,
            reviewCount: 345,
          },
          variant: "variable",
        },
      ],
    },

    // ==========================================
    // COACHING SECTION
    // ==========================================
    {
      id: "coaching",
      anchor: "coaching",
      title: "Professional Coaching",
      description:
        "Learn from 7K+ MMR players. Improve your gameplay, decision making, and climb faster.",
      layout: "grid_cards",
      gridConfig: {
        columns: { mobile: 1, tablet: 2, desktop: 3 },
        cardVariant: "standard",
      },
      viewAllHref: "/games/dota-2/coaching",
      items: [
        {
          id: "live-coaching",
          slug: "live-coaching",
          title: "Live Game Coaching",
          subtitle: "Real-time guidance during your ranked games via voice",
          image: "/images/games/dota2/coaching/live.jpg",
          price: { type: "rate", value: 19.99, unit: "per hour" },
          meta: {
            rating: 5.0,
            reviewCount: 234,
            features: ["Voice Comms", "Real-Time Tips"],
          },
          badges: [{ type: "bestseller" }],
          variant: "variable",
        },
        {
          id: "replay-analysis",
          slug: "replay-analysis",
          title: "Replay Analysis",
          subtitle: "In-depth review of your games with detailed feedback",
          image: "/images/games/dota2/coaching/replay.jpg",
          price: { type: "rate", value: 14.99, unit: "per replay" },
          meta: {
            duration: "45-60 min session",
            rating: 4.9,
            reviewCount: 456,
            features: ["Detailed Report", "VOD Review"],
          },
          variant: "variable",
        },
        {
          id: "hero-coaching",
          slug: "hero-coaching",
          title: "Hero Mastery Coaching",
          subtitle: "Master any hero with specialized training sessions",
          image: "/images/games/dota2/coaching/hero.jpg",
          price: { type: "rate", value: 24.99, unit: "per hour" },
          meta: {
            rating: 4.9,
            reviewCount: 189,
            features: ["Any Hero", "Combos & Matchups"],
          },
          variant: "variable",
        },
        {
          id: "role-coaching",
          slug: "role-coaching",
          title: "Role-Specific Coaching",
          subtitle: "Dedicated training for Pos 1, 2, 3, 4, or 5",
          image: "/images/games/dota2/coaching/role.jpg",
          price: { type: "rate", value: 24.99, unit: "per hour" },
          meta: {
            rating: 4.9,
            reviewCount: 167,
            features: ["Role Focus", "Draft Help"],
          },
          variant: "variable",
        },
        {
          id: "coaching-bundle",
          slug: "coaching-bundle",
          title: "5-Session Coaching Bundle",
          subtitle: "Comprehensive improvement program with progress tracking",
          image: "/images/games/dota2/coaching/bundle.jpg",
          price: { type: "fixed", value: 79.99, originalValue: 99.95 },
          meta: {
            duration: "5 hours total",
            features: ["20% Savings", "Progress Report"],
          },
          badges: [{ type: "sale", label: "-20%" }],
          variant: "standard",
        },
      ],
    },

    // ==========================================
    // BATTLE PASS SECTION (Carousel - Seasonal)
    // ==========================================
    {
      id: "battle-pass",
      anchor: "battle-pass",
      title: "Battle Pass Services",
      description:
        "Level up your Battle Pass fast. Cavern Crawl, weekly challenges, and level grinding.",
      layout: "carousel",
      items: [
        {
          id: "bp-leveling",
          slug: "battle-pass-leveling",
          title: "Battle Pass Leveling",
          subtitle: "Grind levels through challenges and games",
          image: "/images/games/dota2/battlepass/leveling.jpg",
          price: { type: "range", value: 9.99, maxValue: 199.99 },
          meta: {
            rating: 4.8,
            reviewCount: 567,
            features: ["Any Level Target", "Fast Grinding"],
          },
          badges: [{ type: "bestseller" }],
          variant: "variable",
        },
        {
          id: "cavern-crawl",
          slug: "cavern-crawl-completion",
          title: "Cavern Crawl Completion",
          subtitle: "Complete all cavern crawl paths for maximum rewards",
          image: "/images/games/dota2/battlepass/cavern.jpg",
          price: { type: "from", value: 29.99 },
          meta: {
            duration: "3-7 days",
            rating: 4.9,
            reviewCount: 234,
            features: ["All Paths", "All Rewards"],
          },
          variant: "variable",
        },
        {
          id: "weekly-challenges",
          slug: "weekly-challenges",
          title: "Weekly Challenges",
          subtitle: "Complete all weekly challenges for bonus BP levels",
          image: "/images/games/dota2/battlepass/weekly.jpg",
          price: { type: "fixed", value: 14.99 },
          meta: {
            duration: "1-2 days",
            rating: 4.8,
            reviewCount: 189,
          },
          variant: "standard",
        },
        {
          id: "battlecup",
          slug: "battlecup-boost",
          title: "Battle Cup Boost",
          subtitle: "Win Battle Cup with our professional stack",
          image: "/images/games/dota2/battlepass/battlecup.jpg",
          price: { type: "from", value: 19.99 },
          meta: {
            duration: "Tournament day",
            rating: 4.9,
            reviewCount: 456,
            features: ["Pro Stack", "High Winrate"],
          },
          badges: [{ type: "limited", label: "Weekends Only" }],
          variant: "variable",
        },
      ],
    },

    // ==========================================
    // DOTA PLUS SECTION
    // ==========================================
    {
      id: "dota-plus",
      anchor: "dota-plus",
      title: "Dota Plus Services",
      description:
        "Maximize your Dota Plus subscription with challenge completion and shard farming.",
      layout: "grid_cards",
      gridConfig: {
        columns: { mobile: 1, tablet: 2, desktop: 3 },
        cardVariant: "standard",
      },
      items: [
        {
          id: "dota-plus-challenges",
          slug: "dota-plus-challenges",
          title: "Dota Plus Challenges",
          subtitle: "Complete hero challenges for shards and progression",
          image: "/images/games/dota2/dotaplus/challenges.jpg",
          price: { type: "rate", value: 4.99, unit: "per hero" },
          meta: {
            rating: 4.8,
            reviewCount: 234,
            features: ["Any Hero", "All Tiers"],
          },
          variant: "variable",
        },
        {
          id: "shard-farming",
          slug: "shard-farming",
          title: "Shard Farming",
          subtitle: "Grind shards through games and challenges",
          image: "/images/games/dota2/dotaplus/shards.jpg",
          price: { type: "rate", value: 9.99, unit: "per 10,000" },
          meta: {
            rating: 4.7,
            reviewCount: 123,
          },
          variant: "variable",
        },
        {
          id: "guild-contracts",
          slug: "guild-contracts",
          title: "Guild Contracts",
          subtitle: "Complete daily and weekly guild contracts",
          image: "/images/games/dota2/dotaplus/guild.jpg",
          price: { type: "rate", value: 2.99, unit: "per contract" },
          meta: {
            rating: 4.8,
            reviewCount: 167,
            features: ["Daily & Weekly", "Guild Points"],
          },
          variant: "variable",
        },
      ],
    },

    // ==========================================
    // ACCOUNTS SECTION (Table Layout)
    // ==========================================
    {
      id: "accounts",
      anchor: "accounts",
      title: "Accounts & Services",
      description:
        "Ready-to-play accounts and account services. All accounts include full warranty.",
      layout: "table_list",
      tableConfig: {
        columns: [
          { key: "name", label: "Account", sortable: true },
          { key: "details", label: "Details", sortable: false },
          { key: "price", label: "Price", sortable: true },
        ],
        showQuickView: true,
      },
      viewAllHref: "/games/dota-2/accounts",
      items: [
        {
          id: "acc-immortal",
          slug: "account-immortal",
          title: "Immortal Account",
          subtitle: "6000+ MMR, ready to play",
          image: "/images/games/dota2/accounts/immortal.jpg",
          price: { type: "fixed", value: 299.99 },
          meta: {
            features: ["6000+ MMR", "10k Behavior", "Phone Verified"],
          },
          badges: [{ type: "limited", label: "2 Available" }],
          variant: "standard",
        },
        {
          id: "acc-divine",
          slug: "account-divine",
          title: "Divine Account",
          subtitle: "5000-5500 MMR, clean history",
          image: "/images/games/dota2/accounts/divine.jpg",
          price: { type: "fixed", value: 149.99 },
          meta: {
            features: ["5000+ MMR", "10k Behavior", "Phone Verified"],
          },
          variant: "standard",
        },
        {
          id: "acc-ancient",
          slug: "account-ancient",
          title: "Ancient Account",
          subtitle: "4000-4500 MMR, perfect starter",
          image: "/images/games/dota2/accounts/ancient.jpg",
          price: { type: "fixed", value: 79.99 },
          meta: {
            features: ["4000+ MMR", "10k Behavior", "Phone Verified"],
          },
          badges: [{ type: "bestseller" }],
          variant: "standard",
        },
        {
          id: "acc-legend",
          slug: "account-legend",
          title: "Legend Account",
          subtitle: "3000-3500 MMR, budget friendly",
          image: "/images/games/dota2/accounts/legend.jpg",
          price: { type: "fixed", value: 49.99 },
          meta: {
            features: ["3000+ MMR", "10k Behavior", "Phone Verified"],
          },
          variant: "standard",
        },
        {
          id: "acc-fresh",
          slug: "account-fresh",
          title: "Fresh Ranked Ready",
          subtitle: "Level 25+, ready for calibration",
          image: "/images/games/dota2/accounts/fresh.jpg",
          price: { type: "fixed", value: 14.99 },
          meta: {
            features: ["Level 25+", "Ranked Unlocked", "Clean"],
          },
          variant: "standard",
        },
        {
          id: "account-leveling",
          slug: "account-leveling",
          title: "Account Leveling",
          subtitle: "Level up trophy level and unlock features",
          image: "/images/games/dota2/accounts/leveling.jpg",
          price: { type: "range", value: 9.99, maxValue: 49.99 },
          meta: {
            features: ["Trophy Level", "Unlock Ranked"],
          },
          variant: "variable",
        },
        {
          id: "phone-verification",
          slug: "phone-verification",
          title: "Phone Number Verification",
          subtitle: "Add phone number to your account for ranked",
          image: "/images/games/dota2/accounts/phone.jpg",
          price: { type: "fixed", value: 4.99 },
          meta: {
            duration: "Instant",
            features: ["Permanent", "Any Region"],
          },
          badges: [{ type: "fast", label: "Instant" }],
          variant: "standard",
        },
      ],
    },

    // ==========================================
    // ITEMS & SETS SECTION
    // ==========================================
    {
      id: "items",
      anchor: "items",
      title: "Items & Sets",
      description:
        "Rare cosmetics, Arcanas, and exclusive sets at competitive prices.",
      layout: "grid_cards",
      gridConfig: {
        columns: { mobile: 2, tablet: 3, desktop: 4 },
        cardVariant: "standard",
      },
      viewAllHref: "/games/dota-2/items",
      items: [
        {
          id: "arcana-bundle",
          slug: "arcana-bundle",
          title: "Arcana Bundle",
          subtitle: "Any 3 Arcanas of your choice",
          image: "/images/games/dota2/items/arcana-bundle.jpg",
          price: { type: "fixed", value: 89.99, originalValue: 104.97 },
          meta: {
            features: ["Any 3 Arcanas", "Gift Trade"],
          },
          badges: [{ type: "sale", label: "-15%" }],
          variant: "standard",
        },
        {
          id: "arcana-single",
          slug: "arcana-single",
          title: "Single Arcana",
          subtitle: "Any Arcana item delivered to your account",
          image: "/images/games/dota2/items/arcana.jpg",
          price: { type: "from", value: 24.99 },
          meta: {
            features: ["Any Hero", "Fast Delivery"],
          },
          variant: "variable",
        },
        {
          id: "immortal-treasure",
          slug: "immortal-treasures",
          title: "Immortal Treasures",
          subtitle: "Battle Pass immortals and rare drops",
          image: "/images/games/dota2/items/immortal.jpg",
          price: { type: "from", value: 2.99 },
          meta: {
            features: ["All Treasures", "Rare Drops"],
          },
          variant: "variable",
        },
        {
          id: "collector-cache",
          slug: "collector-cache-sets",
          title: "Collector's Cache Sets",
          subtitle: "Exclusive TI sets, giftable once",
          image: "/images/games/dota2/items/cache.jpg",
          price: { type: "from", value: 4.99 },
          meta: {
            features: ["TI Exclusive", "Untradeable"],
          },
          badges: [{ type: "limited" }],
          variant: "variable",
        },
        {
          id: "rare-sets",
          slug: "rare-sets",
          title: "Rare Courier & Wards",
          subtitle: "Legacy couriers, unusual effects, rare wards",
          image: "/images/games/dota2/items/courier.jpg",
          price: { type: "from", value: 9.99 },
          meta: {
            features: ["Unusual Effects", "Legacy"],
          },
          variant: "variable",
        },
        {
          id: "custom-order",
          slug: "custom-item-order",
          title: "Custom Item Order",
          subtitle: "Request any specific item, we'll find it",
          image: "/images/games/dota2/items/custom.jpg",
          price: { type: "from", value: 1.99 },
          meta: {
            features: ["Any Item", "Price Match"],
          },
          variant: "variable",
        },
      ],
    },

    // ==========================================
    // FEATURED BANNER - MMR BOOST PROMO
    // ==========================================
    {
      id: "promo-banner",
      anchor: "promo",
      title: "Special Offer",
      layout: "featured_banner",
      items: [
        {
          id: "summer-promo",
          slug: "mmr-boost",
          title: "New Season Special: 15% Off All MMR Boosts",
          subtitle:
            "Start the new ranked season strong. Use code NEWSEASON at checkout. Limited time offer.",
          image: "/images/games/dota2/promo/season-banner.jpg",
          price: { type: "from", value: 8.49 },
          variant: "standard",
        },
      ],
    },
  ],

  // ==========================================
  // ZONE 4: SEO CONFIGURATION
  // ==========================================
  seo: {
    title: "Dota 2 Boosting Services | MMR Boost, Coaching & Accounts | BSTR4",
    description:
      "Professional Dota 2 MMR boosting from 7K+ players. Solo & duo queue, coaching, Battle Pass leveling, and ranked accounts. VPN protected, fast delivery, money-back guarantee.",
    content: `
      <p>Welcome to BSTR4's Dota 2 boosting services. We provide the fastest and safest MMR boosting available, powered by a team of 7,000+ MMR professional players with years of competitive experience.</p>
      
      <h3>Why Choose Our Dota 2 Services?</h3>
      <p>Our boosters are handpicked from the top 1% of Dota 2 players. Every booster on our team has achieved Immortal rank and maintains strict quality standards. We've completed over 8,000 orders with a 99.3% satisfaction rate.</p>
      
      <h3>MMR Boosting Options</h3>
      <p>We offer flexible boosting options to match your needs:</p>
      <ul>
        <li><strong>Solo Boost:</strong> Our booster plays on your account while you're away. Fastest option with VPN protection and offline mode.</li>
        <li><strong>Duo Boost:</strong> Play alongside our booster and rank up together. Learn while climbing and enjoy the games.</li>
        <li><strong>Net Wins:</strong> Pay per win with no rank commitment. Perfect for maintaining or slowly climbing.</li>
        <li><strong>Calibration:</strong> Get the best possible starting rank on new or reset accounts.</li>
      </ul>
      
      <h3>Complete Account Safety</h3>
      <p>We take your account security seriously. All piloted services include:</p>
      <ul>
        <li>VPN protection matching your login location</li>
        <li>Offline/invisible mode during boosting</li>
        <li>No communication with other players</li>
        <li>No item trading or suspicious activity</li>
        <li>Full account recovery guarantee</li>
      </ul>
      
      <h3>Additional Services</h3>
      <p>Beyond MMR boosting, we offer comprehensive Dota 2 services including professional coaching from Immortal players, Battle Pass leveling, behavior score recovery, low priority removal, and verified accounts ready to play.</p>
      
      <h3>Regions Supported</h3>
      <p>We support all Dota 2 regions including EU West, EU East, US East, US West, Russia, SEA, and more. Select your region during checkout for accurate pricing and booster matching.</p>
    `,
    faq: [
      {
        question: "Is Dota 2 MMR boosting safe? Will my account get banned?",
        answer:
          "<p>Yes, our boosting services are completely safe. We've completed over 8,000 orders without any VAC bans. We use VPN protection that matches your regular login location, play in offline mode, and never engage in any suspicious behavior like trading items or chatting with other players.</p><p>Valve does not actively ban for boosting, and our methods ensure your account looks like normal solo queue games.</p>",
      },
      {
        question: "How long does MMR boosting take?",
        answer:
          "<p>Delivery time depends on the MMR gap:</p><ul><li><strong>500 MMR:</strong> 1-2 days</li><li><strong>1000 MMR:</strong> 2-4 days</li><li><strong>2000 MMR:</strong> 5-8 days</li><li><strong>3000+ MMR:</strong> 10-14 days</li></ul><p>Express options are available for faster delivery at additional cost. Duo boosting typically takes 20-30% longer due to coordination.</p>",
      },
      {
        question: "What is duo boosting and how does it work?",
        answer:
          "<p>Duo boosting means you play on your own account while partied with our professional booster. You'll be in voice communication and play together as a team. This option is great if you want to:</p><ul><li>Learn from a high-level player while climbing</li><li>Enjoy the games rather than just getting results</li><li>Avoid account sharing entirely</li></ul><p>Duo boosting costs more due to the time investment but many customers prefer it for the learning experience.</p>",
      },
      {
        question: "How does behavior score boosting work?",
        answer:
          "<p>We recover your behavior score by playing games with positive impact - no abandons, no reports, commends from teammates. We typically use Turbo mode for faster games. Recovery rate is approximately 500-1000 behavior score per day depending on your starting point.</p><p>If you're below 3000 behavior score or in low priority, we recommend starting with LP removal first.</p>",
      },
      {
        question: "Can I choose which heroes the booster plays?",
        answer:
          "<p>Yes! You can specify:</p><ul><li>Heroes you want played (or avoided)</li><li>Preferred roles (Pos 1-5)</li><li>Playing style preferences</li></ul><p>This is available as a free option during checkout. Note that very specific restrictions may slightly increase completion time.</p>",
      },
      {
        question: "What happens if I lose MMR during the boost?",
        answer:
          "<p>Our boosters maintain 80%+ winrate, but losses can happen. Any MMR lost during the boost is recovered for free - you'll always reach your target rank. We guarantee the final result, not a specific winrate.</p>",
      },
      {
        question: "Can I play on my account during the boost?",
        answer:
          "<p>For solo boosting, we ask that you don't play ranked games while the boost is in progress to avoid complications. You can play unranked, custom games, or other modes. For duo boosting, you'll be playing together so this isn't an issue.</p><p>We'll coordinate schedules with you to find times that work.</p>",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "<p>Yes. Before work begins, you can cancel for a full refund. Once boosting starts, we offer partial refunds based on completion percentage. If we fail to deliver as promised for any reason, you receive a 100% refund plus compensation.</p>",
      },
      {
        question: "How do I track my boost progress?",
        answer:
          "<p>You'll have access to:</p><ul><li>Real-time order status in your dashboard</li><li>Match history updates</li><li>Direct chat with your booster</li><li>Optional streaming of your games</li></ul><p>We send notifications when games are played and when milestones are reached.</p>",
      },
      {
        question: "What MMR can you boost to?",
        answer:
          "<p>We can boost to any rank up to high Immortal (7500+ MMR). For ranks above Immortal top 1000, please contact us for custom quotes as these require our elite boosters and take significantly longer.</p>",
      },
    ],
  },

  // ==========================================
  // ZONE 5: CROSS-SELL
  // ==========================================
  crossSell: {
    title: "Similar Games You Might Like",
    items: [
      {
        id: "cross-lol",
        slug: "league-of-legends",
        title: "League of Legends",
        subtitle: "Ranked boosting & coaching",
        image: "/images/games/lol/thumb.jpg",
        price: { type: "from", value: 9.99 },
        variant: "compact",
      },
      {
        id: "cross-valorant",
        slug: "valorant",
        title: "Valorant",
        subtitle: "Rank boosting & accounts",
        image: "/images/games/valorant/thumb.jpg",
        price: { type: "from", value: 14.99 },
        variant: "compact",
      },
      {
        id: "cross-cs2",
        slug: "counter-strike-2",
        title: "Counter-Strike 2",
        subtitle: "Premier & Faceit boosting",
        image: "/images/games/cs2/thumb.jpg",
        price: { type: "from", value: 12.99 },
        variant: "compact",
      },
    ],
  },
};
