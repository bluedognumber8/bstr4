export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: "Guide" | "News" | "Analysis";
  game: "World of Warcraft" | "Valorant" | "General";
  author: string;
  date: string;
  readTime: string;
  updatedAt?: string; // New: For "Last Updated" logic
  authorRole: string; // New: "Top 500 Valorant Coach"
  authorImage: string; // New: Avatar URL
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "dragonflight-mythic-plus-tier-list",
    title: "Dragonflight Season 3 Mythic+ Healer Tier List",
    excerpt: "Find out which healers are dominating the meta...",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    category: "Analysis",
    game: "World of Warcraft",
    author: "Alex",
    authorRole: "Gladiator Rank • Coaching since 2019",
    authorImage:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    date: "2024-02-15",
    updatedAt: "2024-02-20",
    readTime: "8 min read",
  },
  {
    id: "2",
    slug: "valorant-aim-guide",
    title: "Stop Missing Shots: The Ultimate Valorant Aim Guide",
    excerpt:
      "Crosshair placement, sensitivity settings, and warm-up routines used by Radiants.",
    coverImage:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
    category: "Guide",
    game: "Valorant",
    author: "JettMain",
    authorRole: "Radiant Coach • Aim Specialist",
    authorImage:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
    date: "2024-02-10",
    updatedAt: "2024-02-12",
    readTime: "5 min read",
  },
  {
    id: "3",
    slug: "is-boosting-safe",
    title: "Is Boosting Safe? The Truth About VPNs and Bans",
    excerpt:
      "We break down how professional services protect your account privacy and security.",
    coverImage:
      "https://images.unsplash.com/photo-1563206767-5b1d972d9323?w=800&q=80",
    category: "Guide",
    game: "General",
    author: "Admin",
    authorRole: "Support Lead • Security Enthusiast",
    authorImage:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
    date: "2024-01-20",
    updatedAt: "2024-01-22",
    readTime: "4 min read",
  },
];
