import { z } from "zod";

export const FaqFormSchema = z.object({
  question: z
    .string()
    .min(2, { message: "Pertanyaan tidak boleh kosong, isi minimal 2 huruf" })
    .max(50),
  answer: z
    .string()
    .min(2, { message: "Jawaban tidak boleh kosong, isi minimal 2 huruf" })
    .max(50),
});
