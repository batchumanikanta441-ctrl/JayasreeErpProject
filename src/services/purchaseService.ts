import api from "@/lib/api";

export const getPurchases = async () => {
  const response = await api.get("/purchases/");
  return response.data;
};

export const createPurchase = async (data: {
  supplier_id: number;
  product_id: number;
  quantity: number;
}) => {
  const response = await api.post("/purchases/", data);
  return response.data;
};