// src/components/product/ProductPageLayout.tsx
"use client";

import { styled } from "next-yak";
import { ProductPageData } from "./types";
import { EnhancedCalculator } from "./Calculator/EnhancedCalculator";
import { TrustBadgesBar } from "./TrustElements/TrustBadgesBar";
import { HowItWorksSection } from "./ContentSections/HowItWorksSection";
import { SecurityExplainer } from "./TrustElements/SecurityExplainer";
import { BoostersShowcase } from "./TrustElements/BoostersShowcase";
import { RequirementsSection } from "./ContentSections/RequirementsSection";
import { FAQSection } from "./ContentSections/FAQSection";
import { ReviewsSection } from "./ContentSections/ReviewsSection";
import { RelatedProducts } from "./CrossSell/RelatedProducts";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { queries } from "@/config/theme";

// --- STYLES ---

const PageContainer = styled.div`
  background-color: var(--bg-canvas);
  min-height: 100vh;
`;

// Trust Micro Bar
const TrustMicroBar = styled.div`
  background: var(--bg-inverse);
  color: var(--fg-inverse);
`;

const TrustMicroBarInner = styled.div`
  max-width: 1200px;
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

// Page Header
const PageHeader = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4) 0 var(--space-2);
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-4);

  ${queries.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const PageTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--fg-primary);
  margin: 0;

  ${queries.md} {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: var(--fg-secondary);
  margin: var(--space-1) 0 0;
  max-width: 600px;
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

// Calculator Section
const CalculatorSection = styled.section`
  padding: var(--space-6) var(--space-5);

  ${queries.md} {
    padding: var(--space-8) var(--space-5);
  }
`;

// Content Section
const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-5) var(--space-10);
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

// --- ICONS (inline SVG for performance) ---

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="14"
    height="14"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ZapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="14"
    height="14"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="14"
    height="14"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// --- COMPONENT ---

interface Props {
  data: ProductPageData;
}

export const ProductPageLayout = ({ data }: Props) => {
  const breadcrumbItems = [
    { label: "Games", href: "/games" },
    { label: data.gameName, href: `/games/${data.gameSlug}` },
    { label: data.title },
  ];

  // Build product config for enhanced calculator
  const productConfig = {
    id: data.id,
    title: data.title,
    icon: data.icon || "🎮",
    tagline: data.shortDescription,
    stats: data.features.slice(0, 3).map((f) => ({ icon: "check", label: f })),
  };

  const trustConfig = {
    estimatedTime: data.trust.avgStartTime,
    onlineBoosters: data.trust.onlineBoosters,
  };

  return (
    <PageContainer>
      {/* Trust Micro Bar */}

      {/* Page Header */}
      <PageHeader>
        <Breadcrumbs items={breadcrumbItems} />

        <TitleRow>
          <div>
            <PageTitle>{data.title}</PageTitle>
            <PageSubtitle>{data.shortDescription}</PageSubtitle>
          </div>

          <RatingBadge>
            <span className="stars">★★★★★</span>
            <span>{data.trust.rating}</span>
            <span className="count">
              ({data.trust.reviewCount.toLocaleString()} reviews)
            </span>
          </RatingBadge>
        </TitleRow>
      </PageHeader>

      {/* Calculator */}
      <CalculatorSection>
        <EnhancedCalculator
          config={data.calculator}
          product={productConfig}
          trust={trustConfig}
        />
      </CalculatorSection>

      <SectionDivider />

      {/* Content Sections */}
      <ContentSection>
        {/* Trust Badges */}
        <SectionWrapper>
          <TrustBadgesBar guarantees={data.guarantees} />
        </SectionWrapper>

        {/* How It Works */}
        {data.content.howItWorks && data.content.howItWorks.length > 0 && (
          <SectionWrapper>
            <SectionTitle>How It Works</SectionTitle>
            <HowItWorksSection steps={data.content.howItWorks} />
          </SectionWrapper>
        )}

        {/* Security Explainer */}
        <SectionWrapper>
          <SecurityExplainer completedOrders={data.trust.completedOrders} />
        </SectionWrapper>

        {/* Boosters Showcase */}
        {data.showBoosters && data.boosters && data.boosters.length > 0 && (
          <SectionWrapper>
            <BoostersShowcase
              boosters={data.boosters}
              onlineCount={data.trust.onlineBoosters}
            />
          </SectionWrapper>
        )}

        {/* Requirements */}
        {data.content.requirements && data.content.requirements.length > 0 && (
          <SectionWrapper>
            <SectionTitle>Requirements</SectionTitle>
            <RequirementsSection requirements={data.content.requirements} />
          </SectionWrapper>
        )}

        {/* FAQ */}
        {data.content.faq && data.content.faq.length > 0 && (
          <SectionWrapper>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <FAQSection items={data.content.faq} />
          </SectionWrapper>
        )}

        {/* Reviews */}
        {data.reviews && data.reviews.items.length > 0 && (
          <SectionWrapper>
            <SectionTitle>Customer Reviews</SectionTitle>
            <ReviewsSection reviews={data.reviews} />
          </SectionWrapper>
        )}

        {/* Related Products */}
        {data.relatedProducts && data.relatedProducts.length > 0 && (
          <SectionWrapper>
            <RelatedProducts
              title="You Might Also Need"
              products={data.relatedProducts}
              gameSlug={data.gameSlug}
            />
          </SectionWrapper>
        )}
      </ContentSection>
    </PageContainer>
  );
};
