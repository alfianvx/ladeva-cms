import EditTestimonial from "@/components/pages/testimonial/edit-testimonial";

export default function Page({ params }: { params: { id: string } }) {
  return <EditTestimonial id={params.id} />;
}
