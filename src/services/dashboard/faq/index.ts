import { http } from "@/lib/http";
import { TFaqForm } from "@/types/schema/Faq";

export const getFaqsContent = async () => {
  return await http.get("/faq").then((response) => response.data);
};

export const getFaqContentById = async (
  id: string,
  token: string | undefined
) => {
  return await http.get(`/faq/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteFaqContent = async (
  id: string,
  token: string | undefined
) => {
  return await http.delete(`/faq/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createFaqContent = async (
  data: TFaqForm,
  token: string | undefined
) => {
  return await http.post("/faq", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateFaqContent = async (
  id: string,
  data: TFaqForm,
  token: string | undefined
) => {
  return await http.put(`/faq/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
