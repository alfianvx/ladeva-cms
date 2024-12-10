import React from "react";
import Header from "@/components/layouts/header";
import WorkflowContent from "@/components/layouts/workflow/workflow-content";

export default function MainWorkflow() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Alur Kerja"
        isCreateMode={false}
        url_to="/dashboard/workflow/create"
        button_title="Tambah Alur Kerja"
      />
      <WorkflowContent />
    </React.Fragment>
  );
}
