import { z } from "zod";

export const PricingFormSchema = z.object({
  title: z.string({ message: "Nama tidak boleh kosong" }),
  description: z.string({ message: "Deskripsi tidak boleh kosong" }),
  offer: z.array(z.string({ message: "Offer tidak boleh kosong" })),
  is_featured: z.boolean().optional().default(false),
});
