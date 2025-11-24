"use client";

import { styled } from "next-yak";
import { ServiceProduct } from "@/types/service-models";
import { WidgetRegistry } from "../widgets/WidgetRegistry";

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-top: var(--space-12);
  text-align: center;
`;

const AppHeader = styled.div`
  margin-bottom: var(--space-10);
  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: var(--space-4);
  }
  p {
    font-size: 1.25rem;
    color: var(--fg-secondary);
  }
`;

const AppFrame = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  text-align: left;
`;

export const ImmersiveAppTemplate = ({
  service,
}: {
  service: ServiceProduct;
}) => {
  return (
    <AppContainer>
      <AppHeader>
        <h1>{service.name}</h1>
        <p>{service.shortDescription}</p>
      </AppHeader>

      <AppFrame>
        <WidgetRegistry config={service.widget} basePrice={service.basePrice} />
      </AppFrame>
    </AppContainer>
  );
};
