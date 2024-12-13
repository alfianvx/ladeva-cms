"use client";

import React from "react";
import Loading from "@/app/loading";
import Header from "@/components/layouts/header";
import EditPricingForm from "@/components/layouts/pricing/edit-form";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getPricingContentById } from "@/services/dashboard/pricing";

export default function EditPricing({ id }: { id: string }) {
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_PRICING", id],
    queryFn: () => getPricingContentById(id, token),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header title="Edit Penwaran" isCreateMode={true} />
      <EditPricingForm data={data?.data} />
    </React.Fragment>
  );
}
