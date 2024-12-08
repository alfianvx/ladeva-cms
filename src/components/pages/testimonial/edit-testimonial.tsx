"use client";

import Loading from "@/app/loading";
import Header from "@/components/layouts/header";
import EditTestimonialForm from "@/components/layouts/testimonial/edit-form";
import { getTestimonialContentById } from "@/services/dashboard/testimonial";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

export default function EditTestimonial({ id }: { id: string }) {
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_TESTIMONIAL", id],
    queryFn: () => getTestimonialContentById(id, token),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header title="Edit FAQ" isCreateMode={true} />
      <EditTestimonialForm data={data?.data} />
    </React.Fragment>
  );
}
