"use client";

import Loading from "@/app/loading";
import Header from "@/components/layouts/header";
import EditWorkflowForm from "@/components/layouts/workflow/edit-form";
import { getWorkflowContentById } from "@/services/dashboard/workflow";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

export default function EditWorkflow({ id }: { id: string }) {
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_WORKFLOW", id],
    queryFn: () => getWorkflowContentById(id, token),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header title="Edit Service" isCreateMode={true} />
      <EditWorkflowForm data={data?.data} />
    </React.Fragment>
  );
}
