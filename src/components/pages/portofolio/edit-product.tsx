"use client";

import React from "react";
import Loading from "@/app/loading";
import Header from "@/components/layouts/header";
import { useQuery } from "@tanstack/react-query";
import { getPortofolioById } from "@/services/dashboard/portofolio";
import EditPortofolioForm from "@/components/layouts/portofolio/edit-form";

export default function EditPortofolio({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_PORTOFOLIO_BY_ID", id],
    queryFn: () => getPortofolioById(id),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header title="Buat Portofolio Baru" isCreateMode={true} />
      <EditPortofolioForm data={data?.data} />
    </React.Fragment>
  );
}
