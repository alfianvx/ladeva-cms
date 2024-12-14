"use client";

import React from "react";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { convertDate } from "@/utils/dateConverter";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import Image from "next/image";
import DOMPurify from "dompurify";
import { getPortofolioBySlug } from "@/services/dashboard/portofolio";

export default function DetailPortofolio({ slug }: { slug: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_PORTOFOLIO_BY_SLUG", slug],
    queryFn: () => getPortofolioBySlug(slug),
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4">
      <Card>
        <CardHeader className="space-y-5">
          <h1 className="text-2xl font-bold text-center">{data?.data.name}</h1>
          <h3 className="text-center text-md text-opacity-70">
            {data?.data.short_description}
          </h3>
          <div className="flex justify-center items-center gap-3">
            <Badge className="rounded-full">
              {calculateReadingTime(data?.data.description)}
            </Badge>
            <span>•</span>
            <Badge className="rounded-full">
              {convertDate(data?.data.createdAt)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="w-full rounded-lg overflow-hidden">
            <Image
              src={data?.data.thumbnail_url}
              alt={data?.data.name}
              priority
              width={500}
              height={200}
              className="w-full object-cover"
            />
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.data.description),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
