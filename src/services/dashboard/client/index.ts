import { http } from "@/lib/http";
import { TClientForm } from "@/types/schema/Client";

export const getClients = async () => {
  return await http.get("/client").then((response) => response.data);
};

export const getClientById = async (id: string, token: string | undefined) => {
  return await http
    .get(`/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const deleteClient = async (id: string, token: string | undefined) => {
  return await http
    .delete(`/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const createClient = async (
  data: TClientForm,
  token: string | undefined
) => {
  return await http
    .post("/client", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const updateClient = async (
  id: string,
  data: TClientForm,
  token: string | undefined
) => {
  return await http
    .put(`/client/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};
