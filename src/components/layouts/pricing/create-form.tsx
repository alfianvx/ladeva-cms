/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CircleX, LoaderCircle, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Textarea } from "@/components/ui/textarea";
import { PricingFormSchema } from "@/types/validation/pricing.validation";
import { createPricingContent } from "@/services/dashboard/pricing";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreatePricingForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const session = useSession();

  const token = session.data?.access_token;

  const form = useForm<z.infer<typeof PricingFormSchema>>({
    resolver: zodResolver(PricingFormSchema),
  });

  const [inputs, setInputs] = useState<string[]>([""]);

  const addInput = () => {
    setInputs((prev) => [...prev, ""]);
  };

  const handleInputChange = (index: number, value: string) => {
    setInputs((prev) => {
      const updatedInputs = [...prev];
      updatedInputs[index] = value;
      return updatedInputs;
    });
  };

  const mutation = useMutation({
    mutationKey: ["CREATE_PRICING"],
    mutationFn: (values: z.infer<typeof PricingFormSchema>) =>
      createPricingContent(values, token),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan tawaran baru!");
      queryClient.invalidateQueries({ queryKey: ["GET_PRICINGS"] });
      router.push("/dashboard/pricing");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          "Terjadi kesalahan saat menambahkan tawaran : " +
            error.response?.data.message
        );
      } else {
        toast.error("Terjadi kesalahan saat menambahkan tawaran!");
      }
    },
  });

  form.setValue("offer", inputs);

  function onSubmit(values: z.infer<typeof PricingFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <section className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <FormLabel className="col-span-1 text-base">
                  Nama Tawaran
                </FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <FormLabel className="col-span-1 text-base">
                  Deskripsi Tawaran
                </FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <div className="grid grid-cols-3">
              <FormLabel className="col-span-1 text-base">
                Item Tawaran
              </FormLabel>
              <div className="col-span-2 space-y-2">
                {inputs.map((input, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Input
                      value={input}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    {inputs.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          setInputs((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addInput}
                  className="w-full"
                  variant="secondary"
                >
                  Tambah Item
                </Button>
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="is_featured"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <FormLabel className="col-span-1 text-base">
                  Tawaran Unggulan
                </FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormDescription>
                        Tandai jika tawaran ini ingin ditampilkan di bagian
                        unggulan.
                      </FormDescription>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button variant="destructive" asChild>
              <Link href="/dashboard/pricing">
                <CircleX /> Batal
              </Link>
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Save />
              )}
              {mutation.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
