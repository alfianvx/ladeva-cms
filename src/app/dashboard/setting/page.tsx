import Loading from "@/app/loading";
import MainSetting from "@/components/pages/setting/main";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MainSetting />
    </Suspense>
  );
}
