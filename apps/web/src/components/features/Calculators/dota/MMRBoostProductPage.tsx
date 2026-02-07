// src/components/features/Calculators/dota/MMRBoostProductPage.tsx
"use client";

import { styled } from "next-yak";
import { MMRCalculator } from "./MMRCalculator";
import { TrustBadgesBar } from "@/components/product/TrustElements/TrustBadgesBar";
import * as Icons from "lucide-react";
import { HowItWorksSection } from "@/components/product/ContentSections/HowItWorksSection";
import { SecurityExplainer } from "@/components/product/TrustElements/SecurityExplainer";
import { BoostersShowcase } from "@/components/product/TrustElements/BoostersShowcase";
import { RequirementsSection } from "@/components/product/ContentSections/RequirementsSection";
import { FAQSection } from "@/components/product/ContentSections/FAQSection";
import { ReviewsSection } from "@/components/product/ContentSections/ReviewsSection";
import { RelatedProducts } from "@/components/product/CrossSell/RelatedProducts";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { queries } from "@/config/theme";

// --- DATA (Would come from CMS/props in production) ---

const TRUST_STATS = {
  rating: 4.9,
  reviewCount: 2341,
  completedOrders: 8432,
  onlineBoosters: 18,
  todayOrders: 47,
  avgStartTime: "12 min",
};

const GUARANTEES = [
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
];

const HOW_IT_WORKS = [
  {
    number: 1,
    icon: "ShoppingCart",
    title: "Configure Your Boost",
    description:
      "Select your current and desired MMR, add any options you want.",
  },
  {
    number: 2,
    icon: "UserCheck",
    title: "Booster Assignment",
    description:
      "Within 15 minutes, we assign a 7K+ MMR booster to your order.",
  },
  {
    number: 3,
    icon: "Key",
    title: "Share Access",
    description:
      "Securely share your Steam credentials. We use VPN + offline mode.",
  },
  {
    number: 4,
    icon: "Trophy",
    title: "Track & Complete",
    description:
      "Watch progress live, chat with booster, receive your new rank!",
  },
];

const REQUIREMENTS = [
  { text: "Steam account credentials (email + password)", required: true },
  { text: "Steam Guard mobile authenticator access", required: true },
  {
    text: "Account must NOT be in low priority",
    required: true,
    helpText: "Or add LP removal to your order",
  },
  {
    text: "Behavior score above 3,000",
    required: false,
    helpText: "Lower scores incur additional fee",
  },
  { text: "Don't play ranked during the boost", required: false },
];

const FAQ_ITEMS = [
  {
    question: "How long will my MMR boost take?",
    answer: `<p>Completion time depends on the MMR gap and options selected:</p>
    <ul>
      <li><strong>500 MMR:</strong> 1-2 days</li>
      <li><strong>1000 MMR:</strong> 2-4 days</li>
      <li><strong>2000 MMR:</strong> 5-8 days</li>
    </ul>
    <p>Express option reduces time by ~50%.</p>`,
  },
  {
    question: "Is MMR boosting safe?",
    answer: `<p>Yes! We've completed <strong>8,000+ orders</strong> with zero VAC bans. Our safety measures include:</p>
    <ul>
      <li>VPN matching your login location</li>
      <li>Offline/invisible mode</li>
      <li>No chat with other players</li>
      <li>Natural play patterns</li>
    </ul>`,
  },
  {
    question: "What's the difference between Solo and Duo boost?",
    answer: `<p><strong>Solo:</strong> Our booster plays on your account while you're away. Fastest option.</p>
    <p><strong>Duo:</strong> You play alongside our booster. Learn while climbing, no account sharing needed.</p>`,
  },
  {
    question: "Can I choose which heroes are played?",
    answer: `<p>Yes! Use the Hero Configuration section to:</p>
    <ul>
      <li>Select specific heroes (+10% fee)</li>
      <li>Ban heroes you don't want played (free)</li>
    </ul>`,
  },
  {
    question: "What if I have Low Priority?",
    answer: `<p>No problem! Check the "I have Low Priority" option and specify the number of games. We'll clear your LP before starting the MMR boost.</p>`,
  },
];

