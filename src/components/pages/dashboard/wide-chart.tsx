"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2024-11-01", desktop: 90, mobile: 140 },
  { date: "2024-11-02", desktop: 85, mobile: 135 },
  { date: "2024-11-03", desktop: 80, mobile: 120 },
  { date: "2024-11-04", desktop: 75, mobile: 115 },
  { date: "2024-11-05", desktop: 88, mobile: 130 },
  { date: "2024-11-06", desktop: 95, mobile: 125 },
  { date: "2024-11-07", desktop: 99, mobile: 145 },
  { date: "2024-11-08", desktop: 92, mobile: 138 },
  { date: "2024-11-09", desktop: 59, mobile: 110 },
  { date: "2024-11-10", desktop: 89, mobile: 140 },
  { date: "2024-11-11", desktop: 85, mobile: 135 },
  { date: "2024-11-12", desktop: 75, mobile: 130 },
  { date: "2024-11-13", desktop: 95, mobile: 120 },
  { date: "2024-11-14", desktop: 89, mobile: 125 },
  { date: "2024-11-15", desktop: 78, mobile: 140 },
  { date: "2024-11-16", desktop: 93, mobile: 128 },
  { date: "2024-11-17", desktop: 87, mobile: 122 },
  { date: "2024-11-18", desktop: 80, mobile: 133 },
  { date: "2024-11-19", desktop: 85, mobile: 140 },
  { date: "2024-11-20", desktop: 89, mobile: 125 },
  { date: "2024-11-21", desktop: 70, mobile: 110 },
  { date: "2024-11-22", desktop: 92, mobile: 120 },
  { date: "2024-11-23", desktop: 95, mobile: 138 },
  { date: "2024-11-24", desktop: 80, mobile: 118 },
  { date: "2024-11-25", desktop: 90, mobile: 130 },
  { date: "2024-11-26", desktop: 75, mobile: 110 },
  { date: "2024-11-27", desktop: 88, mobile: 125 },
  { date: "2024-11-28", desktop: 77, mobile: 135 },
  { date: "2024-11-29", desktop: 95, mobile: 145 },
  { date: "2024-11-30", desktop: 89, mobile: 133 },
  { date: "2024-12-01", desktop: 80, mobile: 115 },
  { date: "2024-12-02", desktop: 72, mobile: 138 },
  { date: "2024-12-03", desktop: 95, mobile: 127 },
  { date: "2024-12-04", desktop: 85, mobile: 115 },
  { date: "2024-12-05", desktop: 99, mobile: 143 },
  { date: "2024-12-06", desktop: 87, mobile: 130 },
  { date: "2024-12-07", desktop: 93, mobile: 128 },
  { date: "2024-12-08", desktop: 75, mobile: 145 },
  { date: "2024-12-09", desktop: 82, mobile: 110 },
  { date: "2024-12-10", desktop: 88, mobile: 134 },
  { date: "2024-12-11", desktop: 90, mobile: 122 },
  { date: "2024-12-12", desktop: 85, mobile: 127 },
  { date: "2024-12-13", desktop: 95, mobile: 140 },
  { date: "2024-12-14", desktop: 80, mobile: 113 },
];

const chartConfig = {
  views: {
    label: "Kunjungan",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const total = {
  desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
  mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
};

export default function WideChart() {
  const [isClient, setIsClient] = React.useState(false);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 space-y-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Statistik Website</CardTitle>
          <CardDescription>Total kunjungan 3 bulan terakhir.</CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
