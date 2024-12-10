import EditWorkflow from "@/components/pages/workflow/edit-service";

export default function Page({ params }: { params: { id: string } }) {
  return <EditWorkflow id={params.id} />;
}
