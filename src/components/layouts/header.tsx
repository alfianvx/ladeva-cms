import * as React from "react";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

type THeader = {
  title: string;
  isCreateMode: boolean;
  url_to?: string;
  button_title?: string;
};

export default function Header(props: THeader) {
  return (
    <div className="flex items-center justify-between h-16 px-4">
      <h1 className="text-xl font-semibold">{props.title}</h1>
      {props.isCreateMode ? null : (
        <Button asChild>
          <Link href={props.url_to ?? "/"}>
            <CirclePlus className="h-10 w-10" /> {props.button_title}
          </Link>
        </Button>
      )}
    </div>
  );
}
