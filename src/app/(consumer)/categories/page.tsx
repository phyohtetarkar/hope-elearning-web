import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { API_URL_LOCAL } from "@/lib/constants";
import { Category, Page } from "@/lib/models";
import { buildQueryParams, pluralize } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

const getCategories = async () => {
  const query = buildQueryParams({
    includeCourseCount: true,
  });
  const url = `${API_URL_LOCAL}/content/categories${query}`;

  const resp = await fetch(url);

  return resp
    .json()
    .then((json) => json as Page<Category>)
    .catch((e) => undefined);
};

export default async function Categories() {
  const data = await getCategories();

  return (
    <div className="mb-5">
      <div className="bg-primary mb-4">
        <div className="container h-[8rem]">
          <div className="flex items-center h-full">
            <h2 className="text-primary-foreground">Explore categories</h2>
          </div>
        </div>
      </div>
      <div className="container py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!data?.contents.length && (
            <div className="col-span-4">
              <Alert>No categories found</Alert>
            </div>
          )}
          {data?.contents.map((c, i) => {
            return (
              <Link key={c.id} href={`/categories/${c.slug}`}>
                <Card className="shadow-none">
                  <CardContent className="p-4 text-center">
                    <h4 className="text-primary mb-1">{c.name}</h4>
                    <div className="text-muted-foreground">
                      {pluralize(Number(c.courseCount ?? 0), "course")}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
