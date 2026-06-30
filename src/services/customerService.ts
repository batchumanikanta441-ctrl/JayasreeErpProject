import api from "@/lib/api";

export const getCustomers = async () => {
  const response = await api.get("/customers/");
  return response.data;
};

export const createCustomer = async (data: any) => {
  const response = await api.post("/customers/", data);
  return response.data;
};

export const updateCustomer = async (id: number, data: any) => {
  const response = await api.put(`/customers/${id}`, data);
  return response.data;
};

export const deleteCustomer = async (id: number) => {
  await api.delete(`/customers/${id}`);
};