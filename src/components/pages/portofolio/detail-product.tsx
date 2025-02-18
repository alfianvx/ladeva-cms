"use client";

import React from "react";
import Loading from "@/app/loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { convertDate } from "@/utils/dateConverter";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import Image from "next/image";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, LoaderCircle, Trash2 } from "lucide-react";
import { Pencil2Icon } from "@radix-ui/react-icons";

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  deletePortofolio,
  getPortofolioBySlug,
} from "@/services/dashboard/portofolio";
import { toast } from "sonner";

export default function DetailPortofolio({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const session = useSession();
  const router = useRouter();
  const token = session.data?.access_token;

  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_PORTOFOLIO_BY_SLUG", slug],
    queryFn: () => getPortofolioBySlug(slug),
  });

  const mutation = useMutation({
    mutationKey: ["DELETE_PORTOFOLIO"],
    mutationFn: (id: string) => deletePortofolio(id, token),
    onSuccess: () => {
      toast.success("Berhasil menghapus portofolio!");
      queryClient.invalidateQueries({ queryKey: ["GET_PORTOFOLIOS"] });
      router.push("/dashboard/portofolio");
    },
    onError: (error) => {
      toast.error(
        "Terjadi kesalahan saat menghapus portofolio : " + error.message
      );
    },
  });

  const handleDeleteItem = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button asChild>
          <Link href="/dashboard/portofolio">
            <ChevronLeft />
            Kembali
          </Link>
        </Button>
        <div className="flex gap-3 items-center">
          <Button asChild>
            <Link href={`/dashboard/portofolio/edit/${data?.data.id}`}>
              <Pencil2Icon />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
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
                  onClick={() => handleDeleteItem(data?.data.id)}
                >
                  {mutation.isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <Trash2 />
                  )}{" "}
                  {mutation.isPending ? "Menghapus..." : "Hapus"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Card>
        <CardHeader className="space-y-5">
          <h1 className="text-2xl font-bold text-center">{data?.data.name}</h1>
          <h3 className="text-center text-md text-opacity-70">
            {data?.data.short_description}
          </h3>
          <div className="flex justify-center items-center gap-3">
            <Badge className="rounded-full">
              {calculateReadingTime(data?.data.description)}
            </Badge>
            <span>•</span>
            <Badge className="rounded-full">
              {convertDate(data?.data.createdAt)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="w-full rounded-lg overflow-hidden">
            <Image
              src={data?.data.thumbnail_url}
              alt={data?.data.name}
              priority
              width={500}
              height={200}
              className="w-full object-cover"
            />
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.data.description),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
