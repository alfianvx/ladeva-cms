"use client";

import z from "zod";

export const signInFormSchema = z.object({
  email: z.string({ message: "email tidak boleh kosong" }).email({
    message: "Email tidak valid",
  }),
  password: z
    .string({ message: "Password tidak boleh kosong" })
    .min(8, { message: "Password minimal 8 karakter" }),
});
