// src/components/product/ContentSections/ReviewsSection.tsx (continued)
"use client";

import { styled } from "next-yak";
import { useState } from "react";
import {
  Star,
  ThumbsUp,
  CheckCircle,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react";
import { Review, ReviewsSummary } from "../types";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div``;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-8);

  ${queries.md} {
    grid-template-columns: 280px 1fr;
  }
`;

const SummaryCard = styled.div`
  padding: var(--space-6);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  text-align: center;
`;

const AverageRating = styled.div`
  margin-bottom: var(--space-4);

  .score {
    font-family: var(--font-heading);
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--fg-primary);
    line-height: 1;
  }

  .max {
    font-size: 1.25rem;
    color: var(--fg-muted);
  }
`;

const StarsDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-1);
  margin-bottom: var(--space-2);

  svg {
    width: 24px;
    height: 24px;
    color: #f59e0b;
    fill: #f59e0b;
  }

  svg.empty {
    color: var(--border-subtle);
    fill: transparent;
  }
`;

const TotalReviews = styled.div`
  font-size: 0.9375rem;
  color: var(--fg-muted);
`;

const Distribution = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-6);
`;

const DistributionRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.8125rem;

  .label {
    width: 20px;
    text-align: right;
    color: var(--fg-muted);
  }

  .bar-container {
    flex: 1;
    height: 8px;
    background: var(--bg-canvas);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background: #f59e0b;
    border-radius: var(--radius-full);
    transition: width 0.3s ease;
  }

  .percentage {
    width: 40px;
    text-align: right;
    color: var(--fg-muted);
  }
`;

const FiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  ${({ $isActive }) =>
    $isActive
      ? `
    background: var(--action-primary);
    color: var(--fg-inverse);
  `
      : `
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    color: var(--fg-secondary);
    
    &:hover {
      border-color: var(--action-primary);
      color: var(--fg-primary);
    }
  `}
`;

const SortSelect = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);

  label {
    font-size: 0.875rem;
    color: var(--fg-muted);
  }

  select {
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
    background: var(--bg-surface);
    color: var(--fg-primary);
    font-size: 0.875rem;
    cursor: pointer;
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const ReviewCard = styled.div`
  padding: var(--space-5);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-3);
  flex-wrap: wrap;
  gap: var(--space-3);
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

const ReviewerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-canvas);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--fg-muted);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ReviewerDetails = styled.div`
  .name {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 1rem;
    color: var(--fg-primary);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .verified {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: 0.75rem;
    color: var(--color-success);
    font-weight: 500;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  .date {
    font-size: 0.8125rem;
    color: var(--fg-muted);
    margin-top: 2px;
  }
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 2px;

  svg {
    width: 16px;
    height: 16px;
    color: #f59e0b;
    fill: #f59e0b;
  }

  svg.empty {
    color: var(--border-subtle);
    fill: transparent;
  }
`;

const ReviewContent = styled.div`
  font-size: 0.9375rem;
  color: var(--fg-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
`;

const ReviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
`;

const MetaTag = styled.span`
  padding: var(--space-1) var(--space-3);
  background: var(--bg-canvas);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--fg-muted);
`;

const ReviewImages = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
`;

const ReviewImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  background: var(--bg-canvas);
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--border-subtle);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: var(--action-primary);
  }
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-3);
  border-top: 1px solid var(--border-subtle);
