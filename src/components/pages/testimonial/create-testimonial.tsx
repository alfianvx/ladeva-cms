import Header from "@/components/layouts/header";
import CreateTestimonialForm from "@/components/layouts/testimonial/create-form";
import React from "react";

export default function CreateTestimonial() {
  return (
    <React.Fragment>
      <Header title="Tambah Testimonial Baru" isCreateMode={true} />
      <CreateTestimonialForm />
    </React.Fragment>
  );
}
