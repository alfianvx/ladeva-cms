"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { CircleX, Loader, Save } from "lucide-react";
import { ClientFormSchema } from "@/types/validation/client.validation";
import { UploadButton } from "@/lib/uploadthing";
import { randomString } from "@/lib/utils";
import { createClientContent } from "@/services/dashboard/client";

export default function CreateClientForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const session = useSession();

  const token = session.data?.access_token;

  const mutation = useMutation({
    mutationKey: ["CREATE_CLIENT"],
    mutationFn: (values: z.infer<typeof ClientFormSchema>) =>
      createClientContent(values, token),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["GET_FAQS"] });
      router.push("/dashboard/faq");
    },
    onError: (error) => {
      console.error("Submission error:", error);
    },
  });

  const form = useForm<z.infer<typeof ClientFormSchema>>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof ClientFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <section className="my-10">
      <Card className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="pt-[24px] flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Client</FormLabel>
                    <FormControl>
                      <Input placeholder="Ladeva Software House" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <div className="flex justify-start">
                    <UploadButton
                      appearance={{
                        button: {
                          backgroundColor: "#1c1917",
                        },
                      }}
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
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </CardContent>
            <CardFooter className="flex gap-3 justify-end">
              <Button variant="destructive" asChild>
                <Link href="/dashboard/client">
                  <CircleX /> Batal
                </Link>
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Save />
                )}
                {mutation.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
}
