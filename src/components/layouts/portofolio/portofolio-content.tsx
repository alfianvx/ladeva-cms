"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loading from "@/app/loading";
import { getPortofolios } from "@/services/dashboard/portofolio";
import { TPortofolio } from "@/types/schema/Portofolio";
import PortofolioCard from "./portofolio-card";

export default function PortofolioContent() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_PORTOFOLIOS"],
    queryFn: getPortofolios,
  });

  if (isLoading && isFetching) {
    return <Loading />;
  }

  if (data.data.length === 0)
    return (
      <div className="flex flex-col gap-4 justify-center items-center my-56 px-4">
        <span>Belum ada Portofolio</span>
        <Button asChild>
          <Link href="/dashboard/portofolio/create">
            <Plus /> Tambah Portofolio Baru
          </Link>
        </Button>
      </div>
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
      {data.data.map((item: TPortofolio) => (
        <PortofolioCard key={item.id} product={item} />
      ))}
    </section>
  );
}
