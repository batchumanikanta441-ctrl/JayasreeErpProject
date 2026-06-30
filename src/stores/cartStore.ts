import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getGstAmount: () => number;
  getShippingCharges: () => number;
  getTotalAmount: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === product.id
          );
          const stock = Number(product.stockQty ?? product.stock ?? 0);
          const minQty = Number(product.minOrderQty ?? 1);

          if (existing) {
            const newQty = Math.min(existing.quantity + quantity, stock);
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: newQty }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                product,
                quantity: Math.min(Math.max(quantity, minQty), stock),
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.productId !== productId) return item;
            const stock = Number(item.product.stock ?? item.product.stockQty ?? 0);
            const minQty = Number(item.product.minOrderQty ?? 1);
            const newQty = Math.min(Math.max(quantity, minQty), stock);
            return { ...item, quantity: newQty };
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + Number(item.product.price) * Number(item.quantity),
          0
        );
      },

      getGstAmount: () => {
        return get().items.reduce((sum, item) => {
          const gst = Number(item.product.gstRate ?? 18);
          const total = Number(item.product.price) * Number(item.quantity);
          return sum + (total * gst) / 100;
        }, 0);
      },

      getShippingCharges: () => {
        const subtotal = get().getSubtotal();
        if (subtotal >= 100000) return 0;
        if (subtotal >= 50000) return 2000;
        return 3500;
      },

      getTotalAmount: () => {
        return get().getSubtotal() + get().getGstAmount() + get().getShippingCharges();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + Number(item.quantity), 0);
      },
    }),
    {
      name: "jayasree-cart",
    }
  )
);