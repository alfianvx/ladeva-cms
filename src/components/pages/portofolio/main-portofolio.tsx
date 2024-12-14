import Header from "@/components/layouts/header";
import PortofolioContent from "@/components/layouts/portofolio/portofolio-content";
import React from "react";

export default function MainPortofolio() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Portofolio"
        isCreateMode={false}
        url_to="/dashboard/portofolio/create"
        button_title="Buat Portofolio"
      />
      <PortofolioContent />
    </React.Fragment>
  );
}
