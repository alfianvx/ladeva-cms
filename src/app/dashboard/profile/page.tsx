import Loading from "@/app/loading";
import UserProfile from "@/components/pages/profile/main";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile />
    </Suspense>
  );
}
