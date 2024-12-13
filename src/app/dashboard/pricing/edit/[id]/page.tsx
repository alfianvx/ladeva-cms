import EditPricing from "@/components/pages/pricing/edit-service";

export default function Page({ params }: { params: { id: string } }) {
  return <EditPricing id={params.id} />;
}
