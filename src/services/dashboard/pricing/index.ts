import { http } from "@/lib/http";
import { TPricingForm } from "@/types/schema/Pricing";

export const getPricingsContent = async () => {
  return await http.get("/pricing").then((response) => response.data);
};

export const getPricingContentById = async (
  id: string,
  token: string | undefined
) => {
  return await http
    .get(`/pricing/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const deletePricingContent = async (
  id: string,
  token: string | undefined
) => {
  return await http
    .delete(`/pricing/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const createPricingContent = async (
  data: TPricingForm,
  token: string | undefined
) => {
  return await http
    .post("/pricing", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const updatePricingContent = async (
  id: string,
  data: TPricingForm,
  token: string | undefined
) => {
  return await http
    .put(`/pricing/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};
