"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderSearchField() {
  const router = useRouter();
  const [search, setSearch] = useState<string>();

  return (
    <div className="flex items-center bg-gray-100 px-4 rounded-full h-10 w-[280px]">
      <SearchIcon className="size-5 flex-shrink-0 text-gray-500" />
      <input
        className="border-none focus:ring-0 bg-transparent px-2 w-full"
        type="search"
        placeholder="Search courses..."
        aria-label="Search"
        value={search ?? ""}
        onChange={(evt) => setSearch(evt.target.value)}
        onKeyUp={(evt) => {
          if (evt.key !== "Enter") {
            return;
          }
          
          if (search) {
            router.push(`/courses?q=${search}`);
          } else {
            router.push(`/courses`);
          }
        }}
      />
    </div>
  );
}
