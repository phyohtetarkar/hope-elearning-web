"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DashboardSummary } from "@/lib/models";
import { uppercaseFirstChar } from "@/lib/utils";
import { Chart, ChartConfiguration, ChartData } from "chart.js";
import { useEffect, useState } from "react";

function EnrolledPieChart({ summary }: { summary: DashboardSummary }) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let chart: Chart<"doughnut"> | undefined = undefined;

    if (!canvas) {
      return;
    }

    const chartData: ChartData<"doughnut"> = {
      labels: Object.keys(summary.enrolledByLevel).map((k) =>
        uppercaseFirstChar(k)
      ),
      datasets: [
        {
          backgroundColor: [
            "rgb(56, 176, 0)",
            "rgb(253, 197, 0)",
            "rgb(80, 72, 229)",
          ],
          data: Object.values(summary.enrolledByLevel),
          hoverOffset: 10,
          hoverBackgroundColor: [
            "rgb(56, 176, 0)",
            "rgb(253, 197, 0)",
            "rgb(80, 72, 229)",
          ],
        },
      ],
    };

    const chartConfig: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: chartData,
      options: {
        maintainAspectRatio: true,
        cutout: "70%",
        layout: {
          padding: 20,
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    };

    chart = new Chart(canvas, chartConfig);

    return () => {
      chart?.destroy();
    };
  }, [canvas, summary]);

  return (
    <Card className="shadow-none h-full">
      <CardHeader className="h-16 px-4 justify-center">
        <h4 className="">Enrolled by level</h4>
      </CardHeader>
      <Separator />
      <CardContent className="py-4 px-0 justify-center items-center h-full relative">
        <canvas ref={setCanvas} />
        {Object.values(summary.enrolledByLevel).reduce(
          (pv, cv) => pv + cv,
          0
        ) <= 0 && (
          <div className="text-sliver absolute left-[50%] top-[35%] translate-x-[-50%]">
            No chart data
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default EnrolledPieChart;
