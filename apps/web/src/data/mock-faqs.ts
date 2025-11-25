export interface FAQItem {
  question: string;
  answer: string;
}

export interface GameFAQ {
  id: string;
  gameSlug: string;
  items: FAQItem[];
}

export const MOCK_FAQS: GameFAQ[] = [
  // --- WORLD OF WARCRAFT ---
  {
    id: "wow",
    gameSlug: "world-of-warcraft",
    items: [
      {
        question: "How is the gold delivered?",
        answer:
          "We support multiple delivery methods including In-Game Mail (safest), Face-to-Face trade, and Guild Bank deposit. You can select your preferred method at checkout.",
      },
      {
        question: "Is it safe to buy WoW services?",
        answer:
          "Yes. We only use hand-farmed gold and professional boosters. We do not use bots or exploits, which drastically reduces the risk of suspension.",
      },
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

  // --- VALORANT ---
  {
    id: "valorant",
    gameSlug: "valorant",
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

  // --- DIABLO 4 ---
  {
    id: "diablo-4",
    gameSlug: "diablo-4",
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

  // --- DOTA 2 ---
  {
    id: "dota-2",
    gameSlug: "dota-2",
    items: [
      {
        question: "How long does MMR boosting take?",
        answer:
          "Typically 100-200 MMR per day depending on starting bracket. High Immortal orders may take longer due to queue times.",
      },
      {
        question: "Will my behavior score be affected?",
        answer:
          "Our boosters maintain 10,000 behavior score and never abandon games. Your score will remain stable or improve.",
      },
      {
        question: "Can I choose specific heroes?",
        answer:
          "Yes! You can request specific hero pools or roles. Additional fees may apply for hero restrictions.",
      },
    ],
  },

  // --- LEAGUE OF LEGENDS ---
  {
    id: "league-of-legends",
    gameSlug: "league-of-legends",
    items: [
      {
        question: "Will my LP be refunded if we lose?",
        answer:
          "Yes. We guarantee net wins. Losses during the boost don't count against your order - we continue until the win target is reached.",
      },
      {
        question: "Can I duo with the booster?",
        answer:
          "Absolutely! Select 'Duo Boost' option and you'll play alongside our Challenger player on your own account.",
      },
    ],
  },
];

// Helper function to get FAQs by game
export const getFAQs = (gameSlug: string): FAQItem[] => {
  const found = MOCK_FAQS.find((f) => f.gameSlug === gameSlug);
  return found?.items || [];
};
