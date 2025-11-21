export interface FAQItem {
  question: string;
  answer: string;
}

export interface CategoryFAQ {
  id: string;
  gameSlug: string;
  categorySlug: string; // Matches the URL category
  items: FAQItem[];
}

export const MOCK_FAQS: CategoryFAQ[] = [
  // --- WORLD OF WARCRAFT: GOLD ---
  {
    id: "wow-gold",
    gameSlug: "world-of-warcraft",
    categorySlug: "gold",
    items: [
      {
        question: "How is the gold delivered?",
        answer:
          "We support multiple delivery methods including In-Game Mail (safest), Face-to-Face trade, and Guild Bank deposit. You can select your preferred method at checkout.",
      },
      {
        question: "Is it safe to buy WoW Gold?",
        answer:
          "Yes. We only use hand-farmed gold from real players. We do not use bots or exploits, which drastically reduces the risk of suspension.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Most orders are delivered within 15-60 minutes. If we are out of stock on your specific realm, it may take up to 24 hours (you will be notified).",
      },
    ],
  },

  // --- WORLD OF WARCRAFT: BOOSTING (Dungeons/Raids) ---
  {
    id: "wow-boosting",
    gameSlug: "world-of-warcraft",
    categorySlug: "boosting", // Also applies to dungeons usually
    items: [
      {
        question: "Do I need to share my account?",
        answer:
          "For 'Selfplay' orders, no. You play your own character alongside our pros. For 'Piloted' orders, we will need to log in, but we use VPNs matching your country.",
      },
      {
        question: "What happens if we fail the key?",
        answer:
          "We guarantee completion. If the group depletes the key or fails the timer (if Timed was selected), we will run it again until the criteria are met for free.",
      },
    ],
  },

  // Map 'dungeons' to the same FAQs if needed, or create specific ones
  {
    id: "wow-dungeons",
    gameSlug: "world-of-warcraft",
    categorySlug: "dungeons",
    items: [
      {
        question: "What happens if we fail the key?",
        answer:
          "We guarantee completion. If the group depletes the key or fails the timer (if Timed was selected), we will run it again until the criteria are met for free.",
      },
      {
        question: "Do I need to do damage?",
        answer:
          "In standard runs, you can tag along. For high keys (+20 and above), you might be expected to know basic mechanics, but our team carries the DPS load.",
      },
    ],
  },

  // --- VALORANT: BOOSTING ---
  {
    id: "val-boosting",
    gameSlug: "valorant",
    categorySlug: "boosting",
    items: [
      {
        question: "Will my friends see me online?",
        answer:
          "We can use 'Offline Mode' so you appear offline to your friends list while we boost your account.",
      },
      {
        question: "Can I play Duo with the booster?",
        answer:
          "Yes! Select the 'Duo Queue' or 'Selfplay' option in the calculator. You will play on your own account and our booster will party with you.",
      },
      {
        question: "Is a VPN used?",
        answer:
          "Always. Our boosters use VPN software to mimic your location, ensuring the login looks consistent to Riot's security systems.",
      },
    ],
  },

  // --- DIABLO 4: BOSSES ---
  {
    id: "d4-bosses",
    gameSlug: "diablo-4",
    categorySlug: "bosses",
    items: [
      {
        question: "Do I need to provide summoning mats?",
        answer:
          "No. The price includes all summoning materials (Shards of Agony, Mucus-Slick Eggs, etc.) provided by us.",
      },
      {
        question: "Do I get all the loot?",
        answer:
          "Yes. You keep 100% of the loot that drops for your character, including any Uber Uniques.",
      },
    ],
  },
];

// Helper function to get FAQs
export const getFAQs = (gameSlug: string, categorySlug: string) => {
  const found = MOCK_FAQS.find(
    (f) => f.gameSlug === gameSlug && f.categorySlug === categorySlug
  );
  return found?.items || [];
};
