import api from "@/lib/api";

export const askAI = async (question: string) => {
  const response = await api.post("/ai/ask", {
    question,
  });

  return response.data;
};