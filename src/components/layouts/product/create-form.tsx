/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ProductFormSchema } from "@/types/validation/product.validation";
import { z } from "zod";

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
import { toast } from "sonner";
import { CircleX, LoaderCircle, Save } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/services/dashboard/product";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Editor, EditorRef } from "@/components/editor";

export default function CreateProductForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const session = useSession();

  const token = session.data?.access_token;

  const editorRef = React.useRef<EditorRef>(null);

  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      logo_url:
        "https://utfs.io/f/YdQML4nhRlwkN90TMSCGVd7pO39Ng1cK06SyfhsAHe4BCkuJ",
      thumbnail_url:
        "https://utfs.io/f/YdQML4nhRlwkHwH7rKOgN0frqcjZi3Rm9xkHtJEQOhAXlM8n",
    },
  });

  const mutation = useMutation({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: (values: z.infer<typeof ProductFormSchema>) =>
      createProduct(values, token),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCTS"] });
      router.push("/dashboard/product");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  function onSubmit(values: z.infer<typeof ProductFormSchema>) {
    mutation.mutate(values);
  }

  function submitForm() {
    form.handleSubmit(onSubmit)();
  }

  function deleteLogo() {
    form.setValue("logo_url", "");
    setLogoPreview(null);
  }

  function deleteThumbnail() {
    form.setValue("logo_url", "");
    setThumbnailPreview(null);
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
                onClick={deleteLogo}
              >
                <CircleX size={10} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 mb-4">
        <div className="col-span-1 items-center">
          <label className="text-base">Upload Thumbnail Aplikasi</label>
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
              setThumbnailPreview(file[0].appUrl);
            }}
          />
          {thumbnailPreview && (
            <div className="relative">
              <Image
                src={thumbnailPreview}
                priority
                alt="avatar"
                width={100}
                height={100}
                className="h-full w-32 object-cover rounded-lg"
              />
              <Button
                size="icon"
                className="rounded-full absolute -top-3 -right-3 p-1"
                onClick={deleteThumbnail}
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
              <FormItem className="grid grid-cols-3 space-y-0">
                <FormLabel className="col-span-1 text-base">
                  Nama Produk
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
            name="short_description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 space-y-0">
                <FormLabel className="col-span-1 text-base">
                  Deskripsi Singkat
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
            render={() => (
              <FormItem className="grid grid-cols-3 space-y-0">
                <FormLabel className="col-span-1 text-base">
                  Deskripsi
                </FormLabel>
                <div className="col-span-2 space-y-2">
                  {/* <Editor
                    ref={editorRef}
                    toolBarClassName="w-full"
                    editorProps={{
                      attributes: {
                        class:
                          "py-6 px-8 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert",
                      },
                    }}
                    onUpdate={({ editor }) => {
                      const html = !editor.isEmpty ? editor.getHTML() : "";
                      form.setValue("description", html);
                    }}
                  /> */}
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="border rounded-lg">
        <Editor
          ref={editorRef}
          toolBarClassName="w-full"
          editorProps={{
            attributes: {
              class:
                "py-6 px-8 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert",
            },
          }}
          onUpdate={({ editor }) => {
            const html = !editor.isEmpty ? editor.getHTML() : "";
            form.setValue("description", html);
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-3 mt-4">
        <Button variant="destructive" asChild>
          <Link href="/dashboard/service">
            <CircleX /> Batal
          </Link>
        </Button>
        <Button
          type="submit"
          onClick={submitForm}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Save />
          )}
          {mutation.isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </section>
  );
}
