import Loading from "@/app/loading";
import CreatePricing from "@/components/pages/pricing/create-pricing";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreatePricing />
    </Suspense>
  );
}
