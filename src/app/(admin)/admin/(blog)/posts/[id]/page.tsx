import { API_URL_LOCAL } from "@/lib/constants";
import { Post } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import PostEditPage from "./post-edit-page";

const getPost = async (id: string) => {
  const url = `${API_URL_LOCAL}/admin/posts/${id}`;

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

export default async function PostEdit({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  // const authorPage = getAuthors();
  // const tagPage = getTags();

  // const [authors, tags] = await Promise.all([authorPage, tagPage]);

  return <PostEditPage post={post} />;
}
