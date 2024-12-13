import { http } from "@/lib/http";

export const getMembers = async (token: string | undefined) => {
  return await http
    .get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};
