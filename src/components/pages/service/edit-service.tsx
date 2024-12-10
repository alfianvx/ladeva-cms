"use client";

import Loading from "@/app/loading";
import Header from "@/components/layouts/header";
import EditServiceForm from "@/components/layouts/service/edit-form";
import { getServiceContentById } from "@/services/dashboard/service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

export default function EditService({ id }: { id: string }) {
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_SERVICE", id],
    queryFn: () => getServiceContentById(id, token),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header title="Edit Service" isCreateMode={true} />
      <EditServiceForm data={data?.data} />
    </React.Fragment>
  );
}
