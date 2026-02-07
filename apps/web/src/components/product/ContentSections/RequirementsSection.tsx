// src/components/product/ContentSections/RequirementsSection.tsx
"use client";

import { styled } from "next-yak";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { Requirement } from "../types";

// --- STYLES ---

const Container = styled.div`
  max-width: 640px;
`;

const Section = styled.div`
  margin-bottom: var(--space-6);

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  svg {
    width: 20px;
    height: 20px;
  }

  &.required svg {
    color: var(--color-danger);
  }

  &.recommended svg {
    color: var(--color-info);
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  &.required svg {
    color: var(--color-success);
  }

  &.recommended svg {
    color: var(--color-info);
  }
`;

const ItemContent = styled.div`
  flex: 1;
`;

const ItemText = styled.div`
  font-size: 0.9375rem;
  color: var(--fg-primary);
`;

const ItemHelp = styled.div`
  font-size: 0.8125rem;
  color: var(--fg-muted);
  margin-top: var(--space-1);
`;

// --- COMPONENT ---

interface Props {
  requirements: Requirement[];
}

export const RequirementsSection = ({ requirements }: Props) => {
  const required = requirements.filter((r) => r.required);
  const recommended = requirements.filter((r) => !r.required);

  return (
    <Container>
      {required.length > 0 && (
        <Section>
          <SectionTitle className="required">
            <AlertCircle />
            Required
          </SectionTitle>
          <List>
            {required.map((req, index) => (
              <ListItem key={index} className="required">
                <CheckCircle />
                <ItemContent>
                  <ItemText>{req.text}</ItemText>
                  {req.helpText && <ItemHelp>{req.helpText}</ItemHelp>}
                </ItemContent>
              </ListItem>
            ))}
          </List>
        </Section>
      )}

      {recommended.length > 0 && (
        <Section>
          <SectionTitle className="recommended">
            <Info />
            Recommended
          </SectionTitle>
          <List>
            {recommended.map((req, index) => (
              <ListItem key={index} className="recommended">
                <Info />
                <ItemContent>
                  <ItemText>{req.text}</ItemText>
                  {req.helpText && <ItemHelp>{req.helpText}</ItemHelp>}
                </ItemContent>
              </ListItem>
            ))}
          </List>
        </Section>
      )}
    </Container>
  );
};
