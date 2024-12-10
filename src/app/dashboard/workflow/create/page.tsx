import Loading from "@/app/loading";
import CreateWorkflow from "@/components/pages/workflow/create-service";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateWorkflow />
    </Suspense>
  );
}
