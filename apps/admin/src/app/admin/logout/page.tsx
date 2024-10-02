import { API_URL_LOCAL } from "@/lib/constants";
import { User } from "@elearning/lib/models";
import { Alert } from "@elearning/ui";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUser = async () => {
  try {
    const url = `${API_URL_LOCAL}/profile`;
    const resp = await fetch(url, {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    return resp.ok ? ((await resp.json()) as User) : null;
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return null;
};

// This page is a workaround for multi-zone redirect issue
export default async function Logout() {
  const user = await getUser();

  if (user) {
    revalidatePath("/admin", "layout");
    redirect("/admin");
  }

  return (
    <div className="container py-5">
      <Alert variant="primary">
        You have been logged out. Please return to&nbsp;
        <a href={`/login`} className="font-medium underline">
          Login
        </a>
        .
      </Alert>
    </div>
  );
}
