/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
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
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import React from "react";
import { TClient } from "@/types/schema/Client";
import { ClientFormSchema } from "@/types/validation/client.validation";
import { updateClient } from "@/services/dashboard/client";

export default function EditClientForm({ data }: { data: TClient }) {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.access_token;
  const query = useQueryClient();

  console.log(data.logo_url);

  const [logoPreview, setLogoPreview] = React.useState<string | null>(
    data.logo_url
  );

  const form = useForm<z.infer<typeof ClientFormSchema>>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: data.name,
      logo_url: data.logo_url,
    },
  });

  const mutation = useMutation({
    mutationKey: ["UPDATE_CLIENT", data.id],
    mutationFn: (values: z.infer<typeof ClientFormSchema>) =>
      updateClient(data.id, values, token),
    onSuccess: () => {
      form.reset();
      router.push("/dashboard/client");
      query.invalidateQueries({ queryKey: ["GET_CLIENTS"] });
    },
    onError: (error) => {
      console.error("Submission error:", error);
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
          <label className="text-base">Upload Logo</label>
          <span className="text-xs ml-3">( opsional )</span>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <UploadButton<OurFileRouter, any>
            endpoint="imageUploader"
            appearance={{
              container: "w-32 h-32 border border-dashed p-2 rounded-lg",
              button:
                "w-full h-full border border-dashed rounded-lg bg-zinc-800 dark:border-gray-300 border-zinc-800 ",
            }}
            onClientUploadComplete={(file) => {
              form.setValue("logo_url", file[0].appUrl);
              setLogoPreview(file[0].appUrl);
            }}
          />
          {form.getValues("logo_url") !== "" && logoPreview !== null ? (
            <div className="relative">
              <div className="w-56 h-24 flex justify-center">
                <Image
                  className="object-contain"
                  src={form.getValues("logo_url") ?? logoPreview}
                  alt="logo"
                  priority
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </div>
              <Button
                size="icon"
                className="rounded-full absolute -top-3 -right-3 p-1"
                onClick={deleteAvatar}
              >
                <CircleX size={10} />
              </Button>
            </div>
          ) : null}
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
              {mutation.isPending ? "Mengupdate..." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
