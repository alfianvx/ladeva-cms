import React from "react";
import Header from "@/components/layouts/header";
import CreateWorkflowForm from "@/components/layouts/workflow/create-form";

export default function CreateWorkflow() {
  return (
    <React.Fragment>
      <Header title="Tambah Alur Kerja" isCreateMode={true} />
      <CreateWorkflowForm />
    </React.Fragment>
  );
}
