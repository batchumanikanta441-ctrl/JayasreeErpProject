import api from "@/lib/api";

export const getSalesReport = async () => {
  const response = await api.get("/reports/sales");
  return response.data;
};

export const getPurchaseReport = async () => {
  const response = await api.get("/reports/purchases");
  return response.data;
};

export const getInventoryReport = async () => {
  const response = await api.get("/reports/inventory");
  return response.data;
};

export const getBusinessReport = async () => {
  const response = await api.get("/reports/business");
  return response.data;
};