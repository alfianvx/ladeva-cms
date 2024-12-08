import Loading from "@/app/loading";
import MainClient from "@/components/pages/client/main";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MainClient />
    </Suspense>
  );
}
