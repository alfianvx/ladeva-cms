"use client";

import EditFaqForm from "@/components/layouts/faq/edit-form";
import FaqHeader from "@/components/layouts/faq/header";
import { getFaqContentById } from "@/services/platform/faq";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";

export default function EditFaq({ id }: { id: string }) {
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_FAQ", id],
    queryFn: () => getFaqContentById(id, token),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-56">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <FaqHeader title="Edit FAQ" isCreateMode={true} />
      <EditFaqForm data={data?.data.data} />
    </>
  );
}
