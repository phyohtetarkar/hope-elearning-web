"use client";
import { API_URL, BASE_URL } from "@/lib/constants";
import { makeApiRequest } from "@elearning/lib";
import { MonthlyEnrollmentDto } from "@elearning/lib/models";
import { Card, CardContent, CardHeader, Separator } from "@elearning/ui";
import { Select } from "@elearning/ui/forms";
import { Chart, ChartConfiguration, ChartData } from "chart.js";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

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
  const { theme } = useTheme();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const { data, error, isLoading } = useSWR(
    `/admin/dashboard/enrollments/${year}`,
    async (url) => {
      const resp = await makeApiRequest({
        url: `${API_URL}${url}`,
        options: {
          credentials: "include",
        },
        refreshUrl: `${BASE_URL}/api/auth/refresh`,
      });

      if (!resp.ok) {
        return undefined;
      }

      return (await resp.json()) as MonthlyEnrollmentDto;
    },
    {
      revalidateOnFocus: false,
    }
  );

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

    const list = _months.map((m, i) => {
      if (!data) {
        return 0;
      }

      return data.data[`${i + 1}`] ?? 0;
    });

    const primaryColor = theme === "dark" ? "99, 102, 241" : "80, 72, 229";
    const pointColor = theme === "dark" ? "0, 0, 0" : "255, 255, 255";
    const tickColor = theme === "dark" ? "rgba(180, 180, 180, 0.2)" : undefined;
    const tooltipBackground =
      theme === "dark" ? "rgb(255, 255, 255)" : undefined;
    const tooltipText = theme === "dark" ? "rgb(0, 0, 0)" : undefined;

    const chartData: ChartData<"line"> = {
      labels: _months,
      datasets: [
        {
          backgroundColor: `rgba(${primaryColor}, 0.1)`,
          borderColor: `rgb(${primaryColor})`,
          pointBackgroundColor: `rgb(${pointColor})`,
          data: list,
          tension: 0.1,
          fill: true,
          borderWidth: 2,
          pointRadius: 3.5,
          pointBorderColor: `rgb(${primaryColor})`,
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
            backgroundColor: tooltipBackground,
            titleColor: tooltipText,
            bodyColor: tooltipText,
          },
        },
        scales: {
          x: {
            grid: {
              drawTicks: false,
              color: tickColor,
            },
            ticks: {
              padding: 8,
            },
          },
          y: {
            grid: {
              color: tickColor,
            },
          },
        },
      },
    };
    chart = new Chart(canvas, chartConfig);

    return () => {
      chart?.destroy();
    };
  }, [canvas, data, theme]);

  return (
    <Card className="shadow-none h-full">
      <CardHeader className="h-16 px-4 justify-center">
        <div className="flex items-center">
          <h4 className="">Monthly enrollment</h4>
          <div className="flex-grow"></div>
          <div>
            <Select
              className=""
              value={year}
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
        <div className="overflow-x-auto pt-3 grow scrollbar-hide">
          <div className="h-full min-w-[600px]">
            <canvas ref={setCanvas} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EnrolledLineChart;
