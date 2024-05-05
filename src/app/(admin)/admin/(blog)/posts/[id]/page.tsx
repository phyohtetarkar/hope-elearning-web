import { API_URL } from "@/lib/constants";
import { Page, Post, Tag, User } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PostEditPage from "./post-edit-page";

const getPost = async (id: string) => {
  const url = `${API_URL}/admin/posts/${id}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Post)
    .catch((e) => undefined);
};

const getAuthors = async () => {
  const url = `${API_URL}/admin/users?staffOnly=true`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<User>;
};

const getTags = async () => {
  const url = `${API_URL}/admin/tags`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Tag>;
};

export default async function PostEdit({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    redirect("/admin/posts");
  }

  // const authorPage = getAuthors();
  // const tagPage = getTags();

  // const [authors, tags] = await Promise.all([authorPage, tagPage]);

  return <PostEditPage post={post} />;
}
