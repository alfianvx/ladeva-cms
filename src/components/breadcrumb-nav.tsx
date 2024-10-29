"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouterParams } from "@/hooks/use-router-params";
import { capitalize } from "@/lib/utils";

const BreadcrumbNav = () => {
  const { segments } = useRouterParams();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={segment}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {capitalize(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
