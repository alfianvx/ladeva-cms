import EditFaq from "@/components/pages/faq/EditFaq";

export default function Page({ params }: { params: { id: string } }) {
  return <EditFaq id={params.id} />;
}
