import FaqContent from "@/components/layouts/faq/content";
import FaqHeader from "@/components/layouts/faq/header";

export default function MainFaq() {
  return (
    <>
      <FaqHeader title="Halaman FAQ" isCreateMode={false} />
      <FaqContent />
    </>
  );
}
