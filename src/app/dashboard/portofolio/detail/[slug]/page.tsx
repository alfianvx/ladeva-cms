import DetailPortofolio from "@/components/pages/portofolio/detail-product";

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPortofolio slug={params.slug} />;
}
