import { http } from "@/lib/http";
import { TUserForm } from "@/types/schema/User";

export const updateProfile = async (
  id: string,
  data: TUserForm,
  token: string | undefined
) => {
  return await http.put(`/user/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
