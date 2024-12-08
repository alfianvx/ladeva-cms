import Loading from "@/app/loading";
import CreateFaq from "@/components/pages/faq/create-faq";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateFaq />
    </Suspense>
  );
}
