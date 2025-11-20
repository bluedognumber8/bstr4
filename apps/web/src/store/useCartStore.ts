import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

// 1. Define what a "Cart Item" looks like
// It handles both Fixed Products (Keyboard) and Variable Services (Boosting)
export interface CartItem {
  cartItemId: string; // Unique ID for this specific line item
  productId: string; // ID from Strapi
  title: string;
  price: number; // Final calculated price
  image?: string;
  quantity: number;
  category: "physical" | "service";

  // Critical for Services: Stores the specific configuration
  // e.g. { "start_rank": "Silver", "end_rank": "Gold", "server": "EU" }
  options?: Record<string, any>;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;

  // Discount Logic (Simple MVP)
  discountCode: string | null;
  discountAmount: number; // Fixed amount or % calculation result

  // Actions
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "cartItemId">) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, step: number) => void;
  applyDiscount: (code: string, amount: number) => void;
  clearCart: () => void;

  // Getters
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      discountCode: null,
      discountAmount: 0,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (newItem) => {
        set((state) => {
          // For physical items, we can stack quantity if options match exactly
          // For services, we usually add distinct items (User might buy 2 different boosts)
          const existingItem = state.items.find(
            (i) =>
              i.productId === newItem.productId &&
              JSON.stringify(i.options) === JSON.stringify(newItem.options)
          );

          if (existingItem && newItem.category === "physical") {
            return {
              items: state.items.map((i) =>
                i.cartItemId === existingItem.cartItemId
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
              isCartOpen: true,
            };
          }

          // Add as new unique line item
          return {
            items: [...state.items, { ...newItem, cartItemId: uuidv4() }],
            isCartOpen: true,
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== id),
        }));
      },

      updateQuantity: (id, step) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.cartItemId === id) {
              const newQty = Math.max(1, i.quantity + step);
              return { ...i, quantity: newQty };
            }
            return i;
          }),
        }));
      },

      applyDiscount: (code, amount) => {
        set({ discountCode: code, discountAmount: amount });
      },

      clearCart: () =>
        set({ items: [], discountCode: null, discountAmount: 0 }),

      getTotalPrice: () => {
        const { items, discountAmount } = get();
        const subtotal = items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return Math.max(0, subtotal - discountAmount);
      },
    }),
    {
      name: "gaming-shop-cart", // unique name for LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
