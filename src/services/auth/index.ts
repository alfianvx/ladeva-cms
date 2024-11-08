import { http } from "@/lib/http";
import { auth } from "../../../auth";

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

export const authUserToken = async () => {
  try {
    const session = await auth();
    return session?.access_token;
  } catch {
    throw new Error("No token provided!");
  }
};
