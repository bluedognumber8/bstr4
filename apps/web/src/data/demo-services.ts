import { ServiceProduct } from "@/types/service-models";

export const DEMO_SERVICES: ServiceProduct[] = [
  {
    id: "1",
    slug: "wow-gold-retail",
    name: "WoW Retail Gold",
    shortDescription: "Safe delivery via Auction House or Guild Bank.",
    gameSlug: "wow-retail",
    heroImage:
      "https://images.unsplash.com/photo-1622630998477-20aa696fa4f5?w=800",
    basePrice: 0,
    template: "standard_sidebar",
    widget: {
      type: "counter",
      min: 100,
      step: 100,
      unit: "k Gold",
      pricePerUnit: 4.5,
    },
    features: ["Face to Face", "Auction House Covered", "1 Hour Delivery"],
  },
  {
    id: "2",
    slug: "dota-mmr",
    name: "Rank Boosting Season 5",
    shortDescription: "Reclaim your MMR with Immortal boosters.",
    gameSlug: "dota-2",
    heroImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
    basePrice: 15,
    template: "immersive_app",
    widget: {
      type: "custom_app",
      componentId: "dota_rank_visual",
    },
  },
];
