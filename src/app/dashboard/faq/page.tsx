import Loading from "@/app/loading";
import MainFaq from "@/components/pages/faq/main-faq";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MainFaq />
    </Suspense>
  );
}
