import DetailProduct from "@/components/pages/product/detail-product";

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailProduct slug={params.slug} />;
}
