"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFaqContent, getFaqsContent } from "@/services/dashboard/faq";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { Loader, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

type TFaq = {
  id: string;
  question: string;
  answer: string;
};

export default function ClientContent() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_FAQS"],
    queryFn: getFaqsContent,
  });

  const queryClient = useQueryClient();
  const session = useSession();
  const token = session.data?.access_token;

  const mutation = useMutation({
    mutationKey: ["DELETE_FAQ"],
    mutationFn: (id: string) => deleteFaqContent(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_FAQS"] });
    },
  });

  const handleDeleteFaq = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading && isFetching) {
    return (
      <div className="flex justify-center items-center my-56">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (data.data.length === 0)
    return (
      <div className="flex flex-col gap-4 justify-center items-center my-56 px-4">
        <span>Belum ada client terdaftar</span>
        <Button asChild>
          <Link href="/dashboard/client/create">
            <Plus /> Tambah Client Baru
          </Link>
        </Button>
      </div>
    );

  return (
    <section className="my-10">
      {data.data.map((item: TFaq) => (
        <Card key={1} className="max-w-3xl mx-auto my-3">
          <CardContent className="pt-[24px]">
            <p>list client</p>
          </CardContent>
          <CardFooter className="flex gap-3 justify-end">
            <Button asChild>
              <Link href={`/dashboard/faq/edit/${item.id}`}>
                <Pencil /> Edit
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 /> Hapus
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apa kamu yakin ingin mengapus item ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Item yang sudah di hapus tidak bisa di kembalikan
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteFaq(item.id)}
                  >
                    {mutation.isPending ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Trash2 />
                    )}{" "}
                    {mutation.isPending ? "Menghapus..." : "Hapus"}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
