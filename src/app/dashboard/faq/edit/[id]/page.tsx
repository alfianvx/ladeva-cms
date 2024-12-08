import Loading from "@/app/loading";
import EditFaq from "@/components/pages/faq/edit-faq";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <EditFaq id={params.id} />
    </Suspense>
  );
}
