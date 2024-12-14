import { http } from "@/lib/http";
import { TPortofolioForm } from "@/types/schema/Portofolio";

export const getPortofolios = async () => {
  return await http.get("/portofolio").then((response) => response.data);
};

export const getPortofolioById = async (id: string) => {
  return await http.get(`/portofolio/${id}`).then((response) => response.data);
};

export const getPortofolioBySlug = async (slug: string) => {
  return await http
    .get(`/portofolio/slug/${slug}`)
    .then((response) => response.data);
};

export const deletePortofolio = (id: string, token: string | undefined) => {
  return http.delete(`/portofolio/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPortofolio = (
  data: TPortofolioForm,
  token: string | undefined
) => {
  return http.post("/portofolio", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePortofolio = (
  id: string,
  data: TPortofolioForm,
  token: string | undefined
) => {
  return http.put(`/portofolio/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