const REVIEWS = {
  summary: {
    average: 4.9,
    total: 2341,
    distribution: { 5: 2100, 4: 180, 3: 40, 2: 15, 1: 6 },
  },
  items: [
    {
      id: "1",
      author: "Alex M.",
      rating: 5,
      date: "2 days ago",
      content:
        "Went from Archon 3 to Divine 1 in just 6 days. Booster was insane, 85% winrate. Will use again!",
      verified: true,
      productOptions: "Archon → Divine • Solo • Express",
      helpful: 34,
    },
    {
      id: "2",
      author: "Marcus K.",
      rating: 5,
      date: "1 week ago",
      content:
        "Duo boost was amazing. Learned so much playing with the booster. Highly recommend the streaming option too.",
      verified: true,
      productOptions: "Legend → Ancient • Duo Queue • Stream",
      helpful: 28,
    },
    {
      id: "3",
      author: "Sarah L.",
      rating: 5,
      date: "1 week ago",
      content:
        "Fast service, great communication. Started within 10 minutes of ordering.",
      verified: true,
      productOptions: "Crusader → Archon • Solo",
      helpful: 19,
    },
  ],
};

const BOOSTERS = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
];

const RELATED_PRODUCTS = [
  {
    id: "1",
    slug: "calibration-matches",
    title: "Calibration Matches",
    subtitle: "10 placement games with 80%+ winrate",
    image: "/images/games/dota2/services/calibration.jpg",
    price: { type: "fixed", value: 49.99 },
  },
  {
    id: "2",
    slug: "behavior-score-boost",
    title: "Behavior Score Boost",
    subtitle: "Raise your behavior score fast",
    image: "/images/games/dota2/services/behavior-score.jpg",
    price: { type: "from", value: 19.99 },
  },
  {
    id: "3",
    slug: "live-coaching",
    title: "Live Coaching",
    subtitle: "1-on-1 with 7K+ MMR player",
    image: "/images/games/dota2/coaching/live.jpg",
    price: { type: "rate", value: 19.99 },
  },
  {
    id: "4",
    slug: "low-priority-removal",
    title: "Low Priority Removal",
    subtitle: "Get out of LP queue fast",
    image: "/images/games/dota2/services/low-priority.jpg",
    price: { type: "from", value: 11.97 },
  },
];

// --- STYLES ---

const PageContainer = styled.div`
  background-color: var(--bg-canvas);
  min-height: 100vh;
`;

const TrustMicroBarWrapper = styled.div`
  background: var(--bg-inverse);
  color: var(--fg-inverse);
`;

const TrustMicroBarInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-2) var(--space-5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  font-size: 0.8125rem;
  flex-wrap: wrap;

  ${queries.md} {
    justify-content: space-between;
  }
`;

const TrustMicroItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);

  svg {
    width: 14px;
    height: 14px;
    color: var(--color-success);
  }

  strong {
    color: var(--fg-inverse);
  }
`;

const BreadcrumbWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-5) 0;
`;

const CalculatorSection = styled.section`
  padding: var(--space-6) var(--space-5);

  ${queries.md} {
    padding: var(--space-8) var(--space-5);
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-5) var(--space-10);
`;

const SectionDivider = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-5);

  &::after {
    content: "";
    display: block;
    height: 1px;
    background: var(--border-subtle);
  }
`;

const SectionWrapper = styled.div`
  margin-bottom: var(--space-10);
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: var(--space-6);
`;

// --- TRUST MICROBAR COMPONENT ---

