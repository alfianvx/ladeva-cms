import Loading from "@/app/loading";
import CreateProduct from "@/components/pages/product/create-product";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateProduct />
    </Suspense>
  );
}
