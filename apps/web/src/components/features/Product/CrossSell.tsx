"use client";

import { styled } from "next-yak";
import { MOCK_PRODUCTS } from "@/data/mock-games";
import { Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const Section = styled.section`
  margin-top: 48px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--fg-primary);
`;

const DiscountBadge = styled.span`
  background: var(--color-success);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 99px;
`;

const BundleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MiniCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const Thumb = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid var(--border-subtle);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--fg-primary);
`;

const Price = styled.span`
  font-size: 0.85rem;
  color: var(--fg-secondary);

  s {
    color: var(--fg-muted);
    margin-right: 6px;
  }
`;

const AddBtn = styled.button`
  background: var(--bg-canvas);
  border: 1px solid var(--border-strong);
  color: var(--fg-primary);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--action-primary);
    color: var(--bg-canvas);
    border-color: var(--action-primary);
  }
`;

export const CrossSell = ({ relatedIds }: { relatedIds?: string[] }) => {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  if (!relatedIds || relatedIds.length === 0) return null;

  // Find the actual product objects
  const relatedItems = relatedIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof MOCK_PRODUCTS;

  if (relatedItems.length === 0) return null;

  return (
    <Section>
      <Header>
        <Title>Frequently Bought Together</Title>
        <DiscountBadge>Save 10%</DiscountBadge>
      </Header>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {relatedItems.map((item) => (
          <BundleRow key={item.id}>
            <MiniCard>
              <Thumb src={item.image} />
              <Info>
                <Name>{item.title}</Name>
                <Price>
                  <s>${item.basePrice}</s>
                  <strong>${(item.basePrice * 0.9).toFixed(2)}</strong>
                </Price>
              </Info>
            </MiniCard>

            <AddBtn
              aria-label="Add to bundle"
              onClick={() => {
                addItem({
                  productId: item.id,
                  title: item.title,
                  price: item.basePrice * 0.9, // Apply discount logic here
                  image: item.image,
                  quantity: 1,
                  category: "service",
                });
                toast.success("Bundle item added!");
                openCart();
              }}
            >
              <Plus size={16} />
            </AddBtn>
          </BundleRow>
        ))}
      </div>
    </Section>
  );
};
