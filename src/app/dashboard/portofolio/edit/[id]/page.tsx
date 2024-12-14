import EditPortofolio from "@/components/pages/portofolio/edit-product";

export default function Page({ params }: { params: { id: string } }) {
  return <EditPortofolio id={params.id} />;
}