`;

const HelpfulButton = styled.button<{ $isHelpful?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8125rem;
  color: ${({ $isHelpful }) =>
    $isHelpful ? "var(--action-primary)" : "var(--fg-muted)"};
  transition: color 0.2s;

  &:hover {
    color: var(--action-primary);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-4);
  margin-top: var(--space-4);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--fg-primary);
  transition: all 0.2s;

  &:hover {
    background: var(--bg-surface-hover);
    border-color: var(--border-strong);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// --- HELPERS ---

const renderStars = (rating: number, size: "small" | "large" = "small") => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={i < Math.floor(rating) ? "" : "empty"} />
  ));
};

// --- COMPONENT ---

interface Props {
  reviews: {
    summary: ReviewsSummary;
    items: Review[];
    filterOptions?: string[];
  };
}

export const ReviewsSection = ({ reviews }: Props) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [visibleCount, setVisibleCount] = useState(5);
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  const { summary, items } = reviews;

  const filters = [
    { id: "all", label: "All Reviews" },
    { id: "verified", label: "Verified" },
    { id: "photos", label: "With Photos" },
    { id: "5star", label: "5 Star" },
    { id: "4star", label: "4 Star" },
  ];

  // Filter and sort reviews
  const filteredReviews = items.filter((review) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "verified") return review.verified;
    if (activeFilter === "photos")
      return review.images && review.images.length > 0;
    if (activeFilter === "5star") return review.rating === 5;
    if (activeFilter === "4star") return review.rating === 4;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "helpful") {
      return (b.helpful || 0) - (a.helpful || 0);
    }
    if (sortBy === "highest") {
      return b.rating - a.rating;
    }
    if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const hasMore = sortedReviews.length > visibleCount;

  const toggleHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container>
      <Header>
        {/* Summary Card */}
        <SummaryCard>
          <AverageRating>
            <span className="score">{summary.average.toFixed(1)}</span>
            <span className="max">/5</span>
          </AverageRating>

          <StarsDisplay>{renderStars(summary.average)}</StarsDisplay>

          <TotalReviews>
            Based on {summary.total.toLocaleString()} reviews
          </TotalReviews>

          <Distribution>
            {[5, 4, 3, 2, 1].map((stars) => {
              const count =
                summary.distribution[
                  stars as keyof typeof summary.distribution
                ];
              const percentage =
                summary.total > 0 ? (count / summary.total) * 100 : 0;

              return (
                <DistributionRow key={stars}>
                  <span className="label">{stars}★</span>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="percentage">{percentage.toFixed(0)}%</span>
                </DistributionRow>
              );
            })}
          </Distribution>
        </SummaryCard>

        {/* Filters */}
        <FiltersSection>
          <FiltersRow>
            {filters.map((filter) => (
              <FilterButton
                key={filter.id}
                $isActive={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </FilterButton>
            ))}
          </FiltersRow>

          <SortSelect>
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </SortSelect>
        </FiltersSection>
      </Header>

      {/* Reviews List */}
      <ReviewsList>
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <ReviewerInfo>
                <ReviewerAvatar>
                  {review.avatar ? (
                    <img src={review.avatar} alt={review.author} />
                  ) : (
                    getInitials(review.author)
                  )}
                </ReviewerAvatar>
                <ReviewerDetails>
                  <div className="name">
                    {review.author}
                    {review.verified && (
                      <span className="verified">
                        <CheckCircle />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="date">{review.date}</div>
                </ReviewerDetails>
              </ReviewerInfo>

              <ReviewRating>{renderStars(review.rating)}</ReviewRating>
            </ReviewHeader>

            <ReviewContent>{review.content}</ReviewContent>

            {review.productOptions && (
              <ReviewMeta>
                {review.productOptions.split(" • ").map((option, i) => (
                  <MetaTag key={i}>{option}</MetaTag>
                ))}
              </ReviewMeta>
            )}

            {review.images && review.images.length > 0 && (
              <ReviewImages>
                {review.images.map((image, i) => (
                  <ReviewImage key={i}>
                    <img src={image} alt={`Review image ${i + 1}`} />
                  </ReviewImage>
                ))}
              </ReviewImages>
            )}

            <ReviewFooter>
              <HelpfulButton
                $isHelpful={helpfulReviews.has(review.id)}
                onClick={() => toggleHelpful(review.id)}
              >
                <ThumbsUp />
                Helpful (
                {(review.helpful || 0) +
                  (helpfulReviews.has(review.id) ? 1 : 0)}
                )
              </HelpfulButton>
            </ReviewFooter>
          </ReviewCard>
        ))}
      </ReviewsList>

      {hasMore && (
        <LoadMoreButton onClick={() => setVisibleCount((prev) => prev + 5)}>
          Load More Reviews
          <ChevronDown />
        </LoadMoreButton>
      )}
    </Container>
  );
};
