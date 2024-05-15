import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChangePassword from "./change-password";
import ProfileUpdate from "./profile-update";
import { API_URL_LOCAL } from "@/lib/constants";
import { User } from "@/lib/models";
import { cookies } from "next/headers";

const getUser = async () => {
  const url = `${API_URL_LOCAL}/profile`;
  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    next: { revalidate: 10 },
  });

  return resp.ok ? ((await resp.json()) as User) : null;
};

export default async function SettingPage() {
  const user = await getUser();

  return (
    <Card className="shadow-none">
      <CardContent className="px-6 py-4">
        <ProfileUpdate user={user} />
        <Separator />
        <ChangePassword />
      </CardContent>
    </Card>
  );
}
