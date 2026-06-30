import api from "@/lib/api";

// Customer Dashboard
export const getCustomerDashboard = async () => {
  const response = await api.get("/customer/dashboard");
  return response.data;
};

// ERP Dashboard
export const getERPDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};