const TrustMicroBar = () => {
  const IconComponent = Icons.CheckCircle;
  
  return (
    <TrustMicroBarWrapper>
      <TrustMicroBarInner>
        <TrustMicroItem>
          <IconComponent size={14} />
          <strong>{TRUST_STATS.completedOrders.toLocaleString()}+</strong> Orders Completed
        </TrustMicroItem>
        <TrustMicroItem>
          <IconComponent size={14} />
          <strong>{TRUST_STATS.todayOrders}</strong> Orders Today
        </TrustMicroItem>
        <TrustMicroItem>
          <IconComponent size={14} />
          <strong>&lt;{TRUST_STATS.avgStartTime}</strong> Average Start Time
        </TrustMicroItem>
        <TrustMicroItem>
          <IconComponent size={14} />
          <strong>{TRUST_STATS.onlineBoosters}</strong> Boosters Online
        </TrustMicroItem>
      </TrustMicroBarInner>
    </TrustMicroBarWrapper>
  );
};

// --- COMPONENT ---
const PageHeader = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4) 0 var(--space-6);
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  ${queries.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const PageTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin: 0;

  ${queries.md} {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: var(--fg-secondary);
  margin: var(--space-1) 0 0;
  max-width: 600px;

  ${queries.md} {
    font-size: 1.125rem;
  }
`;

const RatingBadge = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.9375rem;

  .stars {
    color: #f59e0b;
  }

  .count {
    color: var(--fg-muted);
  }
`;

interface Props {
  mode?: "solo" | "duo";
}

export const MMRBoostProductPage = ({ mode = "solo" }: Props) => {
  const title = mode === "duo" ? "Duo MMR Boost" : "MMR Boost";
  const subtitle =
    mode === "duo"
      ? "Play alongside a 7K+ MMR professional. Learn while climbing."
      : "Reach your dream rank with professional 7K+ MMR boosters.";
  const breadcrumbItems = [
    { label: "Games", href: "/games" },
    { label: "Dota 2", href: "/games/dota-2" },
    { label: mode === "duo" ? "Duo MMR Boost" : "MMR Boost" },
  ];
  return (
    <PageContainer>
      {/* Trust Micro Bar */}
      <TrustMicroBar />

      {/* Breadcrumbs */}
      <PageHeader>
        <Breadcrumbs items={breadcrumbItems} />

        <TitleRow>
          <div>
            <PageTitle>{title}</PageTitle>
            <PageSubtitle>{subtitle}</PageSubtitle>
          </div>

          <RatingBadge>
            <span className="stars">★★★★★</span>
            <span>{TRUST_STATS.rating}</span>
            <span className="count">
              ({TRUST_STATS.reviewCount.toLocaleString()} reviews)
            </span>
          </RatingBadge>
        </TitleRow>
      </PageHeader>

      {/* Calculator */}
      <CalculatorSection>
        <MMRCalculator defaultMode={mode} />
      </CalculatorSection>

      <SectionDivider />

      {/* Content Sections */}
      <ContentSection>
        {/* Trust Badges */}
        <SectionWrapper>
          <TrustBadgesBar guarantees={GUARANTEES} />
        </SectionWrapper>

        {/* How It Works */}
        <SectionWrapper>
          <SectionTitle>How It Works</SectionTitle>
          <HowItWorksSection steps={HOW_IT_WORKS} />
        </SectionWrapper>

        {/* Security Explainer */}
        <SectionWrapper>
          <SecurityExplainer completedOrders={TRUST_STATS.completedOrders} />
        </SectionWrapper>

        {/* Boosters Showcase */}
        <SectionWrapper>
          <BoostersShowcase
            boosters={BOOSTERS}
            onlineCount={TRUST_STATS.onlineBoosters}
          />
        </SectionWrapper>

        {/* Requirements */}
        <SectionWrapper>
          <SectionTitle>Requirements</SectionTitle>
          <RequirementsSection requirements={REQUIREMENTS} />
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FAQSection items={FAQ_ITEMS} />
        </SectionWrapper>

        {/* Reviews */}
        <SectionWrapper>
          <SectionTitle>Customer Reviews</SectionTitle>
          <ReviewsSection reviews={REVIEWS} />
        </SectionWrapper>

        {/* Related Products */}
        <SectionWrapper>
          <RelatedProducts
            title="You Might Also Need"
            products={RELATED_PRODUCTS}
            gameSlug="dota-2"
          />
        </SectionWrapper>
      </ContentSection>
    </PageContainer>
  );
};
