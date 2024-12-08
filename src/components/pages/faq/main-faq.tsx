import FaqContent from "@/components/layouts/faq/faq-content";
import Header from "@/components/layouts/header";
import React from "react";

export default function MainFaq() {
  return (
    <React.Fragment>
      <Header
        title="Halaman FAQ"
        isCreateMode={false}
        url_to="/dashboard/faq/create"
        button_title="Buat FAQ"
      />
      <FaqContent />
    </React.Fragment>
  );
}
