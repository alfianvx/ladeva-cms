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
// import { Editor, EditorRef } from "@/components/editor";
// import { useRef } from "react";
import { toast } from "sonner";

export default function CreateProductForm() {
  // const editorRef = useRef<EditorRef>(null);

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
  });

  function onSubmit(values: z.infer<typeof ProductFormSchema>) {
    console.log(values);
    toast("Form submitted with values: " + JSON.stringify(values));
  }

  return (
    <section className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Singkat</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="thumbnail_url"
            render={() => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <UploadButton
                    endpoint="imageUploader"
                    onUploadProgress={() => {
                      console.log("Upload Progress");
                    }}
                    onClientUploadComplete={(res) => {
                      console.log("Client Upload Complete");
                      // Do something with the response
                      console.log(
                        "this is file url:",
                        res.map((item) => item.url)
                      );

                      res.map((item) =>
                        form.setValue("thumbnail_url", item.url[0])
                      );
                    }}
                    onBeforeUploadBegin={(files) => {
                      // Preprocess files before uploading (e.g. rename them)
                      return files.map(
                        (f) =>
                          new File([f], randomString() + "-" + f.name, {
                            type: f.type,
                          })
                      );
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      console.log("error bang", error.cause);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <div className="border rounded-lg">
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
          </div> */}
          <div className="flex items-center justify-end gap-3">
            <Button type="button" asChild variant="destructive">
              <Link href="/dashboard/product">Batalkan</Link>
            </Button>
            <Button type="submit">Buat</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
