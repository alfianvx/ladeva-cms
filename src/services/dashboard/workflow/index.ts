import { http } from "@/lib/http";
import { TWorkflowForm } from "@/types/schema/Workflow";

export const getWorkflowsContent = async () => {
  return await http.get("/workflow").then((response) => response.data);
};

export const getWorkflowContentById = async (
  id: string,
  token: string | undefined
) => {
  return await http
    .get(`/workflow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const deleteWorkflowContent = async (
  id: string,
  token: string | undefined
) => {
  return await http
    .delete(`/workflow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const createWorkflowContent = async (
  data: TWorkflowForm,
  token: string | undefined
) => {
  return await http
    .post("/workflow", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const updateWorkflowContent = async (
  id: string,
  data: TWorkflowForm,
  token: string | undefined
) => {
  return await http
    .put(`/workflow/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};
