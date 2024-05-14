import { ContentRenderer } from "@/components/editor";
import { Alert } from "@/components/ui/alert";
import { API_URL_LOCAL } from "@/lib/constants";
import { Post } from "@/lib/models";
import {
  formatAbbreviate,
  formatRelativeTimestamp,
  wordPerMinute,
} from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

interface Props {
  params: { slug: string };
}

const getPost = cache(async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/posts/${slug}`;

  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .json()
    .then((json) => json as Post)
    .catch((e) => undefined);
});

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
        description: `${wordPerMinute(post.wordCount)} min read`,
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${post.slug}`,
          title: post.title,
          description: post.excerpt,
          images: [`${post.cover ?? ""}`, ...previousImages],
          type: "website",
        },
        twitter: {
          title: post.title,
          description: `${wordPerMinute(post.wordCount)} min read`,
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

  const authorsView = () => {
    return (
      <div className="flex items-center gap-3 mb-4 -ml-[3px]">
        <div
          className="relative h-[54px]"
          style={{
            minWidth: 76,
          }}
        >
          {post.authors?.map((a, i, ary) => {
            const left = i * 27;

            if (!a.image) {
              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center size-[54px] bg-gray-200 border-3 border-white rounded-full"
                  style={{
                    left: left,
                    zIndex: authorCount - i,
                  }}
                >
                  <UserIcon className="size-7 text-gray-700" />
                </div>
              );
            }

            return (
              <Image
                key={i}
                src={a.image}
                className="absolute object-cover rounded-full border-3 border-white"
                alt="Cover"
                sizes="30vh"
                width={54}
                height={54}
                priority
                style={{
                  left: left,
                }}
              />
            );
          })}
        </div>
        <div className="flex flex-col">
          <span className="">
            By {post.authors?.map((a) => a.nickname).join(", ")}
          </span>
          <span className="text-sm text-sliver">
            {formatRelativeTimestamp(post.publishedAt)}
          </span>
        </div>
      </div>
    );
  };

  const authorCount = post.authors?.length ?? 0;

  return (
    <div className="container max-w-3xl py-5 mb-10">
      <h2 className="text-center">{post.title}</h2>
      <div className="flex items-center justify-center mb-7 mt-2">
        <div className="text-sliver">
          {wordPerMinute(post.wordCount)} min read
        </div>
        <div className="mx-2 text-sliver">&bull;</div>
        <div className="text-sliver">
          {formatAbbreviate(BigInt(post.meta?.viewCount ?? 0))} views
        </div>
      </div>

      {authorsView()}

      <div className="aspect-w-16 aspect-h-9 mb-7">
        <Image
          src={post.cover ?? "/images/placeholder.jpeg"}
          className="object-cover rounded-md border"
          alt="Cover"
          fill
          sizes="100vh"
          priority
        />
      </div>

      <ContentRenderer lexical={post.lexical} />

      <div className="flex flex-wrap gap-2 mt-8">
        {post.tags?.map((t) => {
          return (
            <Link
              key={t.id}
              href={`/tags/${t.slug}`}
              className="bg-gray-200 rounded-full text-sm px-3 py-1"
            >
              {t.name}
            </Link>
          );
        })}
      </div>

      {/* <Separator className="mt-6 mb-4" />

      {authorsView()} */}
    </div>
  );
}
