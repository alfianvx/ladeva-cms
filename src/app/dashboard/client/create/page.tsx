import Loading from "@/app/loading";
import CreateClient from "@/components/pages/client/create-client";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateClient />
    </Suspense>
  );
}
