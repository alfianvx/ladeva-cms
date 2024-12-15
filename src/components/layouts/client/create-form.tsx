/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CircleX, LoaderCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { ClientFormSchema } from "@/types/validation/client.validation";
import { createClient } from "@/services/dashboard/client";

export default function CreateClientForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const session = useSession();

  const token = session.data?.access_token;

  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationKey: ["CREATE_CLIENT"],
    mutationFn: (values: z.infer<typeof ClientFormSchema>) =>
      createClient(values, token),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["GET_CLIENTS"] });
      router.push("/dashboard/client");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const form = useForm<z.infer<typeof ClientFormSchema>>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      logo_url:
        "https://utfs.io/f/YdQML4nhRlwkN90TMSCGVd7pO39Ng1cK06SyfhsAHe4BCkuJ",
    },
  });

  function onSubmit(values: z.infer<typeof ClientFormSchema>) {
    mutation.mutate(values);
  }

  function deleteAvatar() {
    form.setValue("logo_url", "");
    setLogoPreview(null);
  }

  return (
    <section className="p-4">
      <div className="grid grid-cols-3 mb-4">
        <div className="col-span-1 items-center">
          <label className="text-base">Logo</label>
          <span className="text-xs ml-3">( opsional )</span>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <UploadButton<OurFileRouter, any>
            endpoint="imageUploader"
            appearance={{
              container:
                "w-32 h-32 border border-dashed dark:border-gray-400 border-zinc-800 p-2 rounded-lg",
              button:
                "w-full h-full border border-dashed rounded-lg bg-zinc-800 dark:border-gray-400 border-zinc-800",
            }}
            onClientUploadComplete={(file) => {
              form.setValue("logo_url", file[0].appUrl);
              setLogoPreview(file[0].appUrl);
            }}
          />
          {logoPreview && (
            <div className="relative">
              <Image
                src={logoPreview}
                priority
                alt="avatar"
                width={100}
                height={100}
                className="h-full w-32 object-cover rounded-lg"
              />
              <Button
                size="icon"
                className="rounded-full absolute -top-3 -right-3 p-1"
                onClick={deleteAvatar}
              >
                <CircleX size={10} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <FormLabel className="col-span-1 text-base">
                  Nama Perusahaan
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
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button variant="destructive" asChild>
              <Link href="/dashboard/client">
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
