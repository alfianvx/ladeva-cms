import Header from "@/components/layouts/header";
import CreateTestimonialForm from "@/components/layouts/testimonial/create-form";
import React from "react";

export default function CreateTestimonial() {
  return (
    <React.Fragment>
      <Header title="Tambah Testimoni Baru" isCreateMode={true} />
      <CreateTestimonialForm />
    </React.Fragment>
  );
}
