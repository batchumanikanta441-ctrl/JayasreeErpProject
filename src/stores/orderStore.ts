import { create } from "zustand";
import {
  createOrder,
  getCustomerOrders,
  getOwnerOrders,
  approveOrder,
  rejectOrder,
  dispatchOrder,
  deliverOrder,
  deleteOrder,
} from "@/services/orderService";

interface OrderData {
  id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  rejection_reason?: string;
  estimated_delivery?: string;
  created_at?: string;
  updated_at?: string;
}

interface CreateOrderData {
  customer_id: number;
  product_id: number;
  quantity: number;
  payment_method: string;
}

interface OrderStore {
  orders: OrderData[];
  loading: boolean;
  loadCustomerOrders: (customerId: number) => Promise<void>;
  loadOwnerOrders: () => Promise<void>;
  placeOrder: (data: CreateOrderData) => Promise<boolean>;
  approve: (orderId: number) => Promise<boolean>;
  reject: (orderId: number, reason: string) => Promise<boolean>;
  dispatch: (orderId: number) => Promise<boolean>;
  deliver: (orderId: number) => Promise<boolean>;
  remove: (orderId: number) => Promise<boolean>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,

  loadCustomerOrders: async (customerId) => {
    set({ loading: true });
    try {
      const data = await getCustomerOrders(customerId);
      set({ orders: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  loadOwnerOrders: async () => {
    set({ loading: true });
    try {
      const data = await getOwnerOrders();
      set({ orders: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  placeOrder: async (data) => {
    try {
      await createOrder(data);
      return true;
    } catch {
      return false;
    }
  },

  approve: async (orderId) => {
    try {
      await approveOrder(orderId);
      return true;
    } catch {
      return false;
    }
  },

  reject: async (orderId, reason) => {
    try {
      await rejectOrder(orderId, reason);
      return true;
    } catch {
      return false;
    }
  },

  dispatch: async (orderId) => {
    try {
      await dispatchOrder(orderId);
      return true;
    } catch {
      return false;
    }
  },

  deliver: async (orderId) => {
    try {
      await deliverOrder(orderId);
      return true;
    } catch {
      return false;
    }
  },

  remove: async (orderId) => {
    try {
      await deleteOrder(orderId);
      return true;
    } catch {
      return false;
    }
  },
}));