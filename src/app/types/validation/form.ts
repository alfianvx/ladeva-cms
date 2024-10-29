"use client";

import z from "zod";

export const signInFormSchema = z.object({
  email: z.string({ message: "email tidak boleh kosong" }).email(),
  password: z
    .string({ message: "password tidak boleh kosong" })
    .min(8, { message: "password minimal 8 karakter" }),
});
