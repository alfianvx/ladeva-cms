"use client";
import * as React from "react";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getMembers } from "@/services/dashboard/member";
import { TMember } from "@/types/schema/Member";
import { Badge } from "@/components/ui/badge";

export default function MemberList() {
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_MEMBERS"],
    queryFn: () => getMembers(token),
  });

  if (isLoading && isFetching) {
    return <Loading />;
  }

  if (data.data.length === 0)
    return (
      <div className="flex flex-col gap-4 justify-center items-center my-56 px-4">
        <span>Belum Ada Member</span>
      </div>
    );

  return (
    <div className="m-4 p-2 overflow-hidden border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-4">Nama</TableHead>
            <TableHead className="py-4">Email</TableHead>
            <TableHead className="text-right py-4">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item: TMember) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium py-4">{item.name}</TableCell>
              <TableCell className="font-medium py-4">{item.email}</TableCell>
              <TableCell className="text-right">
                <Badge>{item.role}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
