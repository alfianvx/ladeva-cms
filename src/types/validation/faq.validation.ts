import { z } from "zod";

export const FaqFormSchema = z.object({
  question: z
    .string()
    .min(2, { message: "Pertanyaan tidak boleh kosong" }),
  answer: z
    .string()
    .min(2, { message: "Jawaban tidak boleh kosong" }),
});
