import * as React from "react";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

type TFaqHeader = {
  title: string;
  isCreateMode: boolean;
};

export default function FaqHeader(props: TFaqHeader) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">{props.title}</h1>
      {props.isCreateMode ? null : (
        <Button asChild>
          <Link href={"/dashboard/faq/create"}>
            <CirclePlus className="h-10 w-10" /> Buat FAQ
          </Link>
        </Button>
      )}
    </div>
  );
}
