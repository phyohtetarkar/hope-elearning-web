import { API_URL_LOCAL } from "@/lib/constants";
import { UserMeta } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import ProfilePage from "./profile-page";

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
  const meta = await getUserMeta();

  return <ProfilePage meta={meta} />;
}
