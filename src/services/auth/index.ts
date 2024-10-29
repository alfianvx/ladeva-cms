import { http } from "@/lib/http";

export const authUserSignIn = async (email: string, password: string) => {
  return await http
    .post("/auth/login", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};
