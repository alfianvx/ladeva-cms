import Loading from "@/app/loading";
import CreateTestimonial from "@/components/pages/testimonial/create-testimonial";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateTestimonial />
    </Suspense>
  );
}
