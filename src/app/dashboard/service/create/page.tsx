import Loading from "@/app/loading";
import CreateService from "@/components/pages/service/create-service";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateService />
    </Suspense>
  );
}
