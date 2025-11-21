"use client";

import { styled } from "next-yak";
import { Star, CheckCircle } from "lucide-react";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const StarRow = styled.div`
  display: flex;
  gap: 2px;
  color: #eab308; /* Gold color */
`;

const Text = styled.span`
  font-size: 0.9rem;
  color: var(--fg-secondary);
  font-weight: 500;

  strong {
    color: var(--fg-primary);
  }
`;

const VerifiedBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--color-success);
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: 99px;
  font-weight: 600;
`;

export const ProductRating = ({
  rating = 4.9,
  count = 1204,
}: {
  rating?: number;
  count?: number;
}) => {
  return (
    <Container>
      <StarRow>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" stroke="none" />
        ))}
      </StarRow>
      <Text>
        <strong>{rating}</strong>/5 based on <strong>{count}</strong> reviews
      </Text>
      <VerifiedBadge>
        <CheckCircle size={12} /> Verified
      </VerifiedBadge>
    </Container>
  );
};
