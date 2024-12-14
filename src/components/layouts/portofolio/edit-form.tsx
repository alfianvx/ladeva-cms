/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { CircleX, LoaderCircle, Save } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Editor, EditorRef } from "@/components/editor";
import { TProduct } from "@/types/schema/Product";
import { PortofolioFormSchema } from "@/types/validation/portofolio.validation";
import { updatePortofolio } from "@/services/dashboard/portofolio";

export default function EditPortofolioForm({ data }: { data: TProduct }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const session = useSession();

  const token = session.data?.access_token;

  const editorRef = React.useRef<EditorRef>(null);

  const [logoPreview, setLogoPreview] = React.useState<string | null>(
    data.logo_url
  );
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string | null>(
    data.thumbnail_url
  );

  const form = useForm<z.infer<typeof PortofolioFormSchema>>({
    resolver: zodResolver(PortofolioFormSchema),
    defaultValues: {
      name: data.name,
      short_description: data.short_description,
      description: data.description,
      logo_url: data.logo_url,
      thumbnail_url: data.thumbnail_url,
    },
  });

  const mutation = useMutation({
    mutationKey: ["UPDATE_PORTOFOLIO", data.id],
    mutationFn: (values: z.infer<typeof PortofolioFormSchema>) =>
      updatePortofolio(data.id, values, token),
    onSuccess: () => {
      form.reset();
      router.push("/dashboard/portofolio");
      queryClient.invalidateQueries({ queryKey: ["GET_PORTOFOLIOS"] });
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_PORTOFOLIO_BY_ID", data.id],
      });
    },
    onError: (error) => {
      console.error("Submission error:", error);
    },
  });

  function onSubmit(values: z.infer<typeof PortofolioFormSchema>) {
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
    form.setValue("thumbnail_url", "");
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
                onClick={deleteLogo}
              >
                <CircleX size={10} />
              </Button>
            </div>
          ) : null}
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
              form.setValue("thumbnail_url", file[0].appUrl);
              setThumbnailPreview(file[0].appUrl);
            }}
          />
          {form.getValues("thumbnail_url") !== "" &&
          thumbnailPreview !== null ? (
            <div className="relative">
              <div className="w-56 h-24 flex justify-center">
                <Image
                  className="object-contain"
                  src={form.getValues("thumbnail_url") ?? thumbnailPreview}
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
                onClick={deleteThumbnail}
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
              <FormItem className="grid grid-cols-3 space-y-0">
                <FormLabel className="col-span-1 text-base">
                  Nama Portofolio
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
        </form>
      </Form>
      <div className="grid grid-cols-3 my-4">
        <label className="col-span-1">Deskripsi</label>
        <div className="border rounded-lg col-span-2">
          <Editor
            ref={editorRef}
            toolBarClassName="w-full z-10"
            footerClassName="w-full z-10"
            content={data.description}
            editorProps={{
              attributes: {
                class:
                  "py-6 px-4 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert",
              },
            }}
            onUpdate={({ editor }) => {
              const html = !editor.isEmpty ? editor.getHTML() : "";
              form.setValue("description", html);
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-4">
        <Button variant="destructive" asChild>
          <Link href="/dashboard/portofolio">
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
