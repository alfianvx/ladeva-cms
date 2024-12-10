import React from "react";
import Header from "@/components/layouts/header";
import ServiceContent from "@/components/layouts/service/service-content";

export default function MainService() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Layanan"
        isCreateMode={false}
        url_to="/dashboard/service/create"
        button_title="Tambah Layanan"
      />
      <ServiceContent />
    </React.Fragment>
  );
}
