import Loading from "@/app/loading";
import MainPricing from "@/components/pages/pricing/main";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MainPricing />
    </Suspense>
  );
}
