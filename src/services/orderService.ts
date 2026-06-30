import api from "@/lib/api";

// Customer places order
export const createOrder = async (data: any) => {
  const response = await api.post("/sales/", data);
  return response.data;
};

// Customer My Orders
export const getCustomerOrders = async (customerId: number) => {
  const response = await api.get(`/sales/customer/${customerId}`);
  return response.data;
};

// Owner Sales & Orders
export const getOwnerOrders = async () => {
  const response = await api.get("/sales/owner");
  return response.data;
};

// Owner approves order
export const approveOrder = async (orderId: number) => {
  const response = await api.put(`/sales/approve/${orderId}`);
  return response.data;
};

// Owner rejects order
export const rejectOrder = async (
  orderId: number,
  reason: string
) => {
  const response = await api.put(
    `/sales/reject/${orderId}`,
    null,
    {
      params: {
        reason,
      },
    }
  );

  return response.data;
};

// Owner dispatches order
export const dispatchOrder = async (
  orderId: number
) => {
  const response = await api.put(
    `/sales/dispatch/${orderId}`
  );

  return response.data;
};

// Owner marks delivered
export const deliverOrder = async (
  orderId: number
) => {
  const response = await api.put(
    `/sales/deliver/${orderId}`
  );

  return response.data;
};
export const getOrders = async () => {
  return await getOwnerOrders();
};

// Delete order
export const deleteOrder = async (
  orderId: number
) => {
  await api.delete(`/sales/${orderId}`);
};