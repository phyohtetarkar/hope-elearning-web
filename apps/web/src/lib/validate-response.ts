import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function validateResponse(resp: Response, skipAuth?: boolean) {
  if (resp.status === 401 && !skipAuth) {
    revalidatePath("/", "layout");
    redirect("/login");
  }

  if (resp.status === 403) {
    throw Error("FORBIDDEN: Permission denied");
  }

  if (resp.status === 404) {
    throw Error("Resource not found");
  }

  if (!resp.ok) {
    const json = await resp.json();
    throw Error(json["message"]);
  }
}
