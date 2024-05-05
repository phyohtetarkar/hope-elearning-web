import { ContentRenderer } from "@/components/editor";
import Image from "next/image";

export default function BlogPost() {
  return (
    <div className="container max-w-3xl py-5 mb-10">
      <h2 className="text-center">Getting started with docker</h2>
      <div className="text-center text-sliver mb-7">5 min read</div>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="relative h-[54px]"
          style={{
            minWidth: 76,
          }}
        >
          <Image
            src="/images/profile.png"
            className="absolute object-cover rounded-full border-3 border-white left-[27px]"
            alt="Cover"
            sizes="100vh"
            width={54}
            height={54}
            priority
          />
          <Image
            src="/images/profile.png"
            className="absolute object-cover rounded-full border-3 border-white"
            alt="Cover"
            sizes="100vh"
            width={54}
            height={54}
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="">By Cartoo, Believe</span>
          <span className="text-sm text-sliver">April 20, 2024</span>
        </div>
      </div>
      <div className="aspect-w-16 aspect-h-9 mb-7">
        <Image
          src="/images/course.jpg"
          className="object-cover rounded-md"
          alt="Cover"
          fill
          sizes="100vh"
          priority
        />
      </div>

      <ContentRenderer />
    </div>
  );
}
