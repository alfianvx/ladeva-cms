import Header from "@/components/layouts/header";
import TestimonialContent from "@/components/layouts/testimonial/testimonial-content";
import React from "react";

export default function MainTestimonial() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Testimoni"
        isCreateMode={false}
        url_to="/dashboard/testimonial/create"
        button_title="Tambah Testimoni"
      />
      <TestimonialContent />
    </React.Fragment>
  );
}
