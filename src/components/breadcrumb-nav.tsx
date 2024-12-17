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
  const limitedSegments = segments.slice(0, 3);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {limitedSegments.map((segment, index) => {
          const isLast = index === limitedSegments.length - 1;
          const href = `/${limitedSegments.slice(0, index + 1).join("/")}`;

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
