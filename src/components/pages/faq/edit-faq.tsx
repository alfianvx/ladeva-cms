"use client";

import Loading from "@/app/loading";
import EditFaqForm from "@/components/layouts/faq/edit-form";
import Header from "@/components/layouts/header";
import { getFaqContentById } from "@/services/dashboard/faq";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

export default function EditFaq({ id }: { id: string }) {
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_FAQ", id],
    queryFn: () => getFaqContentById(id, token),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header title="Edit FAQ" isCreateMode={true} />
      <EditFaqForm data={data?.data.data} />
    </React.Fragment>
  );
}
