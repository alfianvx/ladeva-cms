import Loading from "@/app/loading";
import CreatePortofolioForm from "@/components/layouts/portofolio/create-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreatePortofolioForm />
    </Suspense>
  );
}
