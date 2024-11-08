"use client";

import { useParams, usePathname } from "next/navigation";

export function useRouterParams() {
  const pathname = usePathname();
  const params = useParams();

  // Check if the current route is dynamic
  const isDynamicRoute = () => {
    // If there are any params, it means we're on a dynamic route
    return Object.keys(params).length > 0;
  };

  // Convert params object to array and clean up the values
  const getParamsArray = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment) => {
      // Check if segment is a param value from the params object
      const paramValue = Object.values(params).find(
        (param) => param === segment
      );

      // If it's a param value, find its key for better display
      if (paramValue) {
        const paramKey = Object.entries(params).find(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => value === segment
        )?.[0];
        // Convert kebab-case or camelCase to readable format
        return (
          paramKey
            ?.replace(/[\-_]([a-z])/g, (_, char) => ` ${char.toUpperCase()}`)
            ?.replace(/([A-Z])/g, " $1")
            ?.trim()
            ?.toLowerCase() || segment
        );
      }

      // Convert normal path segments to readable format
      return segment
        .replace(/[\-_]/g, " ")
        .replace(/([A-Z])/g, " $1")
        .trim()
        .toLowerCase();
    });
  };

  return {
    params,
    pathname,
    segments: getParamsArray(),
    isDynamic: isDynamicRoute(),
    shouldShowRoute: !isDynamicRoute(), // Will be false for dynamic routes
  };
}
