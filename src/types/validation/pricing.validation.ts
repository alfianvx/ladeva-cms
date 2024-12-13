import { z } from "zod";

export const PricingFormSchema = z.object({
  title: z.string({ message: "Title tidak boleh kosong" }),
  description: z.string({ message: "Deskripsi tidak boleh kosong" }),
  offer: z.array(z.string({ message: "Offer tidak boleh kosong" })),
});