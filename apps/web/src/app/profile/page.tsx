import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { Button, Card, CardContent, ProfileAvatar, Separator } from "@elearning/ui";
import { User, UserMeta } from "@elearning/lib/models";
import { formatNumber } from "@elearning/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";

const getUser = async () => {
  const url = `${API_URL_LOCAL}/profile`;
  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  return resp.ok ? ((await resp.json()) as User) : null;
};

const getUserMeta = async () => {
  const url = `${API_URL_LOCAL}/profile/meta`;
  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  validateResponse(resp);

  return resp
    .json()
    .then((json) => json as UserMeta)
    .catch((e) => undefined);
};

export default async function Profile() {
  const userPromise = getUser();
  const metaPromise = getUserMeta();

  const [user, meta] = await Promise.all([userPromise, metaPromise]);

  return (
    <Card className="shadow-none mb-3">
      <CardContent className="p-4">
        <div className="flex gap-3 items-center">
          <div className="flex-shrink-0">
            <ProfileAvatar
              src={user?.image}
              prefix={user?.nickname.substring(0, 2)}
              className="size-[60px]"
            />
          </div>
          <div className="truncate">
            <h6 className="mb-0 text-foreground">{user?.nickname}</h6>
            <span className="text-muted-foreground text-sm">{user?.email}</span>
          </div>
          <div className="ms-auto">
            <Button
              variant="outline"
              className="border-primary text-primary hover:text-primary"
              asChild
            >
              <Link href="/profile/setting">Edit</Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-3" />
        <div className="mt-3 mb-3">Overview</div>
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0">
          <div className="flex-1 bg-muted/70 border rounded lg:rounded-e-none lg:border-e-0">
            <div className="p-4">
              <h4 className="mb-1">
                {formatNumber(meta?.enrollmentCount ?? 0)}
              </h4>
              <span>Learnings</span>
            </div>
          </div>
          <div className="flex-1 bg-muted/70 border rounded lg:rounded-s-none">
            <div className="p-4">
              <h4 className="mb-1">{formatNumber(meta?.bookmarkCount ?? 0)}</h4>
              <span>Bookmarks</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
