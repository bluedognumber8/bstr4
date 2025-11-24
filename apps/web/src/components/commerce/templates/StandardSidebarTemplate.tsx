"use client";

import { styled } from "next-yak";
import { ServiceProduct } from "@/types/service-models";
import { WidgetRegistry } from "../widgets/WidgetRegistry";
import { queries } from "@/config/theme";
import { FaCheckCircle, FaShieldAlt, FaClock } from "react-icons/fa";

const PageGrid = styled.div`
  display: grid;
  gap: var(--space-8);
  padding-top: var(--space-8);

  ${queries.lg} {
    grid-template-columns: 1fr 400px;
    align-items: start;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
`;

const HeroImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius-lg);
`;

const TitleBlock = styled.div`
  h1 {
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: var(--space-2);
  }
  p {
    font-size: 1.1rem;
    color: var(--fg-secondary);
  }
`;

const StickySidebar = styled.aside`
  /* Mobile: Static / Desktop: Sticky */
  position: static;

  ${queries.lg} {
    position: sticky;
    top: 100px;
  }
`;

const ConfigCard = styled.div`
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
`;

const TrustBar = styled.div`
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-subtle);

  .item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--fg-muted);
  }
`;

export const StandardSidebarTemplate = ({
  service,
}: {
  service: ServiceProduct;
}) => {
  return (
    <PageGrid>
      <ContentColumn>
        <HeroImage src={service.heroImage} alt={service.name} />

        <TitleBlock>
          <h1>{service.name}</h1>
          <p>{service.shortDescription}</p>
        </TitleBlock>

        {/* Mobile Config (Hidden on LG) */}
        <div className="lg:hidden">
          <ConfigCard>
            <WidgetRegistry
              config={service.widget}
              basePrice={service.basePrice}
            />
          </ConfigCard>
        </div>

        <div className="prose">
          <h2>How it works</h2>
          <p>Description content goes here...</p>

          <h3>Features</h3>
          <ul>
            {service.features?.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </ContentColumn>

      <StickySidebar>
        <ConfigCard>
          <WidgetRegistry
            config={service.widget}
            basePrice={service.basePrice}
          />

          <TrustBar>
            <div className="item">
              <FaShieldAlt /> Secure
            </div>
            <div className="item">
              <FaClock /> Fast
            </div>
            <div className="item">
              <FaCheckCircle /> Verified
            </div>
          </TrustBar>
        </ConfigCard>
      </StickySidebar>
    </PageGrid>
  );
};
