import api from "@/lib/api";

export const getProducts = async () => {
    const response = await api.get("/products/");
    return response.data;
};

export const createProduct = async (data: any) => {
    const response = await api.post("/products/", data);
    return response.data;
};

export const updateProduct = async (id: number, data: any) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
};