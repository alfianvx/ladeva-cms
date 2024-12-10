import { http } from "@/lib/http";
import { TFaqForm } from "@/types/schema/Faq";

export const getFaqsContent = () => {
  return http.get("/faq").then((response) => response.data);
};

export const getFaqContentById = (id: string, token: string | undefined) => {
  return http.get(`/faq/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteFaqContent = (id: string, token: string | undefined) => {
  return http.delete(`/faq/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createFaqContent = (data: TFaqForm, token: string | undefined) => {
  return http.post("/faq", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateFaqContent = (
  id: string,
  data: TFaqForm,
  token: string | undefined
) => {
  return http.put(`/faq/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
