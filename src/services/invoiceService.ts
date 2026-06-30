import api from "@/lib/api";

export const getInvoices = async () => {
  const response = await api.get("/invoices/");
  return response.data;
};

export const createInvoice = async (data: any) => {
  const response = await api.post("/invoices/", data);
  return response.data;
};

export const deleteInvoice = async (id: number) => {
  await api.delete(`/invoices/${id}`);
};