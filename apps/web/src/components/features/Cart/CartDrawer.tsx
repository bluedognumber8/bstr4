"use client";

import { Drawer } from "@/components/ui/Drawer";
import { useCartStore } from "@/store/useCartStore";
import { styled } from "next-yak";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--fg-primary);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--fg-secondary);
  gap: 10px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-canvas);
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.span`
  font-weight: 600;
  color: var(--fg-primary);
`;

const ItemPrice = styled.span`
  color: var(--fg-secondary);
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  color: var(--color-danger);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;

export const CartDrawer = () => {
  const { isCartOpen, closeCart, items, removeItem, getTotalPrice } =
    useCartStore();

  return (
    <Drawer open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <CartHeader>
        <Title>Your Cart ({items.length})</Title>
      </CartHeader>

      {items.length === 0 ? (
        <EmptyState>
          <FaShoppingCart size={48} style={{ opacity: 0.2 }} />
          <p>Your cart is empty</p>
        </EmptyState>
      ) : (
        <ItemList>
          {items.map((item) => (
            <CartItem key={item.cartItemId}>
              <ItemInfo>
                <ItemName>{item.title}</ItemName>
                <ItemPrice>
                  ${item.price} x {item.quantity}
                </ItemPrice>
              </ItemInfo>
              <RemoveButton onClick={() => removeItem(item.cartItemId)}>
                <FaTrash />
              </RemoveButton>
            </CartItem>
          ))}

          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              <span>Total</span>
              <span>${getTotalPrice()}</span>
            </div>
            {/* Add Checkout Button Here */}
          </div>
        </ItemList>
      )}
    </Drawer>
  );
};
