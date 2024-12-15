import { z } from "zod";

export const UserRegistFormSchema = z
  .object({
    name: z.string({ message: "Nama tidak boleh kosong" }),
    email: z.string({ message: "Email tidak boleh kosong" }).email({
      message: "Email tidak valid",
    }),
    password: z.string({ message: "Password tidak boleh kosong" }).min(8, {
      message: "Password minimal 8 karakter",
    }),
    confirmPassword: z
      .string({
        message: "Konfirmasi password tidak boleh kosong",
      })
      .min(8, { message: "Password minimal 8 karakter" })
      .optional(),
    role: z.string({ message: "Role tidak boleh kosong" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export const UserUpdateFormSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});
