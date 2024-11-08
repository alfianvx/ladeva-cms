import CreateFaqForm from "@/components/layouts/faq/create-form";
import FaqHeader from "@/components/layouts/faq/header";

export default function CreateFaq() {
  return (
    <>
      <FaqHeader title="Buat FAQ baru" isCreateMode={true} />
      <CreateFaqForm />
    </>
  );
}
