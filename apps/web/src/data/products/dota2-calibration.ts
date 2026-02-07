// src/data/products/dota2-calibration.ts

import { ProductPageData } from "@/components/product/types";

export const dota2CalibrationProduct: ProductPageData = {
  // Identity
  id: "dota2-calibration",
  slug: "calibration-matches",
  gameSlug: "dota-2",
  gameName: "Dota 2",

  // Basic Info
  title: "Calibration Matches",
  shortDescription:
    "Get the best possible starting rank on your new or reset account. Our 7K+ MMR boosters achieve 80%+ winrate in calibration games.",

  // Media
  heroImage: "/images/games/dota2/products/calibration-hero.jpg",
  galleryImages: [
    "/images/games/dota2/products/calibration-1.jpg",
    "/images/games/dota2/products/calibration-2.jpg",
    "/images/games/dota2/products/calibration-3.jpg",
  ],
  icon: "🎯",
  // Calculator Configuration
  calculator: {
    layout: "sidebar",

    primaryInput: {
      type: "fixed",
      price: 49.99,
      description: "10 Calibration Matches",
    },

    modifiers: [
      {
        id: "region",
        label: "Server Region",
        options: [
          {
            value: "eu_west",
            label: "EU West",
            priceModifier: 0,
            priceType: "percentage",
          },
          {
            value: "eu_east",
            label: "EU East",
            priceModifier: 0,
            priceType: "percentage",
          },
          {
            value: "us_east",
            label: "US East",
            priceModifier: 5,
            priceType: "percentage",
          },
          {
            value: "us_west",
            label: "US West",
            priceModifier: 5,
            priceType: "percentage",
          },
          {
            value: "sea",
            label: "Southeast Asia",
            priceModifier: -5,
            priceType: "percentage",
          },
          {
            value: "russia",
            label: "Russia",
            priceModifier: 0,
            priceType: "percentage",
          },
        ],
        defaultValue: "eu_west",
      },
      {
        id: "behavior_score",
        label: "Behavior Score",
        options: [
          {
            value: "9000_10000",
            label: "9,000 - 10,000",
            priceModifier: 0,
            priceType: "percentage",
          },
          {
            value: "6000_9000",
            label: "6,000 - 9,000",
            priceModifier: 0,
            priceType: "percentage",
          },
          {
            value: "3000_6000",
            label: "3,000 - 6,000",
            priceModifier: 20,
            priceType: "percentage",
          },
          {
            value: "1_3000",
            label: "Below 3,000",
            priceModifier: 40,
            priceType: "percentage",
          },
        ],
        defaultValue: "9000_10000",
      },
    ],

    addOns: [
      {
        id: "stream",
        label: "Stream Games",
        description: "Watch all calibration games live via Discord",
        price: 15,
        priceType: "flat",
        icon: "Video",
        popular: true,
      },
      {
        id: "priority",
        label: "Priority Queue",
        description: "Start within 1 hour guaranteed",
        price: 20,
        priceType: "percentage",
        icon: "Zap",
      },
      {
        id: "specific_heroes",
        label: "Specific Heroes",
        description: "Choose preferred heroes for calibration",
        price: 0,
        priceType: "flat",
        icon: "Target",
      },
      {
        id: "role_preference",
        label: "Role Preference",
        description: "Specify your preferred role (Pos 1-5)",
        price: 0,
        priceType: "flat",
        icon: "Users",
      },
      {
        id: "screenshot_updates",
        label: "Screenshot Updates",
        description: "Receive screenshots after each game",
        price: 5,
        priceType: "flat",
        icon: "Camera",
      },
    ],

    display: {
      showEstimatedTime: true,
      showOnlineBoosters: true,
      showTodayOrders: true,
      showTrustBadges: true,
    },
  },

  // Trust Indicators
  trust: {
    rating: 4.9,
    reviewCount: 567,
    completedOrders: 8432,
    onlineBoosters: 18,
    todayOrders: 47,
    avgStartTime: "15 min",
  },

  features: [
    "80%+ Winrate Guaranteed",
    "7K+ MMR Professional Boosters",
    "VPN Protection Included",
    "Offline Mode During Games",
    "Live Progress Tracking",
    "Money Back Guarantee",
  ],

  guarantees: [
    {
      icon: "Shield",
      title: "Ban Guarantee",
      description: "100% safe or full refund",
    },
    {
      icon: "RefreshCcw",
      title: "Money Back",
      description: "Not satisfied? Get refunded",
    },
    {
      icon: "Lock",
      title: "VPN Protected",
      description: "Your location stays hidden",
    },
    {
      icon: "Headphones",
      title: "24/7 Support",
      description: "Get help anytime you need",
    },
  ],

  // Content Sections
  content: {
    description: `
      <p>Our <strong>Dota 2 Calibration Matches</strong> service is designed to give your account the best possible starting rank. Whether you're calibrating a fresh account or recalibrating after a season reset, our professional boosters will maximize your MMR potential.</p>
      
      <h3>What You Get</h3>
      <p>Our 7,000+ MMR boosters will play your 10 calibration matches with an expected <strong>80%+ winrate</strong>. This means you'll start your ranked journey at a significantly higher MMR than if you calibrated yourself.</p>
      
      <h3>Why Calibration Matters</h3>
      <p>Calibration matches have a much higher impact on your MMR than regular ranked games. Each win or loss during calibration can swing your final rank by hundreds of MMR. Starting with a professional booster ensures you don't waste this crucial opportunity.</p>
      
      <h3>Perfect For</h3>
      <ul>
        <li>New accounts that just reached level 25</li>
        <li>Returning players after a long break</li>
        <li>Seasonal rank resets</li>
        <li>Smurf account calibration</li>
        <li>Players who want to skip the grind</li>
      </ul>
      
      <h3>Account Requirements</h3>
      <p>Your account must be ranked-ready (level 25+) and have a phone number linked. If you need help with account leveling or phone verification, check out our <a href="/games/dota-2/account-leveling">Account Leveling</a> and <a href="/games/dota-2/phone-verification">Phone Verification</a> services.</p>
    `,

    features: [
      {
        icon: "Target",
        title: "80%+ Expected Winrate",
        description:
          "Our boosters consistently achieve high winrates in calibration matches",
      },
      {
        icon: "Shield",
        title: "VPN Protection",
        description:
          "We use VPN matching your regular login location for safety",
      },
      {
        icon: "Clock",
        title: "Fast Completion",
        description: "All 10 games completed within 24-48 hours",
      },
      {
        icon: "MessageSquare",
        title: "Live Updates",
        description: "Track progress in real-time through your dashboard",
      },
      {
        icon: "Award",
        title: "Professional Players",
        description: "Only 7K+ MMR boosters handle calibration orders",
      },
      {
        icon: "RefreshCcw",
        title: "Money Back Guarantee",
        description: "Full refund if we fail to deliver as promised",
      },
    ],

    howItWorks: [
      {
        number: 1,
        icon: "ShoppingCart",
        title: "Place Your Order",
        description:
          "Select your region, add any extras you want, and complete the secure checkout process.",
      },
      {
        number: 2,
        icon: "UserCheck",
        title: "Booster Assignment",
        description:
          "Within 15 minutes, we'll assign one of our top-rated calibration specialists to your order.",
      },
      {
        number: 3,
        icon: "Key",
        title: "Share Access",
        description:
          "Securely share your Steam credentials through our encrypted system. Your data is never stored.",
      },
      {
        number: 4,
        icon: "Gamepad2",
        title: "Games Begin",
        description:
          "Your booster starts the calibration matches. Track progress live or watch via stream.",
      },
      {
        number: 5,
        icon: "Trophy",
        title: "Calibration Complete",
        description:
          "Receive your new rank! We'll notify you immediately when all 10 games are done.",
      },
    ],

    requirements: [
      {
        text: "Steam account credentials (email + password)",
        required: true,
        helpText: "We need login access to play on your account",
      },
      {
        text: "Steam Guard mobile authenticator access",
        required: true,
        helpText: "You'll need to approve the login when booster starts",
      },
      {
        text: "Account must be level 25+ (ranked ready)",
        required: true,
        helpText: "Need leveling? Check our Account Leveling service",
      },
      {
        text: "Phone number linked to account",
        required: true,
        helpText: "Required by Valve for ranked matchmaking",
      },
      {
        text: "Account must NOT be in low priority",
        required: true,
        helpText: "Need LP removal? Check our Low Priority Removal service",
      },
      {
        text: "Disable Steam Guard email notifications",
        required: false,
        helpText: "Recommended to avoid constant email alerts",
      },
      {
        text: "Don't play ranked during the boost",
        required: false,
        helpText: "Unranked, custom games, and Arcade are fine",
      },
    ],

    faq: [
      {
        question: "What rank can I expect after calibration?",
        answer: `<p>The final rank depends on several factors:</p>
        <ul>
          <li><strong>Account history:</strong> Previous MMR (if any) influences calibration</li>
          <li><strong>Hidden MMR:</strong> Your unranked games affect the starting point</li>
          <li><strong>Performance:</strong> Our boosters average 8-9 wins out of 10</li>
        </ul>
        <p>For fresh accounts with no ranked history, typical results range from Archon to Ancient depending on hidden MMR. Accounts with previous high ranks often calibrate higher.</p>`,
      },
      {
        question: "How long does calibration take?",
        answer: `<p>All 10 calibration matches are typically completed within <strong>24-48 hours</strong>. Each game takes 30-50 minutes on average, plus queue times.</p>
        <p>With the <strong>Priority Queue</strong> add-on, we guarantee your booster starts within 1 hour of order placement.</p>`,
      },
      {
        question: "Is calibration boosting safe?",
        answer: `<p>Yes, absolutely. We've completed over <strong>8,000+ orders</strong> with zero VAC bans. Our safety measures include:</p>
        <ul>
          <li>VPN matching your regular login location</li>
          <li>Offline/invisible mode during all games</li>
          <li>No chat or interaction with other players</li>
          <li>Natural play patterns that don't trigger detection</li>
        </ul>`,
      },
      {
        question: "Can I watch my calibration games?",
        answer: `<p>Yes! With the <strong>Stream Games</strong> add-on ($15), you can watch all your calibration matches live via Discord screen share. This is a great way to:</p>
        <ul>
          <li>Verify your account is being boosted properly</li>
          <li>Learn from professional gameplay</li>
          <li>Enjoy watching high-level Dota</li>
        </ul>`,
      },
      {
        question: "What if I lose more than 2 games?",
        answer: `<p>Our boosters maintain an <strong>80%+ winrate</strong> average, meaning 8+ wins out of 10 games. However, Dota has inherent variance - sometimes games are unwinnable due to teammates.</p>
        <p>If your booster achieves less than 70% winrate (7 wins), we'll provide a partial refund proportional to the underperformance.</p>`,
      },
      {
        question: "Can I choose which heroes are played?",
        answer: `<p>Yes! The <strong>Specific Heroes</strong> add-on (free) lets you specify preferred heroes. This is useful if:</p>
        <ul>
          <li>You want your account to have good stats on certain heroes</li>
          <li>You're practicing specific heroes and want match history</li>
          <li>You want to avoid certain heroes for any reason</li>
        </ul>
        <p>Note: Hero restrictions may slightly extend completion time if queues are longer.</p>`,
      },
      {
        question: "Do you offer refunds?",
        answer: `<p>Yes, we have a comprehensive refund policy:</p>
        <ul>
          <li><strong>Before start:</strong> 100% refund, no questions asked</li>
          <li><strong>During boost:</strong> Partial refund based on games completed</li>
          <li><strong>Underperformance:</strong> Partial refund if winrate is below 70%</li>
          <li><strong>Account issues:</strong> Full refund if we can't access your account</li>
        </ul>`,
      },
      {
        question: "What's the difference between this and MMR Boost?",
        answer: `<p><strong>Calibration</strong> is specifically for the 10 placement matches that determine your initial rank. It's a fixed service.</p>
        <p><strong>MMR Boost</strong> is for climbing from your current rank to a desired rank after you're already calibrated. It's priced based on MMR difference.</p>
        <p>Many customers use both: calibration first, then MMR boost to reach their target rank.</p>`,
      },
    ],

    securityInfo: `
      <p>Your account security is our top priority. Every calibration order includes enterprise-grade protection measures that have kept our ban rate at exactly 0% across thousands of orders.</p>
    `,
  },

  // Reviews
  reviews: {
    summary: {
      average: 4.9,
      total: 567,
      distribution: {
        5: 512,
        4: 38,
        3: 11,
        2: 4,
        1: 2,
      },
    },
    filterOptions: [
      "All Reviews",
      "Verified",
      "With Photos",
      "5 Star",
      "4 Star",
    ],
    items: [
      {
        id: "rev-001",
        author: "Michael K.",
        avatar: "/images/avatars/user-1.jpg",
        rating: 5,
        date: "2 days ago",
        content:
          "Incredible service! My fresh account calibrated at Ancient 2 with 9 wins out of 10. The booster was super professional and kept me updated throughout. Definitely using again for my friend's account.",
        verified: true,
        productOptions: "EU West • Streaming • Priority",
        images: [
          "/images/reviews/calibration-1.jpg",
          "/images/reviews/calibration-2.jpg",
        ],
        helpful: 24,
      },
      {
        id: "rev-002",
        author: "Sarah L.",
        rating: 5,
        date: "5 days ago",
        content:
          "Was skeptical at first but decided to try it for my seasonal recalibration. Went from Legend 5 to Divine 1! The VPN protection really works - Steam never sent me any suspicious login alerts.",
        verified: true,
        productOptions: "US East • Screenshot Updates",
        helpful: 18,
      },
      {
        id: "rev-003",
        author: "Alex T.",
        avatar: "/images/avatars/user-3.jpg",
        rating: 5,
        date: "1 week ago",
        content:
          "9/10 wins, calibrated at Archon 5 on a completely fresh account. Fast service, booster started within 20 minutes of my order. Will definitely recommend to friends.",
        verified: true,
        productOptions: "EU West",
        helpful: 15,
      },
      {
        id: "rev-004",
        author: "David R.",
        rating: 4,
        date: "1 week ago",
        content:
          "Good service overall, 8 wins out of 10. Would have preferred 9 or 10 wins but understand that's not always possible. Support was helpful when I had questions.",
        verified: true,
        productOptions: "Russia • Specific Heroes",
        helpful: 8,
      },
      {
        id: "rev-005",
        author: "James W.",
        avatar: "/images/avatars/user-5.jpg",
        rating: 5,
        date: "2 weeks ago",
        content:
          "This is my third time using this service and it's always been excellent. Calibrated 3 accounts now, all ended up in Ancient bracket. The streaming option is worth it just to watch the gameplay!",
        verified: true,
        productOptions: "EU East • Streaming",
        images: ["/images/reviews/calibration-3.jpg"],
        helpful: 31,
      },
      {
        id: "rev-006",
        author: "Chen X.",
        rating: 5,
        date: "2 weeks ago",
        content:
          "Perfect 10/10 wins! Couldn't believe it when I saw the results. My account calibrated at Divine 2. The booster was playing mid and absolutely dominated every game.",
        verified: true,
        productOptions: "SEA • Priority",
        helpful: 42,
      },
      {
        id: "rev-007",
        author: "Marcus P.",
        rating: 5,
        date: "3 weeks ago",
        content:
          "Very satisfied with the service. Communication was great, they kept me informed at every step. 8 wins, calibrated Legend 4 which is higher than I ever reached on my own!",
        verified: true,
        productOptions: "US West",
        helpful: 12,
      },
      {
        id: "rev-008",
        author: "Tom H.",
        rating: 3,
        date: "3 weeks ago",
        content:
          "Service was okay, only got 7 wins which I felt was a bit low. Support offered partial compensation which was fair. The booster was friendly though.",
        verified: true,
        productOptions: "EU West • Specific Heroes",
        helpful: 5,
      },
    ],
  },

  // Boosters
  showBoosters: true,
  boosters: [
    {
      id: "booster-001",
      name: "Shadow",
      avatar: "/images/boosters/shadow.jpg",
      mmr: 7200,
      completedOrders: 847,
      rating: 5.0,
      roles: ["Pos 1", "Pos 2"],
      country: "Ukraine",
      countryFlag: "🇺🇦",
      online: true,
    },
    {
      id: "booster-002",
      name: "Miracle",
      avatar: "/images/boosters/miracle.jpg",
      mmr: 7800,
      completedOrders: 1243,
      rating: 4.9,
      roles: ["Pos 2"],
      country: "Poland",
      countryFlag: "🇵🇱",
      online: true,
    },
    {
      id: "booster-003",
      name: "Wings",
      avatar: "/images/boosters/wings.jpg",
      mmr: 7100,
      completedOrders: 634,
      rating: 5.0,
      roles: ["Pos 4", "Pos 5"],
      country: "Russia",
      countryFlag: "🇷🇺",
      online: false,
    },
    {
      id: "booster-004",
      name: "Storm",
      avatar: "/images/boosters/storm.jpg",
      mmr: 7500,
      completedOrders: 958,
      rating: 4.9,
      roles: ["Pos 1", "Pos 3"],
      country: "Germany",
      countryFlag: "🇩🇪",
      online: true,
    },
  ],

  // Cross-sell
  frequentlyBoughtWith: [
    {
      id: "behavior-score",
      slug: "behavior-score-boost",
      title: "Behavior Score Boost",
      image: "/images/games/dota2/services/behavior-score.jpg",
      price: 29.99,
    },
    {
      id: "coaching",
      slug: "live-coaching",
      title: "Live Coaching Session",
      image: "/images/games/dota2/coaching/live.jpg",
      price: 19.99,
    },
  ],

  relatedProducts: [
    {
      id: "mmr-boost",
      slug: "mmr-boost",
      title: "Solo MMR Boost",
      subtitle: "Climb to your desired rank after calibration",
      image: "/images/games/dota2/services/mmr-boost.jpg",
      price: { type: "from", value: 9.99 },
    },
    {
      id: "duo-boost",
      slug: "mmr-boost-duo",
      title: "Duo MMR Boost",
      subtitle: "Play together with our booster",
      image: "/images/games/dota2/services/duo-boost.jpg",
      price: { type: "from", value: 14.99 },
    },
    {
      id: "lp-removal",
      slug: "low-priority-removal",
      title: "Low Priority Removal",
      subtitle: "Get out of LP queue fast",
      image: "/images/games/dota2/services/low-priority.jpg",
      price: { type: "from", value: 11.97 },
    },
    {
      id: "account-leveling",
      slug: "account-leveling",
      title: "Account Leveling",
      subtitle: "Get your account ranked-ready",
      image: "/images/games/dota2/accounts/leveling.jpg",
      price: { type: "from", value: 9.99 },
    },
  ],

  relatedArticles: [
    {
      id: "article-001",
      slug: "how-dota-2-calibration-works",
      title: "How Dota 2 Calibration Works: Complete Guide",
      thumbnail: "/images/blog/calibration-guide.jpg",
      readTime: "8 min",
      views: 24500,
    },
    {
      id: "article-002",
      slug: "best-heroes-for-calibration",
      title: "Best Heroes for Calibration in 2024",
      thumbnail: "/images/blog/best-heroes.jpg",
      readTime: "6 min",
      views: 18200,
    },
  ],

  // SEO
  seo: {
    title: "Dota 2 Calibration Matches Boost | 80%+ Winrate | BSTR4",
    description:
      "Professional Dota 2 calibration service. 10 placement matches with 80%+ winrate from 7K+ MMR boosters. VPN protected, fast delivery, money-back guarantee.",
  },
};

// Export helper to get product by slug
export const getProductBySlug = (slug: string): ProductPageData | undefined => {
  const products: Record<string, ProductPageData> = {
    "calibration-matches": dota2CalibrationProduct,
  };

  return products[slug];
};
