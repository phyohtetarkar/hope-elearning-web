"use client";
import { Select } from "@/components/forms";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Chart, ChartConfiguration, ChartData } from "chart.js";
import { useEffect, useMemo, useState } from "react";

const _months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function EnrolledLineChart() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const years = useMemo(() => {
    const start = 2024;
    const now = new Date().getFullYear();
    const diff = now - start;
    const array: number[] = [];
    for (let i = diff; i >= 0; i--) {
      array.push(start + i);
    }
    return array;
  }, []);

  useEffect(() => {
    let chart: Chart<"line"> | undefined = undefined;

    if (!canvas) {
      return;
    }

    const chartData: ChartData<"line"> = {
      labels: _months,
      datasets: [
        {
          backgroundColor: "rgba(80, 72, 229, 0.1)",
          borderColor: "rgb(80, 72, 229)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          data: [10, 11, 22, 33, 10, 0, 22, 0, 0, 0, 0, 0],
          tension: 0.1,
          fill: true,
          borderWidth: 2,
          pointRadius: 3.5,
          pointBorderColor: "rgb(80, 72, 229)",
        },
      ],
    };

    const chartConfig: ChartConfiguration<"line"> = {
      type: "line",
      data: chartData,
      options: {
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: {
              drawTicks: false,
            },
            ticks: {
              padding: 8,
            },
          },
        },
      },
    };
    chart = new Chart(canvas, chartConfig);

    // const handleResize = () => {
    //   chart?.resize();
    // };

    // window.addEventListener("resize", handleResize);

    return () => {
      // window.removeEventListener("resize", handleResize);
      chart?.destroy();
    };
  }, [canvas]);

  return (
    <Card className="shadow-none h-full">
      <CardHeader className="h-16 px-4 justify-center">
        <div className="flex items-center">
          <h4 className="">Monthly enrollment</h4>
          <div className="flex-grow"></div>
          <div>
            <Select
              className=""
              onChange={(evt) => setYear(parseInt(evt.target.value))}
            >
              <option disabled>Year</option>
              {years.map((y, i) => {
                return (
                  <option key={i} value={y}>
                    {y}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 ps-4 pb-4 flex h-full">
        <div className="overflow-x-auto pt-3 grow">
          <div className="h-full min-w-[600px]">
            <canvas ref={setCanvas} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EnrolledLineChart;