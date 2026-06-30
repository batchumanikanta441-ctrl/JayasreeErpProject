import api from "@/lib/api";

export const getSuppliers = async () => {
  const response = await api.get("/suppliers/");
  return response.data;
};

export const createSupplier = async (data: any) => {
  const response = await api.post("/suppliers/", data);
  return response.data;
};

export const updateSupplier = async (id: number, data: any) => {
  const response = await api.put(`/suppliers/${id}`, data);
  return response.data;
};

export const deleteSupplier = async (id: number) => {
  await api.delete(`/suppliers/${id}`);
};