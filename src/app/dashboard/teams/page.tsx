import Loading from "@/app/loading";
import MainMember from "@/components/pages/member/main-member";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MainMember />
    </Suspense>
  );
}
