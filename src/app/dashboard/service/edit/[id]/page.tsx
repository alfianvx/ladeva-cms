import EditService from "@/components/pages/service/edit-service";

export default function Page({ params }: { params: { id: string } }) {
  return <EditService id={params.id} />;
}
