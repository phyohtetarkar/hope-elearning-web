import { ContentRenderer } from "@/components/editor";
import { Alert } from "@/components/ui/alert";
import { API_URL_LOCAL } from "@/lib/constants";
import { Post } from "@/lib/models";
import { formatTimestamp, wordPerMinute } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

const getPost = async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/posts/${slug}`;

  const resp = await fetch(url);

  return resp
    .json()
    .then((json) => json as Post)
    .catch((e) => undefined);
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);

    const previousImages = (await parent).openGraph?.images || [];

    if (post) {
      return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${post.slug}`,
          title: post.title,
          description: post.excerpt,
          images: [`${post.cover ?? ""}`, ...previousImages],
          type: "website",
        },
        twitter: {
          title: post.title,
          description: post.excerpt,
          card: "summary_large_image",
          images: [`${post.cover ?? ""}`, ...previousImages],
        },
      };
    }
  } catch (error) {}

  return {
    title: "Post not found",
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="container py-5">
        <Alert>Post not found</Alert>
      </div>
    );
  }

  const authorCount = post.authors?.length ?? 0;

  return (
    <div className="container max-w-3xl py-5 mb-10">
      <h2 className="text-center">{post.title}</h2>
      <div className="text-center text-sliver mb-7">
        {wordPerMinute(post.wordCount)} min read
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="relative h-[54px]"
          style={{
            minWidth: 76,
          }}
        >
          {post.authors?.reverse().map((a, i, ary) => {
            const left = (authorCount - i) * 27;

            if (!a.image) {
              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center size-[54px] bg-gray-200 border-3 border-white rounded-full"
                  style={{
                    left: left,
                  }}
                >
                  <UserIcon className="size-6 text-gray-700" />
                </div>
              );
            }

            return (
              <Image
                key={i}
                src={a.image}
                className="absolute object-cover rounded-full border-3 border-white"
                alt="Cover"
                sizes="100vh"
                width={54}
                height={54}
                priority
                style={{
                  left: left,
                }}
              />
            );
          })}
          {/* <Image
            src="/images/profile.png"
            className="absolute object-cover rounded-full border-3 border-white left-[27px]"
            alt="Cover"
            sizes="100vh"
            width={54}
            height={54}
            priority
          /> */}
        </div>
        <div className="flex flex-col">
          <span className="">
            By {post.authors?.map((a) => a.nickname).join(", ")}
          </span>
          <span className="text-sm text-sliver">
            {formatTimestamp(post.publishedAt)}
          </span>
        </div>
      </div>
      <div className="aspect-w-16 aspect-h-9 mb-7">
        <Image
          src={post.cover ?? "/images/placeholder.jpeg"}
          className="object-cover rounded-md"
          alt="Cover"
          fill
          sizes="100vh"
          priority
        />
      </div>

      <ContentRenderer lexical={post.lexical} />
    </div>
  );
}
