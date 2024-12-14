import { z } from "zod";

export const UserRegistFormSchema = z.object({
  name: z.string({ message: "Nama tidak boleh kosong" }),
  email: z.string({ message: "Email tidak boleh kosong" }),
  password: z.string({ message: "Password tidak boleh kosong" }),
  role: z.string({ message: "Role tidak boleh kosong" }),
});

export const UserUpdateFormSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});
