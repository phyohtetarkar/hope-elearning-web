import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { API_URL } from "@/lib/constants";
import { Category, Page } from "@/lib/models";
import { buildQueryParams, formatNumber } from "@/lib/utils";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import Link from "next/link";
interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getCategories = async ({ searchParams }: Props) => {
  const query = buildQueryParams({
    ...searchParams,
    limit: 10,
    includeCourseCount: true,
  });
  const url = `${API_URL}/content/categories${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Category>;
};

export default async function Categories(props: Props) {
  const data = await getCategories(props);

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
          {data.contents.length === 0 && (
            <div className="col-span-4">
              <Alert> No categories found</Alert>
            </div>
          )}
          {data.contents.map((c, i) => {
            return (
              <Link key={c.id} href={`/categories/${c.slug}`}>
                <Card className="shadow-none">
                  <CardContent className="p-4 text-center">
                    <h4 className="text-primary mb-1">{c.name}</h4>
                    <div className="text-sliver">
                      {formatNumber(BigInt(c.courseCount ?? 0))}
                      {c.courseCount === "0" || c.courseCount === "1"
                        ? " course"
                        : " courses"}
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
