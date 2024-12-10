import { http } from "@/lib/http";
import { TServiceForm } from "@/types/schema/Service";

export const getServicesContent = async () => {
  return await http.get("/service").then((response) => response.data);
};

export const getServiceContentById = async (
  id: string,
  token: string | undefined
) => {
  return await http
    .get(`/service/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const deleteServiceContent = async (
  id: string,
  token: string | undefined
) => {
  return await http
    .delete(`/service/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const createServiceContent = async (
  data: TServiceForm,
  token: string | undefined
) => {
  return await http
    .post("/service", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const updateServiceContent = async (
  id: string,
  data: TServiceForm,
  token: string | undefined
) => {
  return await http
    .put(`/service/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};
