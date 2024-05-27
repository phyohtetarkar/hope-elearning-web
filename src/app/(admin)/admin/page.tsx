import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { API_URL_LOCAL } from "@/lib/constants";
import { DashboardSummary } from "@/lib/models";
import { formatAbbreviate } from "@/lib/utils";
import { validateResponse } from "@/lib/validate-response";
import { DollarSign, Edit, GraduationCap, UsersIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import EnrolledLineChart from "./enrolled-line-chart";
import EnrolledPieChart from "./enrolled-pie-chart";

const getData = async () => {
  const url = `${API_URL_LOCAL}/admin/dashboard/summary`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as DashboardSummary;
};

export default async function Dashboard() {
  const data = await getData();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <GraduationCap className="size-10 text-muted-foreground" />
              <div className="flex flex-col">
                <div className="text-muted-foreground mb-1">Courses</div>
                <h2 className="">
                  {formatAbbreviate(data.courseCount)}
                </h2>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="bg-muted/50 px-4 py-3">
            <Link href="/admin/courses" className="text-primary">
              View all
            </Link>
          </CardFooter>
        </Card>
        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Edit className="size-10 text-muted-foreground" />
              <div className="flex flex-col">
                <div className="text-muted-foreground mb-1">Posts</div>
                <h2 className="">
                  {formatAbbreviate(data.postCount)}
                </h2>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="bg-muted/50 px-4 py-3">
            <Link href="/admin/posts" className="text-primary">
              View all
            </Link>
          </CardFooter>
        </Card>
        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <DollarSign className="size-10 text-muted-foreground" />
              <div className="flex flex-col">
                <div className="text-muted-foreground mb-1">Subscribers</div>
                <h2 className="">
                  {formatAbbreviate(data.subscriberCount)}
                </h2>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="bg-muted/50 px-4 py-3">
            <Link href="/admin/subscribers" className="text-primary">
              View all
            </Link>
          </CardFooter>
        </Card>
        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <UsersIcon className="size-10 text-muted-foreground" />
              <div className="flex flex-col">
                <div className="text-muted-foreground mb-1">Users</div>
                <h2 className="">
                  {formatAbbreviate(data.userCount)}
                </h2>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="bg-muted/50 px-4 py-3">
            <Link href="/admin/users" className="text-primary">
              View all
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <EnrolledLineChart />
        </div>
        <div className="lg:col-span-4">
          <EnrolledPieChart summary={data} />
        </div>
      </div>
    </>
  );
}
