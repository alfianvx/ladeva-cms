import EditClient from "@/components/pages/client/edit-client";

export default function Page({ params }: { params: { id: string } }) {
  return <EditClient id={params.id} />;
}
