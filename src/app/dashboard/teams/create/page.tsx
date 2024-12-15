import Loading from "@/app/loading";
import CreateMember from "@/components/pages/member/create-member";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateMember />
    </Suspense>
  );
}
