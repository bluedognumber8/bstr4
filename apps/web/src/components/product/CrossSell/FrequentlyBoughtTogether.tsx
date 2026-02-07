// src/components/product/CrossSell/FrequentlyBoughtTogether.tsx
"use client";

import { styled } from "next-yak";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { queries } from "@/config/theme";

// --- STYLES ---

const Container = styled.div`
  margin-bottom: var(--space-8);
  padding: var(--space-6);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
`;

const Title = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin: 0 0 var(--space-5);
`;

const ProductsRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: var(--space-5);
`;

const ProductCard = styled.div<{ $isSelected: boolean; $isMain?: boolean }>`
  flex: 1;
  min-width: 140px;
  max-width: 200px;
  padding: var(--space-4);
  background: ${({ $isSelected }) =>
    $isSelected ? "var(--bg-canvas)" : "var(--bg-surface)"};
  border: 2px solid
    ${({ $isSelected, $isMain }) =>
      $isMain
        ? "var(--action-primary)"
        : $isSelected
        ? "var(--color-success)"
        : "var(--border-subtle)"};
  border-radius: var(--radius-md);
  text-align: center;
  cursor: ${({ $isMain }) => ($isMain ? "default" : "pointer")};
  transition: all 0.2s;
  position: relative;

  ${({ $isMain }) =>
    !$isMain &&
    `
    &:hover {
      border-color: var(--border-strong);
    }
  `}
`;

const CheckboxOverlay = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  border: 2px solid
    ${({ $isSelected }) =>
      $isSelected ? "var(--color-success)" : "var(--border-strong)"};
  background: ${({ $isSelected }) =>
    $isSelected ? "var(--color-success)" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 12px;
    height: 12px;
    color: white;
  }
`;

const ProductImage = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto var(--space-2);
  border-radius: var(--radius-sm);
  background: var(--bg-surface-hover);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductName = styled.div`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fg-primary);
  margin-bottom: var(--space-1);
  line-height: 1.3;
`;

const ProductPrice = styled.div`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--fg-primary);
`;

const PlusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fg-muted);

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
  flex-wrap: wrap;
  gap: var(--space-3);
`;

const TotalSection = styled.div`
  .label {
    font-size: 0.8125rem;
    color: var(--fg-muted);
    margin-bottom: var(--space-1);
  }

  .price {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--fg-primary);
  }

  .savings {
    font-size: 0.8125rem;
    color: var(--color-success);
    font-weight: 600;
  }
`;

const AddButton = styled.button`
  padding: var(--space-3) var(--space-6);
  background: var(--action-primary);
  color: var(--fg-inverse);
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9375rem;
  transition: all 0.2s;

  &:hover {
    background: var(--action-primary-hover);
  }
`;

// --- COMPONENT ---

interface Product {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
}

interface Props {
  currentProduct: Product;
  relatedProducts: Product[];
  gameSlug: string;
}

export const FrequentlyBoughtTogether = ({
  currentProduct,
  relatedProducts,
  gameSlug,
}: Props) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedProducts = relatedProducts.filter((p) => selectedIds.has(p.id));
  const totalPrice =
    currentProduct.price +
    selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const savings = selectedProducts.length > 0 ? totalPrice * 0.1 : 0; // 10% bundle discount
  const finalPrice = totalPrice - savings;

  return (
    <Container>
      <Title>Frequently Bought Together</Title>

      <ProductsRow>
        <ProductCard $isSelected $isMain>
          <ProductImage>
            <img src={currentProduct.image} alt={currentProduct.title} />
          </ProductImage>
          <ProductName>{currentProduct.title}</ProductName>
          <ProductPrice>${currentProduct.price.toFixed(2)}</ProductPrice>
        </ProductCard>

        {relatedProducts.slice(0, 2).map((product, index) => (
          <>
            <PlusIcon key={`plus-${index}`}>
              <Plus />
            </PlusIcon>
            <ProductCard
              key={product.id}
              $isSelected={selectedIds.has(product.id)}
              onClick={() => toggleProduct(product.id)}
            >
              <CheckboxOverlay $isSelected={selectedIds.has(product.id)}>
                {selectedIds.has(product.id) && <Check />}
              </CheckboxOverlay>
              <ProductImage>
                <img src={product.image} alt={product.title} />
              </ProductImage>
              <ProductName>{product.title}</ProductName>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            </ProductCard>
          </>
        ))}
      </ProductsRow>

      <Footer>
        <TotalSection>
          <div className="label">Bundle Price</div>
          <div className="price">${finalPrice.toFixed(2)}</div>
          {savings > 0 && (
            <div className="savings">Save ${savings.toFixed(2)} (10%)</div>
          )}
        </TotalSection>

        <AddButton>Add {selectedIds.size + 1} items to Cart</AddButton>
      </Footer>
    </Container>
  );
};
