import EditProduct from "@/components/pages/product/edit-product";

export default function Page({ params }: { params: { id: string } }) {
  return <EditProduct id={params.id} />;
}
