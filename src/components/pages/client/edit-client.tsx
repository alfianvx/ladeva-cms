"use client";

import Loading from "@/app/loading";
import EditClientForm from "@/components/layouts/client/edit-form";
import Header from "@/components/layouts/header";
import { getClientById } from "@/services/dashboard/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

export default function EditClient({ id }: { id: string }) {
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_CLIENT", id],
    queryFn: () => getClientById(id, token),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header title="Edit Partner" isCreateMode={true} />
      <EditClientForm data={data?.data} />
    </React.Fragment>
  );
}
