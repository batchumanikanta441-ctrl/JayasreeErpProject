import api from "@/lib/api";

export const getPayments = async () => {
  const response = await api.get("/payments/");
  return response.data;
};

export const createPayment = async (data: any) => {
  const response = await api.post("/payments/", data);
  return response.data;
};