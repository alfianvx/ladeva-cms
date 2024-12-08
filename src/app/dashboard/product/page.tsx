import Loading from "@/app/loading";
import MainProduct from "@/components/pages/product/main-product";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MainProduct />
    </Suspense>
  );
}
