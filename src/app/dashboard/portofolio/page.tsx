import Loading from "@/app/loading";
import MainPortofolio from "@/components/pages/portofolio/main-portofolio";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MainPortofolio />
    </Suspense>
  );
}
